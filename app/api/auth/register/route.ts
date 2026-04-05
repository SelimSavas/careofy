import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getDatabaseUrlConfigError } from "@/lib/env/databaseUrl";
import { prisma } from "@/lib/prisma";

function prismaErrorMessage(e: unknown): string {
  if (e instanceof Prisma.PrismaClientKnownRequestError) {
    if (e.code === "P2002") {
      return "Bu e-posta zaten kayıtlı.";
    }
    if (e.code === "P1001" || e.code === "P1017") {
      return "Veritabanına bağlanılamıyor. Bir süre sonra tekrar deneyin.";
    }
    if (e.code === "P2021" || e.code === "P2022") {
      return "Veritabanı tabloları eksik. Sunucuda migration çalıştırılmalı (prisma migrate deploy).";
    }
  }
  if (e instanceof Prisma.PrismaClientInitializationError) {
    return (
      "Veritabanı bağlantısı kurulamıyor. Neon: DATABASE_URL (havuzlu, -pooler) ve DIRECT_URL (doğrudan) ikisini de tanımlayın; " +
      "havuzlu adreste &pgbouncer=true olsun; ?sslmode=require kullanın; şifrede özel karakterleri URL-encode edin. " +
      "Vercel Production’da bu iki değişkenin dolu olduğundan emin olun."
    );
  }
  return "Kayıt sırasında sunucu hatası. Lütfen tekrar deneyin.";
}

export async function POST(req: NextRequest) {
  const urlProblem = getDatabaseUrlConfigError();
  if (urlProblem) {
    return NextResponse.json({ error: urlProblem }, { status: 503 });
  }

  try {
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "Geçersiz istek gövdesi." }, { status: 400 });
    }
    const b = body as Record<string, unknown>;
    const email = typeof b.email === "string" ? b.email.trim().toLowerCase() : "";
    const password = typeof b.password === "string" ? b.password : "";
    const name = typeof b.name === "string" ? b.name.trim() : undefined;
    const role = b.role === "WORKER" ? "WORKER" : "STUDENT";

    if (!email || !password) {
      return NextResponse.json({ error: "E-posta ve şifre gerekli" }, { status: 400 });
    }
    if (password.length < 8) {
      return NextResponse.json({ error: "Şifre en az 8 karakter olmalı" }, { status: 400 });
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ error: "Bu e-posta zaten kayıtlı" }, { status: 409 });
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({
      data: {
        email,
        name: name || null,
        passwordHash,
        role,
      },
    });

    return NextResponse.json({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    });
  } catch (e) {
    console.error("[register]", e);
    const msg = prismaErrorMessage(e);
    let status = 500;
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002") {
      status = 409;
    } else if (e instanceof Prisma.PrismaClientInitializationError) {
      status = 503;
    }
    return NextResponse.json({ error: msg }, { status });
  }
}

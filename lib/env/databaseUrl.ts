/**
 * Prisma + Neon için ortam kontrolü.
 * @see https://neon.tech/docs/guides/prisma
 */

function checkPostgresUrl(name: "DATABASE_URL" | "DIRECT_URL", raw: string | undefined): string | null {
  if (raw == null || raw.trim() === "") {
    return (
      `${name} tanımlı değil. Neon konsolda Connect: ` +
      `havuzlu adres (-pooler) → DATABASE_URL, doğrudan adres → DIRECT_URL. ` +
      `Vercel'de ikisini de Environment Variables'a ekleyin; yalnızca tek dizeniz varsa ikisine de aynı doğrudan URL'yi verin.`
    );
  }
  const u = raw.trim();
  if (
    (u.startsWith('"') && u.endsWith('"')) ||
    (u.startsWith("'") && u.endsWith("'"))
  ) {
    return `${name} değerinde tırnak kullanmayın; yalnızca bağlantı dizesini yapıştırın.`;
  }
  if (!u.startsWith("postgresql://") && !u.startsWith("postgres://")) {
    return `${name} postgresql:// veya postgres:// ile başlamalı.`;
  }
  return null;
}

export function getDatabaseUrlConfigError(): string | null {
  const e1 = checkPostgresUrl("DATABASE_URL", process.env.DATABASE_URL);
  if (e1) return e1;
  const e2 = checkPostgresUrl("DIRECT_URL", process.env.DIRECT_URL);
  if (e2) return e2;

  const db = process.env.DATABASE_URL!.toLowerCase();
  if (db.includes("-pooler") && !db.includes("pgbouncer=true")) {
    return (
      "DATABASE_URL havuzlu (-pooler) kullanıyor. Prisma için sorguya &pgbouncer=true ekleyin. " +
      "Örnek: ...?sslmode=require&pgbouncer=true — channel_binding kullanmayın."
    );
  }

  return null;
}

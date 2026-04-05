"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth";
import { useState } from "react";
import { CookieConsent } from "@/components/legal/CookieConsent";

export function Providers({
  children,
  session,
}: {
  children: React.ReactNode;
  session?: Session | null;
}) {
  const [client] = useState(() => new QueryClient());
  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={client}>
        {children}
        <CookieConsent />
      </QueryClientProvider>
    </SessionProvider>
  );
}

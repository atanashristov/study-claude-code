import { betterAuth } from "better-auth";
import { headers } from "next/headers";
import { db } from "@/lib/db";

export const auth = betterAuth({
  database: db,
  emailAndPassword: { enabled: true },
});

export async function getSession() {
  return auth.api.getSession({ headers: await headers() });
}

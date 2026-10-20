"use server";

import { redirect } from "next/navigation";

import { homeForRole } from "@/lib/roles";
import { authenticate, registerDonor } from "@/server/accounts";
import { rateLimit } from "@/server/rate-limit";
import { getSession } from "@/server/session";
import {
  fieldErrorsFrom,
  loginSchema,
  registerSchema,
  type FieldErrors,
} from "@/server/validation";

export type AuthFormState = {
  formError?: string;
  fieldErrors?: FieldErrors;
};

export async function registerAction(
  _previous: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const input = {
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    password: String(formData.get("password") ?? ""),
    confirmPassword: String(formData.get("confirmPassword") ?? ""),
  };

  const parsed = registerSchema.safeParse(input);
  if (!parsed.success) {
    return fieldErrorsFrom(parsed.error);
  }

  const limited = rateLimit(`register:${parsed.data.email.toLowerCase()}`);
  if (!limited.ok) {
    return { formError: limited.error };
  }

  const result = await registerDonor(parsed.data);
  if (!result.ok) {
    return { formError: result.error };
  }

  const session = await getSession();
  session.userId = result.userId;
  await session.save();
  redirect(homeForRole(result.role));
}

export async function loginAction(
  _previous: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const input = {
    email: String(formData.get("email") ?? ""),
    password: String(formData.get("password") ?? ""),
  };
  const parsed = loginSchema.safeParse(input);
  if (!parsed.success) {
    return fieldErrorsFrom(parsed.error);
  }

  const limited = rateLimit(`login:${parsed.data.email.toLowerCase()}`);
  if (!limited.ok) {
    return { formError: limited.error };
  }

  const result = await authenticate(parsed.data.email, parsed.data.password);
  if (!result.ok) {
    return { formError: result.error };
  }

  const session = await getSession();
  session.userId = result.userId;
  await session.save();
  redirect(homeForRole(result.role));
}

export async function signOutAction() {
  const session = await getSession();
  session.destroy();
  redirect("/");
}

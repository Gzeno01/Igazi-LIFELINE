import * as z from "zod";

export const passwordSchema = z
  .string()
  .min(12, { error: "Use at least 12 characters." })
  .regex(/[A-Za-z]/, { error: "Include at least one letter." })
  .regex(/[0-9]/, { error: "Include at least one number." });

export const registerSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, { error: "Enter your name." })
      .max(80, { error: "Use 80 characters or fewer." }),
    email: z.email({ error: "Enter a valid email address." }),
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((value) => value.password === value.confirmPassword, {
    path: ["confirmPassword"],
    error: "Passwords do not match.",
  });

export const loginSchema = z.object({
  email: z.email({ error: "Enter a valid email address." }),
  password: z.string().min(1, { error: "Enter your password." }),
});

export const profileSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { error: "Enter your name." })
    .max(80, { error: "Use 80 characters or fewer." }),
});

export const passwordChangeSchema = z
  .object({
    currentPassword: z.string().min(1, { error: "Enter your current password." }),
    newPassword: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((value) => value.newPassword === value.confirmPassword, {
    path: ["confirmPassword"],
    error: "Passwords do not match.",
  });

export type FieldErrors = Record<string, string>;

export function fieldErrorsFrom(
  error: z.ZodError,
): { formError?: string; fieldErrors: FieldErrors } {
  const fieldErrors: FieldErrors = {};
  for (const issue of error.issues) {
    const key = issue.path[0];
    if (typeof key === "string" && !fieldErrors[key]) {
      fieldErrors[key] = issue.message;
    }
  }
  return { fieldErrors };
}

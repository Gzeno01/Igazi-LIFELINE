"use client";

import { useActionState, type ReactNode } from "react";

import {
  loginAction,
  registerAction,
  type AuthFormState,
} from "@/app/login/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const initialState: AuthFormState = {};

const demoAccounts = [
  ["donor@demo.lifeline.test", "Donor"],
  ["officer@demo.lifeline.test", "Verification officer"],
  ["partner@demo.lifeline.test", "Business partner"],
  ["admin@demo.lifeline.test", "Administrator"],
];

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="text-sm text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function RegisterForm() {
  const [state, action, pending] = useActionState(registerAction, initialState);

  return (
    <form action={action} className="flex max-w-md flex-col gap-4" noValidate>
      <Field id="name" label="Name" error={state.fieldErrors?.name}>
        <Input
          id="name"
          name="name"
          autoComplete="name"
          required
          aria-invalid={Boolean(state.fieldErrors?.name)}
          aria-describedby={state.fieldErrors?.name ? "name-error" : undefined}
        />
      </Field>
      <Field id="email" label="Email" error={state.fieldErrors?.email}>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          aria-invalid={Boolean(state.fieldErrors?.email)}
          aria-describedby={state.fieldErrors?.email ? "email-error" : undefined}
        />
      </Field>
      <Field id="password" label="Password" error={state.fieldErrors?.password}>
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          required
          aria-invalid={Boolean(state.fieldErrors?.password)}
          aria-describedby={
            state.fieldErrors?.password ? "password-error" : "password-hint"
          }
        />
        <p id="password-hint" className="text-sm text-muted-foreground">
          At least 12 characters, with a letter and a number.
        </p>
      </Field>
      <Field
        id="confirmPassword"
        label="Confirm password"
        error={state.fieldErrors?.confirmPassword}
      >
        <Input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
          required
          aria-invalid={Boolean(state.fieldErrors?.confirmPassword)}
          aria-describedby={
            state.fieldErrors?.confirmPassword ? "confirmPassword-error" : undefined
          }
        />
      </Field>
      {state.formError ? (
        <p role="alert" className="text-sm text-destructive">
          {state.formError}
        </p>
      ) : null}
      <Button type="submit" className="h-11" disabled={pending}>
        {pending ? "Creating account…" : "Create donor account"}
      </Button>
    </form>
  );
}

export function LoginForm() {
  const [state, action, pending] = useActionState(loginAction, initialState);

  return (
    <div className="flex max-w-xl flex-col gap-8">
      <form action={action} className="flex max-w-md flex-col gap-4" noValidate>
        <Field id="email" label="Email" error={state.fieldErrors?.email}>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            aria-invalid={Boolean(state.fieldErrors?.email)}
            aria-describedby={state.fieldErrors?.email ? "email-error" : undefined}
          />
        </Field>
        <Field id="password" label="Password" error={state.fieldErrors?.password}>
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            aria-invalid={Boolean(state.fieldErrors?.password)}
            aria-describedby={
              state.fieldErrors?.password ? "password-error" : undefined
            }
          />
        </Field>
        {state.formError ? (
          <p role="alert" className="text-sm text-destructive">
            {state.formError}
          </p>
        ) : null}
        <Button type="submit" className="h-11" disabled={pending}>
          {pending ? "Signing in…" : "Sign in"}
        </Button>
      </form>
      <aside className="rounded-xl border bg-muted px-4 py-4 text-sm leading-6">
        <p className="font-semibold">Demonstration accounts</p>
        <p className="mt-1 text-muted-foreground">
          These accounts are sample data for this prototype. Password for each:{" "}
          <span className="font-medium text-foreground">Lifeline-demo-100</span>
        </p>
        <ul className="mt-3 space-y-1">
          {demoAccounts.map(([email, label]) => (
            <li key={email}>
              <span className="font-medium">{label}:</span> {email}
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}

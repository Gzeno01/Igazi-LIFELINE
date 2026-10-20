"use client";

import { useActionState } from "react";

import {
  changePasswordAction,
  updateProfileAction,
  updateRewardRuleAction,
  updateAccessAction,
  type SettingsState,
} from "@/app/settings/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { roleLabels, userRoles, type UserRole } from "@/lib/roles";

const initialState: SettingsState = {};

function Notice({ state }: { state: SettingsState }) {
  if (state.formError) {
    return (
      <p role="alert" className="text-sm text-destructive">
        {state.formError}
      </p>
    );
  }
  if (state.message) {
    return (
      <p role="status" className="text-sm text-success-foreground">
        {state.message}
      </p>
    );
  }
  return null;
}

export function ProfileForm({ name }: { name: string }) {
  const [state, action, pending] = useActionState(updateProfileAction, initialState);

  return (
    <form action={action} className="flex max-w-md flex-col gap-3">
      <label htmlFor="name" className="text-sm font-medium">
        Name
      </label>
      <Input id="name" name="name" defaultValue={name} required autoComplete="name" />
      {state.fieldErrors?.name ? (
        <p className="text-sm text-destructive">{state.fieldErrors.name}</p>
      ) : null}
      <Notice state={state} />
      <Button type="submit" className="h-10 w-fit px-4" disabled={pending}>
        {pending ? "Saving…" : "Save name"}
      </Button>
    </form>
  );
}

export function PasswordForm() {
  const [state, action, pending] = useActionState(changePasswordAction, initialState);

  return (
    <form action={action} className="flex max-w-md flex-col gap-3">
      <label htmlFor="currentPassword" className="text-sm font-medium">
        Current password
      </label>
      <Input
        id="currentPassword"
        name="currentPassword"
        type="password"
        autoComplete="current-password"
        required
      />
      <label htmlFor="newPassword" className="text-sm font-medium">
        New password
      </label>
      <Input
        id="newPassword"
        name="newPassword"
        type="password"
        autoComplete="new-password"
        required
      />
      <label htmlFor="confirmPassword" className="text-sm font-medium">
        Confirm new password
      </label>
      <Input
        id="confirmPassword"
        name="confirmPassword"
        type="password"
        autoComplete="new-password"
        required
      />
      <Notice state={state} />
      <Button type="submit" className="h-10 w-fit px-4" disabled={pending}>
        {pending ? "Updating…" : "Update password"}
      </Button>
    </form>
  );
}

export function RewardRuleForm({ points }: { points: number }) {
  const [state, action, pending] = useActionState(updateRewardRuleAction, initialState);

  return (
    <form action={action} className="flex flex-col gap-3 sm:flex-row sm:items-end">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="points" className="text-sm font-medium">
          Points for one verified donation
        </label>
        <Input
          id="points"
          name="points"
          type="number"
          min={1}
          max={10000}
          defaultValue={points}
          className="max-w-40"
          required
        />
      </div>
      <Button type="submit" className="h-11 px-4" disabled={pending}>
        {pending ? "Saving…" : "Save rule"}
      </Button>
      <Notice state={state} />
    </form>
  );
}

export function AccessForm({
  userId,
  role,
  status,
}: {
  userId: string;
  role: UserRole;
  status: "ACTIVE" | "SUSPENDED";
}) {
  const [state, action, pending] = useActionState(updateAccessAction, initialState);

  return (
    <form action={action} className="flex flex-col gap-2">
      <input type="hidden" name="userId" value={userId} />
      <div className="flex flex-wrap gap-2">
        <label className="sr-only" htmlFor={`role-${userId}`}>
          Role
        </label>
        <select
          id={`role-${userId}`}
          name="role"
          defaultValue={role}
          className="h-10 rounded-lg border border-input bg-card px-2 text-sm"
        >
          {userRoles.map((value) => (
            <option key={value} value={value}>
              {roleLabels[value]}
            </option>
          ))}
        </select>
        <label className="sr-only" htmlFor={`status-${userId}`}>
          Status
        </label>
        <select
          id={`status-${userId}`}
          name="status"
          defaultValue={status}
          className="h-10 rounded-lg border border-input bg-card px-2 text-sm"
        >
          <option value="ACTIVE">Active</option>
          <option value="SUSPENDED">Suspended</option>
        </select>
        <Button type="submit" variant="outline" className="h-10 px-3" disabled={pending}>
          {pending ? "Saving…" : "Save"}
        </Button>
      </div>
      <Notice state={state} />
    </form>
  );
}

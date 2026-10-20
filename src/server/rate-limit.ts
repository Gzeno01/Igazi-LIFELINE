const attempts = new Map<string, { count: number; resetAt: number }>();

export function rateLimit(
  key: string,
  limit = 8,
  windowMs = 15 * 60 * 1000,
) {
  const now = Date.now();
  const current = attempts.get(key);
  if (!current || current.resetAt < now) {
    attempts.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true as const };
  }

  current.count += 1;
  if (current.count > limit) {
    return {
      ok: false as const,
      error: "Too many attempts. Wait a few minutes and try again.",
    };
  }

  return { ok: true as const };
}

export function resetRateLimitForTests() {
  attempts.clear();
}

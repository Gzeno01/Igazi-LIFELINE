import { config } from "dotenv";

config();

const testUrl = process.env.TEST_DATABASE_URL;
if (!testUrl || !testUrl.includes("igazi_lifeline_test")) {
  throw new Error("TEST_DATABASE_URL must point at igazi_lifeline_test.");
}

process.env.DATABASE_URL = testUrl;
process.env.SESSION_PASSWORD ??= "test-session-password-at-least-32-characters";

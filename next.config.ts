import type { NextConfig } from "next";

const replitDomain = process.env.REPLIT_DEV_DOMAIN;

const allowedOrigins = [
  "*.replit.dev",
  "*.repl.co",
  "*.janeway.replit.dev",
  "*.picard.replit.dev",
  "*.spock.replit.dev",
];

if (replitDomain) {
  allowedOrigins.push(replitDomain);
}

const nextConfig: NextConfig = {
  allowedDevOrigins: allowedOrigins,
};

export default nextConfig;

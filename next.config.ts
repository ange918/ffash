import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "*.replit.dev",
    "*.repl.co",
    "*.janeway.replit.dev",
    "*.picard.replit.dev",
  ],
};

export default nextConfig;

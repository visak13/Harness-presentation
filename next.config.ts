import type { NextConfig } from "next";

const isPages = process.env.BUILD_TARGET === "pages";
const repo = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "Harness-presentation";
const basePath = isPages && !repo.endsWith(".github.io") ? `/${repo}` : "";

const nextConfig: NextConfig = {
  ...(isPages ? { output: "export", trailingSlash: true, basePath, assetPrefix: basePath } : {}),
};

export default nextConfig;

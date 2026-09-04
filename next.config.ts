import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static HTML/CSS/JS export — deployable to GitHub Pages (no Node server).
  output: "export",

  // GitHub Pages has no server to rewrite `/work/foo` -> `/work/foo.html`,
  // so emit `/work/foo/index.html` and keep trailing-slash URLs.
  trailingSlash: true,

  // The default next/image optimizer needs a server; disable it for export.
  images: { unoptimized: true },
};

export default nextConfig;

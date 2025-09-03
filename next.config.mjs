// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
	output: "export",
	images: { unoptimized: true },
	basePath: "/<your-repo-name>",
	assetPrefix: "/<your-repo-name>/",
};

export default nextConfig;

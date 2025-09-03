// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
	output: "export",
	images: { unoptimized: true },
	basePath: "/AnomaliMaker",
	assetPrefix: "/AnomaliMaker/",
};

export default nextConfig;

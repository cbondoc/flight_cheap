module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
        port: "",
        pathname: "/",
      },
    ],
  },
  transpilePackages: ["@acme/ui", "lodash-es"],
};

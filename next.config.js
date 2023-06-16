module.exports = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://api.flightcheap.store/:path*",
      },
    ];
  },
};

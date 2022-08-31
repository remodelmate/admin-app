module.exports = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    // we have a seperare process to check eslint errors and
    // are omitting this to be ran by next
    ignoreDuringBuilds: true,
  },
  swcMinify: true,
}

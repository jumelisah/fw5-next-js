/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env : {
    BACKEND_URL : 'https://fw5-zwallet.herokuapp.com'
  },
  images: {
    // loader: "cloudinary",
    // path: "https://res.cloudinary.com",
    domains: ['res.cloudinary.com']
  }
}

module.exports = nextConfig

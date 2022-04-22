/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env : {
    BACKEND_URL : 'https://fw5-zwallet.herokuapp.com'
  }
}

module.exports = nextConfig

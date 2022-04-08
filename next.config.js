/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    MONGODB_URI: 'mongodb://localhost/userCrudApp',
  },
};

module.exports = nextConfig;

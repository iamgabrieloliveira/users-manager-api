/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    env: {
        JWT_TOKEN_NAME: 'users_manager_token',
        SERVER_URL: 'http://localhost/api',
    }
};

export default nextConfig;

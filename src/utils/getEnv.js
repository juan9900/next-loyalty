export default function getEnv(brand) {
  const API_SECRET = `NEXT_PUBLIC_${brand.toUpperCase()}_LOOPY_LOYALTY_API_SECRET`;
  return process.env[API_SECRET];
}

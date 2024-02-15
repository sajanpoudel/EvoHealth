// The signing secret comes from the environment so it never lives in the source code.
export const getJwtSecret = () => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is not set. Add it to server/.env before starting the server.");
  }
  return secret;
};

import jwt from "jsonwebtoken";

const tokenSign = async (object) => {
  return jwt.sign(
    {
      object,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: days ? `${days}d` : "7d",
    }
  );
};
const verifyToken = async (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return null;
  }
};

const decodeSign = async (token) => {
  return jwt.decode(token, { complete: true });
};

export { tokenSign, verifyToken, decodeSign };

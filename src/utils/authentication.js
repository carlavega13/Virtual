import jwt from 'jsonwebtoken';

//generador de token
const tokenSign = async (object) => {//objeto a firmar
  return jwt.sign(
    {
      //payload con ID, nombre del usuario y preset para logica de la encuesta
      object
    },
    process.env.JWT_SECRET,
    {
      expiresIn: days ? `${days}d` : '7d', // dias de validez
    },
  );
};

//verificador de token
const verifyToken = async (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return null;
  }
};

const decodeSign = async (token) => {
  //devuelve decodeSign.header y decodeSign.payload
  return jwt.decode(token, { complete: true });
};

export { tokenSign, verifyToken, decodeSign };
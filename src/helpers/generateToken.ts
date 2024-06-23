import { verify, sign, JwtPayload } from "jsonwebtoken";

interface TypesJwt extends JwtPayload {
  id: string;
}

const SECRET_KEY = process.env.SECRET_KEY as string;

const generateToken = (id: string) => {
  const token = sign({ id }, SECRET_KEY, { expiresIn: "1h" });
  return token;
};

const verifyToken = (token: string): TypesJwt | null => {
  try {
    const decoded: TypesJwt = verify(token, SECRET_KEY) as TypesJwt;
    return decoded;
  } catch (error) {
    return null;
  }
};

export { generateToken, verifyToken };

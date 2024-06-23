import bcrypt from "bcrypt";

const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

const comparePassword = async (
  password: string,
  passwordDB: string
): Promise<boolean> => {
  const result = await bcrypt.compare(password, passwordDB);
  return result;
};

export { hashPassword, comparePassword };

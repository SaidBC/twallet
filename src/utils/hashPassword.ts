import bcrypt from "bcryptjs";

export default async function hashPassword(
  password: string
): Promise<string | never> {
  if (typeof password !== "string")
    throw new TypeError("Password must be string");
  const salt = await bcrypt.genSalt();
  return await bcrypt.hash(password, salt);
}

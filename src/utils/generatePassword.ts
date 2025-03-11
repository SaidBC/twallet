import crypto from "crypto";

export default function generatePassword(length: number = 10) {
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
  const buffer = crypto.randomBytes(length);
  let password = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = buffer[i] % charset.length;
    password += charset[randomIndex];
  }

  return password;
}

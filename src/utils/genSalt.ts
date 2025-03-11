import crypto from "crypto";

export default function genSalt() {
  return crypto.randomBytes(16).toString().normalize();
}

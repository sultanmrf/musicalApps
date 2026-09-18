import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default defineEventHandler(async (event) => {
  const { email, password } = await readBody(event);
  const config = useRuntimeConfig();

  const normalizedEmail = email.trim().toLowerCase();

  const user = findOneWithPassword<any>("users", { email: normalizedEmail });

  if (!user)
    throw createError({ statusCode: 400, message: "Invalid credentials" });

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch)
    throw createError({ statusCode: 400, message: "Invalid credentials" });

  const token = jwt.sign({ userId: user._id }, config.jwtSecret, {
    expiresIn: "1h",
  });

  setCookie(event, "token", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    path: "/",
    maxAge: 60 * 60,
  });

  return {
    success: true,
    user: {
      _id: user._id,
      email: user.email,
    },
  };
});
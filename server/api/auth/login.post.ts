import Users from "../../models/Users";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default defineEventHandler(async (event) => {
  const { email, password } = await readBody(event);
  const config = useRuntimeConfig();

  const normalizedEmail = email.trim().toLowerCase();
  const user: any = await Users.findOne({ email: normalizedEmail }).select(
    "+password"
  );

  if (!user)
    throw createError({ statusCode: 400, message: "Invalid credentials" });
  console.log("user");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch)
    throw createError({ statusCode: 400, message: "Invalid credentials" });
  console.log("isMatch");

  const token = jwt.sign({ userId: user._id }, config.jwtSecret, {
    expiresIn: "1h",
  });
  console.log("token");

  return { token };
});

import bcrypt from "bcrypt";

export default defineEventHandler(async (event) => {
  const { username, email, password, role } = await readBody(event);

  if (!username || !email || !password) {
    throw createError({
      statusCode: 400,
      statusMessage: "username, email and password are required",
    });
  }

  const existing = findOne<any>("users", { email });
  if (existing) {
    throw createError({
      statusCode: 400,
      statusMessage: "User already exists",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = create<any>("users", {
    username,
    email,
    password: hashedPassword,
    role: role || "user",
    isActive: true,
    lastLogin: "",
  });

  const { password: _pw, ...rest } = user;
  return rest;
});
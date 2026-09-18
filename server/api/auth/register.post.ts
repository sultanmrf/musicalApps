import bcrypt from "bcrypt";

export default defineEventHandler(async (event) => {
  const { username, email, password } = await readBody(event);

  const existingUser = findOne<any>("users", { email });

  if (existingUser) {
    throw createError({ statusCode: 400, message: "User already exists" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  const dataFileForDatabase = {
    username: username,
    email: email,
    password: hashedPassword,
    role: "admin",
    isActive: true,
    lastLogin: "200000",
  };

  create<any>("users", dataFileForDatabase);

  return { message: "User created successfully" };
});

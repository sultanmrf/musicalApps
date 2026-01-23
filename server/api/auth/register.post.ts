import usersModel from "../../models/Users";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default defineEventHandler(async (event) => {
  const { username, email, password } = await readBody(event);

  const existingUser = await usersModel.findOne({ email });

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

  await usersModel.create(dataFileForDatabase);
  
  return { message: "User created successfully" };
});

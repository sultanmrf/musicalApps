import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Users from "../../models/Users";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const auth = getHeader(event, "authorization");
  if (!auth) throw createError({ statusCode: 401 });

  const token = auth.split(" ")[1];
  const decoded = jwt.verify(token, config.jwtSecret);
  if (typeof decoded === "string") {
    throw createError({ statusCode: 401, message: "Invalid token" });
  }
  const user = await Users.findById(decoded.userId).select("-password");

  return user;
});

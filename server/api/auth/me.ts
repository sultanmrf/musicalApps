import jwt from "jsonwebtoken";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  const token = getCookie(event, "token");

  if (!token) {
    throw createError({
      statusCode: 401,
      message: "Unauthenticated",
    });
  }

  let decoded: any;
  try {
    decoded = jwt.verify(token, config.jwtSecret);
  } catch (err) {
    throw createError({
      statusCode: 401,
      message: "Invalid or expired token",
    });
  }

  if (!decoded || typeof decoded === "string") {
    throw createError({
      statusCode: 401,
      message: "Invalid token format",
    });
  }

  const user = findById<any>("users", decoded.userId);

  if (!user) {
    throw createError({
      statusCode: 401,
      message: "User not found",
    });
  }

  const { password, ...userWithoutPassword } = user;
  return {
    _id: userWithoutPassword._id,
    email: userWithoutPassword.email,
    name: userWithoutPassword.username || null,
  };
});

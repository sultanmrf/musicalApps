import jwt from "jsonwebtoken";
import Users from "../../models/Users";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  // ✅ خواندن کوکی
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

  // ✅ decoded باید object باشه
  if (!decoded || typeof decoded === "string") {
    throw createError({
      statusCode: 401,
      message: "Invalid token format",
    });
  }

  // ✅ گرفتن یوزر از دیتابیس
  const user = await Users.findById(decoded.userId).select("-password");

  if (!user) {
    throw createError({
      statusCode: 401,
      message: "User not found",
    });
  }

  // ✅ برگرداندن فقط اطلاعات غیرحساس
  return {
    _id: user._id,
    email: user.email,
    name: user.name || null,
  };
});

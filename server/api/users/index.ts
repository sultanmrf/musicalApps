export default defineEventHandler(async (event) => {
  const users = findAll<any>("users").map(({ password, ...rest }: any) => rest);
  return users;
});
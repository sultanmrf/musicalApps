export default defineEventHandler(async (event) => {
  let res = findAll<any>("songs");
  return res;
});

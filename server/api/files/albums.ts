export default defineEventHandler(async (event) => {
  let res = findAll<any>("songs").filter((f: any) => f.album);
  return res;
});

export default defineNuxtRouteMiddleware(async (to) => {
  // اجازه بده صفحه login خودش باز شود
  if (to.path === "/auth") return;


});

export default defineNuxtRouteMiddleware((to) => {
  const token = useCookie('token');
  console.log(token);

  if (!token.value) {
    return navigateTo('/auth')
  }
})
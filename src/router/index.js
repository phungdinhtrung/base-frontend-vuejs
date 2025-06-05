import { createRouter, createWebHistory } from 'vue-router'
import NotFound from '@/router/NotFound.js'
import Home from './Home'
// import { storeToRefs } from 'pinia'
// import { useLoginStore } from '@/stores/loginStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...Home, ...NotFound],
})

router.beforeEach((to, from) => {
  const loginStore = useLoginStore()
  const { isLogin } = storeToRefs(loginStore)

  let isPathPublic = to.path.includes('public')

  if (isPathPublic === false) {
    if (to.name === 'login' && isLogin.value === true) loginStore.actLogout()
    if (to.meta.requireAuth === true && isLogin.value === false) return { name: 'login' }
  }
})

export default router

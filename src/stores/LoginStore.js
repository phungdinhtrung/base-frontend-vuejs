import { useRouter } from 'vue-router'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import axiosInstance from '@/plugin/axios.js'
import { StatusCodes } from 'http-status-codes'

export const useLoginStore = defineStore(
  'LoginStore',
  () => {
    // Router
    const router = useRouter()

    // state
    const CURRENT_USER = ref({})
    const ROLE_ID = ref(null)
    const USER_ID = ref(null)
    const isLogin = ref(false)

    // actions
    const actLogin = async (user) => {
      const res = await axiosInstance.post('/manage_user/login', user)

      if (res.status == StatusCodes.OK) {
        CURRENT_USER.value = res.data.current_user

        ROLE_ID.value = CURRENT_USER.value.role_id
        USER_ID.value = CURRENT_USER.value.user_id
        isLogin.value = true
        localStorage.setItem('ACCESS_TOKEN', res.data.token)

        return {
          success: true,
          role_id: USER_ID.value,
        }
      } else {
        return {
          success: false,
          error: res.data.error,
        }
      }
    }

    const actLogout = () => {
      CURRENT_USER.value = {}
      isLogin.value = false
      localStorage.setItem('ACCESS_TOKEN', '')
      router.push({ name: 'login' })
    }

    return {
      actLogin,
      actLogout,
      isLogin,
      CURRENT_USER,
      ROLE_ID,
      USER_ID,
    }
  },
  {
    persist: true, // Persist sử dụng để keep giá trị khai báo ở State trong Store pinia khi reload lại trang
  },
)

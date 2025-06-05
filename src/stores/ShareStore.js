import axiosInstance from '@/plugin/axios.js'
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { StatusCodes } from 'http-status-codes'
axiosInstance.defaults.headers.common['Authorization'] =
  `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`

export const useShareStore = defineStore('shareStore', () => {
  // STATE
  const result = ref([])

  // METHOD
  const actGet = async (api, params = '') => {
    const res = await axiosInstance.get(api, { params: params })

    if (res.status == StatusCodes.OK) {
      result.value = res.data

      return {
        success: true,
        data: res.data,
      }
    } else {
      return {
        success: false,
        error: res.data.error,
      }
    }
  }

  const actAdd = async (api, data) => {
    const res = await axiosInstance.post(api, data)

    if (res.status == 201) {
      return {
        success: true,
      }
    } else {
      return {
        success: false,
        status: res.status,
        error: res.data.error,
      }
    }
  }

  const actEdit = async (api, data) => {
    const res = await axiosInstance.put(api, data)

    if (res.status == StatusCodes.OK) {
      return {
        success: true,
      }
    } else {
      return {
        success: false,
        status: res.status,
        error: res.data.error,
      }
    }
  }

  const actDelete = async (api) => {
    const res = await axiosInstance.delete(api)

    if (res.status == StatusCodes.OK) {
      return {
        success: true,
      }
    } else {
      return {
        success: false,
        status: res.status,
        error: res.data.error,
      }
    }
  }

  // GETTER
  const getResult = computed(() => result.value)

  return {
    actAdd,
    actGet,
    actEdit,
    actDelete,
    getResult,
  }
})

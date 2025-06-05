<script setup>
import { useRouter } from 'vue-router'
import { useVuelidate } from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'
import ShowErrorVuelidate from '@/composable/vuelidate/ShowErrorVuelidate.vue'
import { useToast } from 'primevue/usetoast'
const toast = useToast()

// Router
const router = useRouter()

// Store
const LoginStore = useLoginStore()

// State
const username = ref('')
const password = ref('')

// Method
const params = ref({
  username: username.value,
  password: password.value,
})

const rules = {
  username: {
    required: helpers.withMessage('Chưa nhập tài khoản', required),
  },
  password: {
    required: helpers.withMessage('Chưa nhập mật khẩu', required),
  },
}

const v$ = useVuelidate(rules, params)

// submit form
const handleLogin = async () => {
  v$.value.$touch()

  if (v$.value.$invalid === false) {
    const user = {
      user_name: params.value.username,
      password: params.value.password,
    }

    const res = await LoginStore.actLogin(user)

    if (res.success) {
      router.push({ path: '/' })
    } else {
      toast.add({
        severity: 'error',
        summary: 'Lỗi đăng nhập',
        detail: 'Tài khoản hoặc mật khẩu không chính xác',
        life: 3000,
      })
    }
  }
}

const toForgetPassword = async () => {
  router.push({ path: '/forget-password' })
}
</script>

<template>
  <!-- Toast -->
  <Toast position="top-right" />

  <!-- Form login -->
  <div class="center_div">
    <Card>
      <template #title>
        <h4 class="text-center text-lg">ĐĂNG NHẬP</h4>
      </template>
      <template #content>
        <form @submit.prevent="handleLogin" class="-mt-2">
          <h6>Tài khoản</h6>
          <div class="p-inputgroup">
            <span class="p-inputgroup-addon">
              <i class="pi pi-user"></i>
            </span>
            <InputText v-model="v$.username.$model" placeholder="Nhập tài khoản" />
          </div>
          <ShowErrorVuelidate :isError="v$.username.$error" :errors="v$.username.$errors" />

          <h6>Mật khẩu</h6>
          <div class="p-inputgroup">
            <span class="p-inputgroup-addon">
              <i class="pi pi-lock"></i>
            </span>
            <Password
              id="password"
              v-model="v$.password.$model"
              toggleMask
              :feedback="false"
              placeholder="Nhập mật khẩu"
            />
          </div>
          <div class="p-fluid grid">
            <div class="col-6">
              <ShowErrorVuelidate :isError="v$.password.$error" :errors="v$.password.$errors" />
            </div>
            <div class="col-6">
              <span class="float-right msub-title pointer mt-2 -mb-4" @click="toForgetPassword"
                >Quên mật khẩu</span
              >
            </div>
          </div>
          <Button type="submit" label="Đăng nhập" class="p-button-sm p-button-info mt-4 w-3" />
        </form>
      </template>
    </Card>
  </div>
</template>

<style scoped>
.center_div {
  /* Điều chỉnh hộp login vào giữa */
  margin: 0 auto;
  width: 500px /* value of your choice which suits your alignment */;
  padding-top: 150px;
}
</style>

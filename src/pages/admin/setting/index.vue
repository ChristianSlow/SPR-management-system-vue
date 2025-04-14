<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { Admin } from '@/types/admin'
import { useToast } from 'primevue'
import { getCurrentUser } from 'vuefire'

const toast = useToast()
const isUpdate = ref(false)
const newPassword = ref('')
const confirmPassword = ref('')
const admin = ref<Admin>({})
const image = ref()

onMounted(async () => {
  const user = await getCurrentUser()
  admin.value = { displayName: user?.displayName as string, email: user?.email as string }
  console.log(user)
})

const selectedFile = ref()
function onFileSelect(event: any) {
  selectedFile.value = event
  const file = event.files[0]
  const reader = new FileReader()

  reader.onload = async (e) => {
    image.value = e.target?.result as string
  }
  reader.readAsDataURL(file)
}

function validatePassword() {
  if (newPassword.value !== confirmPassword.value) {
    toast.add({
      severity: 'error',
      summary: 'Password Error!',
      detail: 'Password does not match!',
      life: 3000,
    })
    return false
  }
  admin.value.password = newPassword.value
  return true
}

async function updateProfile(payload: Admin) {
  if (!validatePassword()) return

  isUpdate.value = false
  newPassword.value = ''
  confirmPassword.value = ''
}
</script>
<template>
  <div class="bg-surface-0 dark:bg-surface-900 p-4 py-6 md:p-6 border rounded-lg">
    <div class="text-lg font-semibold">Account setting</div>
    <div class="flex flex-col gap-4 mt-4">
      <div class="flex gap-2 items-end">
        <!-- <Avatar :image="image" class="mr-2" size="xlarge" v-if="image" />
        <Avatar :image="admin.photoURL" class="mr-2" size="xlarge" v-else-if="admin.photoURL" />
        <Avatar image="/default.jpg" class="mr-2" size="xlarge" v-else /> -->
        <!-- <FileUpload
					v-else
					mode="basic"
					@select="onFileSelect($event)"
					customUpload
					auto
					severity="secondary"
					class="p-button-outlined" /> -->
      </div>
      <div class="p-4 border rounded-lg">
        <div class="flex justify-between">
          <span class="text-lg font-semibold">Personal Details</span><br />
          <Button v-if="!isUpdate" icon="pi pi-pencil" size="small" @click="isUpdate = !isUpdate"
            >Edit</Button
          >
        </div>
        <div class="flex gap-4 flex-wrap">
          <div>
            <label for="name">Fullname</label><br />
            <InputGroup>
              <InputGroupAddon>
                <i class="pi pi-user"></i>
              </InputGroupAddon>
              <InputText
                :disabled="!isUpdate"
                v-model="admin.displayName"
                placeholder="Enter your full name"
              />
            </InputGroup>
          </div>
          <div>
            <label for="email">Email</label><br />
            <InputGroup>
              <InputGroupAddon>
                <i class="pi pi-envelope"></i>
              </InputGroupAddon>
              <InputText :disabled="!isUpdate" v-model="admin.email" placeholder="Email" />
            </InputGroup>
          </div>
        </div>
      </div>

      <div class="p-4 border rounded-lg" v-if="isUpdate">
        <span class="text-lg font-semibold">Change Password</span><br />
        <div class="flex gap-4 flex-wrap">
          <div>
            <label for="password">New Password</label><br />
            <InputGroup>
              <InputGroupAddon>
                <i class="pi pi-lock"></i>
              </InputGroupAddon>
              <Password
                v-model="newPassword"
                placeholder="new password"
                :feedback="false"
                toggleMask
              />
            </InputGroup>
          </div>
          <div>
            <label for="password">Confirm password</label><br />
            <InputGroup>
              <InputGroupAddon>
                <i class="pi pi-lock"></i>
              </InputGroupAddon>
              <Password
                v-model="confirmPassword"
                placeholder="confirm password"
                :feedback="false"
                toggleMask
              />
            </InputGroup>
          </div>
        </div>
      </div>
      <div>
        <Button v-if="isUpdate" label="Update" @click="updateProfile(admin)" />
      </div>
    </div>
  </div>
</template>

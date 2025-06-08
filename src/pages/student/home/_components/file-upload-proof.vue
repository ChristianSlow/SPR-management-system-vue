<!-- <script setup lang="ts">
import { ref } from 'vue'
import { usePrimeVue } from 'primevue/config'
import { useToast } from 'primevue/usetoast'

const $primevue = usePrimeVue()

const totalSize = ref(0)
const totalSizePercent = ref(0)
const files = ref([])
const emit = defineEmits<{
  (e: 'change', payload: any): void
}>()

const onRemoveTemplatingFile = (file: any, removeFileCallback: any, index: any) => {
  removeFileCallback(index)
  totalSize.value -= parseInt(formatSize(file.size))
  totalSizePercent.value = totalSize.value / 10
}

const onSelectedFiles = (event: any) => {
  files.value = event.files
  files.value.forEach((file) => {
    totalSize.value += parseInt(formatSize(file.size))
  })
  emit('change', files.value)
}

const formatSize = (bytes: any) => {
  const k = 1024
  const dm = 3
  const sizes = $primevue.config.locale.fileSizeTypes

  if (bytes === 0) {
    return `0 ${sizes[0]}`
  }

  const i = Math.floor(Math.log(bytes) / Math.log(k))
  const formattedSize = parseFloat((bytes / Math.pow(k, i)).toFixed(dm))

  return `${formattedSize} ${sizes[i]}`
}
</script>
<template>
  <div class="card">
    <Toast />
    <FileUpload name="demo[]" :multiple="true" accept="image/*" @select="onSelectedFiles">
      <template #header="{ chooseCallback, clearCallback }">
        <div class="flex flex-wrap justify-between items-center flex-1 gap-4">
          <div class="flex gap-2">
            <Button
              @click="chooseCallback()"
              icon="pi pi-images"
              rounded
              outlined
              severity="secondary"
            ></Button>
            <Button
              @click="clearCallback()"
              icon="pi pi-times"
              rounded
              outlined
              severity="danger"
              :disabled="!files || files.length === 0"
            ></Button>
          </div>
        </div>
      </template>
      <template #content="{ files, removeFileCallback }">
        <div class="flex flex-col gap-8 pt-4">
          <div v-if="files.length > 0">
            <div class="flex flex-wrap gap-4">
              <div
                v-for="(file, index) of files"
                :key="file.name + file.type + file.size"
                class="p-8 rounded-border flex flex-col border border-surface items-center gap-4"
              >
                <div>
                  <img
                    role="presentation"
                    :alt="file.name"
                    :src="file.objectURL"
                    width="100"
                    height="50"
                  />
                </div>
                <span
                  class="font-semibold text-ellipsis max-w-60 whitespace-nowrap overflow-hidden"
                  >{{ file.name }}</span
                >
                <Button
                  icon="pi pi-times"
                  @click="onRemoveTemplatingFile(file, removeFileCallback, index)"
                  outlined
                  rounded
                  severity="danger"
                />
              </div>
            </div>
          </div>
        </div>
      </template>
      <template #empty>
        <div class="flex items-center justify-center flex-col">
          <i class="pi pi-cloud-upload !border-2 !rounded-full !p-8 !text-4xl !text-muted-color" />
          <p class="mt-6 mb-0">Drag and drop files to here to upload.</p>
        </div>
      </template>
    </FileUpload>
  </div>
</template> -->

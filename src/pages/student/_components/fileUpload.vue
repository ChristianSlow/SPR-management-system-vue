<script setup lang="ts">
import { ref } from 'vue'
import { usePrimeVue } from 'primevue/config'
import { useToast } from 'primevue/usetoast'

const $primevue = usePrimeVue()
const files = ref([])

const emit = defineEmits<{
  (e: 'change', payload: any): void
}>()

const onSelectedFiles = (event: any) => {
  files.value = event.files
  emit('change', files.value[0])
}
</script>

<template>
  <div>
    <FileUpload name="basic" accept="image/*" @select="onSelectedFiles">
      <template #header="{ chooseCallback, clearCallback, files }">
        <div class="flex flex-wrap justify-between items-center flex-1 gap-4">
          <div class="flex gap-2">
            <Button
              @click="chooseCallback()"
              icon="pi pi-images"
              rounded
              outlined
              severity="secondary"
              :disabled="files || files.value.length > 0"
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
      <template #content="{ files }">
        <div class="flex flex-col gap-8">
          <div v-if="files.length > 0">
            <div class="flex flex-wrap gap-4">
              <div
                v-for="file of files"
                :key="file.name + file.type + file.size"
                class="rounded-border flex justify-center border border-surface items-center gap-4"
              >
                <img
                  role="presentation"
                  :alt="file.name"
                  :src="file.objectURL"
                  class="max-w-[10rem] max-h-[10rem] min-w-[10rem] min-h-[10rem]"
                />
                <!-- <Button
                  icon="pi pi-times"
                  @click="onRemoveTemplatingFile(file, removeFileCallback, index)"
                  outlined
                  rounded
                  severity="danger"
                /> -->
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
</template>

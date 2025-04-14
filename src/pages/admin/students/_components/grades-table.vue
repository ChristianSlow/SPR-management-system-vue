<script setup lang="ts">
import type { Subject } from '@/types/subject'
import { ref } from 'vue'

const props = defineProps<{
  subjects: Subject[]
  context: { year: string; semester: string }
}>()

const emit = defineEmits<{
  update: [updatedSubjects: Subject[], context: { year: string; semester: string }]
}>()

const columns = ref([
  { field: 'code', header: 'Code' },
  { field: 'unit', header: 'Unit' },
  { field: 'name', header: 'Name' },
  { field: 'grade', header: 'Grades' },
])

const onCellEditComplete = (event: any) => {
  const { data, newValue, field } = event
  if (newValue != null) {
    data[field] = newValue
    emit('update', props.subjects, props.context)
  }
}
</script>

<template>
  <div>
    <DataTable
      :value="props.subjects"
      editMode="cell"
      @cell-edit-complete="onCellEditComplete"
      size="small"
    >
      <Column v-for="col of columns" :key="col.field" :field="col.field" :header="col.header">
        <template #body="{ data, field }">
          {{ data[field as any] }}
        </template>
        <template #editor="{ data, field }">
          <template v-if="field === 'grade'">
            <InputNumber v-model="data[field]" locale="en-US" autofocus size="small" />
          </template>
          <template v-else>
            {{ data[field] }}
          </template>
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script setup lang="ts">
import type { Subject } from '@/types/subject'
import { ref, onMounted } from 'vue'

const props = defineProps()

const columns = ref([
  { field: 'code', header: 'Code' },
  { field: 'unit', header: 'Unit' },
  { field: 'name', header: 'Name' },
  { field: 'grade', header: 'Grades' },
])

const onCellEditComplete = (event: any) => {
  let { data, newValue, field } = event

  switch (field) {
    case 'quantity':
    case 'price':
      if (isPositiveInteger(newValue)) data[field] = newValue
      else event.preventDefault()
      break

    default:
      if (newValue.trim().length > 0) data[field] = newValue
      else event.preventDefault()
      break
  }
}
const isPositiveInteger = (val: any) => {
  let str = String(val)

  str = str.trim()

  if (!str) {
    return false
  }

  str = str.replace(/^0+/, '') || '0'
  var n = Math.floor(Number(str))

  return n !== Infinity && String(n) === str && n >= 0
}
const formatCurrency = (value: any) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)
}
</script>

<template>
  <div>
    <DataTable :value="props" editMode="cell" @cell-edit-complete="onCellEditComplete" size="small">
      <Column v-for="col of columns" :key="col.field" :field="col.field" :header="col.header">
        <template #body="{ data, field }">
          {{ data[field] }}
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

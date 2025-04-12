<template>
    <Dialog header="Confirm Delete" :modal="true" class="w-96 bg-white dark:bg-gray-800">
      <p class="text-gray-900 dark:text-white">Are you sure you want to delete this subject?</p>
      <template #footer>
        <Button label="No" class="p-button-text" />
        <Button label="Yes" class="p-button-danger" />
      </template>
    </Dialog>
</template>
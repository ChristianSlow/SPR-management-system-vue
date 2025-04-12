<template>
    <Dialog :style="{ width: '450px' }" header="Confirm" modal>
      <div class="confirmation-content text-center text-lg">
        <i class="pi pi-exclamation-triangle mr-3 text-3xl text-red-500" />
        <span
          >Are you sure you want to delete <strong>{{}}</strong>?</span
        >
      </div>
      <template #footer>
        <Button label="No" icon="pi pi-times" text />
        <Button label="Yes" icon="pi pi-check" severity="danger" />
      </template>
    </Dialog>
</template>
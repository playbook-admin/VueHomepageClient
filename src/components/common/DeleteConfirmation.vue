<template>
  <b-modal
    v-model="localShowModal"
    centered
    size="sm"
    @hide="handleClose"
    :footer="false"
  >
    <template #modal-header>
      <h5 class="modal-title">Confirm deletion</h5>
      <b-button variant="close" @click="handleClose"></b-button>
    </template>

    <div class="alert alert-danger">
      {{ message }}
    </div>

    <template #modal-footer>
      <b-button variant="secondary" @click="handleClose">
        Cancel
      </b-button>
      <b-button variant="danger" @click="confirmModal">
        Delete
      </b-button>
    </template>
  </b-modal>
</template>

<script>
import { ref, watch } from 'vue';

export default {
  name: 'DeleteConfirmation',
  props: {
    showModal: {
      type: Boolean,
      required: true,
    },
    confirmModal: {
      type: Function,
      required: true,
    },
    hideModal: {
      type: Function,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const localShowModal = ref(props.showModal);

    const handleClose = () => {
      setTimeout(() => {
        localShowModal.value = false;
      }, 250);
    };

    watch(
      () => props.showModal,
      (newVal) => {
        localShowModal.value = newVal;
      }
    );

    watch(
      () => localShowModal.value,
      (newVal) => {
        if (!newVal) {
          props.hideModal();
        }
      }
    );

    return {
      localShowModal,
      handleClose,
    };
  },
};
</script>

<style scoped>
/* Add any custom styles if needed */
</style>

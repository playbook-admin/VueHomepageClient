<template>
  <div style="display: inline;">
    <textarea
      style="text-align: center;"
      :value="modelValue"
      :placeholder="placeholder"
      @input="updateValue"
    ></textarea>
  </div>
</template>

<script>
export default {
  name: 'TextAreaInput',
  props: {
    modelValue: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: '' // Default to an empty string if not provided
    }
  },
  methods: {
    updateValue(event) {
      this.$emit('update:modelValue', event.target.value);
    }
  }
}
</script>

<style scoped>
/* Add any styles specific to this component here */
</style>

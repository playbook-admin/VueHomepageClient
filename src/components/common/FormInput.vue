<template>
    <form @submit.prevent="handleSubmit" style="display: inline;">
      <label style="display: inline;">
        <strong>{{ preText }}&nbsp;</strong>
        <input
          :type="type"
          style="text-align: center;"
          v-model="inputValue"
          :placeholder="placeholder"
          @input="handleChange"
        />
      </label>
    </form>
  </template>
  
  <script>
  export default {
    name: ['FormInput'],
    props: {
      text: {
        type: String,
        default: ''
      },
      type: {
        type: String,
        default: 'text'
      },
      placeholder: {
        type: String,
        default: ''
      },
      preText: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        inputValue: this.text
      };
    },
    watch: {
      text(newValue) {
        this.inputValue = newValue;
      }
    },
    methods: {
      handleChange(event) {
        this.$emit('textChanged', event.target.value);
      },
      handleSubmit() {
        this.$emit('enter');
      }
    }
  };
  </script>
  
  <style scoped>
  /* Add any required styling here */
  </style>
  
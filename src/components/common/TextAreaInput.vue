<template>
    <div>
      <textarea 
        preText="Ditt namn: " 
        :text="userName" 
        placeholder="Ange ditt namn"
        @textChanged="handleTextChanged"
      />
      <p>Ditt namn är: {{ userName }}</p>
    </div>
  </template>
  
  <script>
  
  export default {
    data() {
      return {
        userName: ''
      };
    },
    methods: {
      handleTextChanged(newText) {
        this.userName = newText;
      }
    }
  };
  </script>
  
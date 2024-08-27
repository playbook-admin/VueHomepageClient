<template>
  <slot></slot>
</template>

<script setup>
import { reactive, provide } from 'vue';

// Define initial state
const initialState = {
  loading: false,
  apiAddress: process.env.VUE_APP_API_ADDRESS || '', // Use process.env
};

// Define action types
const SET_LOADING = 'SET_LOADING';
const SET_APIADDRESS = 'SET_APIADDRESS';

// Create global state management system
const state = reactive({ ...initialState });

const dispatch = (action) => {
  switch (action.type) {
    case SET_LOADING:
      state.loading = action.payload;
      break;
    case SET_APIADDRESS:
      state.apiAddress = action.payload;
      break;
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
};

// Provide global state and dispatch
const GlobalStateKey = Symbol('GlobalState');
const GlobalDispatchKey = Symbol('GlobalDispatch');
provide(GlobalStateKey, state);
provide(GlobalDispatchKey, dispatch);
</script>

<style scoped>
/* Add component-specific styles here */
</style>

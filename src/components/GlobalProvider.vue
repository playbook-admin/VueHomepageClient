<template>
  <slot></slot>
</template>

<script setup>
import { provide, inject, reactive } from "vue";

// Define initial state
const initialState = {
  loading: false,
  apiAddress: process.env.VUE_APP_API_ADDRESS || "", // Set API address from .env
};

// Define actions
const SET_LOADING = "SET_LOADING";
const SET_APIADDRESS = "SET_APIADDRESS";

// Create the context keys
const GlobalStateContextKey = Symbol("GlobalStateContext");
const GlobalDispatchContextKey = Symbol("GlobalDispatchContext");

// Reactive state
const state = reactive({ ...initialState });

// Reducer function
const globalReducer = (state, action) => {
  switch (action.type) {
    case SET_LOADING:
      state.loading = action.payload;
      break;
    case SET_APIADDRESS:
      state.apiAddress = action.payload;
      break;
    // Add other cases here
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
};

// Dispatch function
const dispatch = (action) => {
  globalReducer(state, action);
};

// Provide the state and dispatch function
provide(GlobalStateContextKey, state);
provide(GlobalDispatchContextKey, dispatch);
</script>

<script>
// Hook to use the global state
export const useGlobalState = () => inject(Symbol("GlobalStateContext"));

// Hook to use the dispatch function
export const useGlobalDispatch = () => inject(Symbol("GlobalDispatchContext"));
</script>

<template>
  <slot />
</template>

<script setup>
import { reactive, computed, provide, inject} from 'vue';

// Define initial state
const initialState = {
  loading: false,
  apiAddress: process.env.VUE_APP_API_ADDRESS || '', // Use process.env
};

// Create a global state management system
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

// Provide state and dispatch globally
provide(GlobalStateKey, state);
provide(GlobalDispatchKey, dispatch);
</script>

<script>
export const SET_LOADING = 'SET_LOADING';
export const SET_APIADDRESS = 'SET_APIADDRESS';

export const GlobalStateKey = Symbol('GlobalState');
export const GlobalDispatchKey = Symbol('GlobalDispatch');


export function useGlobalState() {
  const state = inject(GlobalStateKey);
  if (!state) {
    throw new Error('useGlobalState must be used within a GlobalStateProvider');
  }
  return state;
}

export function useGlobalDispatch() {
  const dispatch = inject(GlobalDispatchKey);
  if (!dispatch) {
    throw new Error('useGlobalDispatch must be used within a GlobalStateProvider');
  }
  return dispatch;
}

export function useLoading() {
  const state = useGlobalState();
  return computed(() => state.loading);
}

export function useSetLoading() {
  const dispatch = useGlobalDispatch();
  return (value) => dispatch({ type: SET_LOADING, payload: value });
}
</script>

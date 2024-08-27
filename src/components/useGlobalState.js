// useGlobalState.js
import { inject, computed } from 'vue';
import { GlobalStateKey, GlobalDispatchKey, SET_LOADING, SET_APIADDRESS } from './GlobalStateContext.js';

// Custom hook to use global state
export function useGlobalState() {
  const state = inject(GlobalStateKey);
  if (!state) {
    throw new Error('useGlobalState must be used within a GlobalStateProvider');
  }
  return state;
}

// Custom hook to use global dispatch
export function useGlobalDispatch() {
  const dispatch = inject(GlobalDispatchKey);
  if (!dispatch) {
    throw new Error('useGlobalDispatch must be used within a GlobalStateProvider');
  }
  return dispatch;
}

// Custom hooks for specific state and dispatch actions
export function useLoading() {
  const state = useGlobalState();
  const dispatch = useGlobalDispatch();

  return {
    loading: computed(() => state.loading),
    setLoading: (value) => dispatch({ type: SET_LOADING, payload: value }),
  };
}

export function useApiAddress() {
  const state = useGlobalState();
  const dispatch = useGlobalDispatch();

  return {
    apiAddress: computed(() => state.apiAddress),
    setApiAddress: (address) => dispatch({ type: SET_APIADDRESS, payload: address }),
  };
}

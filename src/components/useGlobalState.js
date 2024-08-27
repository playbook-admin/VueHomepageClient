import { inject, computed } from 'vue';

const GlobalStateKey = Symbol('GlobalState');
const GlobalDispatchKey = Symbol('GlobalDispatch');

export const useGlobalState = () => {
  const state = inject(GlobalStateKey);
  if (!state) {
    throw new Error('useGlobalState must be used within a GlobalStateProvider');
  }
  return state;
};

export const useGlobalDispatch = () => {
  const dispatch = inject(GlobalDispatchKey);
  if (!dispatch) {
    throw new Error('useGlobalDispatch must be used within a GlobalStateProvider');
  }
  return dispatch;
};

export const useLoading = () => {
  const state = useGlobalState();
  return computed(() => state.loading);
};

export const useSetLoading = () => {
  const dispatch = useGlobalDispatch();
  return (value) => dispatch({ type: 'SET_LOADING', payload: value });
};

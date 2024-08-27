// GlobalStateContext.js
import { reactive } from 'vue';

// Define keys for providing/injecting
export const GlobalStateKey = Symbol('GlobalState');
export const GlobalDispatchKey = Symbol('GlobalDispatch');

const initialState = {
  loading: false,
  apiAddress: 'https://localhost:44397', // Set API address here or use an environment variable
};

export const SET_LOADING = 'SET_LOADING';
export const SET_APIADDRESS = 'SET_APIADDRESS';

// Create the global state and reducer-like function
export function createGlobalState() {
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
        throw new Error(`Unknown action type: ${action.type}`);
    }
  };

  return { state, dispatch };
}



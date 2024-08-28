// GlobalStateContext.js
import { reactive } from 'vue';

// Define keys for providing/injecting
export const GlobalStateKey = Symbol('GlobalState');
export const GlobalDispatchKey = Symbol('GlobalDispatch');

const initialState = {
  loading: false,
  apiAddress: 'https://localhost:44397', // Set API address here or use an environment variable
  isAuthorized: false,
  token: null, // To store JWT token
};


export const SET_LOADING = 'SET_LOADING';
export const SET_APIADDRESS = 'SET_APIADDRESS';
export const SET_IS_AUTHORIZED = 'SET_IS_AUTHORIZED';
export const SET_TOKEN = 'SET_TOKEN';

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
        case SET_IS_AUTHORIZED:
          state.isAuthorized = action.payload;
          break;
        case SET_TOKEN:
          state.token = action.payload;
          break;
      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }
  };

  return { state, dispatch };
}



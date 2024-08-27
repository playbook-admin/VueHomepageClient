<!-- <template>
  <session-user-context-provider>
    <slot></slot>
  </session-user-context-provider>
</template>

<script setup>
import { provide, reactive } from "vue";
import { useGlobalDispatch } from "../GlobalProvider.vue";
import { checkPasswordOnServerAsync, logOutUserAsync } from "./userAPI";

export const SessionUserContext = Symbol("SessionUserContext");

// Define the initial state of the session user
const initialState = {
  isAuthorized: false,
  token: null, // To store JWT token
};

// Define action types for better maintainability
const SET_IS_AUTHORIZED = "SET_IS_AUTHORIZED";
const SET_TOKEN = "SET_TOKEN";

// Reducer function to manage the session user state
const sessionUserReducer = (state, action) => {
  switch (action.type) {
    case SET_IS_AUTHORIZED:
      return { ...state, isAuthorized: action.payload };
    case SET_TOKEN:
      return { ...state, token: action.payload };
    default:
      return state;
  }
};

const state = reactive(initialState);
const dispatch = (action) => {
  Object.assign(state, sessionUserReducer(state, action));
};

const globalDispatch = useGlobalDispatch();

const checkPasswordAsync = async (password) => {
  globalDispatch({ type: "SET_LOADING", payload: true });
  try {
    const response = await checkPasswordOnServerAsync(password);
    if (response.data.token) {
      dispatch({ type: SET_IS_AUTHORIZED, payload: true });
      dispatch({ type: SET_TOKEN, payload: response.data.token });
      return "PasswordOk";
    } else {
      alert("Wrong password, please try again.");
      return "PasswordIncorrect";
    }
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    globalDispatch({ type: "SET_LOADING", payload: false });
  }
};

const logOutAsync = async () => {
  globalDispatch({ type: "SET_LOADING", payload: true });
  try {
    const response = await logOutUserAsync();
    if (
      response.data === "userLoggedOut" ||
      response.data === "userAlreadyLoggedOut"
    ) {
      dispatch({ type: SET_IS_AUTHORIZED, payload: false });
      dispatch({ type: SET_TOKEN, payload: null });
      return "userLoggedOut";
    } else {
      alert(`Unexpected server response: ${response.data}`);
      return "Error";
    }
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    globalDispatch({ type: "SET_LOADING", payload: false });
  }
};

// Provide the context
provide(SessionUserContext, {
  state,
  dispatch,
  checkPasswordAsync,
  logOutAsync,
});
</script> -->
<template>
  <slot></slot>
</template>

<script setup>
import { provide, reactive } from "vue";
import { useGlobalDispatch } from "../GlobalProvider.vue";
import { checkPasswordOnServerAsync, logOutUserAsync } from "./userAPI";

// Create a context for the session user state
const SessionUserContext = Symbol("SessionUserContext");

// Define the initial state of the session user
const initialState = {
  isAuthorized: false,
  token: null, // To store JWT token
};

// Define action types for better maintainability
const SET_IS_AUTHORIZED = "SET_IS_AUTHORIZED";
const SET_TOKEN = "SET_TOKEN";

// Reducer function to manage the session user state
const sessionUserReducer = (state, action) => {
  switch (action.type) {
    case SET_IS_AUTHORIZED:
      return { ...state, isAuthorized: action.payload };
    case SET_TOKEN:
      return { ...state, token: action.payload };
    default:
      return state;
  }
};

const state = reactive(initialState);
const dispatch = (action) => {
  Object.assign(state, sessionUserReducer(state, action));
};

const globalDispatch = useGlobalDispatch();

const checkPasswordAsync = async (password) => {
  globalDispatch({ type: "SET_LOADING", payload: true });
  try {
    const response = await checkPasswordOnServerAsync(password);
    if (response.data.token) {
      dispatch({ type: SET_IS_AUTHORIZED, payload: true });
      dispatch({ type: SET_TOKEN, payload: response.data.token });
      return "PasswordOk";
    } else {
      alert("Wrong password, please try again.");
      return "PasswordIncorrect";
    }
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    globalDispatch({ type: "SET_LOADING", payload: false });
  }
};

const logOutAsync = async () => {
  globalDispatch({ type: "SET_LOADING", payload: true });
  try {
    const response = await logOutUserAsync();
    if (
      response.data === "userLoggedOut" ||
      response.data === "userAlreadyLoggedOut"
    ) {
      dispatch({ type: SET_IS_AUTHORIZED, payload: false });
      dispatch({ type: SET_TOKEN, payload: null });
      return "userLoggedOut";
    } else {
      alert(`Unexpected server response: ${response.data}`);
      return "Error";
    }
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    globalDispatch({ type: "SET_LOADING", payload: false });
  }
};

// Provide the context
provide(SessionUserContext, {
  state,
  dispatch,
  checkPasswordAsync,
  logOutAsync,
});
</script>

<script>
// Define and export `useSessionUserContext` outside of the <script setup> block
import { inject } from "vue";
export function useSessionUserContext() {
  const SessionUserContext = Symbol("SessionUserContext");
  const context = inject(SessionUserContext);
  if (!context) {
    throw new Error("useSessionUserContext must be used within a SessionUserProvider");
  }
  return context;
}
</script>


<template>
  <div class="d-flex align-items-center justify-content-center custom-height-user text-xl">
    <div class="rounded border border-dark">
      <div class="border-bottom p-4">
        <p class="fw-semibold mb-2">{{ isAuthorized ? 'Log Out' : 'Log In' }}</p>
        <input 
          v-if="!isAuthorized" 
          type="password" 
          v-model="password" 
          placeholder="Password" 
          class="border border-dark p-2 rounded"
        />
      </div>
      <div class="d-flex gap-2 text-white text-base p-4">
        <button @click="handleClose" class="p-2 btn btn-secondary rounded">Cancel</button>
        <button 
          @click="handleLogInOut" 
          class="p-2 btn btn-primary rounded"
        >
          {{ isAuthorized ? 'Log Out' : 'Log In' }}
        </button>
        <button style="border: none; background: none; color: black;">
          <FontAwesomeIcon 
            icon="fa-spinner" 
            size="2x" 
            spin 
            :style="{ opacity: loading ? '1' : '0' }"
          />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useIsAuthorized, useLoading } from '../../providers/useGlobalState';
import { useRouter } from 'vue-router';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import * as apiClient from "../../helpers/ApiHelpers";
import { useApiAddress, useToken } from '../../providers/useGlobalState';

export default {
  name: 'LoginOutForm',
  components: {
    FontAwesomeIcon
  },
  setup() {
    const { apiAddress } = useApiAddress();
    const { isAuthorized, setIsAuthorized } = useIsAuthorized();
    const { token } = useToken();
    const { setLoading } = useLoading();
    const router = useRouter();
    const password = ref('');
    const loading = ref(false);

    const handleClose = () => {
      router.push('/albums');
    };


    
const checkPasswordOnServerAsync = async (password) => {
  try {
    const response = await apiClient.postHelper(`${apiAddress.value}/api/authorization/login`, { Password: password }, token);
    console.log("checkPasswordOnServerAsync response: ", response);
    return { data: response };
  } catch (error) {
    console.error('Error in checkPasswordOnServerAsync:', error);
    throw error;
  }
};


const logOutUserAsync = async () => {
  try {
    const response = await apiClient.postHelper(`${apiAddress.value}/api/authorization/logout`,null,token);
    console.log("logOutUserAsync response: ", response);
    return { data: response.text };
  } catch (error) {
    console.error('Error in logOutUserAsync:', error);
    throw error;
  }
};



    const handleLogInOut = async () => {
      setLoading(true);
      try {
        if (isAuthorized.value) {
          const response = await logOutUserAsync();
          console.log("response: ", response)
          if (response.data === 'userLoggedOut' || response.data === 'userAlreadyLoggedOut') {
            setIsAuthorized(false);
            handleClose();
          }
        } else {
          const response = await checkPasswordOnServerAsync(password.value);
          if (response.data.token) {
            setIsAuthorized(true);
            // Store the token if necessary
            handleClose();
          } else {
            console.error('Login failed or invalid response');
            // Handle the error (e.g., show a message to the user)
          }
        }
      } catch (error) {
        console.error('Error:', error);
        // Handle the error (e.g., show a message to the user)
      } finally {
        setLoading(false);
      }
    };

    return {
      password,
      isAuthorized,
      loading,
      handleClose,
      handleLogInOut,
    };
  },
};
</script>

<style>
.custom-height-user {
  height: calc(100vh - 162px);
}
</style>

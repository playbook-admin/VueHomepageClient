<template>
  <!-- <GlobalProvider> -->
  <SessionUserProvider>
    <Frame>
      <router-view></router-view>
    </Frame>
  </SessionUserProvider>
  <!-- </GlobalProvider> -->
</template>

<script setup>
// import GlobalProvider from './components/GlobalProvider.vue';
import SessionUserProvider from "./components/user/SessionUserProvider.vue";
import Frame from "./components/navbar/Frame.vue";
</script>

<template>
  <GlobalStateProvider>
    <FramePage>
      <router-view></router-view>
    </FramePage>
  </GlobalStateProvider>
</template>

<script setup>

import GlobalStateProvider from "./components/GlobalStateProvider.vue";
import FramePage from "./components/navbar/FramePage.vue";
</script>

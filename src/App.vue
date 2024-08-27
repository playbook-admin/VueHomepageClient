<template>
  <GlobalStateProvider>
    <Frame>
      <router-view></router-view>
    </Frame>
  </GlobalStateProvider>
</template>

<script setup>

import GlobalStateProvider from "./components/GlobalStateContext.vue";
import Frame from "./components/navbar/Frame.vue";
</script>

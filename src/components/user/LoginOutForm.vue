<template>
  <div class="d-flex align-items-center justify-content-center custom-height-user text-xl">
    <div class="rounded border border-dark">
        <div class="border-bottom p-4">
            <p class="fw-semibold mb-2">Log In</p>
            <input type="password" placeholder="Password" class="border border-dark p-2 rounded"/>
        </div>
        <div class="d-flex gap-2 text-white text-base p-4">
            <button @click="redirectToHome" class="p-2 btn btn-secondary rounded">Cancel</button>
            <button class="p-2 btn btn-primary rounded">Log In</button>
        </div>
    </div>
  </div>
</template>


<script>
export default {
  name: ["LoginOutForm"],
  methods: {
    redirectToHome() {
      this.$router.push('/');
    },
  },
};
</script>
<style>
.custom-height-user {
  height: calc(100vh - 162px);
}
</style>

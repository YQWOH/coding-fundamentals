<template>
  <div class="container m-3">
    <div class="row">
      <div class="col flex">
        <div class="block text-purple-600 pl-2 pr-2 ">Contact Manager
        </div>
        <div class="h-30 bg-purple-600 w-12 text-center rounded-md">
          <router-link to="/" class="container text-sm text-white"
          ><i class="fa fa-plus bg-purple-600"></i>New</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ContactManager",
};
</script>

<style scoped>
</style>
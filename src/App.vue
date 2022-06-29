<template>
  <div id="app">
    <Header />
    <Content />
    <Footer />
  </div>
</template>

<script setup lang="ts">
  import Header from "@/components/Header.vue"
  import Content from "@/components/Content.vue"
  import Footer from "@/components/Footer.vue"
</script>

<style>
  body{
    margin: 0;
    padding: 0;
  }
  .light{
    background-color: white;
  }
  .dark{
    background-color: black;
  }
</style>
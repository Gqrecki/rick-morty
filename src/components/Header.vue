<template>
  <div class="header">
    <img class="rm" src="@/assets/r&m.png" alt="r&m logo">
    <div class="search">
      <div class="searchFirst"><p>Search by</p></div>
      <div class="dropdown" @click="isOpen = !isOpen" >
        <p class="menutxt">{{store.askChoose}}</p>
        <span class="arrow noselect">arrow_drop_down</span>
      </div>
        <transition name="fade" @click="isOpen = !isOpen">
        <div class="menu" v-if="isOpen">
          <div class="menuitem extraborder" @click="store.askName">
            <p class="menutxt">Name</p>
          </div>
          <div class="menuitem extraborder" @click="store.askIdentifier">
            <p class="menutxt">Identifier</p>
          </div>
          <div class="menuitem" @click="store.askEpisode">
            <p class="menutxt">Episode</p>
          </div>
        </div>
        </transition>
      <input v-if="store.askChoose == 'Name'" id="input" maxlength="30">
      <input v-if="store.askChoose == 'Episode'" id="input" maxlength="6">
      <input v-if="store.askChoose == 'Identifier'" id="input" type="number" maxlength="3">
      <span class="icon noselect" @click="store.newAsk">search</span>
    </div>
    <span @click="toggleTheme" class="mode noselect">light_mode</span>
  </div>
</template>

<script setup lang="ts">
  import { useStore } from "@/stores/dataStore"
  import { ref, onMounted } from 'vue';

  onMounted(() => {
    setTheme(userTheme.value)
    store.getIdCount()
    store.setMode()
  })

  const store = useStore()

  const isOpen = ref(false)

  export type UserTheme = 'light' | 'dark';

  const setTheme = (theme: UserTheme) => {
    localStorage.setItem('theme', theme);
    userTheme.value = theme;
    document.documentElement.className = theme;
    store.setMode()
  };

  const getTheme = (): UserTheme => {
    return localStorage.getItem('theme') as UserTheme;
  };

  const getMediaPreference = (): UserTheme => {
    const hasDarkPreference = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (hasDarkPreference) {
      return 'dark';
    } else {
      return 'light';
    }
  };

  const userTheme = ref<UserTheme>(getTheme() || getMediaPreference());

  const toggleTheme = (): void => {
  const activeTheme = localStorage.getItem('theme');
  if (activeTheme === 'light') {
    setTheme('dark');
  } else {
    setTheme('light');
  }
  };
</script>


<style scoped>
 @import '@/styles/header.css';
</style>
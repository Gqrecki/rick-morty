<template>
  <div class="content">
    <div class="top">
      <div v-if="store.favActive == false" class="picker">
          <div class="firstPicker active" ><p class="noselect">All Characters</p></div> 
          <div @click="store.favorites" class="secondPicker unactive"><p class="noselect">Favorites</p></div>
      </div>
      <div v-else class="picker">
          <div @click="store.allCharacters" class="firstPicker unactive" ><p class="noselect">All Characters</p></div> 
          <div class="secondPicker active"><p class="noselect">Favorites</p></div>
      </div>
      <div class="info">
        <div class="first"><p class="infoTxt">Photo</p></div>
        <div class="second"><p class="infoTxt">Character ID</p></div>
        <div class="third"><p class="infoTxt">Name</p></div>
        <div class="fourth"><p class="infoTxt">Gender</p></div>
        <div class="fifth"><p class="infoTxt">Species</p></div>
        <div class="sixth"><p class="infoTxt">Last Episode</p></div>
        <div class="seventh"><p class="infoTxt">Add To Favorites</p></div>
      </div>
    </div>
    <div class="bottom" id="scroll">
      <div v-for="(item, i) in store.data" :key="i" class="item">
        <div v-if="item.status == 'Alive' || item.status == 'unknown'" class="first">
          <img class="image" v-bind:src= item.image>
        </div>
        <div v-else class="first"> 
          <img class="imagedead" v-bind:src= item.image>
          <img class="dead" src="@/assets/dead.png">
        </div>
        <div class="second"><p class="itemTxt">{{item.id}}</p></div>
        <div class="third"><p class="itemTxt">{{item.name}}</p></div>
        <div class="fourth">
          <span v-if="item.gender == 'Male'" class="icon">male</span>
          <span v-else-if="item.gender == 'Female'" class="icon">female</span>
          <span v-else-if="item.gender == 'Genderless'" class="icon">clear</span>
          <span v-else-if="item.gender == 'unknown'" class="icon">remove</span>
          <p v-if="item.gender == 'unknown'" class="itemTxt">Unknown</p>
          <p v-else class="itemTxt">{{item.gender}}</p>
        </div>
        <div class="fifth"><p class="itemTxt">{{item.species}}</p></div>
        <div class="sixth"><p class="itemTxt">{{(item.episode[item.episode.length - 1]).episode}}</p></div>
        <div class="seventh">
          <div v-if="((store.variables.fav.find(el => el == item.id) == undefined) == true)" @click="store.addFav(item.id)" class="nofav noselect"><span class="nofavicon">star</span></div>
          <div v-else @click="store.delFav(item.id)" class="fav noselect"><span class="favicon">star</span></div>
        </div>
      </div>
    </div> 
  </div> 
</template>

<script setup lang="ts">
  import { useStore } from "@/stores/dataStore"
  import { ref, onMounted, watch } from 'vue';

  onMounted(() => {
    if(localStorage.getItem('fav')){
      store.setFavLocal()
    }
    store.ask()
  })

  const store = useStore()

</script>

<style scoped>
 @import '@/styles/content.css';
</style>
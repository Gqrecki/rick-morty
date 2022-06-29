<template>
    <div class="footer">
      <div class="control noselect" v-if="store.pages.pages > 1">
        
        <div @click="store.prevPage" v-if="store.pages.prev != null" class="btn">
          <span class="icoActive noselect">arrow_left</span>
        </div>
        <div v-else class="btn">
          <span class="ico noselect">arrow_left</span>
        </div>

        <div v-if="store.variables.page == 1" class="btnActive">
          <p class="pActive">1</p>
        </div>
        <div v-else @click="store.pageAsk(1)" class="btn">
          <p>1</p>
        </div>

        <div style="display:flex" v-if="store.pages.pages <= 6">
          
          <div v-if="store.pages.pages > 2">
            <div v-if="store.variables.page == 2" class="btnActive">
              <p class="pActive">2</p>
            </div>
            <div v-else @click="store.pageAsk(2)" class="btn">
              <p>2</p>
            </div>
          </div>

          <div v-if="store.pages.pages > 3">
            <div v-if="store.variables.page == 3" class="btnActive">
              <p class="pActive">3</p>
            </div>
            <div v-else @click="store.pageAsk(3)" class="btn">
              <p>3</p>
            </div>
          </div>

          <div v-if="store.pages.pages > 4">
            <div v-if="store.variables.page == 4" class="btnActive">
              <p class="pActive">4</p>
            </div>
            <div v-else @click="store.pageAsk(4)" class="btn">
              <p>4</p>
            </div>
          </div>

          <div v-if="store.pages.pages > 5">
            <div v-if="store.variables.page == 5" class="btnActive">
              <p class="pActive">5</p>
            </div>
            <div v-else @click="store.pageAsk(5)" class="btn">
              <p>5</p>
            </div>
          </div>
          
        </div>

        <div style="display:flex" v-else-if="store.pages.pages > 6 && store.variables.page < 4" >

          <div v-if="store.variables.page == 2" class="btnActive">
            <p class="pActive">2</p>
          </div>
          <div v-else @click="store.pageAsk(2)" class="btn">
            <p>2</p>
          </div>

          <div v-if="store.variables.page == 3" class="btnActive">
            <p class="pActive">3</p>
          </div>
          <div v-else @click="store.pageAsk(3)" class="btn">
            <p>3</p>
          </div>

          <div v-if="store.variables.page == 4" class="btnActive">
            <p class="pActive">4</p>
          </div>
          <div v-else @click="store.pageAsk(4)" class="btn">
            <p>4</p>
          </div>
 
          <div class="btn">
              <input @change="store.inputPage" type="number" id="inputPage" placeholder="...">
          </div>

        </div>

        <div style="display:flex" v-else-if="store.pages.pages > 6 && store.variables.page + 2 >= store.pages.pages">

          <div class="btn">
              <input @change="store.inputPage" type="number" id="inputPage" placeholder="...">
          </div>

          <div v-if="store.variables.page == store.pages.pages - 3" class="btnActive">
            <p class="pActive">{{store.pages.pages - 3}}</p>
          </div>
          <div v-else @click="store.pageAsk(store.pages.pages - 3)" class="btn">
            <p>{{store.pages.pages - 3}}</p>
          </div>

          <div v-if="store.variables.page == store.pages.pages - 2" class="btnActive">
            <p class="pActive">{{store.pages.pages - 2}}</p>
          </div>
          <div v-else @click="store.pageAsk(store.pages.pages - 2)" class="btn">
            <p>{{store.pages.pages - 2}}</p>
          </div>

          <div v-if="store.variables.page == store.pages.pages - 1" class="btnActive">
            <p class="pActive">{{store.pages.pages - 1}}</p>
          </div>
          <div v-else @click="store.pageAsk(store.pages.pages - 1)" class="btn">
            <p>{{store.pages.pages - 1}}</p>
          </div>

        </div>

        <div style="display:flex" v-else-if="store.pages.pages > 6">

          <div @click="store.pageAsk(store.variables.page - 1)" class="btn">
            <p>{{store.variables.page - 1}}</p>
          </div>

          <div class="btnActive">
            <p class="pActive">{{store.variables.page}}</p>
          </div>

          <div @click="store.pageAsk(store.variables.page + 1)" class="btn">
            <p>{{store.variables.page + 1}}</p>
          </div>

          <div class="btn">
              <input @change="store.inputPage" id="inputPage" type="number" placeholder="...">
          </div>

        </div>

        <div v-if="store.variables.page == store.pages.pages" class="btnActive">
          <p class="pActive">{{store.pages.pages}}</p>
        </div>
        <div v-else @click="store.pageAsk(store.pages.pages)" class="btn">
          <p>{{store.pages.pages}}</p>
        </div>
        
        <div @click="store.nextPage" v-if="store.pages.next != null" class="btn">
          <span class="icoActive noselect">arrow_right</span>
        </div>
        <div v-else class="btn">
          <span class="ico noselect">arrow_right</span>
        </div>

      </div>
    </div>
</template>

<script setup lang="ts">
  import { useStore } from "@/stores/dataStore"

  const store = useStore()

</script>


<style scoped>
  @import '@/styles/footer.css';
</style>
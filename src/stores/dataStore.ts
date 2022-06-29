import { defineStore } from 'pinia'
import { request, gql, GraphQLClient } from 'graphql-request'
import { registerRuntimeHelpers } from '@vue/compiler-core'

const endpoint = 'https://rickandmortyapi.com/graphql/'
const client = new GraphQLClient(endpoint)

const nameQuery = gql`
query ($name: String!, $page: Int!){
  characters(page:$page, filter:{name:$name}) {
    info {
      pages
      prev
      next   
    }
    results {
      image
      status
      id
      name
      gender
      species
      episode {
        episode
      }
    }
  }
}`

const idQuery = gql`
query ($id: ID!){
  character (id:$id){
    image
    status
    id
    name
    gender
    species
    episode {
      episode
    }
  }
}`

const episodeQuery = gql`
query ($episode: String!, $page: Int!){
  episodes (page: $page, filter: {episode: $episode}){
    info{
      pages
      prev
      next
    }
    results{
      characters{
        image
        status
        id
        name
        gender
        species
        episode {
          episode
        }
      }
    }
  }
}`

const favQuery = gql`
query ($fav: [ID!]!){
  charactersByIds (ids: $fav) {
    image
    status
    id
    name
    gender
    species
    episode {
      episode
    }   
  }
}`

const idCount = gql`
query {
  characters{
    info{
      count
    }
  }
}`

export const useStore = defineStore("main",{

    state: () => ({

      theme: 'light',
      favActive: false,
      data: [],
      askChoose: "Name",
      variables: {
        maxid: 0,
        ask: "Name",
        page: 1,
        name: "",
        id: 1,
        episode: "S01E01",
        fav: []
      },
      pages: {
        next: 0,
        prev: 0,
        pages: 1
      }

    }),

    getters: {
    },

    actions: {
      getName(){
        client.request(nameQuery, this.variables).then((data) => {
          if((data.characters.results).length == 0){
            alert("characters not found")
          }else{
            this.data = data.characters.results
            this.pages = data.characters.info
            this.scroll()
          }
        })
      },
      getId(){
        client.request(idQuery, this.variables).then((data) => {
          if(data.character == null){
            alert("character not found")
          }else{
            this.pages = {
              next: 0,
              prev: 0,
              pages: 1
            }
            this.data = [data.character] as any
            this.scroll()
          }
        })
      },
      getEpisode(){
        client.request(episodeQuery, this.variables).then((data) => {
          try{
            this.data = data.episodes.results[0].characters
            this.pages = data.episodes.info
            this.scroll()
          }catch{
            alert("episode not found")
          }
        })
      },
      allCharacters(){
        this.favActive = false
        this.ask()
      },
      favorites(){
        if(this.variables.fav.length == 0){
          alert("you don't have any favorit characters")
        }else{
          this.favActive = true
          this.getFav()
        }
      },
      setFavLocal(){
        this.variables.fav = localStorage.getItem('fav')!.split(',') as any
      },
      setFav(){
        localStorage.setItem("fav", this.variables.fav as never)
      },
      addFav(data:number){
        const newArr: any[] = this.variables.fav
        newArr.push(data)
        this.variables.fav = newArr as []
        this.setFav()
      },
      delFav(data:number){
        const newArr = this.variables.fav.filter(item => item !== data)
        this.variables.fav = newArr
        localStorage.setItem("fav", newArr as any)
        if(this.favActive == true){
          this.getFav()
        }
        this.setFav()
      },
      getFav(){
        if(this.variables.fav.length > 0){
          client.request(favQuery, this.variables).then((data) => {
            this.pages = {
              next: 0,
              prev: 0,
              pages: 1
            }
            this.data = data.charactersByIds
          })
        }else{
          this.pages = {
            next: 0,
            prev: 0,
            pages: 1
          }
          this.data = []
        }
      },
      getIdCount(){
        client.request(idCount).then((data) => {
          this.variables.maxid = data.characters.info.count
        })
      },
      askName(){
        this.askChoose = "Name"
      },
      askIdentifier(){
        this.askChoose = "Identifier"
      },
      askEpisode(){
        this.askChoose = "Episode"
      },
      scroll(){
        const scroll = document.getElementById('scroll') as HTMLFormElement
        scroll.scrollTop = 0
      },
      nextPage(){
        this.variables.page ++
        this.ask()
      },
      prevPage(){
        this.variables.page --
        this.ask()
      },
      inputPage(){
        const data = (document.getElementById('inputPage') as HTMLFormElement).value
        if(data >= 1 && data <= this.pages.pages){
          this.variables.page = parseInt(data)
          this.ask()
        }else{
          alert("type a page from the range 1-" + this.pages.pages)
        }
        (document.getElementById('inputPage') as HTMLFormElement).value = null
      },
      newAsk(){
        const now = {...this.variables}
        this.variables.ask = this.askChoose
        const data = (document.getElementById('input') as HTMLFormElement).value
        if(this.variables.ask == 'Name'){
          this.variables.name = data
          this.variables.page = 1
          client.request(nameQuery, this.variables).then((data) => {
            if((data.characters.results).length == 0){
              this.variables = now
              alert("characters not found")
            }else{
              this.data = data.characters.results
              this.pages = data.characters.info
              this.scroll()
              this.favActive = false
            }
          })
        }else if(this.variables.ask == 'Identifier'){
          if(data>=1 && data<=this.variables.maxid){
            this.variables.id = data
            this.variables.page = 1
            client.request(idQuery, this.variables).then((data) => {
              if(data.character == null){
                this.variables = now
                alert("character not found")
              }else{
                this.pages = {
                  next: 0,
                  prev: 0,
                  pages: 1
                }
                this.data = [data.character] as any
                this.scroll()
                this.favActive = false
              }
            })
          }else{
            alert("enter an id in the range 1-"+ this.variables.maxid)
            this.variables = now
          }
        }else if(this.variables.ask == 'Episode'){
          if(data.length == 6 && data[0] == "S" && isNaN(data[1]) == false && isNaN(data[2]) == false && data[3] == "E" && isNaN(data[4]) == false && isNaN(data[5]) == false){
            this.variables.episode = data
            this.variables.page = 1
            client.request(episodeQuery, this.variables).then((data) => {
              try{
                this.data = data.episodes.results[0].characters
                this.pages = data.episodes.info
                this.scroll()
                this.favActive = false
              }catch{
                this.variables = now
                alert("episode not found")
              }
            })
          }else{
            alert("enter an episode in format S{number}{number}E{number}{number}")
            this.variables = now
          }
        }
        (document.getElementById('input') as HTMLFormElement).value = null
      },
      pageAsk(page:number){
        console.log(page)
        this.variables.page = page
        this.ask()
      },
      ask(){
        this.favActive = false
        if(this.variables.ask == 'Name'){
          this.getName()
        }else if(this.variables.ask == 'Identifier'){
          this.getId()
        }else if(this.variables.ask == 'Episode'){
          this.getEpisode()
        }
      },
      setMode(){
        this.theme = localStorage.getItem('theme') as string
      },
    }
})
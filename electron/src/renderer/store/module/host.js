import Vue from 'vue'

const state = {
  hosts:[],
  hostContent:[],
  page:[]
}

const mutations = {
  'GET_HOSTS'(state,hosts){
    state.hosts = hosts
  },
  'GET_PAGE'(state,page){
    state.page = page
  },
  'GET_HOSTCONTENT'(state,hostContent){
    state.hostContent = hostContent
  },
  // 'INIT_HOSTCONTENT'(state,hostContent){
  //   state.hostContent = []
  // },
  'DEL_HOST'(state,index){
    state.hosts.splice(index,1)
  },
  'DEL_HOSTCONTENT'(state,index){
    state.hostContent.content.splice(index,1)
  }
}

const actions = {
  getHosts(store,pageid){
    Vue.axios.get('hosts?page='+pageid).then(response =>{
      store.commit('GET_HOSTS',response.data.data)
      store.commit('GET_PAGE',response.data.meta.pagination)
    })
  },
  getMyHosts(store,pageid){
    Vue.axios.get('myhost?page='+pageid).then(response =>{
      store.commit('GET_HOSTS',response.data.data)
      store.commit('GET_PAGE',response.data.meta.pagination)
    })
  },
  getHostSearch(store,keyword){
    Vue.axios.get('hostsearch/'+keyword).then(response =>{
      store.commit('GET_HOSTS',response.data.data)
      store.commit('GET_PAGE',response.data.meta.pagination)
    })
  },
  getHostContent(store,id){
    Vue.axios.get('hosts/'+id).then(response =>{
      store.commit('GET_HOSTCONTENT',response.data.data)
    })
  },
  // initHostContent(store){
  //   store.commit('INIT_HOSTCONTENT')
  // },
  createHost(store,host){
    Vue.axios.post('hosts',{
      title:host[1].title,
      hostcontent:host[2].content
    }).then(response =>{
      console.log(response.data)
    })
  },
  editHost(store,host){
    Vue.axios.patch('hosts/'+host[0].id,{
      title:host[1].title,
      hostcontent:host[2].content
    }).then(response=>{
      console.log(response.data)
    })
  },
  delHost(store,host){
    Vue.axios.delete('hosts/'+host.id).then(response=>{
      store.commit('DEL_HOST',host.index)
    })
  },
  delHostContent(store,hostcontent){
    Vue.axios.delete('hostdetails/'+hostcontent.id).then(response=>{
      store.commit('DEL_HOSTCONTENT',hostcontent.index)
    })
  }
}

export default {
  state,
  mutations,
  actions
}
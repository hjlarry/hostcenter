<template>
    <div class="panel panel-default">
        <div class="panel-heading">
            <div class="form-group">
                <input type="text" v-model="hosttitle" class="form-control" placeholder="Host title">
            </div>
        </div>
        <div class="panel-body">
            <div class="form-group" v-for="(hostcontent,index) in hostcontents">
                <div class="input-group" >
                    <input type="text" v-model="hostcontent.record" class="form-control" @keyup.enter="add">
                    <span class="input-group-btn">
                    <button class="btn btn-danger" type="button" @click="del(hostcontent,index)">Delete</button>
                </span>
                </div>
            </div>

            <div class="form-group">
                <button class="btn btn-success pull-left" @click="add">
                    <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
                </button>
                <button class="btn btn-primary pull-right" @click="submit">Submit</button>
            </div>
        </div>

    </div>
</template>
<script>
    export default{
      data(){
        return{
          hosttitle:'',
          hostcontents: [],
        }
      },
      created(){
        this.fetchData()
      },
      watch:{
        '$route' : 'fetchData'
      },
      computed:{
        host(){
          return [
              {id: this.$store.state.host.hostContent.id},
              {title: this.hosttitle},
              {content: this.hostcontents},
          ]},
      },
      methods:{
        submit(){
          if (this.$route.path == '/newhost'){
            this.$store.dispatch('createHost',this.host)
          }else {
            this.$store.dispatch('editHost',this.host)
          }

          this.$router.push({
            path: '/myhost'
          })
        },
        add(){
          console.log(this.hostcontents)
          this.hostcontents.push({
            'id':0,
            'record':''
          })
        },
        del(hostcontent,index){
          hostcontent.index = index
          this.$store.dispatch('delHostContent',hostcontent)
        },
        fetchData(){
          if (this.$route.params.id){
            this.axios.get('hosts/'+this.$route.params.id).then(response =>{
              this.$store.commit('GET_HOSTCONTENT',response.data.data)
              this.hosttitle = this.$store.state.host.hostContent.title
              console.log(this.hosttitle)
              this.hostcontents = this.$store.state.host.hostContent.content
            })
          }else{
            this.hosttitle = ''
            this.hostcontents = []
            this.add()
          }

        }
      }
    }
</script>
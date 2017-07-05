<template>
    <div class="panel panel-default">
      <div class="panel-heading">
        <div class="btn btn-success" @click="addLocalHost">
          Add to local
        </div>
        <div class="btn btn-success" @click="replaceLocalHost">
          Replace to local
        </div>
          <router-link :to="{ name: 'Newhost'}" v-if="isMyHost">
              <div class="btn btn-success pull-right ">
                  <span class="glyphicon glyphicon-plus" aria-hidden="true" style="color:#FFF;"></span>
              </div>
          </router-link>
          <div class="btn-group pull-right" v-if="!isMyHost">
              <a id="list" class="btn btn-default btn-sm" @click="listview" :class="view=='list-group-item' ? 'active' : ''"><span class="glyphicon glyphicon-th-list">
            </span></a> <a id="grid" class="btn btn-default btn-sm" @click="gridview" :class="view=='grid-group-item' ? 'active' : ''"><span
                  class="glyphicon glyphicon-th"></span></a>
          </div>
      </div>

        <div class="panel-body">
            <div>
                <host v-for="(host,index) in hosts" :host="host" :index="index" :key="host.id" @check="check" :view="view" :editable="isMyHost"></host>
            </div>
        </div>
        <div class="panel-footer">
            <nav aria-label="...">
                <ul class="pager">
                    <li class="previous" :class="disablePre"><a @click="toPrevious()"><span aria-hidden="true">&larr;</span> Previous</a></li>
                    <li class="next" :class="disableNext"><a @click="toNext()">Next <span aria-hidden="true">&rarr;</span></a></li>
                </ul>
            </nav>
        </div>
    </div>
</template>
<script>

  import Host from './Host.vue'
  import fs from 'fs'
  export default {
    data(){
      return{
        checked:[],
        localhost:'',
        view:'list-group-item'
      }
    },
    watch:{
      '$route':'fetchData'
    },
    created(){
        this.fetchData()
    },
    components:{
      Host:Host
    },
    computed:{
      isMyHost(){
        return this.$route.name === 'MyHost'
      },
      hosts(){
        return this.$store.state.host.hosts
      },
      disablePre(){
        if(this.$store.state.host.page.current_page == 1){
          return 'disabled'
        }
        return null
      },
      disableNext(){
        if(this.$store.state.host.page.current_page == this.$store.state.host.page.total_pages){
          return 'disabled'
        }
        return null
      },
      filepath(){
        return process.platform === 'win32' ? 'C:\\Windows\\System32\\drivers\\etc\\hosts' : '/etc/hosts'
      }
    },
    methods:{
      fetchData(){
        this.isMyHost ? this.$store.dispatch('getMyHosts',0) : this.$store.dispatch('getHosts',0)
      },
      toPrevious(){
        this.$store.dispatch('getHosts',this.$store.state.host.page.current_page-1)
      },
      toNext(){
        if (this.disableNext == null){
          console.log(this.$store.state.host.page.current_page+1)
          this.$store.dispatch('getHosts',this.$store.state.host.page.current_page+1)

        }
      },
      check(data){
        var index = this.checked.indexOf(data)
        index == -1 ? this.checked.push(data) : this.checked.splice(index,1)
      },

      replaceLocalHost(){
        if (this.checked.length == 0){
          alert('Please choose atleast one host')
          return ;
        }
          this.axios.get('hosts/'+this.checked.toString()+'/get').then(response =>{
            var self = this
            response.data.host_details.forEach(function(val,index,arr){
              self.localhost += val.record+'\n'
            })
            fs.writeFile(this.filepath, this.localhost, (err) => {
              if (err) throw err;
              alert('Modify Successed!');
            });
          })
      },
      addLocalHost(){
        var self = this
        fs.readFile(self.filepath,'utf8',function(err,data){
          window.localhost = data;
          self.localhost = window.localhost + '\n';
          self.replaceLocalHost();
        });

      },
      listview(){
        this.view = 'list-group-item'
      },
      gridview(){
        this.view = 'grid-group-item'
      }

    }
  }

</script>

<style>
    .panel{
        text-align: left;
    }
    ul.listgroup{
        -webkit-padding-start:0;
    }
    a:hover{
        cursor: pointer;
    }
</style>

<template>
    <nav class="navbar navbar-inverse">
        <div class="navbar-header">
            <router-link to="/" class="navbar-brand">HostCenter</router-link>
        </div>
        <div class="collapse navbar-collapse">
            <ul class="nav navbar-nav">
                <router-link to="/localhost" tag="li" activeClass="active"><a>LocalHost</a></router-link>
                <router-link to="/hosts" tag="li" activeClass="active"><a>PublicHost</a></router-link>
                <router-link to="/myhost" tag="li" activeClass="active"><a>MyHost</a></router-link>
                <!--<router-link to="/download" tag="li" activeClass="active"><a>Download</a></router-link>-->
                <form class="navbar-form navbar-left">
                    <div class="input-group">
                        <input type="text" class="form-control" placeholder="Search" v-model="keywords" @click="redirect" @keyup.enter="search()">
                        <span class="input-group-addon searchBtn" @click="search()"><span class="glyphicon glyphicon-search" aria-hidden="true"></span></span>
                    </div>
                </form>

            </ul>
            <ul class="nav navbar-nav navbar-right" v-if="!islogin">
                <router-link to="/register" tag="li" activeClass="active"><a>Register</a></router-link>
                <router-link to="/login" tag="li" activeClass="active"><a>Login</a></router-link>
            </ul>
            <ul class="nav navbar-nav navbar-right" v-if="islogin">
                <li><a @click="logout">LogOut</a></li>
            </ul>
        </div>
    </nav>
</template>

<script>
export default{
  data(){
    return{
      keywords:''
    }
  },
  computed:{
    islogin(){
      return this.$store.state.auth.token
    }
  },
  methods:{
    logout(){
      let redirect = decodeURIComponent(this.$route.query.redirect || '/');
      this.$store.dispatch('logout')
      this.$router.push({
        path: redirect
      })
    },
    redirect(){
      this.$router.push({
        path: '/hosts'
      })
    },
    search(){
      if (this.keywords == ''){
        alert('Please type keywords')
      }
      this.$store.dispatch('getHostSearch',this.keywords)
    }

  }
}
</script>

<style>
    span.searchBtn:hover{
        cursor: pointer;
    }
</style>

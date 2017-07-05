<template>
    <div class="panel">
        <div class="box">
            <div class="form-group">
                <div class="input-group">
                    <span class="input-group-addon"><span class="glyphicon glyphicon-envelope"></span></span>
                    <input type="email" class="form-control" v-model="user.email" placeholder="Email" />
                </div>

            </div>
            <div class="form-group">
                <div class="input-group">
                    <span class="input-group-addon"><span class="glyphicon glyphicon-lock"></span></span>
                    <input type="password" class="form-control" v-model="user.password" placeholder="Password" @keyup.enter="login" />
                </div>

            </div>
            <div class="form-group">
                <button class="btn btn-primary btn-flat btn-block" @click="login">Login</button>
            </div>
        </div>
    </div>

</template>
<script>
  export default{
    data(){
      return{
        user:{
          email:'',
          password:''
        }
      }
    },
    methods:{
      login(){
        let redirect = decodeURIComponent(this.$route.query.redirect || '/');
        this.$store.dispatch('login',this.user)
        this.$router.push({
          path: redirect
        })
      }
    }
  }
</script>
<style>

</style>
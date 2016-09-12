<template>
  <div id="app">
   <loading :loading="loading" :msg="msg" >
</loading>
  <router-view></router-view>
  </div>
</template>

<script>
    import loading from './components/loading.vue'


    export default {
        replace: false,
        components: {
            loading
        },
        data() {
            return {
                loading: false,
                msg: ''
            }
        },
        events: {
            'loading': function(msg) {
                this.loading = true
                this.msg = msg
            },
            'loaded': function() {
                this.loading = false
                this.msg = ''
            }
        }
    }
</script>

<style>
    @import 'https://fonts.googleapis.com/css?family=Open+Sans';
    @import './style/tooltip.css';
    @import './style/loading.css';
    @import '../node_modules/sweetalert/dist/sweetalert.css';
</style>
<style lang="scss">
    @import "../node_modules/bootswatch-scss/flatly/_variables";
    @import './style/variables.scss';
    @import "../node_modules/bootstrap-sass/assets/stylesheets/bootstrap/_variables";
    $icon-font-path: "../node_modules/bootstrap-sass/assets/fonts/bootstrap/";
    @import '../node_modules/bootstrap-sass/assets/stylesheets/_bootstrap';
    @import "../node_modules/bootswatch-scss/flatly/_bootswatch";
    @import './style/admin.scss';
    @import '../node_modules/font-awesome/css/font-awesome.min.css';
</style>
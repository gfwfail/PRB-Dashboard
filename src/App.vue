<template>
  <div id="app">
  <router-view></router-view>
  </div>
</template>

<script>
    export default {
        replace: false,
        components: {

        }
    }
</script>

<style>
    @import 'https://fonts.googleapis.com/css?family=Open+Sans';
    @import './style/tooltip.css';
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
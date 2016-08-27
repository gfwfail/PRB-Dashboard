<template>
    <nav class="navbar">
          
            <ul class="nav nav-top">
              <li><a  v-link="{path:'/app',exact:true}"> <i class="fa fa-home"></i> Home</a></li>
              <li><a v-link="{path:'/app/survey'}"> <i class="fa fa-wpforms"></i> Surveys</a></li>
                            <li><a v-link="{path:'/app/contact'}"> <i class="fa fa-book"></i> Contacts</a></li>

             <li><a href="#"> <i class="fa fa-bar-chart"></i> Reports</a></li>
              <li class="pull-right"><a href="#"> <img height=30 width=30 src="../assets/avatar.jpeg" style="border:solid 2px #ddd;margin-right:20px;margin-top:-4px;" class="pull-left img-circle"> <i class="fa fa-sign-out"></i> Log out</a></li>
           

            </ul>
   
        
    
      </nav>
     <div class="wrapper">

     

        <!-- Page Content -->
        <div id="page-wrapper">
            <div class="container-fluid">
                <router-view></router-view>
                <!-- /.row -->
            </div>
            <!-- /.container-fluid -->
        </div>
        <!-- /#page-wrapper -->
        <hr>
        <div class="col-lg-12">

        </div>
    </div>
    <div style="margin:30px;text-align:center;color:#666">
        <footer>&copy;2016 Powered by TeamT</footer>
    </div>
</template>
<script>
    import menu from '../components/menu.vue'
    export default {
        data() {
                return {
                    menus: [{
                        'name': 'Dashboard',
                        'icon': 'dashboard'
                    }, {
                        'name': 'Surveys',
                        'icon': 'form'
                    }]
                }
            },
            methods: {

            },
            components: {
                menu
            }
    }
</script>
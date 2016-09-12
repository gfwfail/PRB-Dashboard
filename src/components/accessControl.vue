<template>
   <div style="position: relative;display: inline-block;vertical-align: middle;">
 <button @mousedown="show=!show"  class="btn btn-sm btn-primary">  {{typeStr[type]}}  <span class="caret"></span> </button>
               <ul transition="fade" v-if="show" class="dropdown-menu" style="display:block;max-width:130px;">
                    <li><a @click="setType(0)"><i v-show="type==0" class="fa fa-check"></i> All </a> </li>
                    <li><a @click="setType(1)"><i v-show="type==1" class="fa fa-check"></i> Security Question</a></li>
                    <li><a @click="setType(2)"><i v-show="type==2" class="fa fa-check"></i> Registered Users</a></li>
                     </ul>
</div>       
</template>

<script>
    export default {
        data() {
                return {
                    show: false,
                    typeStr: ['All', 'Security Question', 'Registered User']
                }
            },
            ready() {
                if (!this.type) {
                    this.type = 0
                }
            },
            methods: {
                setType(t) {
                    console.log(t)
                    this.show = false
                    this.type = t
                }
            },
            props: {
                'type': {
                    twoWay: true
                }
            }
    }
</script>

<style scoped>
    a {
        font-size: 12px;
    }
</style>
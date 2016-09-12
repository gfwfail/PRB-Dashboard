<template>
   <div style="position: relative;display: inline-block;vertical-align: middle;">
 <button @mousedown="show=!show" class="btn btn-sm btn-primary"> Type: {{type}}  <span class="caret"></span> </button>
               <ul  transition="fade" v-if="show" class="dropdown-menu" style="display:block;max-width:130px;">
                    <li @click="setType('TrueFalse')"><a @click="setType('TrueFalse')"><i v-show="type=='TrueFalse'" class="fa fa-check"></i> True/False</a> </li>
                    <li><a  @click="setType('Slider')"><i v-show="type=='Slider'" class="fa fa-check"></i> Slider</a></li>
                    <li><a @click="setType('Selection')"><i v-show="type=='Selection'" class="fa fa-check"></i> Selection</a></li>
                    <li><a  @click="setType('OpenQuestion')"><i v-show="type=='OpenQuestion'" class="fa fa-check"></i> OpenQuestion</a></li>
                     </ul>
</div>       
</template>

<script>
    export default {
        data() {
                return {
                    show: false
                }
            },
            ready() {
                if (!this.type) {
                    this.type = 'TrueFalse'
                }
            },
            methods: {
                setType: function(t) {

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
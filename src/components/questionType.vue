<template>
   <div style="position: relative;display: inline-block;vertical-align: middle;">
 <button @mousedown="show=!show" @blur="show=false" class="btn btn-sm btn-primary"> Type: {{type}}  <span class="caret"></span> </button>
               <ul transition="fade" v-if="show" class="dropdown-menu" style="display:block;max-width:130px;">
                    <li><a @click="setType('TrueFalse')"><i v-show="type=='TrueFalse'" class="fa fa-check"></i> True/False</a> </li>
                    <li><a  @click="setType('Slider')"><i v-show="type=='Slider'" class="fa fa-check"></i> Slider</a></li>
                    <li><a @click="setType('Selection')"><i v-show="type=='Selection'" class="fa fa-check"></i> Selection</a></li>
                    <li><a  @click="setType('Open Question')"><i v-show="type=='Open Question'" class="fa fa-check"></i> Open Question</a></li>
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
                setType(t) {

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
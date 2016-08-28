<template>
   <div style="position: relative;display: inline-block;vertical-align: middle;">
                                                      <button @mousedown="show=!show" @blur="show=false" class="btn btn-primary"><i class="fa fa-plus"></i> Add Question  <span class="caret"></span> </button>
        <ul transition="fade" v-if="show" class="dropdown-menu" style="display:block">
                    <li><a @click="setType('TrueFalse')">True/False</a></li>
                    <li><a  @click="setType('Slider')">Slider</a></li> 
                    <li><a @click="setType('Selection')">Selection</a></li> 
                    <li><a  @click="setType('Open Question')">Open Question</a></li>
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
                if (!this.section.questions) {
                    this.section.questions = []
                }
            },
            methods: {
                setType(t) {
                    var newQuestion = {
                        description: 'New question #' + (parseInt(this.section.questions.length) + 1),
                        type: t
                    }
                    this.section.questions.push(newQuestion)
                    this.callback()
                }
            },
            props: {
                section: {
                    type: Object,
                    twoWay: true
                },
                callback: {
                    type: Function
                }
            }
    }
</script>
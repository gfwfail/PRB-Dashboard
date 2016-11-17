<template>
     <div class="row">
                    <div class="col-lg-12">
                        <h1 class="page-header">Survey
<a class="pull-right btn btn-success" @click="print()" data-balloon="Click here to print this page" data-balloon-pos="left"><i class="fa fa-print"></i>  Print</a>

                        </h1>

                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12">
                       
<hr>
<div class="row">
      <div class="col-md-3">
            <ul class="nav nav-pills nav-stacked">
                <li v-for="section  in survey.survey"
                    track-by="$index" :class="{'active':currentSection==$index}">
                    <a @click.self="changeSection($index)">
                        {{section.name}} <span class="badge" v-show="section.questions&&section.questions.length>0">{{section.questions?section.questions.length:0}}</span>

                    </a>
                </li>

            </ul>

        </div>
         <div v-show="!section[currentSection].name" class="col-md-9">
             <p>Please select a section on the left to view</p>
         </div>
         <div class="col-md-9">
            <div class="row" v-for="question in survey.survey[currentSection].questions" style="margin-top:20px;" track-by="$index">
                <div class="col-md-2 text-center">
                    <button type="button" class="btn btn-primary btn-circle btn-lg">
                                        Q.{{$index+1}} 

                    </button>

                </div>
                <div class="col-md-10 arrow_box" style="background:#fafafa;border-radius:10px;padding:10px;">
                {{question.description}}
                <br><small class="text-muted">{{question.type}}</small>
               <br>
                <chart v-if="question.type!='OpenQuestion'" :data="getData(currentSection,$index)" :slider="question.type=='Slider'"></chart> 
                <text-cloud v-else :cloud-text="survey.answer[currentSection][$index].cloud"></text-cloud>
                </div>
                <hr>
            </div>
         </div>
</div>
   
                    </div>
                </div>
</template>
<script>
    import {
        SurveyResource,
        AnswerResource,
        API_URL
    } from '../config.js'

    import _ from 'lodash'

    import chart from '../components/chart.vue'
    import textCloud from '../components/textCloud.vue'
    export default {
        data() {
            return {
                survey: null,
                filterStatus: 0,

                currentSection: {
                    name: ''
                },
                adding: false,
                inputFocus: -1,
                mouseHover: -100,
            }
        },
        ready() {
            var id = this.$route.params.id

            var self = this
            self.$dispatch('loading', 'Loading')
            AnswerResource.get({
                'id': id
            }).then((res) => {
                self.survey = res.data
                self.$dispatch('loaded')

            }, (err) => {
                self.$dispatch('loaded')

            })
        },
        computed: {
            filteredSurveys: function() {
                return this.$options.filters.filterBy(this.surveys, this.userFilter);
            }
        },
        methods: {
            print() {
                return window.print()
            },
            api_url() {
                return API_URL;
            },
            changeSection(i) {
                this.currentSection = i
                var self = this
                this.$nextTick(function() {
                    self.$broadcast('refresh_chart')
                })


            },
            getData(section_id, answer_id) {
                section_id = section_id + 0
                let ans = this.survey.answer[section_id][answer_id]
                let ret = {}


                ret.labels = _.keys(ans)

                ret.data = _.values(ans)
                console.log(section_id)
                console.log(ans)
                return ret
            }
        },
        components: {
            chart,
            textCloud
        }
    }
</script>
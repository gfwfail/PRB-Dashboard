<template>
     <div class="row">
                    <div class="col-lg-12">
                        <h1 class="page-header">Survey
<a class="pull-right btn btn-success" v-link="{path:'/app/survey/create'}" data-balloon="Click here to print this page" data-balloon-pos="left"><i class="fa fa-print"></i>  Print</a>

                        </h1>

                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12">
                       
<hr>
<div class="row">
      <div class="col-md-3">
            <ul class="nav nav-pills nav-stacked">
                <li v-for="section in survey.survey"
                    track-by="$index" :class="{'active':currentSection==section}">
                    <a @click.self="currentSection=section">
                        {{section.name}} <span class="badge" v-show="section.questions&&section.questions.length>0">{{section.questions?section.questions.length:0}}</span>

                    </a>
                </li>

            </ul>

        </div>
         <div v-show="!currentSection.name" class="col-md-9">
             <p>Please select a section on the left to view</p>
         </div>
         <div v-show="currentSection" class="col-md-9">
            <div class="row" v-for="question in currentSection.questions" style="margin-top:20px;" track-by="$index">
                <div class="col-md-2 text-center">
                    <button type="button" class="btn btn-primary btn-circle btn-lg">
                                        Q.{{$index+1}}

                    </button>

                </div>
                <div class="col-md-10 arrow_box" style="background:#fafafa;border-radius:10px;padding:10px;">
                {{question.description}}
                <br><small class="text-muted">{{question.type}}</small>
               <br>
                <chart></chart>
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
        SurveyResource
    } from '../config.js'

    import chart from '../components/chart.vue'
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
                SurveyResource.get({
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

            },
            components: {
                chart
            }
    }
</script>
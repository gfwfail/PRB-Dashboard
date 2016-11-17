<template>
     <div class="row">
                    <div class="col-lg-12">
                        <h1 class="page-header">Survey
<a class="pull-right btn btn-success" v-link="{path:'/app/survey/create'}" data-balloon="Click here to create a survey" data-balloon-pos="left"><i class="fa fa-plus"></i> Create a Survey</a>

                        </h1>

                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <div class="btn-group" role="group" >
  <button type="button" class="btn btn-sm btn-primary" v-for="status in allStatus" @click="filterStatus=$index" :class="{'active':$index==filterStatus}" track-by="$index">{{status}}</button>


</div>
<hr>
                        <table class="table table-hover table-striped">
    <thead>
      <tr>
        <th width="10%">ID #</th>
        <th>Name</th>
                <th width="10%">Done</th>
                 <th>Start at</th>
                   <th>End at</th>
        <th>Created at</th>
<th  class="text-right">Action</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="survey in filteredSurveys" track-by="$index">
        <td>{{survey.id}}</td>
        <td> <a href="http://hr.man.land/{{survey.slug}}" target="_blank"> {{survey.name}}<br> <small class="text-muted">{{survey.slug}}</small>
        </a></td>
        <td>{{parseInt(Math.random()*100)}}</td>
        <td> {{survey.start_at}}</td>
        <td> {{survey.end_at}}</td>
        <td> {{survey.created_at| moment "from" "now" true}}</td>
        <td align="right"> 

            <button class="btn btn-sm btn-primary"  v-link="{ path :'/app/survey/edit/'+survey.id}">Edit</button>
                        <a class="btn btn-sm btn-primary" v-link="{ path :'/app/survey/report/'+survey.id}">Report</a>
            <button class="btn btn-sm btn-success"  @click="share(survey.slug)">Send</button>

            <button class="btn btn-sm btn-danger" data-balloon="This action is unrecoverable!!" data-balloon-pos="down" >Delete</button>
            
        </td>
        
      </tr>
   
      
    </tbody>
  </table>
     <div v-if="filteredSurveys.length == 0">
  <p>Sorry, no survey matched.</p>
        </div>
                    </div>
                </div>
</template>
<script>
    import {
        SurveyResource
    } from '../config.js'

    export default {
        data() {
            return {
                surveys: null,
                filterStatus: 0,
                allStatus: ['All', 'Not started', 'In progress', 'Expired']
            }
        },
        ready() {
            var self = this
            self.$dispatch('loading', 'Loading')
            SurveyResource.get().then((res) => {
                self.surveys = res.data
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
            send(slug, recipients) {
                var postdata = {
                    "link": "http://hr.man.land/" + slug,
                    "to": recipients.split(',')
                }

                this.$http.post(
                    'http://54.206.36.27/api/sendlink', postdata).then(function(response) {
                    swal("Nice!", "Link sent to " + response.data.count + " users", "success");
                }, function(err) {
                    swal(":(", "Something wrong", "error");

                })

            },
            share(slug) {
                var self = this
                swal({
                    title: "Recipients",
                    text: "Please input recipients' Email or Phone number,split by comma(,)",
                    type: "input",
                    showCancelButton: true,
                    closeOnConfirm: false,
                    animation: "slide-from-top",
                    inputPlaceholder: "Email or Phone number"
                }, function(inputValue) {
                    if (inputValue === false) return false;
                    if (inputValue === "") {
                        swal.showInputError("You need to write something!");
                        return false
                    }

                    self.send(slug, inputValue)
                    return true
                });
            },
            userFilter(val) {
                if (this.filterStatus == 0) {
                    return true
                }
                if (this.filterStatus == 1) {
                    return val.status == -1
                }
                if (this.filterStatus == 2) {
                    return val.status == 0
                }
                if (this.filterStatus == 3) {
                    return val.status == 1
                }

            }
        }
    }
</script>
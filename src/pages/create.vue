<template>

<modal :show.sync="adding"  effect="fade" :backdrop="false" ok-text="Save">
  <div slot="modal-header" class="modal-header">
    <h4 class="modal-title">Save survey</h4>
  </div>
  <div slot="modal-body" class="modal-body">
  </div>
</modal>

    <div class="row">
        <div class="col-lg-12">
            <h1 class="page-header">New survey</h1>
        </div>
    </div>
    <div class="row">

        <div class="col-md-3">


            <button class="btn btn-primary" @click="addSection()"><i class="fa fa-plus"></i> Add Section</button>
        </div>
                <div class="col-md-6">
                      <input placeholder="Name of this survey" id="survey-name" class="form-control"   v-model="survey.name"> 
                    
                    
                </div>
        <div class="col-md-3">
                                      
            <a class="pull-right btn btn-success" @click="saveSurvey()"><i class="fa fa-save"></i> Save</a>
           
        </div>
    </div>

<hr>
   <div class="row">
                        
                           <div class="col-md-3">
                               <label for="">
                                     Start Date 
                               </label>
                         <datepicker :value.sync="survey.start_at" width="120px" :disabled-days-of-week="disabled" format="dd/MM/yyyy" >
</datepicker>
                          </div>
                        
                           <div class="col-md-3">
                                <label for="">
                                     End Date 
                               </label>
                                <datepicker :value.sync="survey.end_at"  width="120px" :disabled-days-of-week="disabled" format="dd/MM/yyyy" >
</datepicker>
                          </div>
                          
                           <div class="col-md-2">
                            <span :class="{'text-danger':period<=0}"> {{period}} Days to complete </span> 
                         </div>
                         <div class="col-md-4">
                                   Who can access the survey: <access-control :access.sync="survey.access"></access-control>
                         </div>
                      </div>
                      <hr>
    <div class="row">
        <div class="col-md-3">
            <ul class="nav nav-pills nav-stacked">
                <li v-for="section in survey.sections" @mouseover="mouseHover=$index" @mouseout="mouseHover=-1"
                    track-by="$index" :class="{'active':currentSection==section}">
                    <a @click.self="currentSection=section">
                        {{section.name}} <span class="badge" v-show="section.questions&&section.questions.length>0">{{section.questions?section.questions.length:0}}</span>

                    </a>
                    <button style="position:absolute;top:40%;right:3px;" transition="fade"
                            @click.prevent="removeSection(section)" v-show="mouseHover==$index"
                            class="btn btn-xs btn-danger"><i class="fa fa-remove"></i></button>
                </li>

            </ul>

        </div>
        <div v-show="currentSection" class="col-md-9" style="background:#fafafa;padding:10px;">
            <div class="row">
                <div class="col-md-9">
                    <section-name v-if="currentSection&&currentSection.name"
                                  :name.sync="currentSection.name"></section-name>

                </div>
                <div class="col-md-3">
                    <div style="margin:10px;" class="text-right">

                        <add-question
                                v-show="currentSection&&currentSection.questions&&currentSection.questions.length>0"
                                :callback="focusLastQuestion" :section.sync="currentSection"></add-question>

                    </div>


                </div>
            </div>

            <div v-show="currentSection&&currentSection.questions&&currentSection.questions.length>0"
                 class="text-center" style="margin-top:20px;margin-bottom:200px;">
                <div class="row" v-for="question in currentSection.questions" track-by="$index" transition="item">
                    <div class="col-md-12 text-left">

                        <div :class="{'focused':inputFocus==$index}" class="panel question panel-primary"
                             v-drag-and-drop drop="handleDrop" id="{{ $index }}">

                            <div class="panel-body">
                                <span class="text-muted small" style="position:absolute;top:10px;left:30px;"> #{{$index+1}} </span>

                                <div class="col-md-12">

                                         <textarea @focus='inputFocus=$index' @blur="inputFocus=-100" type="text"
                                                   name="{{'question-'+$index}}" class="form-control question-control"
                                                   v-model="question.description"> 
                                         </textarea>
                                </div>

                            </div>
                            <div class="panel-footer text-right">
                                <i class="fa fa-arrows pull-left" style="margin-top:.5em;opacity:0.6;"></i>
                                <question-type class="pull-left" :type.sync="question.type"></question-type>

                                <button class="btn btn-sm btn-primary" @click="duplicateQuestion($index)">Duplicate
                                </button>

                                <button style="margin-left:3px" data-balloon="This action is unrecoverable!!"
                                        data-balloon-pos="down" @click="deleteQuestion(question)"
                                        class="btn btn-sm btn-danger">Delete
                                </button>

                            </div>
                        </div>
                    </div>
                </div>
                <div style="margin-top:40px;">
                    <add-question :callback="focusLastQuestion" :section.sync="currentSection"></add-question>
                </div>
            </div>
            <div v-show="!currentSection||!currentSection.questions||currentSection.questions.length==0"
                 class="text-center" style="margin-top:100px;margin-bottom:200px;">

                <img src="../assets/empty.png" height=100 alt="">
                <br> <br>

                No question has been added to this section yet~
                <br><br>

                <div id="sticky-area">
                    <add-question :callback="focusLastQuestion" :section.sync="currentSection"></add-question>
                </div>

            </div>


        </div>
    </div>


</template>

<script>
    import addQuestion from '../components/addQuestion.vue'
    import sectionName from '../components/sectionName.vue'
    import questionType from '../components/questionType.vue'
    import datepicker from '../components/datepicker.vue'
    import accessControl from '../components/accessControl.vue'

    import {
        modal
    } from 'vue-strap'


    export default {
        ready() {
                this.reset()
                $("#sticky-area").sticky({
                    topSpacing: 0,
                    zIndex: 99999
                });

                $('#survey-name').focus()

            },
            components: {
                
                addQuestion,
                sectionName,
                questionType,
                datepicker,
                accessControl,
                modal

            },
            methods: {
                saveSurvey() {
                    this.adding = true
                },
                focusLastQuestion() {
                    this.focusOnQuestion(this.currentSection.questions.length - 1)
                },
                duplicateQuestion(index) {
                    var dummy = this.currentSection.questions[index]
                    this.currentSection.questions.splice(index, 0, Object.assign({}, dummy))

                    this.focusOnQuestion(index + 1)



                },
                focusOnQuestion(index) {

                    this.$nextTick(function() {
                        $("textarea[name='question-" + index + "']").focus()

                    })
                },
                deleteQuestion(question) {
                    this.currentSection.questions.$remove(question)
                },
                handleDrop(itemOne, itemTwo) {
                    var first = this.findUpId(itemOne)
                    var second = this.findUpId(itemTwo)

                    console.log(first)
                    console.log(second)

                    var questionOne = Object.assign({}, this.currentSection.questions[first]);
                    var questionTwo = Object.assign({}, this.currentSection.questions[second]);
                    console.log(questionOne)
                    console.log(questionTwo)


                    this.currentSection.questions.$set(parseInt(first), questionTwo);
                    this.currentSection.questions.$set(parseInt(second), questionOne);



                },
                findUpId(el, id) {
                    if (el.id) {
                        return el.id;
                    }
                    while (el.parentNode) {
                        el = el.parentNode;
                        if (el.id)
                            return el.id;
                    }
                    return null;
                },
                reset() {
                    this.mouseHover = -100
                    this.inputFocus = -1
                    this.currentSection = this.survey.sections.length > 1 ? this.survey.sections[0] : null
                },
                removeSection(section) {
                    this.survey.sections.$remove(section)
                    this.reset()
                },
                addSection() {
                    var self = this
                    swal({
                        title: "New section",
                        text: "Title of new section:",
                        type: "input",
                        showCancelButton: true,
                        closeOnConfirm: false,
                        animation: "pop",
                        inputPlaceholder: "Write something"
                    }, function(inputValue) {
                        if (inputValue === false) return false;
                        if (inputValue === "") {
                            swal.showInputError("You need to write the title!");
                            return false
                        }
                        var newSection = {
                            'name': inputValue,
                            'questions': []
                        }
                        self.survey.sections.push(newSection)
                        self.currentSection = newSection
                        swal("Nice!", "You have added new section: " + inputValue, "success");
                    });
                },
            },
            computed: {
                period: function() {
                    var date1 = new Date(this.survey.start_at.replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$2/$1/$3"));
                    var date2 = new Date(this.survey.end_at.replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$2/$1/$3"));

                    var diff = date2.getTime() - date1.getTime();

                    var days = Math.floor(diff / (1000 * 60 * 60 * 24))
                    return days

                }
            },
            data() {
                return {

                    currentSection: {
                        name: ''
                    },
                    adding: false,
                    inputFocus: -1,
                    mouseHover: -100,
                    survey: {
                        access: 0,
                        name: 'My Survey',
                        start_at: '1/1/2016',
                        end_at: '1/1/2017',
                        sections: [{
                            'name': 'Value exploration: Strategy',
                            'questions': [{
                                    'description': 'who is your daddy?',
                                    'type': 'TrueFalse'
                                }, {
                                    'description': 'who is your mummy?',
                                    'type': 'TrueFalse'
                                }, {
                                    'description': 'who is your daddy?',
                                    'type': 'TrueFalse'
                                }

                            ]
                        }, {
                            'name': 'Value exploration: Risk Management and Financial Measurement',
                            'questions': [],
                            'questions': []
                        }, {
                            'name': 'Value exploration: Capital raising and allocation',
                            'questions': []
                        }, {
                            'name': 'Value exploration: Compliance and communication',
                            'questions': []
                        }, {
                            'name': 'Value exploration: Succession Planning',
                            'questions': []
                        }, {
                            'name': 'Value exploration: Remuneration',
                            'questions': []
                        }, {
                            'name': 'Dynamic Review Question: External and internal',
                            'questions': []
                        }, {
                            'name': 'Dynamic Review Question: communication and Engagement with management team',
                            'questions': []
                        }, {
                            'name': 'Dynamic Review Question: Board structure and membership',
                            'questions': []
                        }, {
                            'name': 'Dynamic Review Question: Ownership within the Board',
                            'questions': []
                        }, {
                            'name': 'Dynamic Review Question: Alignment of Board and Board members',
                            'questions': []
                        }, {
                            'name': 'Dynamic Review Question: Board efficiency',
                            'questions': []
                        }, {
                            'name': 'Strategy',
                            'questions': []
                        }, {
                            'name': 'Risk Management',
                            'questions': []
                        }, {
                            'name': 'Capital allocation or investment',
                            'questions': []
                        }, {
                            'name': 'Reporting or compliance',
                            'questions': []
                        }, {
                            'name': 'Recruitment',
                            'questions': []
                        }, {
                            'name': 'Remuneration',
                            'questions': []
                        }, {
                            'name': 'Communication',
                            'questions': []
                        }, {
                            'name': 'Board Dynamics',
                            'questions': []
                        }, {
                            'name': 'Performance Evaluation',
                            'questions': []
                        }, {
                            'name': 'Constraint',
                            'questions': []
                        }]
                    }
                }
            }

    }
</script>
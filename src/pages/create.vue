<template>


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
            <input placeholder="Name of this survey" id="survey-name" class="form-control" v-model="survey.name">

            <span class="pull-right small"> <a @click="advanced_setting=!advanced_setting" href="javascript:void(0)"
                                               class="text-primary"><i class="fa "
                                                                       :class="{'fa-caret-up':!advanced_setting,'fa-caret-down':advanced_setting}"></i> Advanced Setting</a></span>
        </div>
        <div class="col-md-3">

            <a class="pull-right btn btn-success" @click="saveSurvey()"><i class="fa fa-save"></i> Save</a>

        </div>
    </div>

    <hr>
    <div class="row" v-show="advanced_setting" transition="expand">

        <div class="col-md-3 text-center">
            <label for="">
                Start Date
            </label>
            <datepicker :value.sync="survey.start_at" width="120px" :disabled-days-of-week="disabled"
                        format="dd/MM/yyyy">
            </datepicker>
        </div>

        <div class="col-md-3 text-center">
            <label for="">
                End Date
            </label>
            <datepicker :value.sync="survey.end_at" width="120px" :disabled-days-of-week="disabled" format="dd/MM/yyyy">
            </datepicker>
        </div>

        <div class="col-md-2 text-center">
            <span :class="{'text-danger':period<=0}" id="days"> {{period}} days to complete </span>
        </div>
        <div class="col-md-4 text-center">
            Access control:
            <access-control :type.sync="survey.access"></access-control>
        </div>
    </div>
    <div class="row" v-show="advanced_setting&&(survey.access==1)" transition="fade">
        <div class="col-md-3 col-md-offset-6">
            <input type="text" class="form-control" v-model="survey.security_question" placeholder="Security Question">
        </div>
        <div class="col-md-3">
            <input type="text" class="form-control" v-model="survey.security_answer" placeholder="Security Answer">

        </div>
    </div>

    <hr v-show="advanced_setting">
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
                             v-drag-and-drop drop="handleDrop" @dragover="drag_over=$index" @dragleave="drag_over=-1"  id="{{ $index }}">

                            <div class="panel-body">
                                <span class="text-muted small"
                                      style="position:absolute;top:10px;font-size:9px;left:30px;"> #{{$index+1}} </span>

                                <div class="row">
                                    <div class="col-md-12">

                                         <textarea @focus='inputFocus=$index' @blur="inputFocus=-100" type="text"
                                                   name="{{'question-'+$index}}" class="form-control question-control"
                                                   v-model="question.description"> 
                                         </textarea>

                                    </div>
                                </div>
                                <div class="row" v-show="question.type=='Selection'">
                                    <div class="col-md-8">
                                        <div class="row " v-for="option in question.options" transition="fade"
                                             track-by="$index" style="margin-top:5px;">
                                            <div class="col-md-11">
                                                <input type="text" class="form-control options" v-model="option"
                                                       placeholder="Option">
                                            </div>
                                            <div class="col-md-1">
                                                <i class="fa fa-remove" style="margin-top:1em;cursor:pointer"
                                                   @click="question.options.$remove(option)"></i>
                                            </div>
                                        </div>

                                        <div class="row" style="margin-top:10px;">
                                            <div class="col-md-12">
                                                <input type="text" class="form-control newoption"
                                                       placeholder="Add new option"
                                                       @keyup.enter="addOption(question, $event)"
                                                       @blur="addOption(question, $event)">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <label>Multiple Choice</label> <input style="font-size:4em;" type="checkbox"
                                                                              v-model="question.multiple">
                                    </div>
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
                            <div transition="fade" v-show="drag_over==$index" style="float:left;border:dashed 1px yellow;padding:30px; margin-top:10px;width:100%;">This question will goes here</div>
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
        SurveyResource
    } from '../config.js'


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
            accessControl

        },
        methods: {
            addOption(question, event) {
                var newOption = event.target.value
                if (!newOption) {
                    return
                }
                if (!question.options) {
                    question.options = []
                }
                if (question.options.indexOf(newOption) >= 0) {
                    return
                }

                question.options.push(newOption)
                event.target.value = ''
            },
            saveSurvey() {
                var self = this
                swal({
                    title: "Are you sure?",
                    text: "Have you completed your survey?",
                    type: "info",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    cancelButtonText: 'No',
                    confirmButtonText: "Yes, save it!",
                    closeOnConfirm: true
                }, function() {
                    self.$dispatch('loading', 'Creating')

                    SurveyResource.save(self.survey).then((res) => {
                            self.$dispatch('loaded')
                            swal({
                                title: "Survey Created!",
                                text: `<img src="http://chart.apis.google.com/chart?cht=qr&chs=150x150&chl=http://hr.man.land/${res.data.slug}"&chld=H|0"> <br> Survey URL: <input type="text" style="display:initial" class="form-class input-sm" value="http://hr.man.land/${res.data.slug}" readonly>`,
                                type: 'success',
                                html: true,
                                cancelButtonText: 'Ok',
                                showCancelButton: true,
                                confirmButtonText: "Back",
                            }, function() {
                                self.$route.router.go('/app/survey')
                            })

                        },
                        (errRes) => {
                            self.$dispatch('loaded')
                            swal({
                                title: "Ops",
                                text: 'Something wrong with your request, please try again later..',
                                type: 'warning',
                                html: true,

                            });

                        }
                    )

                });


            },
            focusLastQuestion() {
                this.focusOnQuestion(this.currentSection.questions.length - 1)
            },
            duplicateQuestion(index) {
                var dummy = Object.assign({}, this.currentSection.questions[index])

                dummy.options = Object.assign({}, this.currentSection.questions[index].options)
                this.currentSection.questions.splice(index, 0, dummy)

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


                this.currentSection.questions = this.currentSection.questions.move(first, second);
                this.drag_over = -1


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
                $('#days').fadeOut(100, function() {
                    $('#days').fadeIn()
                })

                var date1 = new Date(this.survey.start_at.replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$2/$1/$3"));
                var date2 = new Date(this.survey.end_at.replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$2/$1/$3"));

                var diff = date2.getTime() - date1.getTime();

                var days = Math.floor(diff / (1000 * 60 * 60 * 24))
                return days

            }
        },
        data() {
            return {
                drag_over: -1,
                advanced_setting: false,
                currentSection: {
                    name: ''
                },
                sending: false,
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
                                'description': 'The baord is heavily involved in formulating strategy',
                                'type': 'TrueFalse',
                                'options': [],
                                'multiple': false
                            }, {
                                'description': 'The board monitors strategy execution or implementation against pre determinded milestones, strategic plan and other businessplan',
                                'type': 'TrueFalse',
                                'options': [],
                                'multiple': false
                            }, {
                                'description': 'THe board takes decisions considering the community, employees, society as a whole and the environment',
                                'type': 'Slider',
                                'options': [],
                                'multiple': false
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
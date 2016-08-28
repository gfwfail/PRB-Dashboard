<template>
 <div class="row">
        <div class="col-lg-12">
            <h1 class="page-header">New survey</h1>
        </div>
    </div> 
  <div class="row">
       
        <div class="col-md-12">
            <button class="btn btn-primary" @click="addSection()"><i class="fa fa-plus"></i> Add Section</button>
            <a class="pull-right btn btn-success" ><i class="fa fa-save"></i> Save</a>
            <hr>
        </div>
 </div>
 
 <div class="row">
        <div class="col-md-3">
            <ul class="nav nav-pills nav-stacked">
                <li v-for="section in survey.sections"  @mouseover="mouseHover=$index" @mouseout="mouseHover=-1"  track-by="$index" :class="{'active':currentSection==section}">
                    <a @click.self="currentSection=section">
                    {{section.name}}

                    </a>
                            <button style="position:absolute;top:40%;right:3px;" transition="fade" @click.prevent="removeSection(section)" v-show="mouseHover==$index" class="btn btn-xs btn-danger"><i class="fa fa-remove"></i></button>
                </li>

            </ul>
       
         </div> 
         <div v-show="currentSection" class="col-md-9" style="background:#fafafa;padding:10px;">
             <div class="row">
                 <div class="col-md-9">
                                  <section-name  v-if="currentSection&&currentSection.name" :name.sync="currentSection.name"></section-name>

                 </div>
                 <div class="col-md-3">  
                     <div style="margin:10px;" class="text-right"> 
                        
                         <add-question v-show="currentSection&&currentSection.questions&&currentSection.questions.length>0" :callback="focusLastQuestion" :section.sync="currentSection"></add-question>
                         
                         </div>
                   
                 </div>
             </div>

                          <div v-show="currentSection&&currentSection.questions&&currentSection.questions.length>0" class="text-center" style="margin-top:20px;margin-bottom:200px;">
                         <div class="row" v-for="question in currentSection.questions" track-by="$index" transition="item">
                            <div class="col-md-12 text-left"> 

                            <div :class="{'focused':inputFocus==$index}" class="panel question panel-primary" v-drag-and-drop drop="handleDrop" id="{{ $index }}">

                               <div class="panel-body">
                              <span class="text-muted small" style="position:absolute;top:10px;left:30px;"> #{{$index+1}} </span> 
                                    <div class="col-md-12">

                                         <textarea @focus='inputFocus=$index' @blur="inputFocus=-100" type="text" name="{{'question-'+$index}}" class="form-control question-control" v-model="question.description"> 
                                         </textarea>
                               </div>

                               </div>
                               <div class="panel-footer text-right">
                                   <i class="fa fa-arrows pull-left" style="margin-top:.5em;opacity:0.6;"></i>
                                   <question-type class="pull-left" :type.sync="question.type"></question-type>

                                  <button class="btn btn-sm btn-primary" @click="duplicateQuestion($index)">Duplicate</button>
                                 
                                        <button style="margin-left:3px" data-balloon="This action is unrecoverable!!" data-balloon-pos="down"  @click="deleteQuestion(question)" class="btn btn-sm btn-danger">Delete </button>

                            </div>
                                 </div>
                            </div>
                         </div>
<div style="margin-top:40px;">   <add-question :callback="focusLastQuestion" :section.sync="currentSection"></add-question>
</div>
                          </div>
             <div v-show="!currentSection||!currentSection.questions||currentSection.questions.length==0" class="text-center" style="margin-top:100px;margin-bottom:200px;">

                 <img src="../assets/empty.png" height=100 alt="">
                 <br>    <br>
                
                 No question has been added to this section yet~
                  <br><br>
 
                            <add-question :callback="focusLastQuestion" :section.sync="currentSection"></add-question>
                 
                        </div>
                               

         </div>
    </div>
    
    
    
</template>

<script>
    import addQuestion from '../components/addQuestion.vue'
    import sectionName from '../components/sectionName.vue'
    import questionType from '../components/questionType.vue'
    export default {
        ready() {
                this.reset()
            },
            components: {
                addQuestion,
                sectionName,
                questionType

            },
            methods: {
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
            data() {
                return {

                    currentSection: {
                        name: ''
                    },
                    inputFocus: -1,
                    mouseHover: -100,
                    survey: {
                        sections: [{
                            'name': 'Value exploration: Strategy',
                            'questions': [{
                                    'description': 'who is your daddy?',
                                    'type': 'truefalse'
                                }, {
                                    'description': 'who is your mummy?',
                                    'type': 'truefalse'
                                }, {
                                    'description': 'who is your daddy?',
                                    'type': 'truefalse'
                                }

                            ]
                        }, {
                            'name': 'Value exploration: Risk Management and Financial Measurement',
                            'questions': []
                        }, {
                            'name': 'Value exploration: Capital raising and allocation'
                        }, {
                            'name': 'Value exploration: Compliance and communication'
                        }, {
                            'name': 'Value exploration: Succession Planning'
                        }, {
                            'name': 'Value exploration: Remuneration'
                        }, {
                            'name': 'Dynamic Review Question: External and internal'
                        }, {
                            'name': 'Dynamic Review Question: communication and Engagement with management team'
                        }, {
                            'name': 'Dynamic Review Question: Board structure and membership'
                        }, {
                            'name': 'Dynamic Review Question: Ownership within the Board'
                        }, {
                            'name': 'Dynamic Review Question: Alignment of Board and Board members'
                        }, {
                            'name': 'Dynamic Review Question: Board efficiency'
                        }, {
                            'name': 'Strategy'
                        }, {
                            'name': 'Risk Management'
                        }, {
                            'name': 'Capital allocation or investment'
                        }, {
                            'name': 'Reporting or compliance'
                        }, {
                            'name': 'Recruitment'
                        }, {
                            'name': 'Remuneration'
                        }, {
                            'name': 'Communication'
                        }, {
                            'name': 'Board Dynamics'
                        }, {
                            'name': 'Performance Evaluation'
                        }, {
                            'name': 'Constraint'
                        }]
                    }
                }
            }

    }
</script>
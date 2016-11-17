import Vue from 'vue'
import Resource from 'vue-resource'
Vue.use(Resource)


export const API_URL = "http://54.206.36.27/api"


export const SurveyResource = Vue.resource(API_URL + '/survey')
export const AnswerResource = Vue.resource(API_URL + '/answer')
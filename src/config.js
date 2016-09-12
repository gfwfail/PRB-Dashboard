import Vue from 'vue'
import Resource from 'vue-resource'
Vue.use(Resource)


const API_URL = "http://api.hrv.dev/api"


export const SurveyResource = Vue.resource(API_URL + '/survey')
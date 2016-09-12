import Vue from 'vue'
import Router from 'vue-router'
import Resource from 'vue-resource'
import App from './App'
import Login from './pages/login.vue'
import Container from './pages/container.vue'
import Dashboard from './pages/dashboard.vue'
import Survey from './pages/survey.vue'
import CreateSurvey from './pages/create.vue'
import SurveyReport from './pages/report.vue'
import EditSurvey from './pages/edit.vue'

Vue.use(Router)
Vue.use(Resource)

Vue.use(require('vue-moment'))

Vue.use(require('vue-drag-and-drop'))
Vue.use(require('vue-animated-list'))






var G2 = require('g2')
window.G2 = G2


var Chart = require('chart.js')
window.Chart = Chart
require('script!../node_modules/sweetalert/dist/sweetalert.min.js')
require('script!../node_modules/jquery/jquery.min.js')
require('script!../node_modules/jquery-sticky/jquery.sticky.js')




var router = new Router()

router.map({
    '/': {
        component: Login
    },
    '/app': {
        component: Container,
        subRoutes: {
            '/': {
                // Bar will be rendered inside Foo's <router-view>
                // when /foo/bar is matched
                component: Dashboard
            },
            '/survey': {
                component: Survey
            },
            '/survey/create': {
                component: CreateSurvey
            },
            '/survey/report/:id': {
                component: SurveyReport
            },
            '/survey/edit/:id': {
                component: EditSurvey
            },
        }
    }
})



router.start(App, 'body')
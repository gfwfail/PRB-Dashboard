import Vue from 'vue'
import Router from 'vue-router'
import Resource from 'vue-resource'
import App from './App'
import Login from './pages/login.vue'
import Container from './pages/container.vue'
import Dashboard from './pages/dashboard.vue'
import Survey from './pages/survey.vue'

Vue.use(Router)
Vue.use(Resource)

Vue.use(require('vue-moment'))

var G2 = require('g2')
window.G2 = G2

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
            'survey': {
                component: Survey
            }
        }
    }
})



router.start(App, 'body')
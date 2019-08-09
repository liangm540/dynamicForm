// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import { Button, message } from 'ant-design-vue'
Vue.use(Antd)
Vue.config.productionTip = false
Vue.component(Button.name, Button)
Vue.component(Button.Group.name, Button.Group)
Vue.use(Button)

Vue.prototype.$message = message


// 引入mockjs
require('./mock.js')

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	template: '<App/>',
	components: {
		App
	}
})

Vue.filter('getYMD', function(input) {
	return input.split(' ')[0];
})
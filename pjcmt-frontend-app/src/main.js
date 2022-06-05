import { createApp } from 'vue';
import twitter from 'vue-twitter'
import App from './App.vue';
import Router from './router/routers';
import '@/index.css';

import ptBr from 'element-plus/es/locale/lang/pt-br';


//import manually from framework
//import { ElButton, ElMenu, ElMenuItem, ElMenuItemGroup, ElTable, ElTableColumn } from 'element-plus';
//import {Edit, Share} from '@element-plus/icons-vue'

//import fully from framework
import ElementPlus from 'element-plus';
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/dist/index.css';



const app = createApp(App);

//use it to import manually from framework
//app.use([ElButton, ElMenu, ElMenuItem, ElMenuItemGroup, ElTable, ElTableColumn]);

//use it to import fully from framework
app.use(ElementPlus,{
    locale: ptBr
});
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }

app.use(twitter);
app.use(Router);
app.mount('#app');

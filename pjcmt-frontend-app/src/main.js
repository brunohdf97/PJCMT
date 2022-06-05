import { createApp } from 'vue';
import App from './App.vue';
import Router from './router/routers';
import '@/index.css';

import ptBr from 'element-plus/es/locale/lang/pt-br'

//import manually from framework
//import { ElButton, ElMenu, ElMenuItem, ElMenuItemGroup, ElTable, ElTableColumn } from 'element-plus';

//import fully from framework
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';



const app = createApp(App);

//use it to import manually from framework
//app.use([ElButton, ElMenu, ElMenuItem, ElMenuItemGroup, ElTable, ElTableColumn]);

//use it to import fully from framework
app.use(ElementPlus,{
    locale: ptBr
});

app.use(Router);
app.mount('#app');

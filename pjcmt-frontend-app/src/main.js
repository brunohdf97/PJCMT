import { createApp } from 'vue';
import App from './App.vue';
import Router from './router/routers';
import './index.css';
//import manually from framework
//import { ElButton, ElMenu, ElMenuItem, ElMenuItemGroup, ElTable, ElTableColumn } from 'element-plus';

//import fully from framework
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

const app = createApp(App);

//use it import manually from framework
//app.use([ElButton, ElMenu, ElMenuItem, ElMenuItemGroup, ElTable, ElTableColumn]);

//use it fully from framework
app.use(ElementPlus);

app.use(Router);
app.mount('#app');

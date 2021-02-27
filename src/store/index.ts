import Vue from 'vue';
import Vuex from 'vuex';
import Games from '@/store/modules/gameModule';
import ConsoleModule from '@/store/modules/consoleModule';
import GlobalModule from '@/store/modules/globalModule';

Vue.use(Vuex);
const store = new Vuex.Store({
    modules: {
        Games,
        GlobalModule,
        ConsoleModule,
    },
});
export default store;

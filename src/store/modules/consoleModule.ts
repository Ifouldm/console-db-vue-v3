import axios from 'axios';
import {
    VuexModule, Module, Mutation, Action,
} from 'vuex-module-decorators';

@Module({ namespaced: true, name: 'ConsoleModule' })
class ConsoleModule extends VuexModule {
    public consoles = []

    @Mutation
    public updateConsoles(gameList: []) {
        this.consoles = gameList;
    }

    @Action
    public async loadConsoles(): Promise<void> {
        this.context.commit('setLoading', true, { root: true });
        await setTimeout(() => {
            axios.get('http://localhost:8080/api/consoles')
                .then((res) => {
                    this.context.commit('setLoading', false, { root: true });
                    this.context.commit('setError', null, { root: true });
                    this.updateConsoles(res.data._embedded.consoles);
                })
                .catch((err) => {
                    this.context.commit('setLoading', false, { root: true });
                    this.context.commit('setError', err, { root: true });
                });
        }, 2000);
    }
}
export default ConsoleModule;

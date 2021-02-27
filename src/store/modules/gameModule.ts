import axios from 'axios';
import {
    VuexModule, Module, Mutation, Action,
} from 'vuex-module-decorators';

@Module({ namespaced: true, name: 'GameModule' })
class Games extends VuexModule {
    public games = [];

    public game = {};

    @Mutation
    public updateGames(gameList: []) {
        this.games = gameList;
    }

    @Mutation
    public updateGame(game: {}) {
        this.game = game;
    }

    @Action
    public loadGames(pageNo: number) {
        this.context.commit('setLoading', true, { root: true });
        axios.get(`http://localhost:8080/api/games?page=${pageNo}`)
            .then((res) => {
                this.context.commit('setLoading', false, { root: true });
                this.context.commit('setError', null, { root: true });
                this.updateGames(res.data._embedded.game);
                this.context.commit('setPageData', res.data.page, { root: true });
            })
            .catch((err) => {
                this.context.commit('setLoading', false, { root: true });
                this.context.commit('setError', err, { root: true });
            });
    }

    @Action
    public loadGame(gameId: string) {
        this.context.commit('setLoading', true, { root: true });
        axios.get(`http://localhost:8080/api/games/${gameId}`)
            .then((res) => {
                this.context.commit('setLoading', false, { root: true });
                this.context.commit('setError', null, { root: true });
                this.updateGames(res.data);
            })
            .catch((err) => {
                this.context.commit('setLoading', false, { root: true });
                this.context.commit('setError', err, { root: true });
            });
    }
}
export default Games;

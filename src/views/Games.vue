<template>
    <v-container>
        <Loading v-if=loading />
        <Error error=error v-if=error />
        <v-col cols="12">
            <v-row v-for="game in games" :key="game.gameId">
                <GameView :game=game />
            </v-row>
        </v-col>
        <v-pagination
            @input=onPageChange
            :length=pageData.totalPages
            total-visible="7"
            :value=pageData.number />
    </v-container>
</template>

<script lang='ts'>
import Vue from 'vue';
import { namespace, State } from 'vuex-class';
import Component from 'vue-class-component';
import { getModule } from 'vuex-module-decorators';
import GameView from '@/components/GameCard.vue';
import LoadingAlert from '@/components/Loading.vue';
import ErrorAlert from '@/components/Error.vue';
import PageData from '@/store/models/pageData';
import GameModule from '@/store/modules/gameModule';

const games = namespace('Games');
@Component({
    components: { GameView, LoadingAlert, ErrorAlert },
})
export default class Games extends Vue {
    @games.State
    public games!: object[]

    @State
    public loading!: boolean

    @State
    public error!: string

    @State
    public pageData!: PageData

    @games.Action('loadGames')
    public loadGames!: (pageNo: number) => void

    @games.Action
    public onPageChange(pageNo: number): void {
        const connection = getModule(GameModule, this.$store);
        this.loadGames(pageNo);
    }

    mounted() {
        this.loadGames(1);
    }
}
</script>

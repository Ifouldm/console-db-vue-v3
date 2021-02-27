<template>
    <v-container>
        <LoadingAlert v-if=loading />
        <ErrorAlert error=error v-if=error />
        <v-card
            class="mb-5"
            elevation="2"
            outlined
            width=80%>
            <v-card-title>{{game.gameName}}</v-card-title>
            <v-card-subtitle>{{game.developer}}</v-card-subtitle>
            <v-divider class="mx-4"></v-divider>
            <v-card-text>
                <p class='description'>{{game.description}}</p>
            </v-card-text>
            <v-card-actions>
            <v-col>
                Players: {{game.players}}
            </v-col>
            <v-col>
                <v-rating
                    color="green"
                    background-color="green"
                    empty-icon="mdi-star-outline"
                    full-icon="mdi-star"
                    half-icon="mdi-star-half"
                    length="5"
                    size="32"
                    :value=parseInt(game.score)
                    ></v-rating>
            </v-col>
            <v-col>
                Year: {{game.year}}
            </v-col>
            </v-card-actions>
        </v-card>
    </v-container>
</template>

<script lang='ts'>
import Vue from 'vue';
import { namespace, State } from 'vuex-class';
import { getModule } from 'vuex-module-decorators';
import Component from 'vue-class-component';
import GameModule from '@/store/modules/gameModule';
import LoadingAlert from '../components/Loading.vue';
import ErrorAlert from '../components/Error.vue';

const games = namespace('Games');
@Component({
    components: { LoadingAlert, ErrorAlert },
})
export default class Game extends Vue {
    @games.State
    public game!: object;

    @State
    public loading!: boolean

    @State
    public error!: string

    @games.Action
    public loadGame!: (gameId: string) => void

    mounted() {
        const connection = getModule(GameModule, this.$store);
        this.loadGame(this.$route.params.id);
    }
}
</script>

<style>
</style>

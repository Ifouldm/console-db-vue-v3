<template>
    <v-container>
        <LoadingAlert :v-if="loading" />
        <ErrorAlert error=error v-if="error" />
        <v-col cols="12">
            <v-row v-for="console in consoles" :key="console.id">
            <ConsoleView
                :console="console" />
            </v-row>
        </v-col>
    </v-container>
</template>

<script lang='ts'>
import Vue from 'vue';
import { namespace, State } from 'vuex-class';
import Component from 'vue-class-component';
import { getModule } from 'vuex-module-decorators';
import ConsoleModule from '@/store/modules/consoleModule';
import GlobalModule from '@/store/modules/globalModule';
import ConsoleView from '../components/ConsoleCard.vue';
import LoadingAlert from '../components/Loading.vue';
import ErrorAlert from '../components/Error.vue';

const consoles = namespace('ConsoleModule');
@Component({
    components: { ConsoleView, LoadingAlert, ErrorAlert },
})
export default class Consoles extends Vue {
    @State
    public loading = false;

    @State
    public error!: string;

    @consoles.State
    public consoles!: object[]

    @consoles.Action
    public loadConsoles!: () => void

    mounted() {
        const connection = getModule(ConsoleModule, this.$store);
        this.loadConsoles();
    }
}
</script>

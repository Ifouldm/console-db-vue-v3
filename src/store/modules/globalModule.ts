import {
    VuexModule, Module, Mutation,
} from 'vuex-module-decorators';
import PageData from '@/store/models/pageData';

@Module
class GlobalModule extends VuexModule {
    public loading = true;

    public error = '';

    public pageData: PageData = {
        totalPages: 0,
        number: 0,
    }

    @Mutation
    public setLoading(value: boolean): void {
        this.loading = value;
    }

    @Mutation
    public setError(error: string): void {
        this.error = error;
    }

    @Mutation
    setPageData(pageData: PageData): void {
        this.pageData = pageData;
    }
}
export default GlobalModule;

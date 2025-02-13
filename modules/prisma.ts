import { defineNuxtModule, addPlugin, createResolver } from '@nuxt/kit';


export default defineNuxtModule({
    meta: {
        name     : 'prisma',
        configKey: 'prisma',
    },
    setup (_options, _nuxt) {
        if (import.meta.server) {
            const resolver = createResolver(import.meta.url);
            addPlugin(resolver.resolve('./runtime/plugin/prisma'));
        }
    },
});
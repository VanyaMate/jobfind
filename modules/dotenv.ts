import { defineNuxtModule } from '@nuxt/kit';
import * as path from 'node:path';
import * as dotenv from 'dotenv';


export default defineNuxtModule({
    setup () {
        const mode    = process.env.NODE_ENV === 'prod' ? 'prod' : 'dev';
        const envPath = path.resolve(__dirname, `../.env.${ mode }`);

        console.log('Mode', mode, envPath);

        dotenv.config({ path: envPath });
    },
});
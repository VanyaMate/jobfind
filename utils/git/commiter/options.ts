import { resolve } from 'path';
import type { CommiterOptions } from '@vanyamate/commiter';


/// @ts-ignore
const __dirname = import.meta.dirname;
const gitFolder = resolve(__dirname, '..', '..', '..');

export default {
    types                  : [ '💡 Update', '🙏 Fix', '🔥 New feature' ],
    entities               : [
        'Приложение',
        'UI Kit',
        'Client - Authorization',
        'Server - Authorization',
        'Client - User',
        'Server - User',
        'Client - Company',
        'Server - Company',
        'Client - Vacancy',
        'Server - Vacancy',
    ],
    postfixes              : {
        'Unit tests': 'unit',
        'Build test': 'build',
        'Playwright': 'pw',
        'TG notify' : 'tg',
    },
    postfixesSeparator     : '%',
    pattern                : `{{type}} : {{entities}} - {{message}} {{%postfixes%}}`,
    gitFolder              : gitFolder,
    gitRemoteRepositoryName: 'origin',
    gitPushDefault         : true,
} as CommiterOptions;
import {ApplicationConfig, provideBrowserGlobalErrorListeners} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {tokenInterceptor} from './interceptors/token.interceptor';
import {providePrimeNG} from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import Material from '@primeuix/themes/material';
import Lara from '@primeuix/themes/lara';
import Nora from '@primeuix/themes/nora';
import {definePreset} from '@primeuix/themes';
import {provideEffects} from '@ngrx/effects';
import {provideState, provideStore} from '@ngrx/store';
import {coreReducer} from './_store/core.reducer';
import {provideStoreDevtools} from '@ngrx/store-devtools';
import {CoreEffects} from './_store/core.effects';

const MyPreset = definePreset(Aura, {
    semantic: {
        primary: {
            50: '{blue.50}',
            100: '{blue.100}',
            200: '{blue.200}',
            300: '{blue.300}',
            400: '{blue.400}',
            500: '{blue.500}',
            600: '{blue.600}',
            700: '{blue.700}',
            800: '{blue.800}',
            900: '{blue.900}',
            950: '{blue.950}'
        }
    }
});

export const appConfig: ApplicationConfig = {
    providers: [
        provideBrowserGlobalErrorListeners(),
        provideRouter(routes),
        provideHttpClient(
            withInterceptors([tokenInterceptor])
        ),
        providePrimeNG({
            theme: {
                /** PrimeNG provides 4 predefined themes out of the box; Aura, Material, Lara and Nora */
                preset: MyPreset,
                options: {
                    darkModeSelector: false,
                }
            }
        }),

        provideStore(),
        provideState('core', coreReducer),
        provideEffects([CoreEffects]),
        provideStoreDevtools(),
    ]
};

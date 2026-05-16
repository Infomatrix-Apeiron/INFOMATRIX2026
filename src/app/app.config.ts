import {ApplicationConfig, isDevMode, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {tokenInterceptor} from './interceptors/token.interceptor';
import {provideServiceWorker} from '@angular/service-worker';
import {provideToastr} from 'ngx-toastr';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
    providers: [
        provideBrowserGlobalErrorListeners(),
        provideRouter(routes),
        provideHttpClient(
            withInterceptors([tokenInterceptor])
        ), provideServiceWorker('ngsw-worker.js', {
            enabled: !isDevMode(),
            registrationStrategy: 'registerWhenStable:30000'
          }),

        provideRouter(routes),
        provideHttpClient(),
        provideToastr({
            positionClass: 'toast-center',
            timeOut: 4000,
            tapToDismiss: true,
            preventDuplicates: true,
            closeButton: true,
            progressBar: true,
            newestOnTop: true,
            easeTime: 0,
        }),
    ]
};

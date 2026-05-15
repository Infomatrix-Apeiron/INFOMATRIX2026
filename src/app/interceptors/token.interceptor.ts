import { HttpContextToken, HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

export const SKIP_AUTH = new HttpContextToken<boolean>(() => false);

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {

    const router = inject(Router);

    if (req.context.get(SKIP_AUTH)) {
        return next(req);
    }

    const token = localStorage.getItem('accessToken');

    const authReq = token
        ? req.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`,
            },
        })
        : req;

    return next(authReq).pipe(
        catchError((error: HttpErrorResponse) => {

            if (error.status === 401) {
                localStorage.removeItem('accessToken');
                router.navigate(['/authorization']).then();
            }

            return throwError(() => error);
        }),
    );
};

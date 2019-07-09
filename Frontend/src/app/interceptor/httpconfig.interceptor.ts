import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse
} from '@angular/common/http';
import { environment as env } from "@env/environment";


import { Observable, throwError } from 'rxjs';
import { map, catchError, retryWhen } from 'rxjs/operators';
import { NotifierService } from 'angular-notifier';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
    constructor(private notifierService: NotifierService) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token: string = localStorage.getItem('access_token');
        if (token && request.url.includes(env.api)) {
            request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
        }

        if (!request.headers.has('Content-Type') && request.method != 'GET') {
            request = request.clone({ headers: request.headers.set('Content-Type', 'application/x-www-form-urlencoded') });
        }

        request = request.clone({ headers: request.headers.set('Accept', 'application/json') });

        // Use method map when want to do something with server response
        return next.handle(request).pipe(
            // map((event: HttpEvent<any>) => {
            //     if (event instanceof HttpResponse) {
            //         //console.log('event--->>>', event);
            //         // this.errorDialogService.openDialog(event);
            //     }
            //     return event;
            // }),
            catchError((error: HttpErrorResponse) => {
                if (error.error instanceof ErrorEvent) {
                    this.notifierService.notify('error', `Error en la conección`);
                }
                else{
                    console.log(error);
                    if (!error.url.includes('login')){
                        this.notifierService.notify('error', `${error.error.message}`);
                    }
                }
                return throwError(error);
            }));
    }
}
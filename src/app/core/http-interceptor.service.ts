import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/internal/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  constructor(
    private router: Router
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone({ withCredentials: true });
    if (req.method === 'POST') {
      if (!req.url.includes('/importfile') && !req.url.includes('/upload')) {
        req = req.clone(
          { setHeaders: { 'Content-type': 'application/json;charset=UTF-8' } }
        );
      }
    }
    // 在静态环境中, 需要将post 转化成get请求
    if (req.url.includes('.json')) {
      if (req.method === 'POST') {
        req = req.clone({ method: 'GET' });
      }
    }
    return next.handle(req).pipe(tap((res: HttpResponse<any>) => {
      if (res.body) {

      }
    }, (err: HttpErrorResponse) => {
      if (err.status === 403) {
        this.router.navigate(['/login']);
      }
    }));
  }
}

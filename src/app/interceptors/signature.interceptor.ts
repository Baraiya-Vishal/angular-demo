import {
  HttpEvent,
  HttpHandlerFn,
  HttpRequest
} from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { environment } from '../../environments/environment';
import { RequestSigningService } from '../api/request-signing.service';
import { inject } from '@angular/core';
import { response } from 'express';

export function signatureInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
//   if (req.url.includes('/get-signature')) {
//     return next(req); // Pass the request through without modification
//   }
// console.log("test");
// console.log('Interceptor triggered for URL:', req.url);

//   const requestSigningService = inject(RequestSigningService);
 
//    var token: string;

   return next(req);

   //below code is used for sign the signature for Flask api

  // return requestSigningService.getSignature().pipe(
  //   switchMap((signature:any) => {
  //     token = signature.signature;
  //     // Clone the request and add the X-SIGNATURE header
  //     const clonedRequest = req.clone({
  //       setHeaders: {
  //         'X-SIGNATURE': token
  //       }
  //     });

  //     // Pass the cloned request to the next handler
  //     return next(clonedRequest);
  //   })
  // );

}

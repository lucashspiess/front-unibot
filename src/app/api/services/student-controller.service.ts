/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpContext } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class StudentControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation studentControllerPhoneNumberExists
   */
  static readonly StudentControllerPhoneNumberExistsPath = '/student/{phoneNumber}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `studentControllerPhoneNumberExists()` instead.
   *
   * This method doesn't expect any request body.
   */
  studentControllerPhoneNumberExists$Response(params: {
    phoneNumber: number;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<number>> {

    const rb = new RequestBuilder(this.rootUrl, StudentControllerService.StudentControllerPhoneNumberExistsPath, 'get');
    if (params) {
      rb.path('phoneNumber', params.phoneNumber, {});
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: parseFloat(String((r as HttpResponse<any>).body)) }) as StrictHttpResponse<number>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `studentControllerPhoneNumberExists$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  studentControllerPhoneNumberExists(params: {
    phoneNumber: number;
  },
  context?: HttpContext

): Observable<number> {

    return this.studentControllerPhoneNumberExists$Response(params,context).pipe(
      map((r: StrictHttpResponse<number>) => r.body as number)
    );
  }

}

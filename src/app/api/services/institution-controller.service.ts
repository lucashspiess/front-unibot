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

import { Institution } from '../models/institution';

@Injectable({
  providedIn: 'root',
})
export class InstitutionControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation institutionControllerListAll
   */
  static readonly InstitutionControllerListAllPath = '/institution';

  /**
   * Listagem Geral
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `institutionControllerListAll()` instead.
   *
   * This method doesn't expect any request body.
   */
  institutionControllerListAll$Response(params?: {
  },
  context?: HttpContext

): Observable<StrictHttpResponse<Array<Institution>>> {

    const rb = new RequestBuilder(this.rootUrl, InstitutionControllerService.InstitutionControllerListAllPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<Institution>>;
      })
    );
  }

  /**
   * Listagem Geral
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `institutionControllerListAll$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  institutionControllerListAll(params?: {
  },
  context?: HttpContext

): Observable<Array<Institution>> {

    return this.institutionControllerListAll$Response(params,context).pipe(
      map((r: StrictHttpResponse<Array<Institution>>) => r.body as Array<Institution>)
    );
  }

}

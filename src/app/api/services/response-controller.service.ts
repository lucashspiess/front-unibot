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

import { LoginDto } from '../models/login-dto';
import { ResponseDto } from '../models/response-dto';

@Injectable({
  providedIn: 'root',
})
export class ResponseControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation responseControllerTeste
   */
  static readonly ResponseControllerTestePath = '/api/teste';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `responseControllerTeste()` instead.
   *
   * This method sends `text/plain` and handles request body of type `text/plain`.
   */
  responseControllerTeste$Response(params: {
    externalKey: number;
    body: string
  },
  context?: HttpContext

): Observable<StrictHttpResponse<string>> {

    const rb = new RequestBuilder(this.rootUrl, ResponseControllerService.ResponseControllerTestePath, 'post');
    if (params) {
      rb.query('externalKey', params.externalKey, {});
      rb.body(params.body, 'text/plain');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<string>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `responseControllerTeste$Response()` instead.
   *
   * This method sends `text/plain` and handles request body of type `text/plain`.
   */
  responseControllerTeste(params: {
    externalKey: number;
    body: string
  },
  context?: HttpContext

): Observable<string> {

    return this.responseControllerTeste$Response(params,context).pipe(
      map((r: StrictHttpResponse<string>) => r.body as string)
    );
  }

  /**
   * Path part for operation responseControllerGetIntent
   */
  static readonly ResponseControllerGetIntentPath = '/api/maritalk';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `responseControllerGetIntent()` instead.
   *
   * This method sends `text/plain` and handles request body of type `text/plain`.
   */
  responseControllerGetIntent$Response(params: {
    body: string
  },
  context?: HttpContext

): Observable<StrictHttpResponse<any>> {

    const rb = new RequestBuilder(this.rootUrl, ResponseControllerService.ResponseControllerGetIntentPath, 'post');
    if (params) {
      rb.body(params.body, 'text/plain');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<any>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `responseControllerGetIntent$Response()` instead.
   *
   * This method sends `text/plain` and handles request body of type `text/plain`.
   */
  responseControllerGetIntent(params: {
    body: string
  },
  context?: HttpContext

): Observable<any> {

    return this.responseControllerGetIntent$Response(params,context).pipe(
      map((r: StrictHttpResponse<any>) => r.body as any)
    );
  }

  /**
   * Path part for operation responseControllerLogin
   */
  static readonly ResponseControllerLoginPath = '/api/authenticate-student';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `responseControllerLogin()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  responseControllerLogin$Response(params: {
    phoneNumber: number;
    body: LoginDto
  },
  context?: HttpContext

): Observable<StrictHttpResponse<any>> {

    const rb = new RequestBuilder(this.rootUrl, ResponseControllerService.ResponseControllerLoginPath, 'post');
    if (params) {
      rb.query('phoneNumber', params.phoneNumber, {});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<any>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `responseControllerLogin$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  responseControllerLogin(params: {
    phoneNumber: number;
    body: LoginDto
  },
  context?: HttpContext

): Observable<any> {

    return this.responseControllerLogin$Response(params,context).pipe(
      map((r: StrictHttpResponse<any>) => r.body as any)
    );
  }

  /**
   * Path part for operation responseControllerDoResponseByIntent
   */
  static readonly ResponseControllerDoResponseByIntentPath = '/api/make-response/{intent}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `responseControllerDoResponseByIntent()` instead.
   *
   * This method doesn't expect any request body.
   */
  responseControllerDoResponseByIntent$Response(params: {
    parametros: Array<string>;
    intent: string;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<ResponseDto>> {

    const rb = new RequestBuilder(this.rootUrl, ResponseControllerService.ResponseControllerDoResponseByIntentPath, 'get');
    if (params) {
      rb.query('parametros', params.parametros, {});
      rb.path('intent', params.intent, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ResponseDto>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `responseControllerDoResponseByIntent$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  responseControllerDoResponseByIntent(params: {
    parametros: Array<string>;
    intent: string;
  },
  context?: HttpContext

): Observable<ResponseDto> {

    return this.responseControllerDoResponseByIntent$Response(params,context).pipe(
      map((r: StrictHttpResponse<ResponseDto>) => r.body as ResponseDto)
    );
  }

}

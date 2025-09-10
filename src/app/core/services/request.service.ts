import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, filter } from 'rxjs/operators';
import { environment } from '../../../environment/environment';

import { API, COMMON } from '../const/global-constants.const';
import { HTTP_METHOD } from '../const/http-method.const';
import { ResponseCode } from '../enums/response-code.enum';
import { Response } from '../models/response.model';
import { MessageService } from '../../core/services/message.service';
import { LoadingService } from './loaging.service';

@Injectable({
  providedIn: 'root',
})
export class RequestService {

  /**
   * 是否已顯示無效訊息
   * - 用於判斷僅需彈跳一次
   */
  isPopupInvalidMsg = false;

  /**
   * 關閉所有API
   * - 需要擺脫後端的時候，可以手動改成 true
   */
  isCloseAllApi = false;

  isCloseFileAPi = false;


  constructor(
    private http: HttpClient,
    private modal: MessageService,
    private loadingService: LoadingService,
  ) { }

  fakeFile = (): Blob => {
    const url = 'https://www.google.com.tw';
    const blob = new Blob([url], { type: 'application/octet-stream' });
    // console.log(blob);
    return blob;
  };

  /**
   * call HTTP 主要方法
   * @param method http method
   * @param requestParams request body
   * @param api api url
   */
  request(method: string, requestParams: any, api: string): Observable<Response> {
    this.loadingService.busy();
    if (this.isCloseAllApi) {
      return this.closeAllAPI() as unknown as Observable<Response>;
    } else {
      const httpHeaders = this.getHTTPHeaders();
      const url = environment.API_DEFAULT_IP + API.LANG + '/' + api;
      console.log(url);
      switch (method) {
        case HTTP_METHOD.GET:
          return this.http
            .get<any>(url, { headers: httpHeaders, params: requestParams })
            .pipe(filter(this.handleResponse), catchError(this.handleError));
        case HTTP_METHOD.DELETE:
          return this.http
            .delete<any>(url, { headers: httpHeaders, params: requestParams })
            .pipe(filter(this.handleResponse), catchError(this.handleError));
        case HTTP_METHOD.POST:
          return this.http
            .post<any>(url, requestParams, { headers: httpHeaders })
            .pipe(filter(this.handleResponse), catchError(this.handleError));
        case HTTP_METHOD.PATCH:
          return this.http
            .patch<any>(url, requestParams, { headers: httpHeaders })
            .pipe(filter(this.handleResponse), catchError(this.handleError));
        case HTTP_METHOD.PUT:
          return this.http
            .put<any>(url, requestParams, { headers: httpHeaders })
            .pipe(filter(this.handleResponse), catchError(this.handleError));
        default:
          return this.http
            .get<any>(url, { headers: httpHeaders, params: requestParams })
            .pipe(filter(this.handleResponse), catchError(this.handleError));
      }

    }
  }

  /**
   * 本次專案尚未使用
   *
   * 取得json file
   * @param url file 路徑
   */
  getJSONfile(url: string): Observable<any> {
    return this.http.get(url);
  }

  /**
   * 上傳檔案
   * @param formData
   * @param url
   * @param queryPaters
   * @returns
   */
  uploadFiles(formData: FormData, api: string, method = HTTP_METHOD.POST, params?: any): Observable<Response> {
    if (this.isCloseAllApi) {
      return this.closeAllAPI();
    } else {
      const httpHeaders = this.uploadFilesHTTPHeaders();
      const url = environment.API_DEFAULT_IP  + api;
      switch (method) {
        case HTTP_METHOD.POST:
          return this.http
            .post<any>(url, formData, { headers: httpHeaders })
            .pipe(filter(this.ISHandleResponse), catchError(this.handleError));
        case HTTP_METHOD.PATCH:
          return this.http
            .patch<any>(url, formData, { headers: httpHeaders, params })
            .pipe(filter(this.ISHandleResponse), catchError(this.handleError));
        default:
          return this.http
            .get<any>(url, { headers: httpHeaders })
            .pipe(filter(this.ISHandleResponse), catchError(this.handleError));
      }
    }
  }

  /**
   * 下載檔案
   * @param requestParams request body
   * @param url api url
   */
  downloadFilesRequest(method: string, requestParams: any, url: string): Observable<any> | Response {
    const path = environment.API_DEFAULT_IP + url;

    if (this.isCloseFileAPi) {
      return this.closeFileAPI();
    } else {
      const httpHeaders = this.getFilesHTTPHeaders();
      if (HTTP_METHOD.POST === method) {
        return this.http
          .post(path, requestParams, { headers: httpHeaders, observe: 'response', responseType: 'blob' })
          .pipe(filter(this.handleAttachFileResponse), catchError(this.handleError));
      } else {
        return this.http
          .get(path, {
            headers: httpHeaders,
            params: requestParams,
            observe: 'response',
            responseType: 'blob',
          })
          .pipe(filter(this.handleAttachFileResponse), catchError(this.handleError));
      }
    }
  }

  private getHTTPHeaders(): HttpHeaders {
    const result = new HttpHeaders({
      Accept: 'application/json',
      // 'Content-Type': 'application/json',
      // Authorization:  'Bearer ' + sessionStorage.getItem(COMMON.TOKEN) ?? '',
    });
    return result;
  }

  private getFilesHTTPHeaders(): HttpHeaders {
    const result = new HttpHeaders({
      Accept: '*/*',
      'Content-Type': 'application/json',
      // Authorization: 'Bearer ' + sessionStorage.getItem(COMMON.ACCOUNT_ID),
    });
    return result;
  }

  private uploadFilesHTTPHeaders(): HttpHeaders {
    const result = new HttpHeaders({
      Accept: '*/*',
      // Authorization: 'Bearer ' + sessionStorage.getItem(COMMON.TOKEN),
    });
    return result;
  }


  private handleResponse = (response: Response): boolean => {
    // console.log(response);
    let hasResult = true;
    this.loadingService.idle();

    return hasResult;
  };

  private ISHandleResponse = (response: Response): boolean => {
    // console.log(response);

    let hasResult = true;
    return hasResult;
  };

  /**
   * 若成功直接回傳一個圖檔
   * @param response blob 圖檔
   */
  private handleAttachFileResponse = (response: HttpResponse<any>): boolean => {
    let hasResult = true;
    if (response.body.type === 'application/json') {
      const blobReader = new FileReader();
      blobReader.readAsText(response.body);
      blobReader.addEventListener('loadend', (e) => {
        hasResult = false;
        if (!this.isPopupInvalidMsg) {
          this.isPopupInvalidMsg = true;
          this.modal.dismissAll();
          if (e && e.target && e.target.result) {
            const decodeResult = JSON.parse(e.target.result.toString());
            this.modal.openError(decodeResult.message).closed$.subscribe(() => {
              this.isPopupInvalidMsg = false;
            });
          }
          setTimeout(() => {
            this.isPopupInvalidMsg = false;
          });
        }
      });
      return false;
    }
    return hasResult;
  };

  /**
   * for Status Code 200以外 (http error)
   * @param error
   */
  private handleError = (error: HttpErrorResponse) => {
    // console.log('handleError');
    this.loadingService.idle();
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    if (!this.isPopupInvalidMsg) {
      this.isPopupInvalidMsg = true;
      if (error.status == ResponseCode.noToken) {
        this.modal.openError('登入狀態已失效，請重新登入').closed$.subscribe(() => {
          this.isPopupInvalidMsg = false;
          sessionStorage.clear();
        });
      }
      else {
        this.modal.openError('系統發生問題').closed$.subscribe(() => {
          this.isPopupInvalidMsg = false;
        });
      }
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  };

  private closeAllAPI(): Observable<Response> {
    const mock: Response = {
      code: ResponseCode.success,
      msg:'模擬成功',
      message: '模擬成功',
      data: {}
    };
    const obs = new Observable<Response>((observer) => {
      observer.next(mock);
      observer.complete();
    });

    return obs;
  }

  private closeFileAPI(): Observable<Blob> {
    const mock: Blob = this.fakeFile();
    const obs = new Observable<Blob>((observer) => {
      observer.next(mock);
      observer.complete();
    });

    return obs;
  }

}

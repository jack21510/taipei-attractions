import { Inject, Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { GetAttractionAll, Attraction, Category, PageResp } from '../models/attraction.model';
import { RequestService } from '../services/request.service';
import { HTTP_METHOD } from '../const/http-method.const';
import { API } from '../const/global-constants.const';
import { Response as ApiResponse, ResponseData } from '../models/response.model';
import { environment } from '../../../environment/environment';

@Injectable({
   providedIn: 'root'
})
export class AttractionsService {
  constructor(
    private requestService: RequestService
  ) {}
  /**
   * 景點清單（分頁 / 多分類）
   */
  getAttractions(param: GetAttractionAll): Observable<ResponseData | null> {
    const requestBody = param;
    return this.requestService.request(HTTP_METHOD.GET, requestBody,  API.GET_ATTRACTIONS_ALL).pipe(
      map((res: ApiResponse) => {
        // mock api
        return res;
      })
    );
  }

  /**
   * 分類清單
   */
  getAttractionsCategory(): Observable<ResponseData | null> {
    const requestBody = { type: API.TYPE_ATTRACTIONS };
    return this.requestService.request(HTTP_METHOD.GET, requestBody,  API.GET_MISCELLANEOUS_CATEGORIES).pipe(
      map((res: ApiResponse) => {
        // mock api
        return res;
      })
    );
  }
}

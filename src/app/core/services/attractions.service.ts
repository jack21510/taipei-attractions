import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { GetAttractionAll, Attraction, Category, PageResp } from '../models/attraction.model';

// 你自己的 RequestService（貼你那支）
import { RequestService } from '../services/request.service';

// 你專案已有的 enum/const，沿用即可
import { HTTP_METHOD } from '../const/http-method.const';
import { API } from '../const/global-constants.const'; // 若沒有 API 常數，見下方備註

// 你的共用 Response 介面（你原程式已有）
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
   * 景點清單（分頁 / 關鍵字 / 多分類）
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
}

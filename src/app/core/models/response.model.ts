/**
 * Response Body
 */
export class Response {
  total?: number;
  data?: ResponseData;
  [propName: string]: any;
}
export class ResponseData {
  /** 動態屬性 */
  [propName: string]: any;
}

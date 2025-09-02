/**
 * Server 回傳的代號列舉
 * TODO: 先假設的內容
 */
export enum ResponseCode {
    /**
     * 成功
     */
    success = 200,
    /**
     * 找不到資料
     */
    noContent = 204,
     /**
     * 沒權限查看
     */
    forbidden = 403,
     /**
     * 找不到API
     */
    notFound = 404,
    /**
     * 伺服器拒絕請求
     */
    systemBusy = 500,

}


export class GetAttractionAll {
  /** 分類 */
  categoryIds!: string;
  /** 分頁 */
  page!: number;

  constructor(data?: GetAttractionAll) {
      this.categoryIds = data?.categoryIds || '';
      this.page = data?.page || 0;
  }
}

export class Attraction {
  id!: number;
  name!: string;
  name_zh!: string | null;
  open_status!: number;
  introduction!: string;
  open_time!: string;
  zipcode!: string;
  distric!: string;
  address!: string;
  tel!: string;
  fax!: string;
  email!: string;
  months!: string;
  nlat!: number;
  elong!: number;
  official_site!: string;
  facebook!: string;
  ticket!: string;
  remind!: string;
  staytime!: string;
  modified!: string;
  url!: string;
  category?: Category[];
  images!: ImageFile[];

  constructor(data?: Attraction) {
    this.id = data?.id || 0;
    this.name = data?.name || '';
    this.name_zh = data?.name_zh || '';
    this.open_status = data?.open_status || 0;
    this.introduction = data?.introduction || '';
    this.open_time = data?.open_time || '';
    this.zipcode = data?.zipcode || '';
    this.distric = data?.distric || '';
    this.address = data?.address || '';
    this.tel = data?.tel || '';
    this.fax = data?.fax || '';
    this.email = data?.email || '';
    this.months = data?.months || '';
    this.nlat = data?.nlat || 0.0;
    this.elong = data?.elong || 0.0;
    this.official_site = data?.official_site || '';
    this.facebook = data?.facebook || '';
    this.ticket = data?.ticket || '';
    this.remind = data?.remind || '';
    this.url = data?.url || '';
    this.category = data?.category || [];
    this.images = data?.images || [];

  }
}

export class ImageFile {
  src!: string;
  subject!: string;
  ext!: string;

  constructor(data?: ImageFile) {
    this.src = data?.src || '';
    this.subject = data?.subject || '';
    this.ext = data?.ext || '';

  }
}

export class Category {
  id!: number;
  name!: string;

  constructor(data?: Category) {
    this.id = data?.id || 0;
    this.name = data?.name || '';

  }
}


export interface PageResp<T> {
  total: number;
  data: T[];
}

export interface StrapiData<T> {
  id: number;
  documentId?: string;
  attributes?: T;
  // Support both Strapi v4 (attributes) and Strapi v5 (direct fields)
  [key: string]: any;
}

export interface StrapiMeta {
  pagination?: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
}

export interface StrapiCollectionResponse<T> {
  data: StrapiData<T>[] | T[];
  meta?: StrapiMeta;
}

export interface StrapiSingleResponse<T> {
  data: StrapiData<T> | T | null;
  meta?: StrapiMeta;
}

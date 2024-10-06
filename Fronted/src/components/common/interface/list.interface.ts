import { Key } from 'antd/es/table/interface';

export interface IList {
  page: number;
  limit: number;
  search?: string;
  sort_order?: string;
  sort_by?: Key;
  projectId?: string | undefined;
}

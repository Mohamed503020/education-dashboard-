export interface MenuItem {
  id: string;
  label: string;
  icon: string;
  route?: string;
  children?: MenuItem[];
  expanded?: boolean;
  badge?: number;
}

export interface Breadcrumb {
  label: string;
  route?: string;
}

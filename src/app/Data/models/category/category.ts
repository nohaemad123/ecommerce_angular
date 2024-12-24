export class Category {
    id?: number;
    name?: string;
    description?: string;
    img?: string;
    status?: number;
    hasSubCateogry?: boolean;
}

export class Subcategory {
    id?: number;
    name?: string;
    description?: string;
    img?: string;
    categoryID?: number;
    hasProduct?: boolean;
    status?: number;
}

export class CategoriesFilter {
    page?: any;
    limit?: number;
    name?: string;
    status?: any;

}

export class CategoryStatus {
    name?: string;
    value?: number;
  }
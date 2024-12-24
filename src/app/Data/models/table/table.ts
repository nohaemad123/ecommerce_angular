export class ColumnObject {
    title?: string;
    width?: number | "auto";
    sortable?: boolean;
    resizable?: boolean;
    draggable?: boolean
}

export class IIndex extends ColumnObject {
    type?: 'index';
    data?: { prop?: string }
}

export class IText extends ColumnObject {
    type?: 'text'
    data?: { prop: string }
}

export class IAvatar extends ColumnObject {
    type?: 'avatar'
    data?: { src: string, prop: string, description?: string }
}

export class IObjectItem extends ColumnObject {
    type?: 'objectItem'
    data?: { prop: string, object: string }
}

export class IDate extends ColumnObject {
    type?: 'date'
    data?: { prop: string }
}

export class IStatus extends ColumnObject {
    type?: 'status'
    data?: { prop: string }
}

export class IActions extends ColumnObject {
    type?: 'actions';
    data?: { id: any, name: 'view' | 'edit' | 'delete' | 'archive' | 'download' | 'duplicate', url?: string, modal?: string, collapsed?: boolean, iconTitle?: string }[]
}

export type IColumnType = IIndex | IText | IDate | IStatus | IAvatar | IActions | IObjectItem;

export const ActionsList = [
    { name: 'view', icon: 'icon icon-file-text' },
    { name: 'archive', icon: 'archive' },
    { name: 'delete', icon: 'icon icon-trash-o' },
    { name: 'download', icon: 'download' },
    { name: 'edit', icon: 'icon icon-edit' },
    { name: 'duplicate', icon: 'copy' },
]

export const StatusList = [
    { id: 1, enum:"Publish", name: 'Published', class: 'text-primary-300 font-medium text-sm' },
    { id: 2, enum:"NotActivated", name: 'Inactive', class: 'text-lemon font-medium text-sm' },
    { id: 3, enum:"Scheduled", name: 'Scheduled', class: 'badge-light-success' },
    { id: 4, enum:"draft", name: 'draft', class: 'badge-light-Dark' },
    { id: 5, enum:"Canceled", name: 'Canceled', class: 'text-red-600 font-medium text-sm' },
    { id: 6, enum:"Completed", name: 'Completed', class: 'text-[#009262] font-medium text-sm' },
    { id: 7, enum:"Delivered", name: 'Delivered', class: 'text-[#009262] font-medium text-sm' },
    { id: 71, enum:"PaidOnCash", name: 'Paid On Cash', class: 'text-[#009262] font-medium text-sm' },
    { id: 72, enum:"PaidByVisa", name: 'Paid By Visa', class: 'text-[#009262] font-medium text-sm' },
    { id: 8, enum:"Delivering", name: 'Delivering', class: 'text-[#009262] font-medium text-sm' },
    { id: 9, enum:"Denied", name: 'Denied', class: 'text-[#009262] font-medium text-sm' },
    { id: 10, enum:"Expired", name: 'Expired', class: 'text-[#009262] font-medium text-sm' },
    { id: 11, enum:"Failed", name: 'Failed', class: 'text-[#009262] font-medium text-sm' },
    { id: 12, enum:"Pending", name: 'Pending', class: 'text-red-600 font-medium text-sm' },
    { id: 13, enum:"Processing", name: 'Processing', class: 'text-[#009262] font-medium text-sm' },
    { id: 14, enum:"Refunded", name: 'Refunded', class: 'text-[#009262] font-medium text-sm' },
    { id: 15, enum:"Revised", name: 'Revised', class: 'text-[#009262] font-medium text-sm' },
    { id: 16, enum:"Prepared", name: 'Prepared', class: 'text-[#009262] font-medium text-sm' },
]


export interface Page {
    count: number;
    pageSize: number;
    limit: number;
    offset: number;
}

export interface FilterCriteria {
    page?: any;
    limit?: number;
    name?: string;
    status?: any;
}

export enum TABLE_ACTIONS {
    VIEW = 'view',
    EDIT = 'edit',
    DELETE = 'delete',
    ARCHIVE = 'archive',
    DOWNLOAD = 'download',
    DUPLICATE = 'duplicate'
}
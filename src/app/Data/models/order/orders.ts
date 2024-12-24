export class Order {
    id?: number;
    orderNumber?: number;
    orderNote?: string;
    trackingNumber?: string;
    orderIsPaid?: boolean;
    shippingRate?: number;
    vat?: number;
    subtotal?: number;
    total?: number;
    discount?: number;
    taxRate?: number;
    paymentTypeId?: number;
    paymentType?: string;
    currencyId?: number;
    shippingMethodId?: number;
    shippingAddressId?: number;
    shippingAddress?: ShippingAddress;
    couponCode?: string;
    couponDiscount?: number;
    statusId?: number;
    statusName?: string;
    customerId?: number;
    customerData?: CustomerData;
    orderDetails?: OrderDetail[];
}

export class ShippingAddress {
    countryName?: string;
    cityName?: string;
    state?: string;
    buildingNumber?: number;
    streetAddress?: string;
    phoneNumber?: string;
    fullname?: string;
}

export class CustomerData {
    customerEmail?: string;
    customerPhone?: string;
    customerName?: string;
}

export class OrderDetail {
    id?: number;
    productID?: number;
    productName?: string;
    image?: string;
    productCode?: string;
    deliveryDate?: string;
    quantity?: number;
    unitPrice?: number;
    unitPriceAfterDiscount: any;
    totalPrice?: number;
}


export class OrderFilter {
    page?: number;
    limit?: number;
}

export class ShippingMethod {
    id?: number;
    name?: string;
    key?: string;
}

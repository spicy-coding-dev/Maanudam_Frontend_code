export type SubscriptionStatus = "ACTIVE" | "EXPIRED";
export type SubscriptionType = "DIGITAL" | "PRINT";

export type SubscriptionUser = {
  userId: number;
  name: string;
  email: string;
  mobile: string;
  planName: string;
  status: SubscriptionStatus;
  startDate: string;
  endDate: string;
  subscriptionId: number;
};

export type Address = {
  name: string;
  addressLine: string;
  city: string;
  state: string;
  pincode: string;
  mobile: string;
};

export type PrintSubscriptionUser = {
  userId: number;
  name: string;
  email: string;
  planName: string;
  planType: "PRINT";
  status: SubscriptionStatus;
  startDate: string;
  endDate: string;
  address: Address;
  deliveryId: number;
  subscriptionId: number
};

export type SingleMagazinePurchase = {
  purchaseId: number;
  userId: number;
  userName: string;
  userEmail: string;
  mobile: string;
  bookTitle: string;
  magazineNo: number;
  price: number;
  purchasedAt: string;
};


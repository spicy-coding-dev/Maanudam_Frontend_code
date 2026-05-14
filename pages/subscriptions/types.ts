// src/pages/subscriptions/types.ts

export type SubscriptionPlan = {
  planCode: string;
  name: string;
  type: "DIGITAL" | "PRINT" ;
  durationYears: number;
  price: number;
  active: boolean;
};

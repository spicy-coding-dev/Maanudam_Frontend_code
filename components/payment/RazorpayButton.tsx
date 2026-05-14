"use client";

import axiosInstance from "@/API/axiosInstance";
import { toast } from "react-toastify";

type Props = {
  amount: number;
  purpose: string;
  paymentType: "SUBSCRIPTION" | "SINGLE_BOOK";
  planId?: number;
  bookId?: number;
  addressId?: number;
  disabled?:boolean
};

export default function RazorpayButton(props: Props) {
  const handlePayment = async () => {
    console.log("PLAN ID:", props.planId);
    try {
      // 1️⃣ PRE-CHECK API CALL
      const preCheckRes = await axiosInstance.post(
        "/payments/pre-check/subscription",
        {
          planId: props.planId,
        }
      );

      // ❌ If failed → show message and stop
      if (!preCheckRes.data.success) {
        toast.info(preCheckRes.data.message,{
          position:"top-right"
        });
        return;
      }

      // 2️⃣ CREATE ORDER API CALL
      const createOrderRes = await axiosInstance.post(
        "/payments/create-order",
        {
          amount: props.amount,
          paymentType: props.paymentType,
          planId: props.planId,
          bookId: props.bookId,
          addressId: props.addressId,
        }
      );

      const { orderId, amount, key } = createOrderRes.data.data;

      // 3️⃣ RAZORPAY OPEN
      const options = {
        key,
        amount,
        currency: "INR",
        name: "Digital Magazine",
        description: props.purpose,
        order_id: orderId,

        handler: async function (response: any) {
          await axiosInstance.post("/api/v1/payments/verify", {
            razorpayOrderId: response.razorpay_order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpaySignature: response.razorpay_signature,

            paymentType: props.paymentType,
            amount: props.amount,
            planId: props.planId,
            bookId: props.bookId,
            addressId: props.addressId,
          });

          alert("✅ Payment successful");
        },

        theme: {
          color: "#1f3c88",
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (err: any) {
      console.error(err);
      console.log(err)
      // (err?.response?.data?.message || "❌ Payment failed");
    }
  };

  return (
    <button
      onClick={(e) => {
         // 🔥 IMPORTANT
      handlePayment();
    }} 
      className="bg-blue-600 text-white px-6 py-2 rounded"
      disabled={props.disabled}
    >
      Pay ₹{props.amount}
    </button>
  );
}
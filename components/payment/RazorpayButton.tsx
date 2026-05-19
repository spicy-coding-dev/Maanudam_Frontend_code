"use client";

import axiosInstance from "@/API/axiosInstance";
import { useState } from "react";
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

    const [showAddressPopup, setShowAddressPopup] = useState(false);
    const role = localStorage.getItem("role")

  const [address, setAddress] = useState({
    name: "",
    mobile: "",
    address: "",
    city: "",
    pincode: "",
  });



  const handlePayment = async (savedAddressId?: number) => {
    console.log("PLAN ID:", props.planId);
    try {
      // 1️⃣ PRE-CHECK API CALL
      const preCheckRes = await axiosInstance.post(
        "/payments/pre-check/subscription",
        {
          planId: props.planId,
        }
      );
      console.log("this is",preCheckRes.data.success)
      // ❌ If failed → show message and stop
         // ✅ stop here only
    if (!preCheckRes.data.success) {
      toast.info(preCheckRes.data.message, {
        position: "top-right",
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
          addressId: savedAddressId,
        }
      );

      const { orderId, amount, key } = createOrderRes.data.data;
      console.log( orderId, amount, key ,"this is key")

      // 3️⃣ RAZORPAY OPEN
      const options = {
        key,
        amount,
        currency: "INR",
        name: "Digital Magazine",
        description: props.purpose,
        order_id: orderId,

        handler: async function (response: any) {
          console.log("This is response",response.razorpay_signature)
          await axiosInstance.post("/payments/verify", {
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
      console.log("this is admin err",err.response.data.message)
   
         const errorMessage =
      err?.response?.data?.message || "Payment Failed";

    toast.info(errorMessage, {
      position: "top-right",
    });
      
    
    }
  };

  // 🔥 ADDRESS SAVE
  const saveAddressAndPay = async () => {
    try {
      const res = await axiosInstance.post("/address/create", address);

      const savedAddressId = res.data.data.id;

      setShowAddressPopup(false);

      // payment continue
      handlePayment(savedAddressId);
    } catch (err) {
      console.log(err);
    }
  };

  return(
    <>
    {props.amount > 0 && (
      <button
        onClick={() => {
          handlePayment();
        }}
        className={`text-white px-6 py-2 rounded cursor-pointer ${
          props.disabled ? "bg-gray-400" : "bg-blue-600"
        }`}
        disabled={props.disabled}
      >
        Pay ₹{props.amount}
      </button>
    )}
  </>)

}
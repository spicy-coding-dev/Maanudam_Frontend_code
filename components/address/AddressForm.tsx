"use client";

import axiosInstance from "@/API/axiosInstance";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

declare global {
  interface Window {
    Razorpay: any;
  }
}

type AddressType = {
  id?: number;
  name: string;
  addressLine: string;
  city: string;
  state: string;
  pincode: string;
  mobile: string;
};

export default function AddressPage() {

  const router = useRouter();
  const searchParams = useSearchParams();

  const amount = searchParams?.get("amount");
  const planId = searchParams?.get("planId");

  const [loading, setLoading] = useState(false);

  // ✅ saved addresses
  const [savedAddresses, setSavedAddresses] = useState<AddressType[]>([]);

  // ✅ form state
  const [address, setAddress] = useState<AddressType>({
    name: "",
    addressLine: "",
    city: "",
    state: "",
    pincode: "",
    mobile: "",
  });

  // ✅ GET SAVED ADDRESSES
  const getAddresses = async () => {

    try {

      const res = await axiosInstance.get("/addresses/me");

      console.log(res.data);

      setSavedAddresses(res.data.data);

    } catch (err) {

      console.log(err);

    }
  };

  useEffect(() => {

    getAddresses();

  }, []);

  // ✅ PAYMENT FUNCTION
  const handlePayment = async (savedAddressId: number) => {

    try {

         console.log("PLAN ID:", planId);
      // 1️⃣ PRE-CHECK API CALL
      const preCheckRes = await axiosInstance.post(
        "/payments/pre-check/subscription",
        {
          planId: planId,
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

      // ✅ CREATE ORDER
      const createOrderRes = await axiosInstance.post(
        "/payments/create-order",
        {
          amount: Number(amount || 0),
          paymentType: "SUBSCRIPTION",
          planId: Number(planId || 0),
          addressId: savedAddressId,
        }
      );

      const { orderId, amount: razorpayAmount, key } =
        createOrderRes.data.data;

      // ✅ RAZORPAY
      const options = {
        key,
        amount: razorpayAmount,
        currency: "INR",
        name: "Digital Magazine",
        description: "Print Subscription",
        order_id: orderId,

        handler: async function (response: any) {

          await axiosInstance.post("/payments/verify", {
            razorpayOrderId: response.razorpay_order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpaySignature: response.razorpay_signature,

            paymentType: "SUBSCRIPTION",
            amount: Number(amount || 0),
            planId: Number(planId || 0),

            // ✅ selected address id
            addressId: savedAddressId,
          });

          toast.success("✅ Payment Successful");

          router.push("/");
        },

        theme: {
          color: "#1f3c88",
        },
      };

      const rzp = new window.Razorpay(options);

      rzp.open();

    } catch (err: any) {

      console.log(err.response?.data?.message);
    //     const errMessage = err.response?.data?.message
    //   toast.error(errMessage,{
    //     position:"top-right"
    //   });

    }
  };

  // ✅ SAVE ADDRESS
  const saveAddress = async () => {

    try {

      setLoading(true);

      // ✅ SAVE API
      const res = await axiosInstance.post(
        "/addresses/save",
        address
      );

      console.log(res.data);

      const savedAddressId = res.data.data.id;

      toast.success("Address Saved");

      // ✅ refresh addresses
      getAddresses();

      // ✅ clear form
      setAddress({
        name: "",
        addressLine: "",
        city: "",
        state: "",
        pincode: "",
        mobile: "",
      });

      // ✅ payment continue
      handlePayment(savedAddressId);

    } catch (err: any) {

      console.log(err);

   

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-5">

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* ✅ ADDRESS FORM */}
        <div className="bg-white p-8 rounded-2xl shadow-lg text-gray-700 max-h-170">

          <h1 className="text-3xl font-bold mb-6 text-yellow-500">
            Add Address
          </h1>

          {/* NAME */}
          <input
            type="text"
            placeholder="Full Name"
            value={address.name}
            onChange={(e) =>
              setAddress({
                ...address,
                name: e.target.value,
              })
            }
            className="w-full border p-3 rounded-lg mb-4"
          />

          {/* MOBILE */}
          <input
            type="text"
            placeholder="Mobile Number"
            value={address.mobile}
            onChange={(e) =>
              setAddress({
                ...address,
                mobile: e.target.value,
              })
            }
            className="w-full border p-3 rounded-lg mb-4"
          />

          {/* ADDRESS */}
          <textarea
            placeholder="Address Line"
            value={address.addressLine}
            onChange={(e) =>
              setAddress({
                ...address,
                addressLine: e.target.value,
              })
            }
            className="w-full border p-3 rounded-lg mb-4"
            rows={4}
          />

          {/* CITY */}
          <input
            type="text"
            placeholder="City"
            value={address.city}
            onChange={(e) =>
              setAddress({
                ...address,
                city: e.target.value,
              })
            }
            className="w-full border p-3 rounded-lg mb-4"
          />

          {/* STATE */}
          <input
            type="text"
            placeholder="State"
            value={address.state}
            onChange={(e) =>
              setAddress({
                ...address,
                state: e.target.value,
              })
            }
            className="w-full border p-3 rounded-lg mb-4"
          />

          {/* PINCODE */}
          <input
            type="text"
            placeholder="Pincode"
            value={address.pincode}
            onChange={(e) =>
              setAddress({
                ...address,
                pincode: e.target.value,
              })
            }
            className="w-full border p-3 rounded-lg mb-6"
          />

          {/* BUTTON */}
          <button
            onClick={saveAddress}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
          >
            {loading ? "Processing..." : "Save & Pay"}
          </button>

        </div>

        {/* ✅ SAVED ADDRESSES */}
        <div>

          <h2 className="text-3xl font-bold mb-6 text-yellow-500">
            Saved Addresses
          </h2>

          <div className="space-y-4">

            {savedAddresses.length > 0 ? (

              savedAddresses.map((item) => (

                <div
                  key={item.id}
                  className="bg-white p-5 rounded-xl shadow border"
                >

                  <h3 className="text-xl font-bold mb-2 text-blue-400">
                    {item.name}
                  </h3>

                  <p className="text-gray-700">
                    {item.addressLine}
                  </p>

                  <p className="text-gray-700">
                    {item.city}, {item.state}
                  </p>

                  <p className="text-gray-700">
                    {item.pincode}
                  </p>

                  <p className="text-gray-700 mb-4">
                    {item.mobile}
                  </p>

                  {/* ✅ USE THIS ADDRESS */}
                  <button
                    onClick={() => handlePayment(item.id!)}
                    className="bg-green-600 text-white px-5 py-2 rounded-lg cursor-pointer"
                  >
                    Deliver Here & Pay
                  </button>

                </div>

              ))

            ) : (

              <div className="bg-white p-5 rounded-xl shadow">
                No Saved Addresses
              </div>

            )}

          </div>

        </div>

      </div>

    </div>
  );
}
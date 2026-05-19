"use client"

import { useEffect, useState } from "react";

import axiosInstance from "@/API/axiosInstance";
import PricingCard from "./PricingCard";
import { PLAN_FEATURES } from "@/Data/PlanFeatures";

const SubscriptionPage = () => {
  const [priceDetails, setPriceDetails] = useState<{
    print: any[];
    digital: any[];
  }>({
    print: [],
    digital: [],
  });

  useEffect(() => {
    const fetchPricing = async () => {
      try {
        const res = await axiosInstance.get("/subscriptions/getplans");
        setPriceDetails(res.data.data); // 👈 print + digital object
        console.log("this is grtplan api",res);
      } catch (err) {
        console.log("pricing error", err);
      }
    };

    fetchPricing();
  }, []);
 

  const [selectedPlan, setSelectedPlan] = useState("yearly"); // Default to yearly

  return (
    <div className="font-sans bg-white min-h-screen pb-[50px] w-full">
      <header className="bg-[#ff523b] text-white p-[30px_60px_40px]  mt-20 md:mt-0 md:p-[20px_15px_30px] text-center relative w-full flex flex-col items-center justify-center">
        <h1 className="m-0 text-[32px] md:text-[24px] md:px-[30px] font-extrabold tracking-[0.5px] leading-[1.2]">
          சந்தா திட்டங்கள்
        </h1>
        <p className="m-[10px_0_0] text-[16px] opacity-90 w-full">
          தமிழ் இலக்கியம் மற்றும் பண்பாட்டின் முழு அணுகலைப் பெறுங்கள்
        </p>
      </header>

      <h2 className="text-center text-[24px] font-extrabold m-[40px_0_20px] text-[#1a1a1a]">
        அச்சு இதழ் சந்தா
      </h2>

      <div
        className={`flex gap-5 p-[20px_20px_40px] max-w-[1200px] mx-auto relative z-10 justify-start mt-0 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-thin scrollbar-track-[#f1f1f1] scrollbar-thumb-[#ccc] hover:scrollbar-thumb-[#aaa] flex-row items-stretch`}
      >
        {/* 1 Year */}
        {priceDetails.print.map((plan) => (
          <PricingCard
            key={plan.planCode}
            id={plan.planCode}
            title={plan.name}
            price={`₹${plan.price}`}
            duration={
              plan.durationYears === 0
                ? "நன்கொடை"
                : `${plan.durationYears} ஆண்டுகள்`
            }
            features={PLAN_FEATURES[plan.planCode] || []}
            isSelected={selectedPlan === plan.planCode}
            onSelect={setSelectedPlan}
            amount={plan.price}
            planId={plan.planId}
            purpose="PRINT_SUBSCRIPTION"
          />
        ))}
      </div>

      <h2 className="text-center text-[24px] font-extrabold m-[40px_0_20px] text-[#1a1a1a]">
        டிஜிட்டல் சந்தா
      </h2>

      <div className="flex gap-5 p-[20px_20px_40px] max-w-[1200px] mx-auto relative z-10 justify-center flex-wrap mt-[20px] flex-col items-center lg:flex-row lg:items-stretch">
        {/* Single Issue */}
        {priceDetails.digital.map((plan) => (
          <PricingCard
            key={plan.planCode}
            id={plan.planCode}
            title={plan.name}
            price={`₹${plan.price}`}
            duration={
              plan.durationYears === 0
                ? "ஒரு இதழ்"
                : `${plan.durationYears} ஆண்டுகள்`
            }
            features={PLAN_FEATURES[plan.planCode] || []}
            isSelected={selectedPlan === plan.planCode}
            onSelect={setSelectedPlan}
            amount={plan.price}
            planId={plan.planId}
            purpose="DIGITAL_SUBSCRIPTION"
          />
        ))}
      </div>

      <div className="max-w-[800px] m-[80px_auto_0] px-[20px]">
        <h2 className="text-center text-[22px] font-extrabold mb-[40px] text-[#1a1a1a]">
          அடிக்கடி கேட்கப்படும் கேள்விகள்
        </h2>

        <div className="mb-[30px]">
          <div className="text-[16px] font-bold mb-[10px] text-[#1a1a1a]">
            சந்தா செலுத்தபின் எப்படி இதழ்களை அணுகுவது?
          </div>
          <div className="text-[14px] text-[#666] leading-[1.6]">
            சந்தா செலுத்தியபின், உங்கள் கணக்கில் உள்நுழைந்து எந்த Premium
            இதழ்களையும் கட்டுரைகளையும் படிக்கலாம்.
          </div>
        </div>

        <div className="mb-[30px]">
          <div className="text-[16px] font-bold mb-[10px] text-[#1a1a1a]">
            திரும்பப் பெறும் கொள்கை என்ன?
          </div>
          <div className="text-[14px] text-[#666] leading-[1.6]">
            சந்தா செலுத்திய 7 நாட்களுக்குள் முழு பணத்தையும் திரும்பப் பெறலாம்.
          </div>
        </div>

        <div className="mb-[30px]">
          <div className="text-[16px] font-bold mb-[10px] text-[#1a1a1a]">
            எத்தனை சாதனங்களில் பயன்படுத்தலாம்?
          </div>
          <div className="text-[14px] text-[#666] leading-[1.6]">
            ஒரே நேரத்தில் 3 சாதனங்களில் உங்கள் சந்தாவை பயன்படுத்தலாம்.
          </div>
        </div>

        <div className="mb-[30px]">
          <div className="text-[16px] font-bold mb-[10px] text-[#1a1a1a]">
            சந்தாவை ரத்து செய்ய முடியுமா?
          </div>
          <div className="text-[14px] text-[#666] leading-[1.6]">
            எந்த நேரத்திலும் உங்கள் சந்தாவை ரத்து செய்யலாம். அடுத்த billing
            cycle வரை அணுகல் இருக்கும்.
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPage;

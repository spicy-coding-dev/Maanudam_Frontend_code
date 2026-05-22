import React from "react";
import RazorpayButton from "../payment/RazorpayButton";

const PricingCard = ({
  id,
  title,
  price,
  amount,
  duration,
  features,
  savings = null,
  isSelected,
  onSelect,
  planId,
  purpose,
}: {
  id: string;
  title: string;
  price: string;
  purpose: string;
  amount: number;
  duration: string;
  features: string[];
  savings?: string | null;
  isSelected: boolean;
  onSelect: (id: string) => void;

  planId: number;
}) => {
  return (
    <div
      className={`bg-white rounded-xl p-[30px] min-w-[300px] shadow-[0_4px_20px_rgba(0,0,0,0.08)] flex flex-col relative border border-[#eee] cursor-pointer transition-all hover:-translate-y-[5px] hover:shadow-[0_8px_25px_rgba(0,0,0,0.12)] flex-none snap-start w-[300px] md:w-[350px] ${isSelected ? "border-2 border-[#ff523b] shadow-[0_8px_30px_rgba(255,82,59,0.2)]" : ""}`}
      onClick={() => onSelect(id)}
    >
      <h3 className="text-[20px] font-extrabold m-[0_0_5px] text-[#1a1a1a]">
        {title}
      </h3>
      {savings && (
        <span className="text-[#2e7d32] text-[13px] font-bold mb-[5px] block">
          {savings}
        </span>
      )}
      <div className="mb-[25px] text-[#1a1a1a]">
        <span className="text-[28px] font-black">{price}</span>
        <span className="text-[15px] text-[#666] font-medium">/{duration}</span>
      </div>

      <ul className="list-none p-0 m-[0_0_30px] flex-grow">
        {features.map((feature, index) => (
          <li
            key={index}
            className="flex items-start mb-[14px] text-[14px] text-[#555] leading-[1.5]"
          >
            <span className="text-[#888] mr-[12px] min-w-[16px]">✓</span>
            {feature}
          </li>
        ))}
      </ul>

      <RazorpayButton
        amount={amount}
        purpose={purpose}
        paymentType="SUBSCRIPTION"
        planId={planId}
        disabled={!isSelected}
         requiresAddress={purpose === "PRINT_SUBSCRIPTION"}
      />
    </div>
  );
};

export default PricingCard;

// src/pages/subscriptions/SubscriptionsPage.tsx

import { useEffect, useState } from "react";
import SubscriptionTable from "./SubscriptionTable";
import EditSubscriptionModal from "./EditSubscriptionModel";
import type { SubscriptionPlan } from "./types";
import axiosInstance from "@/API/axiosInstance";


export default function SubscriptionsPage() {
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [editPlan, setEditPlan] =
    useState<SubscriptionPlan | null>(null);


  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      setLoading(true);

      const res = await axiosInstance.get("/subscriptions/getplans");

      // 🔥 backend returns object { print:[], digital:[] }
      const data = res.data?.data;

      const allPlans: SubscriptionPlan[] = [
        ...(data.print || []),
        ...(data.digital || []),
      ];

      setPlans(allPlans);
    } catch (err) {
      console.error("Failed to load subscription plans", err);
      setPlans([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-[#1f3c88]">
          சந்தா பட்டியல்
        </h1>
        <p className="text-gray-500 mt-1">
          அனைத்து சந்தா திட்டங்களை நிர்வகிக்கவும்
        </p>
      </div>

      {/* Table / Loader */}
      {loading ? (
        <div className="bg-white rounded-xl p-8 text-center text-gray-500">
          சந்தா தகவல்கள் ஏற்றப்படுகிறது...
        </div>
      ) : (
        <SubscriptionTable
          plans={plans}
          onEdit={(plan) => setEditPlan(plan)}
        />
      )}

      {/* 🔥 Edit Modal */}
      {editPlan && (
        <EditSubscriptionModal
          plan={editPlan}
          onClose={() => setEditPlan(null)}
          onUpdated={fetchPlans}
        />
      )}
    </div>
  );
}

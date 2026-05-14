"use client";

import { useEffect, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import indiaData from "@/Data/indiaDistricts.json";

import { Visibility, VisibilityOff } from "@mui/icons-material";
import { CircularProgress } from "@mui/material";

import { registerUser } from "@/API/RegisterAuthApi/authApi";


import { toast } from "react-toastify";
import party from "party-js";
import { registerSchema } from "./validationSchema";


/* ===================== TYPES ===================== */

interface RegisterFormData {
  name: string;
  mobile: string;
  email: string;
  country: string;
  state: string;
  district?: string;
  password: string;
  confirmPassword: string;
}

interface Country {
  name: string;
}

interface State {
  name: string;
}

/* ===================== COMPONENT ===================== */

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: yupResolver(registerSchema),
  });

  const [countries, setCountries] = useState<Country[]>([]);
  const [states, setStates] = useState<State[]>([]);
  const [districts, setDistricts] = useState<string[]>([]);
  const [submitLoading, setSubmitLoading] = useState(false);
  const selectedCountry = watch("country");
  const selectedState = watch("state");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  /* COUNTRY */
  useEffect(() => {
    fetch("https://countriesnow.space/api/v0.1/countries/positions")
      .then((res) => res.json())
      .then((data) => setCountries(data.data))
      .catch(() => setCountries([]));
  }, []);

  /* STATE */
  useEffect(() => {
    if (!selectedCountry) return;

    fetch("https://countriesnow.space/api/v0.1/countries/states", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ country: selectedCountry }),
    })
      .then((res) => res.json())
      .then((data) => setStates(data.data.states))
      .catch(() => setStates([]));
  }, [selectedCountry]);

  /* DISTRICT */
  useEffect(() => {
    if (!selectedState) {
      setDistricts([]);
      setValue("district", "");
      return;
    }

    const stateObj = indiaData.states.find(
      (s: any) => s.state === selectedState
    );

    setDistricts(stateObj ? stateObj.districts : []);
    setValue("district", "");
  }, [selectedState, setValue]);

  /* SUBMIT */
  const onSubmit: SubmitHandler<RegisterFormData> = async (data) => {
    try {
      setSubmitLoading(true);

      const { confirmPassword, ...finalData } = data;

      const response = await registerUser(finalData);

      toast.success(response.data?.message,{
        position:"top-right"
      });


      reset();

      party.confetti(document.body, {
        shapes: ["circle", "square", "star"],
        count: 200,
        size: 0.9,
        spread: 45,
        position: { x: 0.5, y: 0.5 },
      } as any);
    } catch (err) {
      console.log(err);
    } finally {
      setSubmitLoading(false);
    }
  };
  const inputClass =
    "w-full rounded-md bg-black text-white mt-1 appearance-none border border-gray-600 px-3 py-2 text-sm focus:outline-none focus:border-yellow-400";
  const labelClass = "text-sm text-gray-300";
  const errorClass = "text-xs text-red-400 mt-1";

  return (
    <>
     <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-md mx-auto grid gap-2"
      >
        {/* Name */}
        <div>
          <label className={labelClass}>முழுப்பெயர் *</label>
          <input
            className={inputClass}
            {...register("name")}
            placeholder="Enter Name"
          />
          <p className={errorClass}>{errors.name?.message}</p>
        </div>

        {/* Mobile */}
        <div>
          <label className={labelClass}>கைபேசி எண் *</label>
          <input
            className={inputClass}
            {...register("mobile")}
            placeholder="Enter Mobile No"
          />
          <p className={errorClass}>{errors.mobile?.message}</p>
        </div>

        {/* Email */}
        <div>
          <label className={labelClass}>மின்னஞ்சல் முகவரி *</label>
          <input
            className={inputClass}
            {...register("email")}
            placeholder="Enter Email"
          />
          <p className={errorClass}>{errors.email?.message}</p>
        </div>

        {/* Country */}
        <div>
          <label className={labelClass}>நாடு *</label>
          <select className={inputClass} {...register("country")}>
            <option value="">Select Country</option>
            {countries.map((c) => (
              <option key={c.name} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
          <p className={errorClass}>{errors.country?.message}</p>
        </div>

        {/* State */}
        <div>
          <label className={labelClass}>மாநிலம் *</label>
          <select className={inputClass} {...register("state")}>
            <option value="">Select State</option>
            {states.map((s) => (
              <option key={s.name} value={s.name}>
                {s.name}
              </option>
            ))}
          </select>
          <p className={errorClass}>{errors.state?.message}</p>
        </div>

        {/* District */}
        <div>
          <label className={labelClass}>மாவட்டம் *</label>
          <select
            className={`${inputClass} disabled:opacity-60`}
            {...register("district")}
            disabled={!selectedState}
          >
            <option value="">
              {selectedState ? "Select District" : "Select State First"}
            </option>
            {districts.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
          <p className={errorClass}>{errors.district?.message}</p>
        </div>

        {/* Password */}
        <div>
          <label className={labelClass}>கடவுச்சொல் *</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
              className={`${inputClass} pr-10`}
              {...register("password")}
            />
            <button
              type="button"
              onClick={() => setShowPassword((p) => !p)}
              
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </button>
          </div>
          <p className={errorClass}>{errors.password?.message}</p>
        </div>

        {/* Confirm Password */}
        <div>
          <label className={labelClass}>கடவுச்சொல் உறுதி *</label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              className={`${inputClass} pr-10`}
              {...register("confirmPassword")}
              placeholder="Enter Confirm Password"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((p) => !p)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            >
              {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
            </button>
          </div>
          <p className={errorClass}>{errors.confirmPassword?.message}</p>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={submitLoading}
          className="mt-2 rounded-md bg-yellow-400 py-2 font-semibold text-black hover:bg-yellow-600 transition flex items-center justify-center gap-2 disabled:opacity-60"
        >
          {submitLoading && <CircularProgress size={20} color="inherit" />}
          {submitLoading ? "Please Wait" : "பதிவு செய்யவும்"}
        </button>
      </form>
    </>
  );
}

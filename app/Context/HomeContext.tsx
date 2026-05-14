"use client";

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import { HomeData } from "../types/HomeContextTypes";



interface HomeContextType {
  homeData: HomeData | null;
  setHomeData: React.Dispatch<
    React.SetStateAction<HomeData | null>
  >;
}

const HomeContext = createContext<HomeContextType | undefined>(
  undefined
);

export const HomeProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [homeData, setHomeData] = useState<HomeData | null>(null);

  return (
    <HomeContext.Provider value={{ homeData, setHomeData }}>
      {children}
    </HomeContext.Provider>
  );
};

export const useHome = () => {
  const context = useContext(HomeContext);

  if (!context) {
    throw new Error("useHome must be used inside HomeProvider");
  }

  return context;
};

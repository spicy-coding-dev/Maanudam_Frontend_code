import { baseURL } from "@/API/axiosInstance";
import HomeClient from "./HomeClient";

async function getHomeData() {
  const res = await fetch(`${baseURL}/user/home`, {
    cache: "no-store",
  });

  const data = await res.json();
  return data.data;
}

export default async function Home() {
  const homeData = await getHomeData();

  return <HomeClient homeData={homeData} />;
}

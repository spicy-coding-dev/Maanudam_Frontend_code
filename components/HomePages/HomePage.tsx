import { baseURL } from "@/API/axiosInstance";
import HomeClient from "./HomeClient";
import { toast } from "react-toastify";

async function getHomeData() {
  try{
     const res = await fetch(`${baseURL}/user/home`, {
    cache: "no-store",
  });

  const data = await res.json();
  return data.data;
  }
  catch(err:any){
   console.log(err)
  }
 
}

export default async function Home() {
  const homeData = await getHomeData();

  return <HomeClient homeData={homeData} />;
}

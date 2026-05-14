import React from 'react'

const FooterBanner = () => {
  return (
    <div className="relative">
        <img
          src="/MaanudamLogo.jpeg"
          alt="newsletter"
          className="w-full h-[220px] object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-black/60 flex flex-col md:flex-row items-center justify-between gap-4 px-6 md:px-16">
          <h2 className="text-xl md:text-2xl font-semibold max-w-lg">
            புதிய புத்தகங்களின் தகவல்களைப் பெற எங்கள் செய்திமடலுக்கு சந்தா
            செலுத்துங்கள்
          </h2>

          <div className="flex">
            <input
              type="email"
              placeholder="Type your email here"
              className="px-4 py-2 text-white border border-red-50 outline-none w-64"
            />
            <button className="bg-[#f4a640] px-6 py-2 font-semibold">
              SUBSCRIBE
            </button>
          </div>
        </div>
      </div>
  )
}

export default FooterBanner
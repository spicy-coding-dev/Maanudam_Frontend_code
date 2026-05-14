import Link from "next/link";
import Image from "next/image";
import { Mail, Map, Phone } from "lucide-react";

import FooterBanner from "./FooterBanner";

export default function Footer() {
  return (
    <footer className="bg-black text-white overflow-hidden">

      <FooterBanner />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 px-6 md:px-16 py-16">

        {/* Logo */}
        <div>
          <Link href="/">
            <Image
              src="/MaanudamLogo.jpeg"
              alt="Maanudam"
              width={110}
              height={110}
              className="mb-4 cursor-pointer rounded-full"
            />
          </Link>

          <p className="text-sm text-white/80">
            தமிழ் இலக்கிய மற்றும் பண்பாட்டு மின்னிதழ்
          </p>
        </div>

        {/* Categories */}
        <div>
          <h3 className="font-semibold mb-4">பிரிவுகள்</h3>

          <ul className="space-y-2 text-sm">
            {[
              { name: "வரலாறு", slug: "history" },
              { name: "சமூகம்", slug: "society" },
              { name: "இலக்கியம்", slug: "literature" },
              { name: "பண்பாடு", slug: "culture" },
              { name: "சூழலியல்", slug: "environment" },
            ].map((item) => (
              <li key={item.slug}>
                <Link
                  href={`/category/${item.slug}`}
                  className="text-white/80 hover:text-[#d4af37] transition"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Extra Links */}
        <div>
          <h3 className="font-semibold mb-4">விரிவு இணைப்புகள்</h3>

          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/magazines" className="footer-link">
                இதழ்கள்
              </Link>
            </li>

            <li>
              <Link href="/subscribe" className="footer-link">
                சந்தா
              </Link>
            </li>

            <li>
              <Link href="/privacy-policy" className="footer-link">
                தனியுரிமை கொள்கை
              </Link>
            </li>

            <li>
              <Link href="/terms" className="footer-link">
                விதிமுறைகள்
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-semibold mb-4">தொடர்பு</h3>

          <ul className="space-y-3 text-sm text-white/80">
            <li className="flex gap-3">
              <Mail size={18} />
              <a
                href="mailto:info@manudam.com"
                className="hover:text-[#d4af37]"
              >
                info@manudam.com
              </a>
            </li>

            <li className="flex gap-3">
              <Phone size={18} />
              <a
                href="tel:+919876543210"
                className="hover:text-[#d4af37]"
              >
                +91 98765 43210
              </a>
            </li>

            <li className="flex gap-3">
              <Map size={18} />
              சென்னை, தமிழ்நாடு
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-white/10 text-center py-4 text-sm text-white/60">
        © 2026 மனிதம் இதழ். அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.
      </div>

    </footer>
  );
}

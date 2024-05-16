import React from "react";
import Image from "next/image";
import logo from "@/assets/Logo.png";
import Link from "next/link";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <div className="w-full py-[4%] bg-darkRed">
      <div className="px-[4%] md:!px-[8%] h-[32vh] md:!h-[40vh] flex flex-col justify-between">
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-y-5">
            <div className="flex items-center">
              <Image
                src={logo}
                alt="Logo"
                width={56}
                height={56}
                className="!w-12 !h-12 md:!w-14 md:!h-14 object-contain"
              />
              <p
                className={`w-min text-white text-base md:text-xl font-black uppercase tracking-[6px] font-LatoBold !leading-5 md:!leading-[26px]`}
              >
                Blood Bridge
              </p>
            </div>
            <nav>
              <ul className="flex items-center gap-x-8">
                <Link href={"/reviews"}>
                  <li className="tracking-tight font-LatoRegular text-white  first-letter:uppercase">
                    Reviews
                  </li>
                </Link>
                <Link href={"/blood-banks"}>
                  <li className="tracking-tight font-LatoRegular text-white  first-letter:uppercase">
                    Blood Banks
                  </li>
                </Link>
                <Link href={"/event"}>
                  <li className="tracking-tight font-LatoRegular text-white  first-letter:uppercase">
                    Events
                  </li>
                </Link>
              </ul>
            </nav>
          </div>
          <div className="flex flex-col gap-y-2.5">
            <div className="bg-white rounded-full p-[3px]">
              <Facebook
                className="min-w-[20px] min-h-[20px]"
                size={20}
                fill="#0866FF"
                color="transparent"
              />
            </div>
            <div className="bg-white rounded-full p-[3px]">
              <Instagram
                className="min-w-[20px] min-h-[20px]"
                size={20}
                color="#CD3E8A"
              />
            </div>
            <div className="bg-white rounded-full p-[3px]">
              <Twitter
                className="min-w-[20px] min-h-[20px]"
                size={20}
                fill="#1DA1F2"
                color="transparent"
              />
            </div>
            <div className="bg-white rounded-full p-[3px]">
              <Linkedin
                className="min-w-[20px] min-h-[20px]"
                size={20}
                fill="#0077B5"
                color="transparent"
              />
            </div>
          </div>
        </div>
        <div className="w-full border-t-2 border-zinc-400">
          <nav className="mt-7">
            <ul className="flex items-center gap-x-2 sm:!gap-x-3 md:!gap-x-5">
              <Link href={"/"}>
                <li className="tracking-tight font-LatoRegular text-zinc-400 text-xs md:!text-sm  first-letter:uppercase">
                  Terms & Conditions
                </li>
              </Link>
              <div className="border-r border-zinc-400 h-3.5" />
              <Link href={"/"}>
                <li className="tracking-tight font-LatoRegular text-zinc-400 text-xs md:!text-sm  first-letter:uppercase">
                  Privacy Policy
                </li>
              </Link>
              <div className="border-r border-zinc-400 h-3.5" />
              <Link href={"/"}>
                <li className="tracking-tight font-LatoRegular text-zinc-400 text-xs md:!text-sm  first-letter:uppercase">
                  Accessibility
                </li>
              </Link>
              <div className="border-r border-zinc-400 h-3.5" />
              <Link href={"/"}>
                <li className="tracking-tight font-LatoRegular text-zinc-400 text-xs md:!text-sm  first-letter:uppercase">
                  Legal
                </li>
              </Link>
              <div className="border-r border-zinc-400 h-3.5" />
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Footer;

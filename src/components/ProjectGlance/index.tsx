"use client";

import { useEffect, useRef, useState } from "react";
import { HiOutlineOfficeBuilding } from "@react-icons/all-files/hi/HiOutlineOfficeBuilding";
import { HiOutlineLocationMarker } from "@react-icons/all-files/hi/HiOutlineLocationMarker";
// import { MdOutlineLocalParking } from "@react-icons/all-files/md/MdOutlineLocalParking";
// import { MdOutlineHotel } from "@react-icons/all-files/md/MdOutlineHotel";
// import { MdOutlinePool } from "@react-icons/all-files/md/MdOutlinePool";
// import { BsBank2 } from "@react-icons/all-files/bs/BsBank2";
// import { BsBuildingCheck } from "@react-icons/all-files/bs/BsBuildingCheck";
import { FaRegBuilding } from "@react-icons/all-files/fa/FaRegBuilding";
import { TbBuildingSkyscraper } from "react-icons/tb";
import { PiOfficeChair } from "react-icons/pi";
import { MdOutlineLocalParking } from "react-icons/md";
import { BsBank2 } from "react-icons/bs";
import { MdOutlineHotel } from "react-icons/md";
import { MdOutlinePool } from "react-icons/md";
import { BsBuildingCheck } from "react-icons/bs";

const floors = [
  {
    id: 1,
    label: "Tower",
    floors: "32-Storey",
    detail: "Commercial Tower",
    icon: <TbBuildingSkyscraper size={22} />,
  },
  {
    id: 2,
    label: "Parking",
    floors: "4 Floors",
    detail: "Automated Basement Parking",
    icon: <MdOutlineLocalParking size={22} />,
  },
  {
    id: 3,
    label: "Ground Floor",
    floors: "Ground",
    detail: "5-star standard common lobby, medical room",
    icon: <HiOutlineOfficeBuilding size={22} />,
  },
  {
    id: 4,
    label: "1st–4th Floors",
    floors: "1st–4th",
    detail: "Banks, business centers, financial institutions, executive offices",
    icon: <BsBank2 size={20} />,
  },
  {
    id: 5,
    label: "5th–25th Floors",
    floors: "5th–25th",
    detail: "Premium Grade-A office spaces with top-tier amenities",
    icon: <PiOfficeChair size={22} />,
  },
  {
    id: 6,
    label: "26th–31st Floors",
    floors: "26th–31st",
    detail: "Premium 5-star hotel",
    icon: <MdOutlineHotel size={22} />,
  },
  {
    id: 7,
    label: "32nd Floor",
    floors: "32nd",
    detail: "Rooftop swimming pool and sauna",
    icon: <MdOutlinePool size={22} />,
  },
];

const stats = [
  { value: "32", unit: "Storeys", label: "Iconic Tower", icon: <TbBuildingSkyscraper size={20} /> },
  { value: "20", unit: "Kathas", label: "Prime Land", icon: <HiOutlineLocationMarker size={20} /> },
  { value: "5★", unit: "Hotel", label: "26th–31st Floor", icon: <MdOutlineHotel size={20} /> },
  { value: "2", unit: "Partners", label: "Joint Venture", icon: <BsBuildingCheck size={20} /> },
];

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

export default function ProjectGlance() {
  const { ref, inView } = useInView(0.1);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600;700&family=Montserrat:wght@300;400;500;600;700&display=swap');
        .font-display { font-family: 'Cormorant Garamond', serif; }
        .font-ui      { font-family: 'Montserrat', sans-serif; }

        @keyframes fadeUp {
          from { opacity:0; transform:translateY(40px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity:0; }
          to   { opacity:1; }
        }
        @keyframes lineGrow {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
        @keyframes cardIn {
          from { opacity:0; transform:translateY(36px) scale(0.97); }
          to   { opacity:1; transform:translateY(0) scale(1); }
        }
        @keyframes countUp {
          from { opacity:0; transform:translateY(16px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }

        .animate-fadeUp   { animation: fadeUp  0.8s ease both; }
        .animate-fadeIn   { animation: fadeIn  0.7s ease both; }
        .animate-lineGrow { animation: lineGrow 0.9s cubic-bezier(0.77,0,0.18,1) both; transform-origin: left; }
        .animate-cardIn   { animation: cardIn  0.7s cubic-bezier(0.34,1.26,0.64,1) both; }
        .animate-countUp  { animation: countUp 0.7s ease both; }

        .gold-shimmer {
          background: linear-gradient(90deg, #EEA62A 0%, #e8d5a3 40%, #EEA62A 60%, #8a6e3a 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 4s linear infinite;
        }
        .card-glow:hover {
          box-shadow: 0 0 0 1px rgba(184,154,94,0.45), 0 8px 32px rgba(184,154,94,0.10);
        }
        .bg-dot-pattern {
          background-image: radial-gradient(circle, rgba(184,154,94,0.11) 1px, transparent 1px);
          background-size: 28px 28px;
        }
      `}</style>

      <section
        ref={ref}
        className="font-ui relative w-full bg-[#0f0d0a] overflow-hidden py-24 lg:py-36"
      >
        {/* Dot pattern */}
        <div className="absolute inset-0 bg-dot-pattern opacity-40 pointer-events-none" />

        {/* Top glow line */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[2px] bg-gradient-to-r from-transparent via-[#EEA62A]/60 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">

          {/* ── Header ── */}
          <div className="mb-16 lg:mb-24">
            <div
              className={`flex items-center gap-3 mb-5 ${inView ? "animate-fadeIn" : "opacity-0"}`}
              style={{ animationDelay: "0.1s" }}
            >
              <span
                className={`block h-px bg-[#EEA62A] origin-left ${inView ? "animate-lineGrow" : "opacity-0"}`}
                style={{ width: 40, animationDelay: "0.2s" }}
              />
              <span className="text-[#EEA62A] text-[10px] font-semibold tracking-[0.25em] uppercase">
                Project at a Glance
              </span>
            </div>

            <h2
              className={`font-display text-white font-semibold leading-[1.06] mb-6 ${inView ? "animate-fadeUp" : "opacity-0"}`}
              style={{ fontSize: "clamp(2.4rem,5vw,4.5rem)", animationDelay: "0.25s" }}
            >
              A Joint Venture by{" "}
              <span className="gold-shimmer">Headroom Group</span>
              <br className="hidden sm:block" />
              {" "}& Asiatic Laboratories PLC
            </h2>

            <p
              className={`text-white/55 font-light leading-[1.85] max-w-2xl ${inView ? "animate-fadeUp" : "opacity-0"}`}
              style={{ fontSize: "clamp(13px,1.2vw,15px)", animationDelay: "0.4s" }}
            >
              Times Square, Tejgaon is a bold new landmark of architectural innovation and
              commercial excellence in the heart of Dhaka. Strategically located opposite the
              Roads &amp; Highways Department office, this iconic 32-storey tower rises on{" "}
              <span className="text-[#EEA62A] font-medium">20 kathas of prime land</span> — and
              is now open for booking.
            </p>
          </div>

          {/* ── Stats ── */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-[#EEA62A]/15 rounded-sm mb-20 overflow-hidden">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className={`bg-[#0f0d0a] px-6 py-7 flex flex-col gap-2 ${inView ? "animate-countUp" : "opacity-0"}`}
                style={{ animationDelay: `${0.5 + i * 0.1}s` }}
              >
                <span className="text-[#EEA62A]">{s.icon}</span>
                <span
                  className="font-display text-[#EEA62A] font-bold leading-none"
                  style={{ fontSize: "clamp(2rem,3.5vw,3rem)" }}
                >
                  {s.value}
                  <span className="text-[55%] ml-1 #EEA62A">{s.unit}</span>
                </span>
                <span className="text-white text-[11px] font-medium tracking-[0.12em] uppercase">
                  {s.label}
                </span>
              </div>
            ))}
          </div>

          {/* ── Floor cards ── */}
          <div
            className={`${inView ? "animate-fadeUp" : "opacity-0"}`}
            style={{ animationDelay: "0.6s" }}
          >
            <div className="flex items-center gap-3 mb-8">
              <span className="text-white/30 text-[10px] font-semibold tracking-[0.2em] uppercase">
                Floor Breakdown
              </span>
              <span className="flex-1 h-px bg-white/8" />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {floors.map((floor, i) => (
                <div
                  key={floor.id}
                  className={`card-glow group relative bg-[#161410] border border-white/8 hover:border-[#EEA62A]/40 rounded-xl p-5 sm:p-6 flex flex-col gap-3 cursor-default transition-all duration-300 hover:-translate-y-1 ${inView ? "animate-cardIn" : "opacity-0"}`}
                  style={{ animationDelay: `${0.65 + i * 0.08}s` }}
                >
                  {/* Icon */}
                  <span className="text-[#EEA62A]/70 group-hover:text-[#EEA62A] transition-colors duration-300">
                    {floor.icon}
                  </span>

                  {/* Floor badge */}
                  <span className="inline-flex self-start items-center px-2.5 py-1 bg-[#EEA62A]/10 border border-[#EEA62A]/25 text-[#EEA62A] text-[10px] font-semibold tracking-[0.14em] uppercase rounded-sm">
                    {floor.floors}
                  </span>

                  {/* Label */}
                  <p className="text-white font-semibold text-[13px] sm:text-sm leading-snug tracking-wide">
                    {floor.label}
                  </p>

                  {/* Detail */}
                  <p className="text-white text-[12px] font-light leading-relaxed flex-1">
                    {floor.detail}
                  </p>

                  {/* Hover accent line */}
                  <span className="block w-0 group-hover:w-full h-px bg-gradient-to-r from-[#EEA62A]/60 to-transparent transition-all duration-500 ease-out" />
                </div>
              ))}

              {/* CTA card */}
              <div
                className={`relative bg-[#EEA62A] rounded-xl p-5 sm:p-6 flex flex-col justify-between gap-4 overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:brightness-110 ${inView ? "animate-cardIn" : "opacity-0"}`}
                style={{ animationDelay: `${0.65 + floors.length * 0.08}s` }}
              >
                <div className="absolute top-0 right-0 w-28 h-28 bg-white/10 rounded-full -translate-y-10 translate-x-10 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-black/10 rounded-full translate-y-6 -translate-x-6 pointer-events-none" />

                <div className="relative z-10 flex items-center gap-2 text-[#1a1612]/70">
                  <FaRegBuilding size={18} />
                  <span className="text-[10px] font-semibold tracking-[0.15em] uppercase">
                    Times Square
                  </span>
                </div>

                <p
                  className="font-display text-[#1a1612] font-bold leading-snug relative z-10"
                  style={{ fontSize: "clamp(1.1rem,1.8vw,1.4rem)" }}
                >
                  Now Open<br />for Booking
                </p>

                <a
                  href="/book"
                  className="relative z-10 inline-flex items-center gap-2 bg-[#1a1612] text-[#EEA62A] text-[11px] font-semibold tracking-[0.14em] uppercase px-4 py-2.5 rounded-sm self-start transition-all duration-200 hover:bg-[#2a2018]"
                >
                  Book Now →
                </a>
              </div>
            </div>
          </div>

          {/* ── Footer strip ── */}
         

        </div>

        {/* Bottom glow line */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-[#EEA62A]/40 to-transparent" />
      </section >
    </>
  );
}
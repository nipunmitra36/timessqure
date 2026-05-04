"use client";

import { useEffect, useRef, useState } from "react";

// ── Types ────────────────────────────────────────────────────────────────────

interface FormData {
    name: string;
    company: string;
    email: string;
    phone: string;
    message: string;
    interests: string[];
}

interface FormErrors {
    name?: string;
    email?: string;
    message?: string;
}

type SubmitState = "idle" | "loading" | "success";

// ── Constants ────────────────────────────────────────────────────────────────

const INTEREST_CHIPS = [
    "Commercial Space",
    "Hospitality",
    "Investment",
    "Partnership",
    "General Enquiry",
];

const INFO_ITEMS = [
    {
        label: "Address",
        value: "89, Kakrail, Green City Edge\nLevel–11, Dhaka 1217",
        href: "https://maps.google.com/?q=89+Kakrail+Green+City+Edge+Dhaka+1217",
        icon: (
            <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#EEA62A"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                <circle cx="12" cy="10" r="3" />
            </svg>
        ),
    },
    {
        label: "Phone",
        value: "+880 1515 664 405",
        href: "tel:+8801515664405",
        icon: (
            <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#EEA62A"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
            </svg>
        ),
    },
    {
        label: "Email",
        value: "info@headroombd.com",
        href: "mailto:info@headroombd.com",
        icon: (
            <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#EEA62A"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
            </svg>
        ),
    },
];

// ── Utility hook ─────────────────────────────────────────────────────────────

function useInView(threshold = 0.06) {
    const ref = useRef<HTMLDivElement>(null);
    const [inView, setInView] = useState(false);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(
            ([e]) => {
                if (e.isIntersecting) {
                    setInView(true);
                    obs.disconnect();
                }
            },
            { threshold }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, [threshold]);
    return { ref, inView };
}

// ── Sub-components ───────────────────────────────────────────────────────────

function InputIcon({ children }: { children: React.ReactNode }) {
    return (
        <span className="cf-input-icon pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 transition-colors duration-200">
            {children}
        </span>
    );
}

function TextareaIcon({ children }: { children: React.ReactNode }) {
    return (
        <span className="cf-textarea-icon pointer-events-none absolute left-3 top-3 transition-colors duration-200">
            {children}
        </span>
    );
}

// ── Button class helper (outside component to avoid TS narrowing issues) ─────

function getSubmitButtonClass(state: SubmitState): string {
    const base =
        "relative mt-6 flex w-full cursor-pointer items-center justify-center gap-3 overflow-hidden rounded-xl px-6 py-[15px] font-[Montserrat] text-[11px] font-semibold uppercase tracking-[0.22em] text-white transition-all duration-300";
    if (state === "loading") return `${base} bg-[#EEA62A] pointer-events-none`;
    if (state === "success") return `${base} bg-green-800 pointer-events-none`;
    return `${base} bg-[#1a1612] hover:bg-[#EEA62A] hover:-translate-y-[2px] hover:shadow-[0_8px_30px_rgba(184,154,94,0.3)] active:scale-[0.98]`;
}

// ── Main component ───────────────────────────────────────────────────────────

export default function ContactForm() {
    const { ref, inView } = useInView();

    const [form, setForm] = useState<FormData>({
        name: "",
        company: "",
        email: "",
        phone: "",
        message: "",
        interests: [],
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const [focused, setFocused] = useState<string | null>(null);
    const [submitState, setSubmitState] = useState<SubmitState>("idle");

    // ── Handlers ──────────────────────────────────────────────────────────────

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        if (errors[name as keyof FormErrors]) {
            setErrors((prev) => ({ ...prev, [name]: undefined }));
        }
    };

    const toggleInterest = (chip: string) => {
        setForm((prev) => ({
            ...prev,
            interests: prev.interests.includes(chip)
                ? prev.interests.filter((i) => i !== chip)
                : [...prev.interests, chip],
        }));
    };

    const validate = (): boolean => {
        const newErrors: FormErrors = {};
        if (!form.name.trim()) newErrors.name = "Please enter your name";
        if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
            newErrors.email = "Enter a valid email address";
        if (!form.message.trim()) newErrors.message = "Please include a message";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validate()) return;
        setSubmitState("loading");

        // Replace with your actual API call, e.g.:
        // await fetch("/api/contact", { method: "POST", body: JSON.stringify(form) });
        await new Promise((res) => setTimeout(res, 1800));

        setSubmitState("success");
    };

    const resetForm = () => {
        setForm({ name: "", company: "", email: "", phone: "", message: "", interests: [] });
        setErrors({});
        setSubmitState("idle");
    };

    // ── Field helpers ─────────────────────────────────────────────────────────

    const fieldClass = (name: string) =>
        [
            "cf-field group relative flex flex-col gap-[5px] mb-[14px]",
            focused === name ? "focused" : "",
            errors[name as keyof FormErrors] ? "has-error" : "",
        ]
            .filter(Boolean)
            .join(" ");

    const inputClass =
        "w-full rounded-[11px] border border-[#e8e2da] bg-[#faf8f5] pl-10 pr-4 py-[11px] font-[Montserrat] text-[12.5px] text-[#1a1612] outline-none transition-all duration-200 placeholder:text-[#c5bdb7] placeholder:font-light focus:border-[rgba(184,154,94,0.6)] focus:bg-white focus:shadow-[0_0_0_3px_rgba(184,154,94,0.1)]";

    return (
        <>
            {/* ── Global styles ── */}
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Montserrat:wght@300;400;500;600;700&display=swap');

        .cf-display { font-family: 'Cormorant Garamond', serif; }
        .cf-ui      { font-family: 'Montserrat', sans-serif; }

        @keyframes cf-fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes cf-fadeIn {
          from { opacity: 0; } to { opacity: 1; }
        }
        @keyframes cf-lineGrow {
          from { transform: scaleX(0); } to { transform: scaleX(1); }
        }
        @keyframes cf-shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        @keyframes cf-cardIn {
          from { opacity: 0; transform: translateY(24px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes cf-spin {
          to { transform: rotate(360deg); }
        }
        @keyframes cf-submitShimmer {
          0%   { background-position: -200% 0; }
          100% { background-position:  200% 0; }
        }
        @keyframes cf-pop {
          from { transform: scale(0.5); opacity: 0; }
          to   { transform: scale(1);   opacity: 1; }
        }
        @keyframes cf-pulse {
          0%, 100% { box-shadow: 0 0 0 3px rgba(34,197,94,0.2); }
          50%       { box-shadow: 0 0 0 6px rgba(34,197,94,0.08); }
        }
        @keyframes cf-dotBlink {
          0%, 100% { opacity: 0.15; }
          50%       { opacity: 0.5; }
        }

        .cf-animate-fadeUp  { animation: cf-fadeUp  0.7s ease both; }
        .cf-animate-fadeIn  { animation: cf-fadeIn  0.6s ease both; }
        .cf-animate-lineGrow{ animation: cf-lineGrow 0.8s cubic-bezier(0.77,0,0.18,1) both; transform-origin: left; }
        .cf-animate-cardIn  { animation: cf-cardIn  0.7s cubic-bezier(0.25,0.46,0.45,0.94) both; }

        .cf-gold-text {
          background: linear-gradient(90deg,#EEA62A 0%,#e8d5a3 45%,#EEA62A 60%,#8a6e3a 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: cf-shimmer 4s linear infinite;
        }

        .cf-submit-shimmer {
          background: linear-gradient(90deg, transparent 20%, rgba(255,255,255,0.1) 50%, transparent 80%);
          background-size: 200% 100%;
          animation: cf-submitShimmer 1.5s ease infinite;
        }

        .cf-spinner {
          width: 15px; height: 15px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: cf-spin 0.7s linear infinite;
          flex-shrink: 0;
        }

        .cf-success-circle { animation: cf-pop 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards; }

        .cf-live-dot { animation: cf-pulse 2s ease infinite; }

        .cf-input-icon { color: #c5bdb7; }
        .focused .cf-input-icon { color: #EEA62A; }
        .has-error .cf-input-icon { color: #c0392b; }

        .cf-textarea-icon { color: #c5bdb7; }
        .focused .cf-textarea-icon { color: #EEA62A; }

        .cf-label { color: #9c8f84; transition: color 0.2s ease; }
        .focused .cf-label { color: #EEA62A; }
        .has-error .cf-label { color: #c0392b; }

        .has-error input,
        .has-error textarea {
          border-color: rgba(192,57,43,0.5) !important;
          box-shadow: 0 0 0 3px rgba(192,57,43,0.07) !important;
        }
      `}</style>

            <section
                ref={ref}
                className="cf-ui relative w-full overflow-hidden bg-white py-16 lg:py-24"
            >
                {/* Dot texture */}
                <div
                    className="pointer-events-none absolute inset-0 opacity-[0.025]"
                    style={{
                        backgroundImage: "radial-gradient(circle, #EEA62A 1px, transparent 1px)",
                        backgroundSize: "28px 28px",
                    }}
                />
                <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-[#EEA62A]/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#EEA62A]/25 to-transparent" />

                <div className="relative mx-auto grid max-w-6xl grid-cols-1 gap-10 px-5 sm:px-8 lg:grid-cols-[1fr_1.45fr] lg:gap-14 lg:px-12">

                    {/* ── Left panel ── */}
                    <div className="lg:sticky lg:top-8">
                        {/* Eyebrow */}
                        <div
                            className={`mb-4 flex items-center gap-3 ${inView ? "cf-animate-fadeIn" : "opacity-0"}`}
                            style={{ animationDelay: "0.05s" }}
                        >
                            <span
                                className={`block h-px w-9 bg-[#EEA62A] origin-left ${inView ? "cf-animate-lineGrow" : "opacity-0"}`}
                                style={{ animationDelay: "0.08s" }}
                            />
                            <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#EEA62A]">
                                Send an Enquiry
                            </span>
                        </div>

                        {/* Heading */}
                        <h2
                            className={`cf-display text-[#1a1612] font-bold leading-[1.05] ${inView ? "cf-animate-fadeUp" : "opacity-0"}`}
                            style={{
                                fontSize: "clamp(2rem,4vw,3.4rem)",
                                animationDelay: "0.15s",
                            }}
                        >
                            Let&apos;s <span className="cf-gold-text">Connect</span>
                        </h2>

                        {/* Description */}
                        <p
                            className={`mt-4 max-w-[300px] text-[12px] font-light leading-relaxed tracking-wide text-gray-900 ${inView ? "cf-animate-fadeUp" : "opacity-0"}`}
                            style={{ animationDelay: "0.25s" }}
                        >
                            Whether you&apos;re exploring a commercial space, a hospitality partnership,
                            or simply want to learn more — our team is ready to assist.
                        </p>

                        {/* Divider */}
                        <div
                            className={`my-6 h-px w-12 bg-[#EEA62A]/40 ${inView ? "cf-animate-fadeIn" : "opacity-0"}`}
                            style={{ animationDelay: "0.35s" }}
                        />

                        {/* Info list */}
                        <div className="flex flex-col gap-4">
                            {INFO_ITEMS.map((item, i) => (
                                <div
                                    key={item.label}
                                    className={`flex items-start gap-3 group ${inView ? "cf-animate-fadeUp" : "opacity-0"}`}
                                    style={{ animationDelay: `${0.4 + i * 0.1}s` }}
                                >
                                    <div className="flex h-[34px] w-[34px] flex-shrink-0 items-center justify-center rounded-[9px] border border-[#f0ebe4] bg-[#faf8f5] transition-all duration-300 group-hover:border-[rgba(184,154,94,0.3)] group-hover:bg-[rgba(184,154,94,0.1)]">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <p className="mb-[3px] text-[9px] font-semibold uppercase tracking-[0.18em] text-[#EEA62A]">
                                            {item.label}
                                        </p>
                                        <a
                                            href={item.href}
                                            target={item.href.startsWith("http") ? "_blank" : undefined}
                                            rel="noreferrer"
                                            className="whitespace-pre-line text-[12px] text-[#1a1612] transition-colors duration-200 hover:text-[#EEA62A]"
                                            style={{ textDecoration: "none" }}
                                        >
                                            {item.value}
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Hours badge */}
                        <div
                            className={`mt-8 inline-flex flex-col items-start gap-1 rounded-2xl border border-[#EEA62A]/25 bg-gradient-to-br from-[#fdf9f3] to-white px-5 py-4 ${inView ? "cf-animate-fadeIn" : "opacity-0"}`}
                            style={{ animationDelay: "0.75s" }}
                        >
                            <div className="flex items-center gap-2">
                                <span
                                    className="cf-live-dot h-2 w-2 rounded-full bg-green-500"
                                    style={{ boxShadow: "0 0 0 3px rgba(34,197,94,0.2)" }}
                                />
                                <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-gray-900">
                                    Office Hours
                                </span>
                            </div>
                            <p className="text-[12px] font-medium text-[#1a1612]">9:00 AM – 6:00 PM</p>
                            <p className="text-[10px] text-gray-900">Sunday – Thursday</p>
                        </div>
                    </div>

                    {/* ── Right panel — form card ── */}
                    <div
                        className={`overflow-hidden rounded-3xl border border-[#e8e2da] bg-white ${inView ? "cf-animate-cardIn" : "opacity-0"}`}
                        style={{ animationDelay: "0.35s" }}
                    >
                        {/* Accent stripe */}
                        <div className="h-[3px] w-full bg-gradient-to-r from-[#EEA62A55] via-[#EEA62A] to-[#EEA62A55]" />

                        {/* ── Success pane ── */}
                        {submitState === "success" ? (
                            <div className="flex flex-col items-center justify-center gap-5 px-10 py-16 text-center">
                                <div className="cf-success-circle flex h-16 w-16 items-center justify-center rounded-full border border-green-800/25 bg-green-900/10">
                                    <svg
                                        width="26"
                                        height="26"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="#166534"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <polyline points="20 6 9 17 4 12" />
                                    </svg>
                                </div>
                                <h3 className="cf-display text-[1.8rem] font-bold text-[#1a1612]">
                                    Message Sent
                                </h3>
                                <p className="max-w-[260px] text-[12px] leading-relaxed text-gray-900">
                                    Thank you for reaching out. Our team will be in touch within 1–2
                                    business days.
                                </p>
                                <button
                                    onClick={resetForm}
                                    className="mt-2 rounded-[10px] border border-[#EEA62A]/40 px-6 py-[9px] text-[10.5px] font-semibold uppercase tracking-[0.15em] text-[#EEA62A] transition-all duration-200 hover:bg-[rgba(184,154,94,0.08)] cursor-pointer bg-transparent"
                                >
                                    Send Another Message
                                </button>
                            </div>
                        ) : (
                            /* ── Form pane ── */
                            /* submitState is narrowed to "idle" | "loading" here */
                            <div className="p-7 sm:p-8 lg:p-9">
                                <h3 className="cf-display mb-1 text-[1.4rem] font-semibold text-[#1a1612]">
                                    Send a Message
                                </h3>
                                <p className="mb-7 text-[10.5px] tracking-wide text-gray-900">
                                    We typically respond within 1–2 business days.
                                </p>

                                {/* Name + Company */}
                                <div className="mb-[14px] grid grid-cols-1 gap-[14px] sm:grid-cols-2">
                                    <div className={fieldClass("name")}>
                                        <label className="cf-label text-[9.5px] font-semibold uppercase tracking-[0.18em]">
                                            Full Name *
                                        </label>
                                        <div className="relative">
                                            <InputIcon>
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                                                    <circle cx="12" cy="7" r="4" />
                                                </svg>
                                            </InputIcon>
                                            <input
                                                name="name"
                                                value={form.name}
                                                onChange={handleChange}
                                                onFocus={() => setFocused("name")}
                                                onBlur={() => setFocused(null)}
                                                placeholder="Your full name"
                                                className={inputClass}
                                            />
                                        </div>
                                        {errors.name && (
                                            <span className="text-[9.5px] font-medium tracking-wide text-[#c0392b]">
                                                {errors.name}
                                            </span>
                                        )}
                                    </div>

                                    <div className={fieldClass("company")}>
                                        <label className="cf-label text-[9.5px] font-semibold uppercase tracking-[0.18em]">
                                            Company
                                        </label>
                                        <div className="relative">
                                            <InputIcon>
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                                    <rect x="2" y="7" width="20" height="14" rx="1" />
                                                    <path d="M16 7V5a2 2 0 00-4 0v2M8 7V5a2 2 0 00-4 0v2" />
                                                </svg>
                                            </InputIcon>
                                            <input
                                                name="company"
                                                value={form.company}
                                                onChange={handleChange}
                                                onFocus={() => setFocused("company")}
                                                onBlur={() => setFocused(null)}
                                                placeholder="Organisation (optional)"
                                                className={inputClass}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Email + Phone */}
                                <div className="mb-[14px] grid grid-cols-1 gap-[14px] sm:grid-cols-2">
                                    <div className={fieldClass("email")}>
                                        <label className="cf-label text-[9.5px] font-semibold uppercase tracking-[0.18em]">
                                            Email *
                                        </label>
                                        <div className="relative">
                                            <InputIcon>
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                                    <polyline points="22,6 12,13 2,6" />
                                                </svg>
                                            </InputIcon>
                                            <input
                                                name="email"
                                                type="email"
                                                value={form.email}
                                                onChange={handleChange}
                                                onFocus={() => setFocused("email")}
                                                onBlur={() => setFocused(null)}
                                                placeholder="your@email.com"
                                                className={inputClass}
                                            />
                                        </div>
                                        {errors.email && (
                                            <span className="text-[9.5px] font-medium tracking-wide text-[#c0392b]">
                                                {errors.email}
                                            </span>
                                        )}
                                    </div>

                                    <div className={fieldClass("phone")}>
                                        <label className="cf-label text-[9.5px] font-semibold uppercase tracking-[0.18em]">
                                            Phone
                                        </label>
                                        <div className="relative">
                                            <InputIcon>
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                                                </svg>
                                            </InputIcon>
                                            <input
                                                name="phone"
                                                type="tel"
                                                value={form.phone}
                                                onChange={handleChange}
                                                onFocus={() => setFocused("phone")}
                                                onBlur={() => setFocused(null)}
                                                placeholder="+880 ..."
                                                className={inputClass}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Interest chips */}
                                <div className="mb-5">
                                    <p className="mb-[10px] text-[9.5px] font-semibold uppercase tracking-[0.15em] text-gray-900">
                                        Area of Interest
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {INTEREST_CHIPS.map((chip) => {
                                            const active = form.interests.includes(chip);
                                            return (
                                                <button
                                                    key={chip}
                                                    type="button"
                                                    onClick={() => toggleInterest(chip)}
                                                    className={[
                                                        "rounded-full border px-[14px] py-[7px] text-[10.5px] font-medium transition-all duration-200 cursor-pointer",
                                                        active
                                                            ? "border-[#EEA62A] bg-[rgba(184,154,94,0.1)] text-[#EEA62A] font-semibold"
                                                            : "border-[#e8e2da] bg-[#faf8f5] text-gray-900 hover:border-[rgba(184,154,94,0.4)] hover:text-[#EEA62A] hover:bg-[rgba(184,154,94,0.06)]",
                                                    ].join(" ")}
                                                >
                                                    {chip}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Message */}
                                <div className={fieldClass("message")}>
                                    <label className="cf-label text-[9.5px] font-semibold uppercase tracking-[0.18em]">
                                        Message *
                                    </label>
                                    <div className="relative">
                                        <TextareaIcon>
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                                            </svg>
                                        </TextareaIcon>
                                        <textarea
                                            name="message"
                                            value={form.message}
                                            onChange={handleChange}
                                            onFocus={() => setFocused("message")}
                                            onBlur={() => setFocused(null)}
                                            placeholder="Tell us about your enquiry…"
                                            rows={5}
                                            className={`${inputClass} resize-none pt-3 leading-relaxed`}
                                            style={{ height: "110px" }}
                                        />
                                    </div>
                                    {errors.message && (
                                        <span className="text-[9.5px] font-medium tracking-wide text-[#c0392b]">
                                            {errors.message}
                                        </span>
                                    )}
                                </div>

                                {/* Submit button */}
                                <button
                                    type="button"
                                    onClick={handleSubmit}
                                    disabled={submitState === "loading"}
                                    className={getSubmitButtonClass(submitState)}
                                >
                                    {submitState === "loading" && (
                                        <span className="cf-submit-shimmer pointer-events-none absolute inset-0" />
                                    )}
                                    {submitState === "loading" && <span className="cf-spinner" />}
                                    <span>
                                        {submitState === "loading" ? "Sending…" : "Send Enquiry"}
                                    </span>
                                    {submitState === "idle" && (
                                        <svg
                                            width="14"
                                            height="14"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2.2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <line x1="22" y1="2" x2="11" y2="13" />
                                            <polygon points="22 2 15 22 11 13 2 9 22 2" />
                                        </svg>
                                    )}
                                </button>

                                {/* Privacy note */}
                                <div className="mt-4 flex items-center gap-2">
                                    <svg
                                        className="flex-shrink-0 text-[#c5bdb7]"
                                        width="12"
                                        height="12"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                        <path d="M7 11V7a5 5 0 0110 0v4" />
                                    </svg>
                                    <span className="text-[9.5px] tracking-wide text-[#b3a89e]">
                                        Your information is confidential and will only be used to respond to your enquiry.
                                    </span>
                                </div>
                            </div>
                        )}

                        {/* Bottom strip */}
                        <div className="flex flex-wrap items-center gap-5 border-t border-[#f5f0eb] bg-[#fdf9f3] px-7 py-5">
                            <div className="flex items-center gap-2">
                                <span className="h-[6px] w-[6px] rounded-full bg-green-500" />
                                <span className="text-[10px] text-gray-900">Response time:</span>
                                <span className="text-[10px] font-medium text-[#1a1612]">1–2 Business Days</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="h-[6px] w-[6px] rounded-full bg-[#EEA62A]" />
                                <span className="text-[10px] text-gray-900">Hours:</span>
                                <span className="text-[10px] font-medium text-[#1a1612]">Sun–Thu, 9 AM–6 PM</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
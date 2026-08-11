"use client";

import { FormEvent, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import CountUpModule from "react-countup";

const CountUp = (CountUpModule as any).default || CountUpModule;

const testimonials = [
  {
    imgUrl: "/testimonial-1.jpg",
    videoUrl: "https://res.cloudinary.com/dd3olj1ax/video/upload/v1761892348/vls-testimonal3_ajrnrk.mp4"
  },
  {
    imgUrl: "/testimonial-2.png",
    videoUrl: "https://res.cloudinary.com/dd3olj1ax/video/upload/v1762343697/vls_testimonal4_fmdamk.mp4"
  },
  {
    imgUrl: "/testimonial-3.png",
    videoUrl: "https://res.cloudinary.com/dd3olj1ax/video/upload/v1761891831/vls-testimoanl1_ddcvpb.mp4"
  }
];

const modules = [
  {
    number: "01",
    label: "Module 1 — Case Analysis Strategy",
    title: "Turn a client narrative into a clear legal framework.",
    description:
      "Learn how to use AI to understand and analyse a case before initiating legal proceedings.",
    topics: [
      "Identifying material facts",
      "Identifying legal issues",
      "Applicable legal provisions",
      "Understanding burden of proof",
    ],
    outcome:
      "Organise case information without allowing AI to make the final legal determination.",
  },
  {
    number: "02",
    label: "Module 2 — Litigation Strategy",
    title: "Evaluate the legal and procedural roadmap before filing.",
    description:
      "Use AI to develop an effective litigation strategy by evaluating the legal and procedural aspects of a case.",
    topics: [
      "Maintainability & jurisdiction",
      "Alternative remedies",
      "Limitation & appropriate forum",
      "Interim reliefs & necessary parties",
    ],
    outcome:
      "Build a repeatable litigation-strategy checklist for every new brief.",
  },
  {
    number: "03",
    label: "Module 3 — Drafting Court Documents",
    title: "Move from a blank page to a structured first draft.",
    description:
      "Learn how AI can assist in preparing legal documents while ensuring that the advocate reviews and finalises every draft.",
    topics: [
      "Plaint & written statement",
      "Affidavit & bail application",
      "Revision & review petitions",
      "Legal notice & writ petition",
    ],
    outcome:
      "Improve drafting speed without surrendering accuracy, reasoning, or responsibility.",
  },
];

const problems = [
  {
    icon: "01",
    title: "Too many tools. No legal roadmap.",
    text: "Most advocates hear about AI platforms without being shown how to structure a reliable legal workflow.",
  },
  {
    icon: "02",
    title: "AI answers cannot be blindly trusted.",
    text: "Provisions, precedents, facts, and citations must be independently checked against authoritative sources.",
  },
  {
    icon: "03",
    title: "Client confidentiality is non-negotiable.",
    text: "Sensitive client information and case documents require responsible, privacy-conscious handling.",
  },
  {
    icon: "04",
    title: "Generic prompts produce generic results.",
    text: "Useful output begins with verified facts, a clear legal objective, and precise professional instructions.",
  },
];

const outcomes = [
  "Convert client narratives into structured case facts",
  "Frame stronger, more precise legal questions",
  "Prepare a litigation-strategy checklist",
  "Build first drafts of common court documents",
  "Identify unreliable or fabricated AI outputs",
  "Protect client confidentiality while using AI",
  "Verify provisions, judgments, and citations",
  "Create a responsible AI-assisted workflow",
];

const audiences = [
  ["Practicing Advocates", "Improve research, analysis, drafting, and litigation preparation."],
  ["Junior Advocates", "Build confidence and structure during the early years of practice."],
  ["Independent Practitioners", "Save time with repeatable workflows while protecting quality."],
  ["Law Graduates", "Understand how modern legal practice is evolving beyond textbooks."],
  ["Judiciary Aspirants", "Strengthen issue identification and structured legal analysis."],
  ["Legal Researchers", "Explore responsible AI use in legal research, teaching, and writing."],
];

const faqs = [
  [
    "Do I need technical or programming knowledge?",
    "No. The masterclass is designed for advocates and law graduates. No coding or technical background is required.",
  ],
  [
    "Will the course teach AI to replace an advocate?",
    "No. The central principle is that AI assists the advocate. Legal judgment, ethics, advice, strategy, and representation remain human responsibilities.",
  ],
  [
    "Can I use AI-generated drafts directly in court?",
    "No. Every output must be reviewed, corrected, legally verified, and finalised by a qualified advocate before it is used or filed.",
  ],
  [
    "Can AI-generated case citations be trusted?",
    "They must always be independently verified. AI may produce inaccurate, incomplete, outdated, or fabricated citations.",
  ],
  [
    "Will confidentiality and ethical use be covered?",
    "Yes. Responsible handling of client information, professional verification, and advocate accountability are part of the learning framework.",
  ],
  [
    "What are the date, fee, language, and session mode?",
    "The masterclass will be held on 15 August. It will be conducted Online in Tamil. The enrollment fee is ₹499.",
  ],
];

const MASTERCLASS_CONFIG = {
  title: "AI for Advocates",
  amount: 499,
  programm_date: "2026-08-15",
  page_name: "ai-for-advocates",
  whatsapp_programm_name: "3-hour AI for Advocates masterclass",
  whatsapp_schedule: "Saturday, August 15, 2026 10:30 AM - 01:30 PM IST",
  whatsapp_platform: "Google Meet",
  whatsapp_link_date: "Friday, 14 August",
  google_sheet_url: "https://script.google.com/macros/s/AKfycbzfD03oohvLJa2PbFd28v-YJsgEizuuczoyMleifFlAuGbl23TpV29FyhM_FaW41mxo/exec"
};

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .matches(/^[a-zA-Z ]*$/, "Invalid name (letters and spaces only)")
    .optional(),
  email: Yup.string()
    .email("Enter valid email")
    .test("is-lowercase", "Email must be lowercase", (value) => !value || value === value.toLowerCase())
    .required("Email required"),
  mobile: Yup.string()
    .matches(/^[0-9]{10}$/, "Invalid mobile number (10 digits)")
    .required("Mobile required"),
  experience: Yup.string().optional()
});

function RegistrationForm({ compact = false }: { compact?: boolean }) {
  const [isInstructionOpen, setIsInstructionOpen] = useState(false);
  const [agree, setAgree] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingMessage, setProcessingMessage] = useState("");

  const [ipAddress, setIpAddress] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Clear old payment details on load
    if (typeof window !== "undefined") {
      localStorage.removeItem("PaymentDetails");
    }

    // Fetch IP Address
    fetch("https://api.ipify.org?format=json")
      .then((res) => res.json())
      .then((data) => setIpAddress(data.ip || ""))
      .catch(() => setIpAddress(""));
  }, []);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      mobile: "",
      experience: ""
    },
    validationSchema: validationSchema,
    onSubmit: () => {
      setAgree(false);
      setIsInstructionOpen(true);
    }
  });

  const handleAgreeAndPay = async () => {
    setIsInstructionOpen(false);
    setIsProcessing(true);
    setProcessingMessage("Initiating payment...");

    const { name, email, mobile, experience } = formik.values;
    const cleanMobile = mobile.replace(/\s+/g, "");

    try {
      // Call create-order API
      const res = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // body: JSON.stringify({ amount: MASTERCLASS_CONFIG.amount }),
        body: JSON.stringify({ amount: 1 }),
      });

      if (!res.ok) {
        throw new Error("Failed to create Razorpay order");
      }

      const order = await res.json();
      setIsProcessing(false);

      // Open Razorpay Checkout
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        // key: "rzp_test_Ss2NFtpJFLRAiw",
        amount: order.amount,
        currency: order.currency,
        name: name || "Advocate",
        order_id: order.id,
        description: `${MASTERCLASS_CONFIG.title} - Rs.${MASTERCLASS_CONFIG.amount}`,
        prefill: {
          name: name,
          email: email,
          contact: cleanMobile,
        },
        theme: { color: "#a51f24" },
        handler: async (response: any) => {
          setIsProcessing(true);
          setProcessingMessage("Processing your registration...");

          if (!response?.razorpay_payment_id) {
            window.location.href = "/error";
            return;
          }

          // Read UTM Parameters
          const getUTM = (key: string) => {
            if (typeof window === "undefined") return "";
            try {
              return localStorage.getItem(key) || "";
            } catch {
              return "";
            }
          };

          // Build final payload
          const apiPayload = {
            name: name || "",
            email: email,
            mobile: `+91${cleanMobile}`,
            yearsOfPractice: experience,
            amount: MASTERCLASS_CONFIG.amount,
            programm_date: MASTERCLASS_CONFIG.programm_date,
            razorpay_order_id: response.razorpay_order_id || "",
            razorpay_payment_id: response.razorpay_payment_id || "",
            razorpay_signature: response.razorpay_signature || "",
            payment_status: "paid",
            captured: response.captured || "",
            page_name: MASTERCLASS_CONFIG.page_name,
            ip_address: ipAddress,
            utm_source: getUTM("utm_source"),
            utm_medium: getUTM("utm_medium"),
            utm_campaign: getUTM("utm_campaign"),
            utm_term: getUTM("utm_term"),
            utm_content: getUTM("utm_content"),
          };

          // Submit to Google Sheets
          try {
            const params = new URLSearchParams();
            Object.keys(apiPayload).forEach((key) =>
              params.append(key, String((apiPayload as any)[key] ?? ""))
            );

            await fetch(MASTERCLASS_CONFIG.google_sheet_url, {
              method: "POST",
              headers: { "Content-Type": "application/x-www-form-urlencoded" },
              body: params.toString(),
            });
          } catch (err) {
            console.error("Failed to save to Google Sheets:", err);
          }

          // Submit to Invictus Lead Backend API
          try {
            const getApiBaseUrl = () => {
              if (
                typeof window !== "undefined" &&
                (window.location.hostname === "localhost" ||
                  window.location.hostname === "127.0.0.1")
              ) {
                return (
                  process.env.NEXT_PUBLIC_LOCALHOST_API_URL ||
                  "http://localhost:8000/api/v1"
                );
              }
              const server = process.env.NEXT_PUBLIC_API_SERVER;
              if (server === "production") {
                return (
                  process.env.NEXT_PUBLIC_PRODUCTION_API_URL ||
                  "https://invictusleadbackend-production.up.railway.app/api/v1"
                );
              }
              if (server === "stage") {
                return (
                  process.env.NEXT_PUBLIC_STAGE_API_URL ||
                  "https://stageapi.invictusglobaltech.com/api/v1"
                );
              }
              return (
                process.env.NEXT_PUBLIC_LOCALHOST_API_URL ||
                "http://localhost:8000/api/v1"
              );
            };

            const baseUrl = getApiBaseUrl();
            await fetch(`${baseUrl}/vls-ai-for-advocates/register`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "X-Client-Key": "vls_law",
              },
              body: JSON.stringify(apiPayload),
            });
          } catch (err) {
            console.error("Failed to save to Invictus Backend API:", err);
          }

          // Store in LocalStorage and redirect
          try {
            localStorage.setItem("PaymentDetails", JSON.stringify(apiPayload));
          } catch (err) {
            console.error("Failed to save local details:", err);
          }

          window.location.href = "/thank-you";
        },
        modal: {
          ondismiss: () => {
            setIsProcessing(false);
          },
        },
      };

      const razor = new (window as any).Razorpay(options);

      razor.on("payment.failed", () => {
        window.location.href = "/error";
      });

      razor.open();
    } catch (err) {
      console.error(err);
      setIsProcessing(false);
      window.location.href = "/error";
    }
  };

  return (
    <>
      <form
        className={compact ? "registration-form compact" : "registration-form"}
        onSubmit={formik.handleSubmit}
        data-testid={compact ? "final-registration" : "hero-registration"}
      >
        {!compact && (
          <div className="form-heading">
            <span>Secure enrollment</span>
            <h3>Register & Enroll</h3>
            <p>Complete your payment to secure your seat for the Masterclass.</p>
          </div>
        )}
        <label>
          <span>Full name</span>
          <input
            name="name"
            placeholder="Your full name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.name && formik.errors.name && (
            <span className="error-message">{formik.errors.name}</span>
          )}
        </label>
        <label>
          <span>Email address</span>
          <input
            name="email"
            type="email"
            placeholder="you@example.com"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email && (
            <span className="error-message">{formik.errors.email}</span>
          )}
        </label>
        <label>
          <span>Mobile number</span>
          <div className="mobile-input-container">
            <span className="country-prefix">+91</span>
            <input
              name="mobile"
              inputMode="tel"
              placeholder="98765 43210"
              value={formik.values.mobile}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
          {formik.touched.mobile && formik.errors.mobile && (
            <span className="error-message">{formik.errors.mobile}</span>
          )}
        </label>
        <label>
          <span>Years of practice</span>
          <input
            name="experience"
            inputMode="numeric"
            placeholder="0, 1, 5..."
            value={formik.values.experience}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </label>
        <button className="primary-button form-button interactive-button" type="submit" aria-live="polite">
          Pay & Enroll — Rs.{MASTERCLASS_CONFIG.amount}
        </button>
        {!compact && (
          <div className="form-trust" aria-label="Registration benefits">
            <span>✓ Instant WhatsApp confirmation</span>
            <span>✓ 100% Secure Checkout</span>
          </div>
        )}
        <small role="status" aria-live="polite">Secure transaction processed by Razorpay</small>
      </form>

      {/* Payment Instruction Modal */}
      {isInstructionOpen && mounted && typeof document !== "undefined" && createPortal(
        <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="modal-title">
          <div className="modal-content">
            <h4 id="modal-title">Important Payment Instructions</h4>
            <p>Please review and agree to the following before proceeding:</p>
            <ul>
              <li><strong>Do not refresh</strong> or close this page during the payment process.</li>
              <li>Wait to be <strong>automatically redirected</strong> to the thank-you page after completion.</li>
              <li>Closing the window early may result in registration details not being recorded.</li>
            </ul>
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
              />
              <span>I understand and agree to these instructions.</span>
            </label>
            <div className="modal-actions">
              <button
                type="button"
                className="modal-btn secondary-btn"
                onClick={() => setIsInstructionOpen(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="modal-btn primary-btn"
                disabled={!agree}
                onClick={handleAgreeAndPay}
              >
                I Agree & Pay
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* Processing Loader Modal */}
      {isProcessing && mounted && typeof document !== "undefined" && createPortal(
        <div className="modal-overlay" role="dialog" aria-modal="true">
          <div className="modal-content processing-content">
            <div className="spinner" />
            <p>{processingMessage}</p>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}

function AnimatedCounter({
  end,
  duration = 2,
  suffix = "",
  prefix = "",
  padZero = false,
  formatComma = false
}: {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  padZero?: boolean;
  formatComma?: boolean;
}) {
  return (
    <CountUp
      className="counter-value"
      end={end}
      duration={duration}
      prefix={prefix}
      suffix={suffix}
      separator={formatComma ? "," : ""}
      formattingFn={
        padZero
          ? (value: any) => (value < 10 ? "0" + value : value.toString())
          : undefined
      }
      enableScrollSpy
      scrollSpyOnce
    />
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const root = document.documentElement;

    // Capture UTM Parameters on mount
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const utmKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"];
      let hasUtm = false;

      utmKeys.forEach((key) => {
        const val = urlParams.get(key);
        if (val) {
          localStorage.setItem(key, val);
          hasUtm = true;
        }
      });

      if (!hasUtm) {
        if (!localStorage.getItem("utm_source")) {
          const referrer = document.referrer;
          if (referrer && !referrer.includes("localhost") && !referrer.includes("127.0.0.1")) {
            try {
              const refUrl = new URL(referrer);
              localStorage.setItem("utm_source", refUrl.hostname);
              localStorage.setItem("utm_medium", "referral");
            } catch {
              localStorage.setItem("utm_source", "direct");
              localStorage.setItem("utm_medium", "none");
            }
          } else {
            localStorage.setItem("utm_source", "direct");
            localStorage.setItem("utm_medium", "none");
          }
          localStorage.setItem("utm_campaign", "none");
          localStorage.setItem("utm_term", "none");
          localStorage.setItem("utm_content", "none");
        }
      }
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const revealTargets = Array.from(
      document.querySelectorAll<HTMLElement>(
        ".section-heading, .objective-grid, .problem-card, .gap-panel, .module-card, .core-message-card, .rules-grid article, .roadmap article, .outcome-list > div, .faculty-portrait, .faculty-copy, .audience-grid article, .testimonial-grid figure, .faq-list details, .enrollment-copy, .registration-form"
      )
    );

    revealTargets.forEach((element, index) => {
      element.classList.add("reveal-item");
      element.style.setProperty("--reveal-delay", `${Math.min(index % 6, 5) * 55}ms`);
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -7% 0px" }
    );

    if (reduceMotion) revealTargets.forEach((element) => element.classList.add("is-visible"));
    else revealTargets.forEach((element) => observer.observe(element));

    let ticking = false;
    const updateScroll = () => {
      const scrollY = window.scrollY;
      const maximum = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      root.style.setProperty("--scroll-progress", `${Math.min(scrollY / maximum, 1)}`);
      root.style.setProperty("--parallax-y", `${Math.min(scrollY * 0.12, 110)}px`);
      setHeaderScrolled(scrollY > 20);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(updateScroll);
      }
    };

    const consoleCard = document.querySelector<HTMLElement>(".ai-console");
    const hero = document.querySelector<HTMLElement>(".hero");
    const onPointerMove = (event: PointerEvent) => {
      if (!consoleCard || reduceMotion || window.innerWidth < 900) return;
      const rect = consoleCard.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      consoleCard.style.setProperty("--tilt-x", `${y * -4}deg`);
      consoleCard.style.setProperty("--tilt-y", `${x * 5}deg`);
    };
    const resetTilt = () => {
      consoleCard?.style.setProperty("--tilt-x", "0deg");
      consoleCard?.style.setProperty("--tilt-y", "0deg");
    };
    const onHeroPointerMove = (event: PointerEvent) => {
      if (!hero || reduceMotion || window.innerWidth < 760) return;
      const rect = hero.getBoundingClientRect();
      root.style.setProperty("--hero-pointer-x", `${event.clientX - rect.left}px`);
      root.style.setProperty("--hero-pointer-y", `${event.clientY - rect.top}px`);
    };

    updateScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    consoleCard?.addEventListener("pointermove", onPointerMove);
    consoleCard?.addEventListener("pointerleave", resetTilt);
    hero?.addEventListener("pointermove", onHeroPointerMove);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      consoleCard?.removeEventListener("pointermove", onPointerMove);
      consoleCard?.removeEventListener("pointerleave", resetTilt);
      hero?.removeEventListener("pointermove", onHeroPointerMove);
    };
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <main>
      <div className="scroll-progress" aria-hidden="true" />
      <header className={`site-header${headerScrolled ? " scrolled" : ""}`}>
        <div className="container header-inner">
          <a className="brand" href="#top" aria-label="VLS Law Academy home">
            <img src="/vls-logo.png" alt="VLS Law Academy" />
          </a>
          <button className={`menu-toggle${menuOpen ? " open" : ""}`} type="button" aria-label="Toggle navigation" aria-expanded={menuOpen} data-testid="mobile-menu-toggle" onClick={() => setMenuOpen((open) => !open)}>
            <span /><span />
          </button>
          <nav className={menuOpen ? "open" : ""} aria-label="Primary navigation">
            <a href="#why" onClick={closeMenu}>Why this course</a>
            <a href="#curriculum" onClick={closeMenu}>Curriculum</a>
            <a href="#faculty" onClick={closeMenu}>Faculty</a>
            <a href="#faq" onClick={closeMenu}>FAQs</a>
            <a className="mobile-nav-cta" href="#register" onClick={closeMenu}>Join early access</a>
          </nav>
          <a className="header-cta interactive-button" href="#register">Join early access</a>
        </div>
      </header>

      <section className="hero" id="top">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-spotlight" aria-hidden="true" />
        <div className="hero-orb hero-orb-one" aria-hidden="true" />
        <div className="hero-orb hero-orb-two" aria-hidden="true" />
        <div className="hero-particles" aria-hidden="true">
          <i /><i /><i /><i /><i /><i />
        </div>
        <div className="container hero-layout">
          <div className="hero-copy">
            <div className="eyebrow"><span /> VLS Law Academy • Practical Masterclass</div>
            <h1>
              AI for
              <em> Advocates</em>
            </h1>
            <div className="hero-directive">AI can be your Assistant. <span>AI cannot replace an Advocate.</span></div>
            <p className="hero-lead">
              Learn how to use Artificial Intelligence for case analysis, litigation strategy, and legal drafting—without compromising accuracy, confidentiality, ethics, or professional responsibility.
            </p>
            <div className="hero-promise">
              <div><b>✓</b><span><strong>Assistant to Advocate</strong>Research, analyse, prepare, and draft faster.</span></div>
              <div><b>×</b><span><strong>Not a Substitute to Advocate</strong>Judgment and accountability stay with the advocate.</span></div>
            </div>
            <div className="hero-actions">
              <a className="primary-button interactive-button" href="#register">Register for early access <span>↗</span></a>
              <a className="text-link" href="#curriculum">Explore the curriculum <span>↓</span></a>
            </div>
            <div className="event-note">
              <span className="pulse" /> Date: 15 August · Mode: Online · Language: Tamil · Fee: ₹499
            </div>
          </div>
          <div className="hero-side">
            <RegistrationForm />
          </div>
        </div>
      </section>

      <section className="facts-bar" aria-label="Course highlights">
        <div className="container facts-grid">
          <div>
            <strong>
              <AnimatedCounter end={3} padZero />
            </strong>
            <span>Core modules</span>
          </div>
          <div>
            <strong>
              <AnimatedCounter end={8} padZero />
            </strong>
            <span>Court documents</span>
          </div>
          <div>
            <strong>
              <AnimatedCounter end={100} suffix="%" />
            </strong>
            <span>Advocate-controlled</span>
          </div>
          <div>
            <strong>Zero</strong>
            <span>Technical experience needed</span>
          </div>
        </div>
      </section>

      <section className="course-objective" aria-label="Course objective">
        <div className="container objective-grid">
          <div>
            <span className="kicker">Course objective</span>
            <h2>Use AI effectively. Keep the advocate in control.</h2>
          </div>
          <p>Artificial Intelligence is transforming the legal profession by enabling advocates to work more efficiently, accurately, and productively. This course is designed to help advocates use AI as a legal assistant in case analysis, litigation strategy, and legal drafting, while emphasising that AI can never replace an advocate’s professional judgment, ethics, and responsibilities.</p>
        </div>
      </section>

      <section className="section problem-section" id="why">
        <div className="container">
          <div className="section-heading centered">
            <span className="kicker">The practice gap</span>
            <h2>AI is entering legal practice.<br />Most advocates were never shown how to direct it.</h2>
            <p>The issue is not whether advocates should use AI. It is how to use it without losing control of the law, the facts, or the professional duty owed to the client.</p>
          </div>
          <div className="problem-grid">
            {problems.map((problem) => (
              <article className="problem-card" key={problem.title}>
                <span>{problem.icon}</span>
                <h3>{problem.title}</h3>
                <p>{problem.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section manifesto-section">
        <div className="container manifesto-grid">
          <div className="manifesto-mark" aria-hidden="true">
            <span>AI</span>
            <div />
            <b>ADVOCATE</b>
          </div>
          <div className="manifesto-copy">
            <span className="kicker light">Why this masterclass</span>
            <h2>AI can improve the way you work. It cannot carry your professional responsibility.</h2>
            <p>This program shows how a legally trained professional can use AI as a controlled productivity and thinking tool—from the first client narrative to a reviewed working draft.</p>
            <ul>
              <li><span>01</span>Think with greater structure</li>
              <li><span>02</span>Prepare with greater speed</li>
              <li><span>03</span>Verify with professional care</li>
            </ul>
            <a className="light-link" href="#curriculum">See what you’ll learn <span>↗</span></a>
          </div>
        </div>
      </section>

      <section className="section gap-section">
        <div className="container gap-grid">
          <div className="gap-panel gap-before">
            <div className="panel-label">THE GAP</div>
            <h3>Knowing about AI is not the same as knowing how to use it legally.</h3>
            <ul>
              <li>Unstructured prompts and generic results</li>
              <li>No reliable verification process</li>
              <li>Fear of fabricated citations</li>
              <li>Uncertainty about confidentiality</li>
              <li>No practical drafting workflow</li>
            </ul>
          </div>
          <div className="gap-arrow" aria-hidden="true">→</div>
          <div className="gap-panel gap-after">
            <div className="panel-label">THE FIX</div>
            <h3>A clear, advocate-controlled method for analysis, strategy, and drafting.</h3>
            <ul>
              <li>Structure facts and legal issues</li>
              <li>Evaluate procedure before filing</li>
              <li>Build court-document first drafts</li>
              <li>Verify every legal output</li>
              <li>Protect professional responsibility</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section curriculum-section" id="curriculum">
        <div className="container">
          <div className="section-heading split-heading">
            <div><span className="kicker">The curriculum</span><h2>Three modules.<br />One responsible workflow.</h2></div>
            <p>Progress from understanding a brief to evaluating the litigation path and preparing a professionally reviewed first draft.</p>
          </div>
          <div className="module-list">
            {modules.map((module) => (
              <article className="module-card" key={module.number}>
                <div className="module-number">{module.number}</div>
                <div className="module-main">
                  <span>{module.label}</span>
                  <h3>{module.title}</h3>
                  <p>{module.description}</p>
                </div>
                <div className="module-topics">
                  {module.topics.map((topic) => <div key={topic}><i>✓</i>{topic}</div>)}
                </div>
                <div className="module-outcome"><span>Outcome</span>{module.outcome}</div>
              </article>
            ))}
          </div>
          <div className="documents-strip">
            <span>Documents covered</span>
            <div>PLAINT</div><div>WRITTEN STATEMENT</div><div>AFFIDAVIT</div><div>BAIL APPLICATION</div><div>REVISION</div><div>LEGAL NOTICE</div><div>WRIT</div><div>REVIEW</div>
          </div>
        </div>
      </section>

      <section className="core-message-section">
        <div className="container core-message-card">
          <span className="core-number">CORE / 01</span>
          <div>
            <span className="kicker light">Course core message</span>
            <h2>AI is a powerful legal assistant. The advocate remains responsible.</h2>
          </div>
          <p>Artificial Intelligence can enhance an advocate’s efficiency in research, analysis, drafting, and legal strategy. However, AI is only a tool. Responsibility for legal advice, professional ethics, strategic decision-making, and courtroom representation will always remain with the advocate.</p>
        </div>
      </section>

      <section className="responsible-section">
        <div className="container responsible-grid">
          <div className="responsible-title">
            <span className="kicker light">Responsible AI framework</span>
            <h2>Six rules that never leave the advocate’s desk.</h2>
            <p>AI-generated work is a starting point. Professional review is the standard.</p>
          </div>
          <div className="rules-grid">
            {[
              ["01", "Protect confidentiality", "Do not expose identifiable client information without appropriate safeguards."],
              ["02", "Verify the law", "Check every provision, judgment, quotation, and procedural requirement."],
              ["03", "Check the facts", "Ensure AI has not altered, omitted, assumed, or invented material facts."],
              ["04", "Apply judgment", "The advocate decides the advice, strategy, relief, and final language."],
              ["05", "Own accountability", "Ethics, filing, representation, and advice remain human responsibilities."],
              ["06", "Never file unverified", "No AI draft should reach a client or court without professional review."],
            ].map(([number, title, text]) => (
              <article key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>
            ))}
          </div>
        </div>
      </section>

      <section className="section roadmap-section">
        <div className="container">
          <div className="section-heading centered narrow"><span className="kicker">Course flow</span><h2>From question to verified legal work.</h2></div>
          <div className="roadmap">
            {[
              ["01", "Introduction", "Understand AI as an assistant—and why it is never a substitute for an advocate."],
              ["02", "Case analysis", "Identify facts, legal issues, applicable provisions, and burden of proof."],
              ["03", "Litigation strategy", "Assess maintainability, jurisdiction, remedies, limitation, forum, reliefs, and parties."],
              ["04", "Court documents", "Draft, review, and verify plaints, statements, affidavits, applications, notices, and petitions."],
            ].map(([step, title, text]) => (
              <article key={step}><span>{step}</span><h3>{title}</h3><p>{text}</p></article>
            ))}
          </div>
        </div>
      </section>

      <section className="section outcomes-section">
        <div className="container outcomes-grid">
          <div className="outcomes-copy"><span className="kicker">What you will gain</span><h2>Leave with a system—not a list of tools.</h2><p>Build a repeatable way to think, prepare, draft, and verify while keeping the advocate firmly in control.</p><a className="primary-button interactive-button" href="#register">Join early access <span>↗</span></a></div>
          <div className="outcome-list">
            {outcomes.map((outcome, index) => <div key={outcome}><span>{String(index + 1).padStart(2, "0")}</span>{outcome}</div>)}
          </div>
        </div>
      </section>

      <section className="section faculty-section" id="faculty">
        <div className="container faculty-grid">
          <div className="faculty-portrait">
            <div className="portrait-frame"><img src="/dr-sivakumar.svg" alt="Dr. Sivakumar Sivaprakasam" /></div>
            <div className="experience-stamp"><strong><AnimatedCounter end={20} suffix="+" /></strong><span>Years of<br />mentorship</span></div>
          </div>
          <div className="faculty-copy">
            <span className="kicker">Your faculty</span>
            <h2>Dr. Sivakumar Sivaprakasam</h2>
            <h4>B.Sc., M.L., Ph.D. (Law) · Lawyer, Chennai High Court</h4>
            <p>Dr. Sivakumar has trained more than 250 Tamil Nadu Judicial Services aspirants and over 1,200 Tamil Nadu Civil Services candidates. Since 2003, he has mentored candidates across law, economy, and public administration for UPSC and TNPSC examinations.</p>
            <div className="faculty-stats">
              <div><strong><AnimatedCounter end={250} suffix="+" /></strong><span>Judicial services aspirants trained</span></div>
              <div><strong><AnimatedCounter end={1200} suffix="+" formatComma /></strong><span>Civil services candidates mentored</span></div>
              <div><strong><AnimatedCounter end={2003} prefix="Since " /></strong><span>Teaching and mentoring experience</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="section audience-section">
        <div className="container">
          <div className="section-heading centered"><span className="kicker">Who should attend</span><h2>Built for people who work with the law.</h2><p>No technical background required. Bring your legal thinking and your curiosity.</p></div>
          <div className="audience-grid">
            {audiences.map(([title, text], index) => <article key={title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{title}</h3><p>{text}</p></article>)}
          </div>
        </div>
      </section>

      <section className="vls-section">
        <div className="container vls-grid">
          <div><img src="/vls-logo.png" alt="VLS Law Academy" /></div>
          <div className="vls-copy"><span className="kicker light">Why VLS Law Academy</span><h2>Practical legal education for a changing profession.</h2><p>VLS bridges the gap between knowing the law and applying it professionally. AI for Advocates continues that mission by preparing legal professionals for a rapidly evolving practice environment.</p></div>
          <ul><li>Experienced legal faculty</li><li>Practice-focused learning</li><li>Courtroom-oriented guidance</li><li>Structured support for young advocates</li><li>Chennai-based legal learning community</li></ul>
        </div>
      </section>

      <section className="section testimonial-section">
        <div className="container">
          <div className="section-heading split-heading"><div><span className="kicker">Student voices</span><h2>Trusted by the VLS legal learning community.</h2></div><p>Approved student feedback from VLS programs and practical legal training.</p></div>
          <div className="testimonial-grid">
            {testimonials.map((item, index) => (
              <figure 
                key={index} 
                className="testimonial-card"
                onClick={() => setActiveVideo(item.videoUrl)}
              >
                <img src={item.imgUrl} alt="VLS Law Academy student testimonial" />
                <div className="play-button-overlay">
                  <span className="play-icon">▶</span>
                </div>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {activeVideo && mounted && typeof document !== "undefined" && createPortal(
        <div className="modal-overlay" onClick={() => setActiveVideo(null)} role="dialog" aria-modal="true">
          <div className="modal-content video-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setActiveVideo(null)} aria-label="Close modal">
              &times;
            </button>
            <div className="video-container">
              <video width="100%" controls autoPlay className="modal-video">
                <source src={activeVideo} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>,
        document.body
      )}

      <section className="section faq-section" id="faq">
        <div className="container faq-grid">
          <div className="faq-intro"><span className="kicker">Frequently asked questions</span><h2>Clear answers before you begin.</h2><p>Have another question? Speak with the VLS team on WhatsApp or call us directly.</p><a href="https://wa.me/919500025216" target="_blank" rel="noreferrer" className="text-link">Ask VLS on WhatsApp <span>↗</span></a></div>
          <div className="faq-list">
            {faqs.map(([question, answer]) => <details key={question}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}
          </div>
        </div>
      </section>

      <section className="enrollment-section" id="register">
        <div className="container enrollment-grid">
          <div className="enrollment-copy">
            <span className="kicker light">Early access enrollment</span>
            <h2>Your legal knowledge.<br /><em>Enhanced by AI.</em></h2>
            <p>Register now to secure your spot for the masterclass on 15 August, conducted online in Tamil.</p>
            <div className="event-tags">
              <span>Date · 15 August</span>
              <span>Mode · Online</span>
              <span>Language · Tamil</span>
              <span>Fee · ₹499</span>
            </div>
          </div>
          <RegistrationForm compact />
        </div>
      </section>

      <footer>
        <div className="container footer-grid">
          <div className="footer-brand"><img src="/vls-logo.png" alt="VLS Law Academy" /><p>Practical legal knowledge for judicial services, law practice, and professional growth.</p></div>
          <div><h4>Explore</h4><a href="https://www.vlslawacademy.com/">Home</a><a href="https://www.vlslawacademy.com/courses">Courses</a><a href="https://www.vlslawacademy.com/whyvls">Why VLS</a><a href="https://www.vlslawacademy.com/contact">Contact</a></div>
          <div><h4>Contact</h4><p>No. 1910, 2nd Floor, H Block 5th Street, 12th Main Road, Anna Nagar West, Chennai.</p><a href="tel:+919500207811">+91 95002 07811</a><a href="tel:+919500025216">+91 95000 25216</a></div>
          <div><h4>Follow VLS</h4><a href="https://www.youtube.com/@VLSLAWACADEMY">YouTube</a><a href="https://www.instagram.com/vlslawacademy/">Instagram</a><a href="https://www.linkedin.com/company/105212369/">LinkedIn</a><a href="https://www.facebook.com/vlslawacademy">Facebook</a></div>
        </div>
        <div className="container footer-bottom"><span>© 2026 VLS Law Academy. All rights reserved.</span><div><a href="https://www.vlslawacademy.com/terms-and-conditions">Terms</a><a href="https://www.vlslawacademy.com/privacy-policy">Privacy Policy</a></div></div>
      </footer>

      <a 
        className="whatsapp-float" 
        href="https://wa.me/919500025216" 
        target="_blank" 
        rel="noreferrer" 
        aria-label="Contact VLS Law Academy on WhatsApp"
      >
        <svg viewBox="0 0 24 24" width="30" height="30" fill="currentColor">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.97C16.579 2.022 14.119.99 11.512.99 6.08.99 1.657 5.361 1.654 10.792c-.001 1.674.453 3.308 1.311 4.739L1.925 20.3l4.722-1.236-.02-.016-.03-.004zM17.487 14.4c-.27-.13-.1.597-.13-.198-.105-.184-.613-.764-1.352-1.39-1.034-.878-1.588-1.034-1.745-.88-.16.16-.69.87-.85 1.045-.16.18-.33.2-.6.06-.27-.13-1.14-.42-2.17-1.34-1.03-.92-1.73-1.44-1.93-1.61-.2-.17-.02-.27.12-.41.12-.13.27-.3.4-.45.13-.15.17-.25.26-.41.09-.16.05-.3-.02-.44-.08-.13-.67-1.62-.92-2.22-.245-.589-.537-.584-.746-.595h-.63c-.22 0-.58.08-.88.41-.3.33-1.15 1.13-1.15 2.76s1.19 3.2 1.35 3.42c.16.22 2.3 3.52 5.58 4.94.78.34 1.39.54 1.87.7.78.25 1.49.21 2.05.13.62-.09 1.93-.79 2.2-1.51.27-.72.27-1.34.19-1.47-.08-.13-.3-.21-.57-.34z"/>
        </svg>
      </a>
    </main>
  );
}

/*
 * HeroSection - 古書の表紙風トップ画面
 * Design: 羊皮紙背景 + ゴールド装飾ボーダー + フクロウガイド
 * 参考画像: 古書の表紙、金の装飾フレーム、コンパスモチーフ
 * Mobile-first: max-w-md centered, touch-friendly
 */
import { motion } from "framer-motion";
import { Compass, BookOpen, Users, ChevronDown } from "lucide-react";

const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663286960690/3onwxhANtpgAkHzmhikcoQ/hero-parchment-bg-JfKSnr8WukqQu574CW5MEf.webp";
const OWL_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663286960690/3onwxhANtpgAkHzmhikcoQ/owl-guide-TAnmpLAVZvsG5gXRZegZMw.webp";

interface HeroSectionProps {
  onStart: () => void;
}

export default function HeroSection({ onStart }: HeroSectionProps) {
  return (
    <section className="relative min-h-[100dvh] flex flex-col items-center justify-start overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${HERO_BG})` }}
      />
      {/* Subtle vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(44,24,16,0.12)_100%)]" />

      {/* Gold decorative borders (left & right) */}
      <div className="absolute top-0 left-0 w-8 sm:w-12 h-full opacity-40 pointer-events-none">
        <div className="absolute inset-y-0 left-2 w-[2px] bg-gradient-to-b from-transparent via-[#C5A55A] to-transparent" />
        <div className="absolute inset-y-0 left-4 w-px bg-gradient-to-b from-transparent via-[#C5A55A]/50 to-transparent" />
        {/* Corner ornaments */}
        <svg className="absolute top-4 left-1 w-7 h-20 text-[#C5A55A]/50" viewBox="0 0 28 80" fill="none">
          <path d="M4 0 C4 20, 24 20, 24 40 C24 60, 4 60, 4 80" stroke="currentColor" strokeWidth="1.5" fill="none" />
        </svg>
      </div>
      <div className="absolute top-0 right-0 w-8 sm:w-12 h-full opacity-40 pointer-events-none">
        <div className="absolute inset-y-0 right-2 w-[2px] bg-gradient-to-b from-transparent via-[#C5A55A] to-transparent" />
        <div className="absolute inset-y-0 right-4 w-px bg-gradient-to-b from-transparent via-[#C5A55A]/50 to-transparent" />
        <svg className="absolute top-4 right-1 w-7 h-20 text-[#C5A55A]/50" viewBox="0 0 28 80" fill="none">
          <path d="M24 0 C24 20, 4 20, 4 40 C4 60, 24 60, 24 80" stroke="currentColor" strokeWidth="1.5" fill="none" />
        </svg>
      </div>

      {/* Bottom corner ornaments */}
      <div className="absolute bottom-0 left-0 w-16 h-16 opacity-30 pointer-events-none">
        <svg viewBox="0 0 64 64" fill="none" className="w-full h-full text-[#C5A55A]">
          <path d="M0 64 Q0 32, 32 32 Q32 0, 64 0" stroke="currentColor" strokeWidth="2" fill="none" />
          <circle cx="32" cy="32" r="3" fill="currentColor" opacity="0.5" />
        </svg>
      </div>
      <div className="absolute bottom-0 right-0 w-16 h-16 opacity-30 pointer-events-none">
        <svg viewBox="0 0 64 64" fill="none" className="w-full h-full text-[#C5A55A]">
          <path d="M64 64 Q64 32, 32 32 Q32 0, 0 0" stroke="currentColor" strokeWidth="2" fill="none" />
          <circle cx="32" cy="32" r="3" fill="currentColor" opacity="0.5" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-[420px] mx-auto px-5 pt-[max(env(safe-area-inset-top),2.5rem)] pb-8 flex flex-col items-center min-h-[100dvh]">
        {/* Top spacer */}
        <div className="flex-1 min-h-4 max-h-10" />

        {/* Brand Mark */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-2"
        >
          <div className="flex items-center gap-2.5">
            <div className="h-px w-10 bg-gradient-to-r from-transparent to-[#C5A55A]" />
            <span className="font-heading text-[11px] tracking-[0.35em] text-[#8B6914] uppercase">
              Trail Quest
            </span>
            <div className="h-px w-10 bg-gradient-to-l from-transparent to-[#C5A55A]" />
          </div>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="font-serif font-bold text-[#2C1810] leading-[1.15] text-center"
          style={{ fontSize: "clamp(2rem, 8vw, 2.6rem)" }}
        >
          私立中学
          <br />
          <span className="gold-text inline-block" style={{ fontSize: "clamp(2.2rem, 9vw, 2.8rem)" }}>
            相性診断
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="font-serif text-[13px] text-[#5A4632] leading-relaxed text-center mt-2 mb-4"
        >
          お子さまに合った学びのルートを
          <br />
          AIが導きます
        </motion.p>

        {/* Owl Guide */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="relative mb-4"
        >
          {/* Compass circle behind owl */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-36 h-36 sm:w-40 sm:h-40 rounded-full border border-[#C5A55A]/15 flex items-center justify-center">
              <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full border border-dashed border-[#C5A55A]/10" />
            </div>
          </div>
          <img
            src={OWL_IMG}
            alt="フクロウガイド"
            className="relative z-10 w-28 h-28 sm:w-32 sm:h-32 object-contain drop-shadow-lg animate-float"
          />
        </motion.div>

        {/* Monitor Notice */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="mb-5 px-4 py-2 rounded-full border border-[#C5A55A]/30 bg-[#F5E6C8]/40 backdrop-blur-sm"
        >
          <p className="text-[11px] text-[#8B6914] font-sans font-medium text-center">
            モニター期間中につき、今だけ<span className="font-bold text-[#B8860B]">無料</span>で診断できます
          </p>
        </motion.div>

        {/* Feature Cards */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="w-full space-y-2 mb-5"
        >
          <FeatureCard
            icon={<Compass className="w-[18px] h-[18px] text-[#B8860B]" />}
            title="AI診断"
            desc="複数の観点からお子さまに最適な学校を分析"
          />
          <FeatureCard
            icon={<BookOpen className="w-[18px] h-[18px] text-[#B8860B]" />}
            title="ベストな私立中がわかる"
            desc="首都圏の主要校からTOP3をご提案"
          />
          <FeatureCard
            icon={<Users className="w-[18px] h-[18px] text-[#B8860B]" />}
            title="小1〜小6のお子さま対象"
            desc="学年に合わせた偏差値帯で診断"
          />
        </motion.div>

        {/* CTA Button */}
        <motion.button
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={onStart}
          className="gold-btn w-full py-4 rounded-xl text-[15px] relative overflow-hidden shadow-lg shadow-[#8B6914]/15"
        >
          <span className="relative z-10 tracking-wider">診断をはじめる</span>
          <div className="absolute inset-0 gold-shimmer" />
        </motion.button>

        {/* Spacer */}
        <div className="flex-1 min-h-4" />

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ delay: 1.5 }}
          className="flex flex-col items-center gap-0.5 pb-2"
        >
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="w-4 h-4 text-[#B8860B]/40" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function FeatureCard({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="parchment-card rounded-xl px-4 py-3 flex items-start gap-3 hover:shadow-md hover:shadow-[#8B6914]/8 transition-shadow duration-300">
      <div className="w-9 h-9 rounded-full bg-gradient-to-b from-[#F5E6C8] to-[#EDD9B3] border border-[#C5A55A]/30 flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
        {icon}
      </div>
      <div className="min-w-0">
        <h3 className="font-serif font-bold text-[#2C1810] text-[13px] leading-tight">
          {title}
        </h3>
        <p className="font-sans text-[11px] text-[#6B5744] leading-relaxed mt-0.5">
          {desc}
        </p>
      </div>
    </div>
  );
}

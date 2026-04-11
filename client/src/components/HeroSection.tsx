/*
 * HeroSection - 清潔感のあるシンプルなトップ画面
 * 保護者（ママ）向けの上品なトーン
 */
import { motion } from "framer-motion";
import { School, Sparkles, Users, ChevronDown } from "lucide-react";

interface HeroSectionProps {
  onStart: () => void;
}

export default function HeroSection({ onStart }: HeroSectionProps) {
  return (
    <section className="relative min-h-[100dvh] flex flex-col items-center justify-start overflow-hidden bg-[#FAFAF8]">
      {/* Soft top accent */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#2C5F7C]/40 to-transparent" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-[460px] mx-auto px-5 pt-[max(env(safe-area-inset-top),3rem)] pb-8 flex flex-col items-center min-h-[100dvh]">
        <div className="flex-1 min-h-4 max-h-10" />

        {/* Brand Mark */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-3"
        >
          <span className="font-sans text-[11px] tracking-[0.25em] text-[#2C5F7C] font-semibold">
            TRAIL SCHOOL MATCH
          </span>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-sans font-bold text-[#333333] leading-[1.3] text-center"
          style={{ fontSize: "clamp(1.5rem, 5.5vw, 1.9rem)" }}
        >
          お子さまの個性に合った
          <br />
          <span className="text-[#2C5F7C]">学校選び</span>
          を、AIがサポート
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-sans text-[13px] text-[#6B7280] leading-relaxed text-center mt-3 mb-6"
        >
          150校のデータから、お子さまに
          <br />
          ぴったりの私立中学を見つけましょう
        </motion.p>

        {/* Illustration Circle */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="relative mb-6"
        >
          <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-[#E8F0F5] to-[#F5FBF8] border border-[#2C5F7C]/15 flex items-center justify-center shadow-sm">
            <School className="w-12 h-12 sm:w-14 sm:h-14 text-[#2C5F7C]" strokeWidth={1.5} />
          </div>
        </motion.div>

        {/* Monitor Notice */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.35 }}
          className="mb-6 px-4 py-2 rounded-full bg-[#4A9B7F]/8 border border-[#4A9B7F]/25"
        >
          <p className="text-[11px] text-[#4A9B7F] font-sans font-medium text-center">
            モニター期間中につき、今だけ<span className="font-bold">無料</span>で診断いただけます
          </p>
        </motion.div>

        {/* Feature Cards */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="w-full space-y-2.5 mb-6"
        >
          <FeatureCard
            icon={<Sparkles className="w-[18px] h-[18px] text-[#2C5F7C]" strokeWidth={2} />}
            title="AIがお子さまを多面的に分析"
            desc="学力・性格・興味関心からぴったりの学校をご提案"
          />
          <FeatureCard
            icon={<School className="w-[18px] h-[18px] text-[#2C5F7C]" strokeWidth={2} />}
            title="首都圏150校から最適な3校"
            desc="各校の特色や教育方針を分かりやすく比較"
          />
          <FeatureCard
            icon={<Users className="w-[18px] h-[18px] text-[#2C5F7C]" strokeWidth={2} />}
            title="小1〜小6のお子さま対象"
            desc="学年に応じた偏差値帯でご家庭に合った診断"
          />
        </motion.div>

        {/* CTA Button */}
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.55 }}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          onClick={onStart}
          className="gold-btn w-full py-4 rounded-xl text-[15px]"
          data-testid="button-start-diagnosis"
        >
          無料で診断する
        </motion.button>

        <div className="flex-1 min-h-4" />

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 1.2 }}
          className="flex flex-col items-center gap-0.5 pb-2"
        >
          <motion.div
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="w-4 h-4 text-[#9CA3AF]" />
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
    <div className="bg-white rounded-xl px-4 py-3 flex items-start gap-3 border border-[#E5E7EB] shadow-sm">
      <div className="w-9 h-9 rounded-full bg-[#E8F0F5] flex items-center justify-center shrink-0 mt-0.5">
        {icon}
      </div>
      <div className="min-w-0">
        <h3 className="font-sans font-bold text-[#333333] text-[13px] leading-tight">
          {title}
        </h3>
        <p className="font-sans text-[11px] text-[#6B7280] leading-relaxed mt-0.5">
          {desc}
        </p>
      </div>
    </div>
  );
}

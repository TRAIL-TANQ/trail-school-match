/*
 * ResultSection - 診断結果（冒険のスタート地点）
 * Design: ゴールドバッジ、星評価、冒険の書イメージ
 * 1位: 大きなカード、2位・3位: コンパクトカード、比較テーブル
 */
import { motion } from "framer-motion";
import { Star, Trophy, Medal, Award, ArrowRight, Sparkles, RotateCcw } from "lucide-react";
import type { SchoolScore, DiagnosisInput } from "@/lib/schoolData";

const BOOK_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663286960690/3onwxhANtpgAkHzmhikcoQ/open-book-result-eKLoEFqvPzPE32MSjqjNnZ.webp";
const BADGE_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663286960690/3onwxhANtpgAkHzmhikcoQ/gold-shield-badge-aRyGxH2QxxTQsZMPEzGGuP.webp";

interface ResultSectionProps {
  results: SchoolScore[];
  userInput: DiagnosisInput;
  onRestart: () => void;
}

export default function ResultSection({ results, userInput, onRestart }: ResultSectionProps) {
  const first = results[0];
  const second = results[1];
  const third = results[2];

  return (
    <section className="relative py-10 px-4 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#EDD9B3] via-[#F5E6C8] to-[#F0E4D0]" />
      {/* Top gold line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent" />
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `radial-gradient(circle at 25% 25%, #8B6914 1px, transparent 1px),
                          radial-gradient(circle at 75% 75%, #8B6914 1px, transparent 1px)`,
        backgroundSize: "40px 40px"
      }} />

      <div className="relative z-10 max-w-[420px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-6"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", delay: 0.2, stiffness: 200 }}
            className="inline-flex mb-3"
          >
            <Sparkles className="w-6 h-6 text-[#D4AF37] animate-sparkle" />
          </motion.div>
          <div className="flex items-center justify-center gap-2 mb-1">
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-[#C5A55A]" />
            <span className="font-heading text-[10px] tracking-[0.25em] text-[#B8860B] uppercase">
              Result
            </span>
            <div className="h-px w-8 bg-gradient-to-l from-transparent to-[#C5A55A]" />
          </div>
          <h2 className="font-serif font-bold text-[#2C1810] text-xl leading-tight">
            あなたの冒険の
            <br />
            <span className="gold-text">スタート地点</span>
          </h2>
          <p className="font-sans text-[11px] text-[#6B5744] mt-2">
            最も相性の高い学びのフィールド
          </p>
        </motion.div>

        {/* Book Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="mb-8 relative"
        >
          <img
            src={BOOK_IMG}
            alt="冒険の書"
            className="w-full rounded-xl shadow-xl shadow-[#8B6914]/15"
          />
          <div className="absolute inset-0 rounded-xl gold-shimmer pointer-events-none" />
        </motion.div>

        {/* 1st Place */}
        {first && (
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25 }}
            className="mb-5"
          >
            <FirstPlaceCard result={first} userInput={userInput} />
          </motion.div>
        )}

        {/* 2nd & 3rd */}
        <div className="space-y-3 mb-8">
          {second && (
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.35 }}
            >
              <RunnerUpCard result={second} rank={2} userInput={userInput} />
            </motion.div>
          )}
          {third && (
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <RunnerUpCard result={third} rank={3} userInput={userInput} />
            </motion.div>
          )}
        </div>

        {/* Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.45 }}
          className="mb-8"
        >
          <ComparisonSection results={results} userInput={userInput} />
        </motion.div>

        {/* TRAIL Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mb-6 p-4 rounded-xl bg-gradient-to-br from-[#2C1810]/[0.06] to-[#2C1810]/[0.02] border border-[#C5A55A]/15"
        >
          <p className="font-serif text-[12px] text-[#3D2B1F] leading-[1.9] text-center">
            お子さまにぴったりの学校が見つかりました。
            <br />
            冒険の鍵を手に、新しい学びの旅へ出発しましょう！
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.55 }}
          className="space-y-3 pb-16"
        >
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="gold-btn w-full py-4 rounded-xl text-[14px] relative overflow-hidden flex items-center justify-center gap-2 shadow-lg shadow-[#8B6914]/15"
          >
            <span className="relative z-10 tracking-wider">この学校の世界へ進む</span>
            <ArrowRight className="w-4 h-4 relative z-10" />
            <div className="absolute inset-0 gold-shimmer" />
          </button>

          <button
            onClick={onRestart}
            className="w-full py-3 rounded-xl border-2 border-[#C5A55A]/25 text-[#8B6914] font-serif font-semibold text-[13px] bg-transparent hover:bg-[#EDD9B3]/40 active:bg-[#EDD9B3]/60 transition-all duration-200 flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            もう一度診断する
          </button>
        </motion.div>
      </div>
    </section>
  );
}

/* ============================================================
   First Place Card
   ============================================================ */

function FirstPlaceCard({ result, userInput }: { result: SchoolScore; userInput: DiagnosisInput }) {
  const school = result.school;
  const deviation = userInput.deviationStandard === "sapix"
    ? school.sapixDeviation
    : school.yotsuyaDeviation;
  const standardLabel = userInput.deviationStandard === "sapix" ? "SAPIX" : "四谷大塚";

  return (
    <div className="relative rounded-2xl overflow-hidden">
      {/* Outer glow */}
      <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-b from-[#D4AF37]/30 via-[#D4AF37]/10 to-[#D4AF37]/20 blur-sm pointer-events-none" />

      <div className="relative parchment-card rounded-2xl border-2 border-[#D4AF37]/40">
        {/* Shimmer */}
        <div className="absolute inset-0 gold-shimmer pointer-events-none rounded-2xl opacity-40" />

        <div className="relative p-5">
          {/* Badge + Info */}
          <div className="flex items-start gap-3 mb-4">
            <div className="relative shrink-0">
              <img src={BADGE_IMG} alt="1位バッジ" className="w-14 h-14 object-contain drop-shadow-md" />
            </div>
            <div className="flex-1 min-w-0 pt-0.5">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-bold text-[#D4AF37] bg-[#D4AF37]/10 px-2.5 py-0.5 rounded-full border border-[#D4AF37]/25 inline-flex items-center gap-1">
                  <Trophy className="w-3 h-3" /> 1位
                </span>
                <span className="text-[10px] text-[#8B6914]/50 font-sans">
                  相性 {result.totalScore}pt
                </span>
              </div>
              <h3 className="font-serif font-bold text-[#2C1810] text-[16px] leading-tight">
                {school.name}
              </h3>
              <p className="font-sans text-[11px] text-[#6B5744] mt-0.5">{school.area}</p>
            </div>
          </div>

          {/* Deviation Badge */}
          <div className="flex flex-wrap gap-2 mb-3">
            <div className="inline-flex items-baseline gap-1.5 bg-[#2C1810]/5 rounded-lg px-3 py-1.5 border border-[#C5A55A]/20">
              <span className="text-[9px] text-[#8B6914] font-bold font-sans bg-[#D4AF37]/15 px-1.5 py-0.5 rounded">{standardLabel}</span>
              <span className="text-[14px] font-serif font-bold text-[#2C1810]">
                偏差値 {deviation[0]}〜{deviation[1]}
              </span>
            </div>
          </div>

          {/* Feature Tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {school.features.map((f) => (
              <span
                key={f}
                className="text-[10px] font-sans font-semibold text-[#8B6914] bg-[#D4AF37]/10 px-2.5 py-1 rounded-full border border-[#D4AF37]/15"
              >
                {f}
              </span>
            ))}
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-[#C5A55A]/25 to-transparent mb-4" />

          {/* Star Ratings */}
          <div className="space-y-2.5 mb-4">
            <StarRating label="探究力" value={school.explorationLevel} />
            <StarRating label="自走力" value={school.selfDriveLevel} />
            <StarRating label="表現力" value={school.expressionLevel} />
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-[#C5A55A]/25 to-transparent mb-4" />

          {/* Match Comment */}
          <div className="p-3.5 rounded-xl bg-gradient-to-br from-[#2C1810]/[0.04] to-[#2C1810]/[0.02] border border-[#C5A55A]/12">
            <p className="font-serif text-[12px] text-[#3D2B1F] leading-[1.85] whitespace-pre-line">
              {result.matchComment}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   Runner-Up Card
   ============================================================ */

function RunnerUpCard({
  result,
  rank,
  userInput,
}: {
  result: SchoolScore;
  rank: number;
  userInput: DiagnosisInput;
}) {
  const school = result.school;
  const deviation = userInput.deviationStandard === "sapix"
    ? school.sapixDeviation
    : school.yotsuyaDeviation;
  const standardLabel = userInput.deviationStandard === "sapix" ? "SAPIX" : "四谷大塚";
  const RankIcon = rank === 2 ? Medal : Award;

  return (
    <div className="parchment-card rounded-xl p-4 border border-[#C5A55A]/20">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-b from-[#C5A55A] to-[#8B6914] flex items-center justify-center shrink-0 shadow-sm">
          <RankIcon className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-[10px] font-bold text-[#8B6914] bg-[#C5A55A]/15 px-2 py-0.5 rounded-full border border-[#C5A55A]/20">
              {rank}位
            </span>
            <span className="text-[10px] text-[#8B6914]/40 font-sans">
              {result.totalScore}pt
            </span>
          </div>
          <h3 className="font-serif font-bold text-[#2C1810] text-[14px] leading-tight">
            {school.name}
          </h3>
          <p className="font-sans text-[10px] text-[#6B5744] mt-0.5">
            {school.area} ・ {standardLabel} {deviation[0]}〜{deviation[1]}
          </p>

          {/* Tags */}
          <div className="mt-2 flex flex-wrap gap-1">
            {school.features.slice(0, 3).map((f) => (
              <span
                key={f}
                className="text-[9px] font-sans font-medium text-[#8B6914] bg-[#D4AF37]/8 px-2 py-0.5 rounded-full border border-[#D4AF37]/10"
              >
                {f}
              </span>
            ))}
          </div>

          {/* Compact Ratings */}
          <div className="mt-2.5 flex gap-4">
            <CompactRating label="探究" value={school.explorationLevel} />
            <CompactRating label="自走" value={school.selfDriveLevel} />
            <CompactRating label="表現" value={school.expressionLevel} />
          </div>

          {/* Comment */}
          <p className="font-serif text-[11px] text-[#5A4632] leading-relaxed mt-2.5">
            {result.matchComment.split("\n")[0]}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   Comparison Section
   ============================================================ */

function ComparisonSection({ results, userInput }: { results: SchoolScore[]; userInput: DiagnosisInput }) {
  return (
    <div className="parchment-card rounded-2xl p-5 border border-[#C5A55A]/20">
      <div className="flex items-center justify-center gap-2 mb-1">
        <div className="h-px w-6 bg-gradient-to-r from-transparent to-[#C5A55A]" />
        <span className="font-heading text-[10px] tracking-[0.2em] text-[#B8860B] uppercase">
          Compare
        </span>
        <div className="h-px w-6 bg-gradient-to-l from-transparent to-[#C5A55A]" />
      </div>
      <h3 className="font-serif font-bold text-[#2C1810] text-base mb-4 text-center">
        進路マップ比較
      </h3>

      <div className="overflow-x-auto -mx-1">
        <table className="w-full text-[11px]">
          <thead>
            <tr className="border-b-2 border-[#C5A55A]/20">
              <th className="text-left font-sans font-bold text-[#8B6914] pb-2 pl-1 w-[72px]">
                項目
              </th>
              {results.map((r, i) => (
                <th
                  key={r.school.id}
                  className={`text-center font-serif font-bold pb-2 px-1 ${
                    i === 0 ? "text-[#D4AF37]" : "text-[#5A4632]"
                  }`}
                >
                  {i + 1}位
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="font-sans">
            <CRow label="学校名" values={results.map((r) => r.school.name.replace(/中学校|中等部|学園中学校/g, ""))} bold />
            <CRow label="校風" values={results.map((r) => r.school.schoolStyle)} />
            <CRow label="探究相性" values={results.map((r) => getMatchLabel(r.explorationScore))} />
            <CRow
              label="偏差値帯"
              values={results.map((r) => {
                const d = userInput.deviationStandard === "sapix"
                  ? r.school.sapixDeviation
                  : r.school.yotsuyaDeviation;
                return `${d[0]}〜${d[1]}`;
              })}
            />
            <CRow label="共学/別学" values={results.map((r) => r.school.coed)} />
            <CRow label="ICT環境" values={results.map((r) => starStr(r.school.digitalEnvironment))} />
            <CRow label="AI教育" values={results.map((r) => starStr(r.school.aiEducationLevel))} />
          </tbody>
        </table>
      </div>
    </div>
  );
}

function CRow({ label, values, bold }: { label: string; values: string[]; bold?: boolean }) {
  return (
    <tr className="border-b border-[#C5A55A]/8">
      <td className="py-2.5 pl-1 font-bold text-[#5A4632] text-[10px]">{label}</td>
      {values.map((v, i) => (
        <td
          key={i}
          className={`py-2.5 text-center text-[10px] px-1 ${
            i === 0 ? "text-[#8B6914] font-bold" : "text-[#6B5744]"
          } ${bold ? "font-bold" : ""}`}
        >
          {v}
        </td>
      ))}
    </tr>
  );
}

/* ============================================================
   Shared Components
   ============================================================ */

function StarRating({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="font-sans text-[11px] text-[#5A4632] font-medium w-12 shrink-0">{label}</span>
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i <= value ? "text-[#D4AF37] fill-[#D4AF37] drop-shadow-[0_0_2px_rgba(212,175,55,0.4)]" : "text-[#C5A55A]/20 fill-[#C5A55A]/10"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function CompactRating({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center gap-1">
      <span className="text-[10px] text-[#8B6914]/50 font-sans">{label}</span>
      <div className="flex gap-px">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            className={`w-2.5 h-2.5 ${
              i <= value ? "text-[#D4AF37] fill-[#D4AF37]" : "text-[#C5A55A]/15 fill-[#C5A55A]/5"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function getMatchLabel(score: number): string {
  if (score >= 90) return "◎ 最高";
  if (score >= 70) return "○ 高い";
  if (score >= 50) return "△ 普通";
  return "- やや低い";
}

function starStr(n: number): string {
  return "★".repeat(n) + "☆".repeat(5 - n);
}

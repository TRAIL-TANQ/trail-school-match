/*
 * ResultSection - 診断結果
 * 1位: 大きなカード（独自の強み・特色プログラム強調）
 * 2位・3位: コンパクトカード（強みサマリー表示）
 * 比較テーブル
 */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Trophy, Medal, Award, ArrowUp, Sparkles, RotateCcw, GraduationCap, Lightbulb, Share2, Copy, Check } from "lucide-react";
import type { SchoolScore, DiagnosisInput } from "@/lib/schoolData";

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
      <div className="absolute inset-0 bg-gradient-to-b from-[#F3F4F6] via-[#FFFFFF] to-[#FAFAF8]" />
      {/* Top gold line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#2C5F7C]/50 to-transparent" />
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `radial-gradient(circle at 25% 25%, #2C5F7C 1px, transparent 1px),
                          radial-gradient(circle at 75% 75%, #2C5F7C 1px, transparent 1px)`,
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
            <Sparkles className="w-6 h-6 text-[#2C5F7C] animate-sparkle" />
          </motion.div>
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="font-sans text-[10px] tracking-[0.25em] text-[#2C5F7C] uppercase font-semibold">
              診断結果
            </span>
          </div>
          <h2 className="font-sans font-bold text-[#333333] text-xl leading-tight">
            お子さまに
            <br />
            <span className="text-[#2C5F7C]">ぴったりの学校</span>
          </h2>
          <p className="font-sans text-[11px] text-[#6B7280] mt-2">
            最も相性の高い学校をご紹介します
          </p>
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
          className="mb-6 p-4 rounded-xl bg-gradient-to-br from-[#333333]/[0.06] to-[#333333]/[0.02] border border-[#E5E7EB]/15"
        >
          <p className="font-sans text-[12px] text-[#4B5563] leading-[1.9] text-center">
            お子さまにぴったりの学校が見つかりました。
            <br />
            素敵な学校選びの一助となれば幸いです。
          </p>
        </motion.div>

        {/* SNS Share Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.52 }}
          className="mb-6"
        >
          <ShareSection results={results} />
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
            className="gold-btn w-full py-4 rounded-xl text-[14px] flex items-center justify-center gap-2"
          >
            <ArrowUp className="w-4 h-4" />
            <span>ページトップへ戻る</span>
          </button>

          <button
            onClick={onRestart}
            className="w-full py-3 rounded-xl border border-[#E5E7EB] text-[#2C5F7C] font-sans font-semibold text-[13px] bg-white hover:bg-[#F3F4F6] active:bg-[#E5E7EB] transition-all duration-200 flex items-center justify-center gap-2"
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
   First Place Card - 独自の強み・特色プログラム強調
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
      <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-b from-[#2C5F7C]/30 via-[#2C5F7C]/10 to-[#2C5F7C]/20 blur-sm pointer-events-none" />

      <div className="relative parchment-card rounded-2xl border-2 border-[#2C5F7C]/40">
        <div className="relative p-5">
          {/* Badge + Info */}
          <div className="flex items-start gap-3 mb-4">
            <div className="relative shrink-0 w-14 h-14 rounded-full bg-gradient-to-br from-[#2C5F7C] to-[#1E4556] flex items-center justify-center shadow-sm">
              <Trophy className="w-7 h-7 text-white" strokeWidth={2} />
            </div>
            <div className="flex-1 min-w-0 pt-0.5">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-bold text-[#2C5F7C] bg-[#2C5F7C]/10 px-2.5 py-0.5 rounded-full border border-[#2C5F7C]/25 inline-flex items-center gap-1">
                  <Trophy className="w-3 h-3" /> 1位
                </span>
                <span className="text-[10px] text-[#2C5F7C]/50 font-sans">
                  相性 {result.totalScore}pt
                </span>
              </div>
              <h3 className="font-serif font-bold text-[#333333] text-[16px] leading-tight">
                {school.name}
              </h3>
              <p className="font-sans text-[11px] text-[#6B7280] mt-0.5">{school.area}</p>
            </div>
          </div>

          {/* Deviation Badge */}
          <div className="flex flex-wrap gap-2 mb-3">
            <div className="inline-flex items-baseline gap-1.5 bg-[#333333]/5 rounded-lg px-3 py-1.5 border border-[#E5E7EB]/20">
              <span className="text-[9px] text-[#2C5F7C] font-bold font-sans bg-[#2C5F7C]/15 px-1.5 py-0.5 rounded">{standardLabel}</span>
              <span className="text-[14px] font-serif font-bold text-[#333333]">
                偏差値 {deviation[0]}〜{deviation[1]}
              </span>
            </div>
          </div>

          {/* Feature Tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {school.features.map((f) => (
              <span
                key={f}
                className="text-[10px] font-sans font-semibold text-[#2C5F7C] bg-[#2C5F7C]/10 px-2.5 py-1 rounded-full border border-[#2C5F7C]/15"
              >
                {f}
              </span>
            ))}
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-[#E5E7EB]/25 to-transparent mb-4" />

          {/* Star Ratings */}
          <div className="space-y-2.5 mb-4">
            <StarRating label="探究力" value={school.explorationLevel} />
            <StarRating label="自走力" value={school.selfDriveLevel} />
            <StarRating label="表現力" value={school.expressionLevel} />
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-[#E5E7EB]/25 to-transparent mb-4" />

          {/* ===== 独自の強み セクション ===== */}
          <div className="mb-4">
            <div className="flex items-center gap-1.5 mb-3">
              <Lightbulb className="w-4 h-4 text-[#2C5F7C]" />
              <h4 className="font-serif font-bold text-[#333333] text-[13px]">
                この学校の強み
              </h4>
            </div>
            <div className="space-y-2.5">
              {school.uniqueStrengths.map((strength, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + idx * 0.1 }}
                  className="flex gap-2.5 p-2.5 rounded-lg bg-gradient-to-r from-[#2C5F7C]/[0.06] to-transparent border border-[#2C5F7C]/10 hover:border-[#2C5F7C]/25 transition-colors"
                >
                  <span className="text-lg shrink-0 mt-0.5 leading-none">{strength.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-serif font-bold text-[#333333] text-[11px] leading-tight mb-0.5">
                      {strength.title}
                    </p>
                    <p className="font-sans text-[10px] text-[#4B5563] leading-[1.6]">
                      {strength.detail}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ===== 特色プログラム セクション ===== */}
          <div className="mb-4">
            <div className="flex items-center gap-1.5 mb-3">
              <GraduationCap className="w-4 h-4 text-[#2C5F7C]" />
              <h4 className="font-serif font-bold text-[#333333] text-[13px]">
                特色あるプログラム
              </h4>
            </div>
            <div className="space-y-2">
              {school.signaturePrograms.map((program, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + idx * 0.1 }}
                  className="relative p-3 rounded-lg border border-[#E5E7EB]/15 bg-[#333333]/[0.02] overflow-hidden"
                >
                  {/* Left accent bar */}
                  <div className="absolute left-0 top-2 bottom-2 w-[3px] rounded-full bg-gradient-to-b from-[#2C5F7C] to-[#E5E7EB]/50" />
                  <div className="pl-2.5">
                    <p className="font-serif font-bold text-[#2C5F7C] text-[11px] mb-1">
                      {program.name}
                    </p>
                    <p className="font-sans text-[10px] text-[#4B5563] leading-[1.65]">
                      {program.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-[#E5E7EB]/25 to-transparent mb-4" />

          {/* Match Comment */}
          <div className="p-3.5 rounded-xl bg-gradient-to-br from-[#333333]/[0.04] to-[#333333]/[0.02] border border-[#E5E7EB]/12">
            <p className="font-serif text-[12px] text-[#4B5563] leading-[1.85] whitespace-pre-line">
              {result.matchComment}
            </p>
          </div>

          {/* 公式サイトリンク */}
          {school.homepage && (
            <a
              href={school.homepage}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center justify-center gap-1.5 w-full px-4 py-2.5 rounded-xl bg-[#2C5F7C] hover:bg-[#235067] text-white font-sans font-semibold text-[12px] shadow-sm transition-colors"
              data-testid={`link-homepage-${school.id}`}
            >
              🔗 学校公式サイトを見る
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   Runner-Up Card - 強みサマリー付き
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
    <div className="parchment-card rounded-xl p-4">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-full bg-[#2C5F7C] flex items-center justify-center shrink-0 shadow-sm">
          <RankIcon className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-[10px] font-bold text-[#2C5F7C] bg-[#E5E7EB]/15 px-2 py-0.5 rounded-full border border-[#E5E7EB]/20">
              {rank}位
            </span>
            <span className="text-[10px] text-[#2C5F7C]/40 font-sans">
              {result.totalScore}pt
            </span>
          </div>
          <h3 className="font-serif font-bold text-[#333333] text-[14px] leading-tight">
            {school.name}
          </h3>
          <p className="font-sans text-[10px] text-[#6B7280] mt-0.5">
            {school.area} ・ {standardLabel} {deviation[0]}〜{deviation[1]}
          </p>

          {/* Tags */}
          <div className="mt-2 flex flex-wrap gap-1">
            {school.features.slice(0, 3).map((f) => (
              <span
                key={f}
                className="text-[9px] font-sans font-medium text-[#2C5F7C] bg-[#2C5F7C]/8 px-2 py-0.5 rounded-full border border-[#2C5F7C]/10"
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

          {/* ===== 独自の強み（コンパクト表示） ===== */}
          <div className="mt-3 space-y-1.5">
            {school.uniqueStrengths.slice(0, 2).map((strength, idx) => (
              <div key={idx} className="flex items-start gap-1.5">
                <span className="text-sm shrink-0 leading-none mt-px">{strength.icon}</span>
                <div className="min-w-0">
                  <span className="font-serif font-bold text-[10px] text-[#333333]">
                    {strength.title}
                  </span>
                  <span className="font-sans text-[9px] text-[#6B7280] ml-1">
                    — {strength.detail.length > 30 ? strength.detail.slice(0, 30) + "…" : strength.detail}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* 特色プログラム（1つだけ表示） */}
          {school.signaturePrograms.length > 0 && (
            <div className="mt-2 pl-2 border-l-2 border-[#2C5F7C]/25">
              <p className="font-serif font-bold text-[9px] text-[#2C5F7C]">
                {school.signaturePrograms[0].name}
              </p>
              <p className="font-sans text-[9px] text-[#6B7280] leading-[1.5]">
                {school.signaturePrograms[0].description.length > 40
                  ? school.signaturePrograms[0].description.slice(0, 40) + "…"
                  : school.signaturePrograms[0].description}
              </p>
            </div>
          )}

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-[#E5E7EB]/15 to-transparent my-2.5" />

          {/* Comment */}
          <p className="font-serif text-[11px] text-[#4B5563] leading-relaxed">
            {result.matchComment.split("\n")[0]}
          </p>

          {/* 公式サイトリンク */}
          {school.homepage && (
            <a
              href={school.homepage}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2.5 inline-flex items-center justify-center gap-1 w-full px-3 py-2 rounded-lg bg-[#2C5F7C]/10 text-[#2C5F7C] font-serif font-bold text-[10px] border border-[#2C5F7C]/30 hover:bg-[#2C5F7C]/20 transition-colors"
              data-testid={`link-homepage-${school.id}`}
            >
              🔗 学校公式サイト
            </a>
          )}
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
    <div className="parchment-card rounded-2xl p-5">
      <h3 className="font-sans font-bold text-[#333333] text-base mb-4 text-center">
        学校比較
      </h3>

      <div className="overflow-x-auto -mx-1">
        <table className="w-full text-[11px]">
          <thead>
            <tr className="border-b-2 border-[#E5E7EB]/20">
              <th className="text-left font-sans font-bold text-[#2C5F7C] pb-2 pl-1 w-[72px]">
                項目
              </th>
              {results.map((r, i) => (
                <th
                  key={r.school.id}
                  className={`text-center font-serif font-bold pb-2 px-1 ${
                    i === 0 ? "text-[#2C5F7C]" : "text-[#4B5563]"
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
            <CRow label="適性相性" values={results.map((r) => getMatchLabel(r.strengthMatchScore))} />
            <CRow label="成長相性" values={results.map((r) => getMatchLabel(r.growthMatchScore))} />
            {/* 特色プログラム行を追加 */}
            <CRow
              label="特色"
              values={results.map((r) =>
                r.school.signaturePrograms.length > 0
                  ? r.school.signaturePrograms[0].name.length > 8
                    ? r.school.signaturePrograms[0].name.slice(0, 8) + "…"
                    : r.school.signaturePrograms[0].name
                  : "—"
              )}
            />
          </tbody>
        </table>
      </div>
    </div>
  );
}

function CRow({ label, values, bold }: { label: string; values: string[]; bold?: boolean }) {
  return (
    <tr className="border-b border-[#E5E7EB]/8">
      <td className="py-2.5 pl-1 font-bold text-[#4B5563] text-[10px]">{label}</td>
      {values.map((v, i) => (
        <td
          key={i}
          className={`py-2.5 text-center text-[10px] px-1 ${
            i === 0 ? "text-[#2C5F7C] font-bold" : "text-[#6B7280]"
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
      <span className="font-sans text-[11px] text-[#4B5563] font-medium w-12 shrink-0">{label}</span>
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i <= value ? "text-[#2C5F7C] fill-[#2C5F7C]" : "text-[#D1D5DB] fill-[#E5E7EB]"
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
      <span className="text-[10px] text-[#2C5F7C]/50 font-sans">{label}</span>
      <div className="flex gap-px">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            className={`w-2.5 h-2.5 ${
              i <= value ? "text-[#2C5F7C] fill-[#2C5F7C]" : "text-[#D1D5DB] fill-[#E5E7EB]"
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

/* ============================================================
   SNS Share Section - LINE・X(Twitter)・クリップボード
   ============================================================ */

function ShareSection({ results }: { results: SchoolScore[] }) {
  const [copied, setCopied] = useState(false);
  const [_showPanel, setShowPanel] = useState(false);

  const first = results[0];
  const second = results[1];
  const third = results[2];

  const shareTitle = "TRAIL 私立中学 相性診断の結果";
  const shareText = [
    "TRAIL 私立中学 相性診断の結果",
    "",
    `1位: ${first?.school.name ?? ""} (${first?.totalScore ?? 0}pt)`,
    second ? `2位: ${second.school.name} (${second.totalScore}pt)` : "",
    third ? `3位: ${third.school.name} (${third.totalScore}pt)` : "",
    "",
    "お子さまの個性に合った学校選びを、AIがサポートします。",
    "あなたも診断してみませんか？",
    "",
    "#TRAIL私立中学診断 #私立中学受験 #中学受験",
  ].filter(Boolean).join("\n");

  const shareUrl = typeof window !== "undefined" ? window.location.origin : "";

  const handleShareLine = () => {
    const lineUrl = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`;
    window.open(lineUrl, "_blank", "noopener,noreferrer");
  };

  const handleShareX = () => {
    const xUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(xUrl, "_blank", "noopener,noreferrer");
  };

  const handleCopy = async () => {
    try {
      const copyText = shareText + "\n" + shareUrl;
      await navigator.clipboard.writeText(copyText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // fallback
      const textarea = document.createElement("textarea");
      textarea.value = shareText + "\n" + shareUrl;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: shareUrl,
        });
      } catch {
        // user cancelled
      }
    } else {
      setShowPanel((prev) => !prev);
    }
  };

  return (
    <div className="parchment-card rounded-2xl p-5">
      {/* Header */}
      <h3 className="font-sans font-bold text-[#333333] text-base mb-2 text-center">
        診断結果をシェア
      </h3>
      <p className="font-sans text-[11px] text-[#6B7280] text-center mb-4 leading-relaxed">
        お友達やご家族に診断結果を共有しましょう
      </p>

      {/* Share Preview Card */}
      <div className="mb-4 p-3.5 rounded-xl bg-gradient-to-br from-[#333333]/[0.04] to-[#333333]/[0.02] border border-[#E5E7EB]/12">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-3.5 h-3.5 text-[#2C5F7C]" />
          <span className="font-serif font-bold text-[11px] text-[#333333]">シェア内容プレビュー</span>
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Trophy className="w-3.5 h-3.5 text-[#2C5F7C] shrink-0" />
            <span className="font-sans text-[11px] text-[#4B5563] font-medium">
              1位: {first?.school.name} ({first?.totalScore}pt)
            </span>
          </div>
          {second && (
            <div className="flex items-center gap-2">
              <Medal className="w-3.5 h-3.5 text-[#A0845C] shrink-0" />
              <span className="font-sans text-[10px] text-[#4B5563]">
                2位: {second.school.name} ({second.totalScore}pt)
              </span>
            </div>
          )}
          {third && (
            <div className="flex items-center gap-2">
              <Award className="w-3.5 h-3.5 text-[#8B7355] shrink-0" />
              <span className="font-sans text-[10px] text-[#4B5563]">
                3位: {third.school.name} ({third.totalScore}pt)
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Main Share Button (native share on mobile) */}
      <button
        onClick={handleNativeShare}
        className="w-full mb-3 py-3 rounded-xl bg-[#2C5F7C] hover:bg-[#235067] text-white font-sans font-semibold text-[13px] flex items-center justify-center gap-2 shadow-sm active:scale-[0.98] transition-all duration-200"
      >
        <Share2 className="w-4 h-4" />
        結果をシェアする
      </button>

      {/* SNS Buttons Grid */}
      <div className="grid grid-cols-3 gap-2.5">
        {/* LINE */}
        <button
          onClick={handleShareLine}
          className="group flex flex-col items-center gap-1.5 py-3 px-2 rounded-xl border border-[#06C755]/20 bg-[#06C755]/5 hover:bg-[#06C755]/15 active:scale-[0.96] transition-all duration-200"
        >
          <div className="w-9 h-9 rounded-full bg-[#06C755] flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
              <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
            </svg>
          </div>
          <span className="font-sans text-[10px] font-bold text-[#06C755]">LINE</span>
        </button>

        {/* X (Twitter) */}
        <button
          onClick={handleShareX}
          className="group flex flex-col items-center gap-1.5 py-3 px-2 rounded-xl border border-[#333333]/15 bg-[#333333]/[0.03] hover:bg-[#333333]/[0.08] active:scale-[0.96] transition-all duration-200"
        >
          <div className="w-9 h-9 rounded-full bg-[#0f1419] flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </div>
          <span className="font-sans text-[10px] font-bold text-[#0f1419]">X</span>
        </button>

        {/* Copy */}
        <button
          onClick={handleCopy}
          className="group flex flex-col items-center gap-1.5 py-3 px-2 rounded-xl border border-[#E5E7EB]/20 bg-[#2C5F7C]/5 hover:bg-[#2C5F7C]/15 active:scale-[0.96] transition-all duration-200"
        >
          <div className="w-9 h-9 rounded-full bg-[#2C5F7C] flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
            <AnimatePresence mode="wait">
              {copied ? (
                <motion.div
                  key="check"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                >
                  <Check className="w-4 h-4 text-white" />
                </motion.div>
              ) : (
                <motion.div
                  key="copy"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                >
                  <Copy className="w-4 h-4 text-white" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <span className="font-sans text-[10px] font-bold text-[#2C5F7C]">
            {copied ? "コピー済" : "コピー"}
          </span>
        </button>
      </div>

      {/* Copied Toast */}
      <AnimatePresence>
        {copied && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="mt-3 py-2 px-4 rounded-lg bg-[#333333] text-white text-center"
          >
            <p className="font-sans text-[11px] flex items-center justify-center gap-1.5">
              <Check className="w-3.5 h-3.5" />
              診断結果をクリップボードにコピーしました
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

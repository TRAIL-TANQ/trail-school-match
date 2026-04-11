/*
 * ExplorationReport - 探究力診断レポート
 * レーダーチャート + 学びタイプ判定 + おすすめ環境 + TOP3 + 保存/シェア
 */
import { useRef, useState } from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";
import html2canvas from "html2canvas";
import { Download, Share2, Check } from "lucide-react";
import type { DiagnosisInput, SchoolScore } from "@/lib/schoolData";

interface ExplorationReportProps {
  userInput: DiagnosisInput;
  results: SchoolScore[];
}

type AxisKey = "exploration" | "passion" | "selfDrive" | "expression" | "collaboration" | "future";

const AXIS_LABELS: Record<AxisKey, string> = {
  exploration: "探究力",
  passion: "情熱",
  selfDrive: "自走力",
  expression: "表現力",
  collaboration: "協働力",
  future: "未来志向",
};

interface LearningType {
  emoji: string;
  name: string;
  comment: string;
  environments: string[];
}

const TYPE_MAP: Record<string, LearningType> = {
  "exploration+passion": {
    emoji: "🔍",
    name: "没頭型エクスプローラー",
    comment:
      "お子さまは、興味を持ったことを自分で深く調べる力と、熱中する情熱を持っています。\n自由な校風で、探究型の授業が充実した学校で大きく伸びるタイプです。",
    environments: [
      "探究型授業やPBLが充実した学校",
      "自分でテーマを選べる自由研究の機会",
      "少人数で先生との距離が近い環境",
    ],
  },
  "exploration+selfDrive": {
    emoji: "🚀",
    name: "自立型リサーチャー",
    comment:
      "お子さまは、自分でテーマを見つけて粘り強く調べていける力を持っています。\n自主性を尊重し、生徒の探究活動を後押しする学校が向いています。",
    environments: [
      "自由研究・課題研究を重視する学校",
      "生徒の主体性を尊重する校風",
      "豊富な図書・実験設備",
    ],
  },
  "exploration+expression": {
    emoji: "🎨",
    name: "クリエイティブ探究者",
    comment:
      "お子さまは、調べたことを自分らしい形で表現する力を持っています。\nプレゼンや制作発表の機会が豊富な学校でさらに輝くタイプです。",
    environments: [
      "プレゼン・発表の機会が豊富な学校",
      "アート・デザイン系プログラム",
      "創造性を評価する先生たち",
    ],
  },
  "exploration+collaboration": {
    emoji: "🤝",
    name: "チーム探究リーダー",
    comment:
      "お子さまは、仲間と一緒に課題を深掘りしていける協働型の探究者です。\nグループワーク中心の探究学習が充実した学校がぴったりです。",
    environments: [
      "グループワーク・協働学習が盛んな学校",
      "異学年交流のあるコミュニティ",
      "プロジェクト型授業が充実した環境",
    ],
  },
  "exploration+future": {
    emoji: "💡",
    name: "未来志向イノベーター",
    comment:
      "お子さまは、世界の課題に目を向けて新しいアイデアを生み出す力を持っています。\n国際教育やSTEAMが充実した未来志向の学校で伸びます。",
    environments: [
      "STEAM・ICT教育が充実した学校",
      "国際交流・海外研修のある環境",
      "社会課題に取り組むプロジェクト",
    ],
  },
  "passion+selfDrive": {
    emoji: "🔥",
    name: "情熱ドリブン型",
    comment:
      "お子さまは、やると決めたことに強い情熱を持って突き進む力があります。\n挑戦を後押しする自由な校風の学校がぴったりです。",
    environments: [
      "挑戦を応援する自由な校風",
      "部活動・課外活動が充実した学校",
      "目標達成を支える伴走型指導",
    ],
  },
  "passion+expression": {
    emoji: "🎤",
    name: "パッション表現者",
    comment:
      "お子さまは、熱い想いを言葉や作品にのせて伝える力を持っています。\n発表や舞台、創作の機会が豊富な学校で大きく花開きます。",
    environments: [
      "演劇・音楽・アート活動が盛んな学校",
      "スピーチやプレゼン大会がある環境",
      "表現を肯定する温かい校風",
    ],
  },
  "passion+collaboration": {
    emoji: "⭐",
    name: "エネルギー伝播型",
    comment:
      "お子さまの熱量と仲間を巻き込む力は、コミュニティの中心になる資質です。\n行事や部活が活発で、仲間と熱中できる学校がおすすめです。",
    environments: [
      "行事・部活動が活発な学校",
      "リーダーシップを育むプログラム",
      "生徒主体で運営される学校行事",
    ],
  },
  "selfDrive+expression": {
    emoji: "📝",
    name: "自律クリエイター",
    comment:
      "お子さまは、自分でテーマを決めて作品に仕上げる力を持っています。\n個の表現を大切にする自由度の高い学校がぴったりです。",
    environments: [
      "個別最適な学びを提供する学校",
      "制作・執筆活動の自由度が高い環境",
      "生徒の作品を発信する機会",
    ],
  },
  "selfDrive+future": {
    emoji: "🎯",
    name: "戦略プランナー型",
    comment:
      "お子さまは、自分で目標を立てて道筋を描いていける計画性を持っています。\nICT環境や進路指導が充実した学校で才能が伸びます。",
    environments: [
      "ICT・プログラミング教育が充実した学校",
      "キャリア教育・進路指導に強い環境",
      "目標達成をサポートする個別面談",
    ],
  },
  "expression+collaboration": {
    emoji: "🌈",
    name: "共創アーティスト",
    comment:
      "お子さまは、仲間と一緒に何かを創り上げる協働の楽しさを知っています。\n合唱・演劇・文化祭などの共同制作が盛んな学校がおすすめです。",
    environments: [
      "文化祭・合唱祭が盛んな学校",
      "チーム制作のプログラム",
      "多様性を尊重する校風",
    ],
  },
  "collaboration+future": {
    emoji: "🌍",
    name: "ソーシャルチェンジャー",
    comment:
      "お子さまは、仲間とともに社会を良くしたいという志を持っています。\nSDGs・国際交流などに力を入れる学校で大きく成長できます。",
    environments: [
      "SDGs・社会課題探究のある学校",
      "国際交流・留学プログラム",
      "ボランティア・社会貢献活動",
    ],
  },
};

const DEFAULT_TYPE: LearningType = {
  emoji: "✨",
  name: "バランス型マルチタレント",
  comment:
    "お子さまは、複数の力をバランスよく持ち合わせたマルチな才能の持ち主です。\n幅広い学びの機会を用意する総合力のある学校で、さまざまな可能性を広げていけます。",
  environments: [
    "幅広い学びの機会がある総合型の学校",
    "バランスの取れたカリキュラム",
    "多様な選択肢から自分で選べる環境",
  ],
};

function determineType(scores: Record<AxisKey, number>): LearningType {
  const sorted = (Object.entries(scores) as [AxisKey, number][])
    .sort((a, b) => b[1] - a[1]);
  const top2 = [sorted[0][0], sorted[1][0]];
  const priority: AxisKey[] = ["exploration", "passion", "selfDrive", "expression", "collaboration", "future"];
  top2.sort((a, b) => priority.indexOf(a) - priority.indexOf(b));
  const key = `${top2[0]}+${top2[1]}`;
  return TYPE_MAP[key] || DEFAULT_TYPE;
}

export default function ExplorationReport({ userInput, results }: ExplorationReportProps) {
  const reportRef = useRef<HTMLDivElement>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const scores: Record<AxisKey, number> = {
    exploration: userInput.explorationPower,
    passion: userInput.passionLevel,
    selfDrive: userInput.selfDrive,
    expression: userInput.expressionPower,
    collaboration: userInput.collaborationPower,
    future: userInput.futureOrientation,
  };

  const learningType = determineType(scores);
  const top3 = results.slice(0, 3);
  const today = new Date();
  const dateStr = `${today.getFullYear()}年${today.getMonth() + 1}月${today.getDate()}日`;

  const chartData = (Object.keys(scores) as AxisKey[]).map((key) => ({
    axis: AXIS_LABELS[key],
    value: scores[key],
    fullMark: 5,
  }));

  const shareText = `うちの子は【${learningType.emoji} ${learningType.name}】タイプでした！ #TRAIL私立中学相性診断`;
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  const handleSaveImage = async () => {
    if (!reportRef.current || saving) return;
    setSaving(true);
    try {
      const canvas = await html2canvas(reportRef.current, {
        backgroundColor: "#ffffff",
        scale: 2,
        useCORS: true,
        logging: false,
      });
      const link = document.createElement("a");
      link.download = `trail-exploration-report-${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, "0")}${String(today.getDate()).padStart(2, "0")}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (e) {
      console.error("Failed to save report image:", e);
    } finally {
      setSaving(false);
    }
  };

  const handleShareLine = () => {
    const url = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleShareX = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="w-full">
      {/* Report Card (captured by html2canvas) */}
      <div
        ref={reportRef}
        className="bg-white rounded-2xl shadow-lg border border-[#E5E7EB]/40 overflow-hidden"
        style={{ boxShadow: "0 10px 30px rgba(44,95,124,0.10)" }}
      >
        {/* Header */}
        <div className="bg-gradient-to-br from-[#2C5F7C] to-[#4A9B7F] px-5 py-5 text-white text-center">
          <p className="font-sans text-[9px] tracking-[0.3em] uppercase opacity-80 mb-1">
            TRAIL Exploration Report
          </p>
          <h3 className="font-serif font-bold text-[17px] leading-tight">
            お子さまの学びのタイプ診断
          </h3>
          <p className="font-sans text-[10px] opacity-85 mt-1.5">
            TRAIL 私立中学相性診断 ／ {dateStr}
          </p>
        </div>

        {/* Radar Chart */}
        <div className="px-4 pt-5 pb-2">
          <p className="font-sans text-[10px] text-[#2C5F7C] tracking-widest uppercase font-bold text-center mb-2">
            Ability Radar
          </p>
          <div className="w-full h-[240px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={chartData} outerRadius="75%">
                <PolarGrid stroke="#D1D5DB" />
                <PolarAngleAxis
                  dataKey="axis"
                  tick={{ fill: "#2C5F7C", fontSize: 11, fontWeight: 600 }}
                />
                <PolarRadiusAxis angle={90} domain={[0, 5]} tick={false} axisLine={false} />
                <Radar
                  name="score"
                  dataKey="value"
                  stroke="#4A9B7F"
                  fill="#4A9B7F"
                  fillOpacity={0.35}
                  strokeWidth={2}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* Score numbers */}
          <div className="grid grid-cols-3 gap-2 mt-2">
            {(Object.keys(scores) as AxisKey[]).map((key) => (
              <div
                key={key}
                className="bg-[#F3F4F6]/60 rounded-lg py-1.5 px-1.5 text-center border border-[#E5E7EB]/40"
              >
                <p className="font-sans text-[9px] text-[#6B7280] font-semibold">
                  {AXIS_LABELS[key]}
                </p>
                <p className="font-serif font-bold text-[#2C5F7C] text-[15px] leading-none mt-0.5">
                  {scores[key]}
                  <span className="text-[10px] text-[#9CA3AF]">/5</span>
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Learning Type */}
        <div className="px-5 py-5 mt-2 mx-4 mb-4 rounded-xl bg-gradient-to-br from-[#2C5F7C]/[0.04] to-[#4A9B7F]/[0.06] border border-[#2C5F7C]/15">
          <p className="font-sans text-[10px] text-[#2C5F7C] tracking-widest uppercase font-bold text-center mb-2">
            Your Learning Type
          </p>
          <h4 className="font-serif font-bold text-[#333333] text-[22px] text-center leading-tight">
            <span className="mr-1">{learningType.emoji}</span>
            {learningType.name}
          </h4>
          <p className="font-sans text-[11px] text-[#4B5563] leading-[1.8] mt-3 whitespace-pre-line text-center">
            {learningType.comment}
          </p>
        </div>

        {/* Recommended Environment */}
        <div className="px-5 mb-5">
          <p className="font-sans text-[10px] text-[#2C5F7C] tracking-widest uppercase font-bold mb-2">
            Recommended Environment
          </p>
          <h5 className="font-serif font-bold text-[#333333] text-[13px] mb-2.5">
            おすすめの学び環境
          </h5>
          <ul className="space-y-1.5">
            {learningType.environments.map((env, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-[12px] text-[#4B5563] font-sans leading-relaxed"
              >
                <span className="text-[#4A9B7F] font-bold shrink-0">✓</span>
                <span>{env}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Top 3 Schools */}
        <div className="px-5 mb-5">
          <p className="font-sans text-[10px] text-[#2C5F7C] tracking-widest uppercase font-bold mb-2">
            Best Match TOP 3
          </p>
          <h5 className="font-serif font-bold text-[#333333] text-[13px] mb-2.5">
            マッチした学校
          </h5>
          <div className="space-y-2">
            {top3.map((r, i) => (
              <div
                key={r.school.id}
                className="flex items-center gap-3 p-2.5 rounded-lg bg-[#FAFAF8] border border-[#E5E7EB]/50"
              >
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-white font-bold text-[11px] shrink-0 ${
                    i === 0 ? "bg-[#E8B830]" : i === 1 ? "bg-[#9CA3AF]" : "bg-[#C77B3C]"
                  }`}
                >
                  {i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-serif font-bold text-[#333333] text-[12px] truncate">
                    {r.school.name}
                  </p>
                  <p className="font-sans text-[10px] text-[#6B7280] truncate">
                    {r.school.area} ／ {r.school.schoolStyle}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-serif font-bold text-[#2C5F7C] text-[14px] leading-none">
                    {Math.round(r.totalScore)}
                  </p>
                  <p className="font-sans text-[8px] text-[#9CA3AF] mt-0.5">相性</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer CTA */}
        <div className="bg-gradient-to-br from-[#2C5F7C]/[0.06] to-[#4A9B7F]/[0.08] px-5 py-5 border-t border-[#E5E7EB]/40">
          <p className="font-sans text-[10px] text-[#2C5F7C] tracking-widest uppercase font-bold text-center mb-1">
            Grow Further
          </p>
          <h5 className="font-serif font-bold text-[#333333] text-[14px] text-center mb-3">
            探究力をもっと伸ばしたいなら
          </h5>
          <div className="flex items-center gap-3">
            <div className="w-16 h-16 rounded-lg bg-white border border-[#E5E7EB] flex items-center justify-center shrink-0">
              <div
                className="w-12 h-12 bg-[#333333]"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(0deg, #333 0 2px, #fff 2px 4px), repeating-linear-gradient(90deg, #333 0 2px, transparent 2px 4px)",
                  backgroundBlendMode: "multiply",
                }}
                aria-label="QRコード（仮）"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-serif font-bold text-[#2C5F7C] text-[13px] leading-tight">
                TRAIL 探究教室
              </p>
              <p className="font-sans text-[10px] text-[#6B7280] leading-snug mt-0.5">
                自ら問いを立て、深く学ぶ力を育てます
              </p>
              <a
                href="#"
                className="inline-block mt-1.5 px-3 py-1 rounded-full bg-[#4A9B7F] text-white font-sans font-bold text-[10px]"
              >
                無料体験はこちら →
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Save / Share Controls */}
      <div className="mt-5 space-y-2.5">
        <button
          onClick={handleSaveImage}
          disabled={saving}
          className="w-full py-3.5 rounded-xl bg-[#2C5F7C] text-white font-sans font-bold text-[13px] flex items-center justify-center gap-2 shadow-md shadow-[#2C5F7C]/20 hover:bg-[#234a62] active:bg-[#1a3649] transition-colors disabled:opacity-60"
        >
          {saved ? (
            <>
              <Check className="w-4 h-4" />
              保存しました
            </>
          ) : (
            <>
              <Download className="w-4 h-4" />
              {saving ? "保存中..." : "レポートを保存"}
            </>
          )}
        </button>

        <div className="grid grid-cols-2 gap-2.5">
          <button
            onClick={handleShareLine}
            className="py-3 rounded-xl bg-[#06C755] text-white font-sans font-bold text-[12px] flex items-center justify-center gap-1.5 hover:opacity-90 active:opacity-80 transition-opacity"
          >
            <Share2 className="w-3.5 h-3.5" />
            LINEでシェア
          </button>
          <button
            onClick={handleShareX}
            className="py-3 rounded-xl bg-[#000000] text-white font-sans font-bold text-[12px] flex items-center justify-center gap-1.5 hover:opacity-90 active:opacity-80 transition-opacity"
          >
            <Share2 className="w-3.5 h-3.5" />
            Xでシェア
          </button>
        </div>
      </div>
    </div>
  );
}

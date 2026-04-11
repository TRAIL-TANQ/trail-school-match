/*
 * DiagnosisForm - 診断フォーム（保護者向け）
 * 清潔感のある上品なデザイン、STEP1〜7
 *
 * STEP構成:
 * 1. 学力の現在地（学年・偏差値）
 * 2. お子さまの現在の強み
 * 3. 伸ばしたい能力
 * 4. 性格・学びのスタイル診断
 * 5. 学びの環境（校風）
 * 6. 共学/別学
 * 7. 通学条件（任意）
 */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield, Sparkles, Target, Flame, TreePine, Users, MapPin,
  ChevronRight, ChevronLeft, Zap, Search,
} from "lucide-react";
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer,
} from "recharts";
import type { DiagnosisInput } from "@/lib/schoolData";
import { STRENGTH_OPTIONS, GROWTH_OPTIONS } from "@/lib/schoolData";

/* ============================================================
   Quiz Questions - 能力を自動算出するための質問セット
   ============================================================ */

type Ability =
  | "exploration"
  | "passion"
  | "selfDrive"
  | "expression"
  | "collaboration"
  | "future";

type QuizAnswer = { label: string; effects: Partial<Record<Ability, number>> };
type QuizQuestion = { id: string; category: string; question: string; answers: QuizAnswer[] };

const QUIZ_SIMPLE: QuizQuestion[] = [
  {
    id: "q1",
    category: "探究力",
    question: "お子さまが興味を持ったことに対して、どんな行動をとりますか？",
    answers: [
      { label: "自分で本やネットで徹底的に調べる", effects: { exploration: 5 } },
      { label: "親や先生に聞いて満足する", effects: { exploration: 3 } },
      { label: "とりあえず手を動かしてやってみる", effects: { exploration: 3, passion: 2 } },
      { label: "特に深追いしない", effects: { exploration: 1 } },
    ],
  },
  {
    id: "q2",
    category: "情熱",
    question: "好きなことへの没頭度は？",
    answers: [
      { label: "何時間でも夢中になって止まらない", effects: { passion: 5 } },
      { label: "好きなことには集中するが切り替えもできる", effects: { passion: 4 } },
      { label: "興味はあるが長続きしにくい", effects: { passion: 2 } },
      { label: "特に夢中になることがない", effects: { passion: 1 } },
    ],
  },
  {
    id: "q3",
    category: "自走力",
    question: "宿題や課題への取り組み方は？",
    answers: [
      { label: "自分で計画を立てて、言われなくても進める", effects: { selfDrive: 5 } },
      { label: "声をかければ自分でやる", effects: { selfDrive: 3 } },
      { label: "親が横についていればやる", effects: { selfDrive: 2 } },
      { label: "なかなか取りかからない", effects: { selfDrive: 1 } },
    ],
  },
  {
    id: "q4",
    category: "表現力",
    question: "自分の考えを伝える場面で？",
    answers: [
      { label: "作文・発表・絵など何かしらで表現するのが好き", effects: { expression: 5 } },
      { label: "話すのは得意だが書くのは苦手（またはその逆）", effects: { expression: 3 } },
      { label: "聞かれれば答えるが自分からは発信しない", effects: { expression: 2 } },
      { label: "人前で話すのが苦手", effects: { expression: 1 } },
    ],
  },
  {
    id: "q5",
    category: "協働力",
    question: "グループ活動での役割は？",
    answers: [
      { label: "みんなの意見をまとめるリーダータイプ", effects: { collaboration: 5 } },
      { label: "自分の意見を出しつつ協力できる", effects: { collaboration: 4 } },
      { label: "周りに合わせるタイプ", effects: { collaboration: 3 } },
      { label: "一人で進めたがる", effects: { collaboration: 1 } },
    ],
  },
  {
    id: "q6",
    category: "未来志向",
    question: "将来やりたいことについて聞くと？",
    answers: [
      { label: "具体的な夢や目標を語る", effects: { future: 5 } },
      { label: "いろんなことに興味があって絞れない", effects: { future: 4 } },
      { label: "「まだわからない」と言う", effects: { future: 2 } },
      { label: "あまり考えたことがなさそう", effects: { future: 1 } },
    ],
  },
  {
    id: "q7",
    category: "テクノロジー",
    question: "プログラミング・実験・ものづくりへの反応は？",
    answers: [
      { label: "大好き、自分からどんどんやる", effects: { future: 3, exploration: 2 } },
      { label: "やれば楽しそうにするが自分からはやらない", effects: { future: 2, exploration: 1 } },
      { label: "あまり興味を示さない", effects: { future: 1 } },
      { label: "タブレットやPCを使いこなしている", effects: { future: 3, selfDrive: 1 } },
    ],
  },
];

const QUIZ_DETAILED_EXTRA: QuizQuestion[] = [
  {
    id: "q8",
    category: "探究力・深掘り",
    question: "自由研究や調べ学習のスタイルは？",
    answers: [
      { label: "テーマ選びからこだわり、何日もかけて深く掘り下げる", effects: { exploration: 5, passion: 2 } },
      { label: "先生に言われたテーマをそれなりにまとめる", effects: { exploration: 2 } },
      { label: "面白いテーマを見つけるが途中で別のことに興味が移る", effects: { exploration: 4, selfDrive: -1 } },
      { label: "親が手伝わないと進められない", effects: { exploration: 1 } },
    ],
  },
  {
    id: "q9",
    category: "情熱・持続",
    question: "習い事やスポーツへの姿勢は？",
    answers: [
      { label: "上手くなりたくて自主練習もする", effects: { passion: 5, selfDrive: 2 } },
      { label: "練習は真面目にやるが自主練はしない", effects: { passion: 3 } },
      { label: "楽しいけど頑張るのは苦手", effects: { passion: 2 } },
      { label: "すぐ辞めたがる", effects: { passion: 1 } },
    ],
  },
  {
    id: "q10",
    category: "自走力・深掘り",
    question: "朝の準備や持ち物管理は？",
    answers: [
      { label: "前日に自分で全部準備できる", effects: { selfDrive: 5 } },
      { label: "声をかければ自分でやる", effects: { selfDrive: 3 } },
      { label: "チェックリストがあればできる", effects: { selfDrive: 2 } },
      { label: "毎回親が確認しないと忘れ物が多い", effects: { selfDrive: 1 } },
    ],
  },
  {
    id: "q11",
    category: "表現力・深掘り",
    question: "読書感想文や作文を書くときは？",
    answers: [
      { label: "自分の意見や気持ちを豊かに書ける", effects: { expression: 5, exploration: 1 } },
      { label: "事実は書けるが感想が短い", effects: { expression: 2 } },
      { label: "書くのは苦手だが口頭なら伝えられる", effects: { expression: 3 } },
      { label: "何を書いていいかわからず固まる", effects: { expression: 1 } },
    ],
  },
  {
    id: "q12",
    category: "協働力・深掘り",
    question: "友達との関わり方は？",
    answers: [
      { label: "いろんなタイプの子と仲良くできる", effects: { collaboration: 5 } },
      { label: "少数の仲良しグループがある", effects: { collaboration: 3 } },
      { label: "大人や年上の人と話す方が得意", effects: { collaboration: 2, expression: 1 } },
      { label: "一人で過ごすのが好き", effects: { collaboration: 1, exploration: 1 } },
    ],
  },
  {
    id: "q13",
    category: "未来志向・深掘り",
    question: "ニュースや社会の出来事への反応は？",
    answers: [
      { label: "自分から聞いたり調べたりする", effects: { future: 5, exploration: 2 } },
      { label: "親が話せば興味を持つ", effects: { future: 3 } },
      { label: "あまり関心がない", effects: { future: 1 } },
      { label: "環境問題やSDGsなど特定のテーマに強い関心", effects: { future: 5, passion: 2 } },
    ],
  },
  {
    id: "q14",
    category: "総合・学びのスタイル",
    question: "お子さまにとって「学び」とは？",
    answers: [
      { label: "知らないことを知るのが楽しい", effects: { exploration: 3, passion: 2 } },
      { label: "テストで良い点を取ること", effects: { selfDrive: 2 } },
      { label: "友達と一緒に何かを作り上げること", effects: { collaboration: 3, expression: 2 } },
      { label: "将来の夢に近づくための手段", effects: { future: 3, selfDrive: 2 } },
    ],
  },
];

const ABILITIES: Ability[] = [
  "exploration", "passion", "selfDrive", "expression", "collaboration", "future",
];

function computeAbilityScores(
  questions: QuizQuestion[],
  answers: (number | null)[]
): Record<Ability, number> {
  const sum: Record<Ability, number> = {
    exploration: 0, passion: 0, selfDrive: 0, expression: 0, collaboration: 0, future: 0,
  };
  const min: Record<Ability, number> = { ...sum };
  const max: Record<Ability, number> = { ...sum };

  questions.forEach((q, i) => {
    ABILITIES.forEach((a) => {
      const values = q.answers.map((ans) => ans.effects[a] ?? 0);
      min[a] += Math.min(...values);
      max[a] += Math.max(...values);
    });
    const selected = answers[i];
    if (selected == null) return;
    const ans = q.answers[selected];
    for (const [k, v] of Object.entries(ans.effects)) {
      sum[k as Ability] += v as number;
    }
  });

  const result: Record<Ability, number> = { ...sum };
  ABILITIES.forEach((a) => {
    const range = max[a] - min[a];
    if (range === 0) {
      result[a] = 3;
    } else {
      const normalized = 1 + ((sum[a] - min[a]) / range) * 4;
      result[a] = Math.max(1, Math.min(5, Math.round(normalized)));
    }
  });
  return result;
}

interface DiagnosisFormProps {
  onSubmit: (input: DiagnosisInput) => void;
  isCompleted: boolean;
}

const STEPS = [
  { id: 1, title: "学力の現在地", icon: Shield, subtitle: "お子さまの学年・偏差値を教えてください" },
  { id: 2, title: "お子さまの強み", icon: Sparkles, subtitle: "現在持っている強みを選んでください" },
  { id: 3, title: "伸ばしたい能力", icon: Target, subtitle: "中学で育みたい力を選んでください" },
  { id: 4, title: "性格・学びのスタイル", icon: Flame, subtitle: "ご家庭での様子から診断します" },
  { id: 5, title: "学びの環境", icon: TreePine, subtitle: "希望される校風をお選びください" },
  { id: 6, title: "共学・別学", icon: Users, subtitle: "ご希望の学校形態をお選びください" },
  { id: 7, title: "通学条件", icon: MapPin, subtitle: "通学時間について（任意）" },
];

const TOTAL_STEPS = STEPS.length;

export default function DiagnosisForm({ onSubmit, isCompleted }: DiagnosisFormProps) {
  const [quizMode, setQuizMode] = useState<"simple" | "detailed" | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<(number | null)[]>([]);
  const [showRadar, setShowRadar] = useState(false);

  const quizQuestions =
    quizMode === "detailed" ? [...QUIZ_SIMPLE, ...QUIZ_DETAILED_EXTRA] : QUIZ_SIMPLE;

  const [formData, setFormData] = useState<Partial<DiagnosisInput>>({
    grade: "",
    deviationStandard: "sapix",
    deviationRange: "",
    currentStrengths: [],
    desiredGrowth: [],
    explorationPower: 3,
    passionLevel: 3,
    selfDrive: 3,
    expressionPower: 3,
    collaborationPower: 3,
    futureOrientation: 3,
    schoolStyle: "こだわらない",
    coedPreference: "こだわらない",
    includeCommute: false,
    commuteTime: "any",
  });

  const updateField = <K extends keyof DiagnosisInput>(
    key: K,
    value: DiagnosisInput[K]
  ) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const toggleArrayField = (key: "currentStrengths" | "desiredGrowth", value: string) => {
    setFormData((prev) => {
      const arr = (prev[key] as string[]) || [];
      if (arr.includes(value)) {
        return { ...prev, [key]: arr.filter((v) => v !== value) };
      }
      // 最大3つまで選択可能
      if (arr.length >= 3) return prev;
      return { ...prev, [key]: [...arr, value] };
    });
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return !!(formData.grade && formData.deviationStandard && formData.deviationRange);
      case 2: return (formData.currentStrengths?.length ?? 0) >= 1;
      case 3: return (formData.desiredGrowth?.length ?? 0) >= 1;
      case 4: return true;
      case 5: return !!formData.schoolStyle;
      case 6: return !!formData.coedPreference;
      case 7: return true; // 任意なので常にtrue
      default: return true;
    }
  };

  const scrollToSection = () => {
    const el = document.getElementById("quest-section");
    if (el) {
      setTimeout(() => {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 120);
    }
  };

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(currentStep + 1);
      scrollToSection();
    }
  };

  const handlePrev = () => {
    if (currentStep === 4 && showRadar) {
      setShowRadar(false);
      return;
    }
    if (currentStep === 4 && quizIndex > 0) {
      setQuizIndex(quizIndex - 1);
      return;
    }
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      scrollToSection();
    }
  };

  const handleQuizAnswer = (answerIdx: number) => {
    const newAnswers = [...quizAnswers];
    while (newAnswers.length < quizQuestions.length) newAnswers.push(null);
    newAnswers[quizIndex] = answerIdx;
    setQuizAnswers(newAnswers);

    if (quizIndex < quizQuestions.length - 1) {
      setTimeout(() => setQuizIndex(quizIndex + 1), 280);
    } else {
      // 全問完了 → スコア算出 → レーダーチャート表示
      const scores = computeAbilityScores(quizQuestions, newAnswers);
      setFormData((prev) => ({
        ...prev,
        explorationPower: scores.exploration,
        passionLevel: scores.passion,
        selfDrive: scores.selfDrive,
        expressionPower: scores.expression,
        collaborationPower: scores.collaboration,
        futureOrientation: scores.future,
      }));
      setTimeout(() => setShowRadar(true), 280);
    }
  };

  const handleRadarContinue = () => {
    setShowRadar(false);
    setCurrentStep(5);
    setQuizIndex(0);
    scrollToSection();
  };

  const selectMode = (mode: "simple" | "detailed") => {
    setQuizMode(mode);
    setQuizAnswers(new Array(mode === "detailed" ? 14 : 7).fill(null));
  };

  const handleSubmit = () => {
    onSubmit(formData as DiagnosisInput);
  };

  return (
    <section id="quest-section" className="relative py-10 px-4 bg-[#FAFAF8]">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#2C5F7C]/30 to-transparent" />

      <div className="relative z-10 max-w-[420px] mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-6"
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="font-sans text-[10px] tracking-[0.25em] text-[#2C5F7C] uppercase font-semibold">
              Diagnosis
            </span>
          </div>
          <h2 className="font-sans font-bold text-[#333333] text-lg">
            お子さまの情報を入力
          </h2>
        </motion.div>

        {/* Mode Selection - 診断モードを選んでください */}
        {quizMode === null && !isCompleted && (
          <ModeSelection onSelect={selectMode} />
        )}

        {quizMode !== null && (
        <>
        {/* Step Progress Bar */}
        <div className="flex items-center justify-center gap-0 mb-7 px-1">
          {STEPS.map((step, idx) => (
            <div key={step.id} className="flex items-center">
              <motion.div
                animate={{
                  scale: step.id === currentStep ? 1.15 : 1,
                }}
                transition={{ type: "spring", stiffness: 300 }}
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-[10px] sm:text-[11px] font-bold transition-all duration-300 ${
                  step.id === currentStep
                    ? "bg-gradient-to-b from-[#2C5F7C] to-[#2C5F7C] text-white shadow-md shadow-[#2C5F7C]/30"
                    : step.id < currentStep
                    ? "bg-[#E5E7EB] text-white/90"
                    : "bg-[#F3F4F6]/50 text-[#2C5F7C]/30 border border-[#E5E7EB]/15"
                }`}
              >
                {step.id < currentStep ? "✓" : step.id}
              </motion.div>
              {idx < STEPS.length - 1 && (
                <div
                  className={`w-2 sm:w-3.5 h-[2px] mx-px rounded-full transition-colors duration-400 ${
                    step.id < currentStep ? "bg-[#E5E7EB]" : "bg-[#E5E7EB]/12"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="parchment-card rounded-2xl p-5 sm:p-6 mb-5 shadow-lg shadow-[#2C5F7C]/8"
          >
            {/* Step Header */}
            <div className="flex items-center gap-3 mb-1">
              <div className="w-10 h-10 rounded-full bg-gradient-to-b from-[#2C5F7C] to-[#2C5F7C] flex items-center justify-center shadow-md shadow-[#2C5F7C]/20 shrink-0">
                {(() => {
                  const Icon = STEPS[currentStep - 1].icon;
                  return <Icon className="w-5 h-5 text-white" />;
                })()}
              </div>
              <div>
                <span className="text-[10px] font-sans text-[#2C5F7C] font-bold tracking-wider uppercase">
                  Step {currentStep} / {TOTAL_STEPS}
                </span>
                <h3 className="font-serif font-bold text-[#333333] text-[15px] leading-tight">
                  {STEPS[currentStep - 1].title}
                </h3>
              </div>
            </div>
            <p className="text-[11px] text-[#2C5F7C]/55 font-sans mb-5 ml-[52px]">
              {STEPS[currentStep - 1].subtitle}
            </p>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-[#E5E7EB]/25 to-transparent mb-5" />

            {/* Step Content */}
            <div className="space-y-4">
              {currentStep === 1 && <Step1 formData={formData} updateField={updateField} />}
              {currentStep === 2 && <Step2 formData={formData} toggleArrayField={toggleArrayField} />}
              {currentStep === 3 && <Step3 formData={formData} toggleArrayField={toggleArrayField} />}
              {currentStep === 4 && !showRadar && (
                <QuizStep
                  questions={quizQuestions}
                  quizIndex={quizIndex}
                  answers={quizAnswers}
                  onAnswer={handleQuizAnswer}
                />
              )}
              {currentStep === 4 && showRadar && (
                <RadarResultView formData={formData} onContinue={handleRadarContinue} />
              )}
              {currentStep === 5 && <Step5 formData={formData} updateField={updateField} />}
              {currentStep === 6 && <Step6 formData={formData} updateField={updateField} />}
              {currentStep === 7 && <Step7 formData={formData} updateField={updateField} />}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        {!isCompleted && (
          <div className="flex gap-3">
            {(currentStep > 1 || (currentStep === 4 && quizIndex > 0)) && (
              <button
                onClick={handlePrev}
                className="flex-1 py-3.5 rounded-xl border-2 border-[#E5E7EB]/30 text-[#2C5F7C] font-serif font-semibold text-[13px] bg-[#FFFFFF]/30 hover:bg-[#F3F4F6]/50 active:bg-[#F3F4F6] transition-all duration-200 flex items-center justify-center gap-1.5"
              >
                <ChevronLeft className="w-4 h-4" />
                戻る
              </button>
            )}
            {currentStep === 4 ? (
              // STEP4 (quiz) は選択で自動的に進むため「次へ」ボタンは非表示
              null
            ) : currentStep < TOTAL_STEPS ? (
              <button
                onClick={handleNext}
                disabled={!canProceed()}
                className={`flex-1 gold-btn py-3.5 rounded-xl text-[13px] flex items-center justify-center gap-1.5 ${
                  !canProceed() ? "opacity-40 pointer-events-none" : ""
                }`}
              >
                <span>次へ進む</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="flex-1 gold-btn py-4 rounded-xl text-[14px]"
                data-testid="button-submit-diagnosis"
              >
                診断する
              </button>
            )}
          </div>
        )}
        </>
        )}
      </div>
    </section>
  );
}

/* ============================================================
   Mode Selection Screen
   ============================================================ */

function ModeSelection({ onSelect }: { onSelect: (mode: "simple" | "detailed") => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="parchment-card rounded-2xl p-5 sm:p-6 shadow-lg shadow-[#2C5F7C]/8"
    >
      <div className="text-center mb-5">
        <h3 className="font-serif font-bold text-[#333333] text-[16px] mb-1">
          診断モードを選んでください
        </h3>
        <p className="font-sans text-[11px] text-[#2C5F7C]/60">
          お子さまの学びタイプを自動で分析します
        </p>
      </div>
      <div className="space-y-3">
        <button
          onClick={() => onSelect("simple")}
          className="w-full text-left p-4 rounded-xl border-2 border-[#E5E7EB]/25 bg-white/35 hover:border-[#2C5F7C] hover:bg-[#2C5F7C]/8 active:scale-[0.98] transition-all duration-200"
          data-testid="button-mode-simple"
        >
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-gradient-to-b from-[#2C5F7C] to-[#2C5F7C] flex items-center justify-center shrink-0 shadow-sm">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-baseline gap-2">
                <span className="font-serif font-bold text-[14px] text-[#333333]">
                  サクッと診断
                </span>
                <span className="font-sans text-[10px] text-[#2C5F7C]/60">約3分</span>
              </div>
              <p className="font-sans text-[11px] text-[#6B7280] mt-0.5">
                7つの質問で手軽に診断
              </p>
            </div>
          </div>
        </button>
        <button
          onClick={() => onSelect("detailed")}
          className="relative w-full text-left p-4 rounded-xl border-2 border-[#2C5F7C] bg-gradient-to-br from-[#2C5F7C]/15 to-[#2C5F7C]/5 shadow-md shadow-[#2C5F7C]/15 active:scale-[0.98] transition-all duration-200"
          data-testid="button-mode-detailed"
        >
          <span className="absolute -top-2 right-3 text-[9px] font-sans font-bold text-white bg-gradient-to-b from-[#2C5F7C] to-[#2C5F7C] px-2 py-0.5 rounded-full shadow-sm">
            おすすめ
          </span>
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-gradient-to-b from-[#2C5F7C] to-[#2C5F7C] flex items-center justify-center shrink-0 shadow-sm">
              <Search className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-baseline gap-2">
                <span className="font-serif font-bold text-[14px] text-[#2C5F7C]">
                  じっくり診断
                </span>
                <span className="font-sans text-[10px] text-[#2C5F7C]/70">約7分</span>
              </div>
              <p className="font-sans text-[11px] text-[#6B7280] mt-0.5">
                14の質問で精密に診断
              </p>
            </div>
          </div>
        </button>
      </div>
    </motion.div>
  );
}

/* ============================================================
   Quiz Step - 1問ずつカード表示、自動で次へ
   ============================================================ */

function QuizStep({
  questions,
  quizIndex,
  answers,
  onAnswer,
}: {
  questions: QuizQuestion[];
  quizIndex: number;
  answers: (number | null)[];
  onAnswer: (idx: number) => void;
}) {
  const q = questions[quizIndex];
  const selected = answers[quizIndex];
  return (
    <div>
      {/* 質問進捗 */}
      <div className="flex items-center justify-between mb-3">
        <span className="font-sans text-[10px] font-bold text-[#2C5F7C] tracking-wider uppercase">
          Q{quizIndex + 1} / {questions.length}
        </span>
        <span className="font-sans text-[10px] text-[#2C5F7C]/60">{q.category}</span>
      </div>
      <div className="h-1 bg-[#E5E7EB]/15 rounded-full mb-4 overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-[#2C5F7C] to-[#2C5F7C]"
          initial={{ width: 0 }}
          animate={{ width: `${((quizIndex + 1) / questions.length) * 100}%` }}
          transition={{ duration: 0.35 }}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={q.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.22 }}
        >
          <h4 className="font-serif font-bold text-[#333333] text-[14px] leading-relaxed mb-4">
            {q.question}
          </h4>
          <div className="space-y-2.5">
            {q.answers.map((ans, idx) => (
              <button
                key={idx}
                onClick={() => onAnswer(idx)}
                className={`w-full text-left p-3.5 rounded-xl border-2 transition-all duration-200 active:scale-[0.98] ${
                  selected === idx
                    ? "border-[#2C5F7C] bg-gradient-to-br from-[#2C5F7C]/25 to-[#2C5F7C]/10 shadow-md shadow-[#2C5F7C]/20"
                    : "border-[#E5E7EB]/15 bg-white/30 hover:border-[#E5E7EB]/40 active:bg-[#F3F4F6]/30"
                }`}
                data-testid={`button-quiz-${q.id}-${idx}`}
              >
                <div className="flex items-start gap-2.5">
                  <span
                    className={`shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center font-serif font-bold text-[11px] ${
                      selected === idx
                        ? "border-[#2C5F7C] bg-[#2C5F7C] text-white"
                        : "border-[#E5E7EB]/40 text-[#2C5F7C]/60"
                    }`}
                  >
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="font-serif text-[12px] text-[#333333] leading-relaxed pt-0.5">
                    {ans.label}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ============================================================
   Radar Chart Result View - 診断結果プレビュー
   ============================================================ */

function RadarResultView({
  formData,
  onContinue,
}: {
  formData: Partial<DiagnosisInput>;
  onContinue: () => void;
}) {
  const data = [
    { axis: "探究力", value: formData.explorationPower ?? 3 },
    { axis: "情熱", value: formData.passionLevel ?? 3 },
    { axis: "自走力", value: formData.selfDrive ?? 3 },
    { axis: "表現力", value: formData.expressionPower ?? 3 },
    { axis: "協働力", value: formData.collaborationPower ?? 3 },
    { axis: "未来志向", value: formData.futureOrientation ?? 3 },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center"
    >
      <h4 className="font-serif font-bold text-[#333333] text-[15px] mb-1">
        お子さまの学びのタイプ
      </h4>
      <p className="font-sans text-[11px] text-[#2C5F7C]/60 mb-3">
        診断結果を可視化しました
      </p>
      <div className="w-full h-[260px] -mx-2">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={data} outerRadius="72%">
            <PolarGrid stroke="#E5E7EB" strokeOpacity={0.3} />
            <PolarAngleAxis
              dataKey="axis"
              tick={{ fill: "#4B5563", fontSize: 11, fontWeight: 600 }}
            />
            <PolarRadiusAxis domain={[0, 5]} tick={false} axisLine={false} />
            <Radar
              name="スコア"
              dataKey="value"
              stroke="#2C5F7C"
              fill="#2C5F7C"
              fillOpacity={0.5}
              strokeWidth={2}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
      <button
        onClick={onContinue}
        className="mt-3 gold-btn py-3 px-8 rounded-xl text-[13px] inline-flex items-center gap-1.5"
        data-testid="button-radar-continue"
      >
        <span>次のステップへ</span>
        <ChevronRight className="w-4 h-4" />
      </button>
    </motion.div>
  );
}

/* ============================================================
   Step Components
   ============================================================ */

interface StepProps {
  formData: Partial<DiagnosisInput>;
  updateField: <K extends keyof DiagnosisInput>(key: K, value: DiagnosisInput[K]) => void;
}

interface ArrayStepProps {
  formData: Partial<DiagnosisInput>;
  toggleArrayField: (key: "currentStrengths" | "desiredGrowth", value: string) => void;
}

/* STEP 1: 学力の現在地 */
function Step1({ formData, updateField }: StepProps) {
  return (
    <div className="space-y-5">
      <FieldGroup label="学年">
        <div className="grid grid-cols-3 gap-2">
          {["小1", "小2", "小3", "小4", "小5", "小6"].map((g) => (
            <SelectChip
              key={g}
              label={g}
              selected={formData.grade === g}
              onClick={() => updateField("grade", g)}
            />
          ))}
        </div>
      </FieldGroup>

      <FieldGroup label="偏差値基準">
        <div className="grid grid-cols-2 gap-2">
          {[
            { value: "sapix" as const, label: "サピックス" },
            { value: "yotsuya" as const, label: "四谷大塚" },
          ].map((opt) => (
            <SelectChip
              key={opt.value}
              label={opt.label}
              selected={formData.deviationStandard === opt.value}
              onClick={() => updateField("deviationStandard", opt.value)}
            />
          ))}
        </div>
      </FieldGroup>

      <FieldGroup label="偏差値帯">
        <div className="grid grid-cols-3 gap-2">
          {["30-35", "36-40", "41-45", "46-50", "51-55", "56-60", "61-65", "66-70", "71+"].map(
            (r) => (
              <SelectChip
                key={r}
                label={r}
                selected={formData.deviationRange === r}
                onClick={() => updateField("deviationRange", r)}
              />
            )
          )}
        </div>
      </FieldGroup>
    </div>
  );
}

/* STEP 2: お子さまの現在の適性 */
function Step2({ formData, toggleArrayField }: ArrayStepProps) {
  const selected = formData.currentStrengths || [];
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between mb-1">
        <p className="font-sans text-[11px] text-[#4B5563] font-bold tracking-wide">
          お子さまの強みを選んでください
        </p>
        <span className={`font-sans text-[10px] font-bold px-2 py-0.5 rounded-full ${
          selected.length >= 1 && selected.length <= 3
            ? "bg-[#2C5F7C]/15 text-[#2C5F7C]"
            : "bg-[#E5E7EB]/10 text-[#2C5F7C]/40"
        }`}>
          {selected.length} / 3
        </span>
      </div>
      <p className="font-sans text-[10px] text-[#2C5F7C]/50 -mt-2 mb-2">
        1〜3つまで選択できます（お子さまの今の姿に近いものを選んでください）
      </p>
      <div className="grid grid-cols-2 gap-2">
        {STRENGTH_OPTIONS.map((opt) => (
          <TagChip
            key={opt.value}
            icon={opt.icon}
            label={opt.label}
            desc={opt.desc}
            selected={selected.includes(opt.value)}
            disabled={!selected.includes(opt.value) && selected.length >= 3}
            onClick={() => toggleArrayField("currentStrengths", opt.value)}
          />
        ))}
      </div>
    </div>
  );
}

/* STEP 3: 伸ばしたい能力 */
function Step3({ formData, toggleArrayField }: ArrayStepProps) {
  const selected = formData.desiredGrowth || [];
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between mb-1">
        <p className="font-sans text-[11px] text-[#4B5563] font-bold tracking-wide">
          私立中学で伸ばしたい力
        </p>
        <span className={`font-sans text-[10px] font-bold px-2 py-0.5 rounded-full ${
          selected.length >= 1 && selected.length <= 3
            ? "bg-[#2C5F7C]/15 text-[#2C5F7C]"
            : "bg-[#E5E7EB]/10 text-[#2C5F7C]/40"
        }`}>
          {selected.length} / 3
        </span>
      </div>
      <p className="font-sans text-[10px] text-[#2C5F7C]/50 -mt-2 mb-2">
        1〜3つまで選択できます（中学校で特に育みたい力を選んでください）
      </p>
      <div className="grid grid-cols-2 gap-2">
        {GROWTH_OPTIONS.map((opt) => (
          <TagChip
            key={opt.value}
            icon={opt.icon}
            label={opt.label}
            desc={opt.desc}
            selected={selected.includes(opt.value)}
            disabled={!selected.includes(opt.value) && selected.length >= 3}
            onClick={() => toggleArrayField("desiredGrowth", opt.value)}
          />
        ))}
      </div>
    </div>
  );
}

/* STEP 5: 学びの環境（校風） */
function Step5({ formData, updateField }: StepProps) {
  return (
    <FieldGroup label="理想の校風">
      <div className="space-y-2">
        {[
          { value: "自由" as const, label: "自由な校風", desc: "自主性を重んじ、生徒の個性を伸ばす" },
          { value: "規律" as const, label: "規律ある校風", desc: "しっかりとした指導で確かな学力を育む" },
          { value: "バランス" as const, label: "バランス型", desc: "自由と規律のバランスが取れた環境" },
          { value: "こだわらない" as const, label: "こだわらない", desc: "校風よりも他の条件を重視したい" },
        ].map((opt) => (
          <OptionCard
            key={opt.value}
            label={opt.label}
            desc={opt.desc}
            selected={formData.schoolStyle === opt.value}
            onClick={() => updateField("schoolStyle", opt.value)}
          />
        ))}
      </div>
    </FieldGroup>
  );
}

/* STEP 6: 共学/別学 */
function Step6({ formData, updateField }: StepProps) {
  return (
    <FieldGroup label="共学・別学の希望">
      <div className="space-y-2">
        {[
          { value: "共学" as const, label: "共学", desc: "男女が共に学ぶ環境" },
          { value: "男子校" as const, label: "男子校", desc: "男子のみの環境で切磋琢磨" },
          { value: "女子校" as const, label: "女子校", desc: "女子のみの環境できめ細やかな教育" },
          { value: "こだわらない" as const, label: "こだわらない", desc: "共学・別学は問わない" },
        ].map((opt) => (
          <OptionCard
            key={opt.value}
            label={opt.label}
            desc={opt.desc}
            selected={formData.coedPreference === opt.value}
            onClick={() => updateField("coedPreference", opt.value)}
          />
        ))}
      </div>
    </FieldGroup>
  );
}

/* STEP 7: 通学条件（任意） */
function Step7({ formData, updateField }: StepProps) {
  const includeCommute = formData.includeCommute ?? false;

  return (
    <div className="space-y-5">
      {/* 通学条件を含めるかの選択 */}
      <div className="space-y-3">
        <p className="font-sans text-[11px] text-[#4B5563] font-bold tracking-wide">
          通学距離を診断に含めますか？
        </p>
        <p className="font-sans text-[10px] text-[#2C5F7C]/50 leading-relaxed">
          住所の特定が気になる方は「含めない」を選択できます。通学条件なしでも正確な診断が可能です。
        </p>

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => updateField("includeCommute", true)}
            className={`py-3.5 px-3 rounded-xl border-2 transition-all duration-200 active:scale-95 text-center ${
              includeCommute
                ? "border-[#2C5F7C] bg-gradient-to-b from-[#2C5F7C]/20 to-[#2C5F7C]/8 shadow-sm shadow-[#2C5F7C]/15"
                : "border-[#E5E7EB]/15 bg-white/30 hover:border-[#E5E7EB]/40"
            }`}
          >
            <MapPin className={`w-5 h-5 mx-auto mb-1.5 ${includeCommute ? "text-[#2C5F7C]" : "text-[#E5E7EB]/40"}`} />
            <span className={`font-serif text-[13px] font-bold block ${includeCommute ? "text-[#2C5F7C]" : "text-[#4B5563]"}`}>
              含める
            </span>
            <span className="font-sans text-[10px] text-[#2C5F7C]/50 block mt-0.5">
              通学時間も考慮して診断
            </span>
          </button>
          <button
            onClick={() => {
              updateField("includeCommute", false);
              updateField("commuteTime", "any");
            }}
            className={`py-3.5 px-3 rounded-xl border-2 transition-all duration-200 active:scale-95 text-center ${
              !includeCommute
                ? "border-[#2C5F7C] bg-gradient-to-b from-[#2C5F7C]/20 to-[#2C5F7C]/8 shadow-sm shadow-[#2C5F7C]/15"
                : "border-[#E5E7EB]/15 bg-white/30 hover:border-[#E5E7EB]/40"
            }`}
          >
            <Shield className={`w-5 h-5 mx-auto mb-1.5 ${!includeCommute ? "text-[#2C5F7C]" : "text-[#E5E7EB]/40"}`} />
            <span className={`font-serif text-[13px] font-bold block ${!includeCommute ? "text-[#2C5F7C]" : "text-[#4B5563]"}`}>
              含めない
            </span>
            <span className="font-sans text-[10px] text-[#2C5F7C]/50 block mt-0.5">
              学校の特徴のみで診断
            </span>
          </button>
        </div>
      </div>

      {/* 通学時間の選択（含める場合のみ表示） */}
      <AnimatePresence>
        {includeCommute && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
          >
            <FieldGroup label="通学時間の目安">
              <div className="grid grid-cols-2 gap-2">
                {[
                  { value: "30min", label: "30分以内" },
                  { value: "45min", label: "45分以内" },
                  { value: "60min", label: "60分以内" },
                  { value: "90min", label: "90分以内" },
                ].map((opt) => (
                  <SelectChip
                    key={opt.value}
                    label={opt.label}
                    selected={formData.commuteTime === opt.value}
                    onClick={() => updateField("commuteTime", opt.value)}
                  />
                ))}
              </div>
            </FieldGroup>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ============================================================
   Shared UI Components
   ============================================================ */

function FieldGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block font-sans text-[11px] font-bold text-[#4B5563] mb-2 tracking-wide">
        {label}
      </label>
      {children}
    </div>
  );
}

function SelectChip({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`py-2.5 px-2 rounded-lg border-2 font-sans text-[13px] font-medium transition-all duration-200 active:scale-95 ${
        selected
          ? "border-[#2C5F7C] bg-gradient-to-b from-[#2C5F7C]/20 to-[#2C5F7C]/8 text-[#2C5F7C] shadow-sm shadow-[#2C5F7C]/15 font-bold"
          : "border-[#E5E7EB]/15 bg-white/30 text-[#4B5563] hover:border-[#E5E7EB]/40 active:bg-[#F3F4F6]/30"
      }`}
    >
      {label}
    </button>
  );
}

function TagChip({
  icon,
  label,
  desc,
  selected,
  disabled,
  onClick,
}: {
  icon: string;
  label: string;
  desc: string;
  selected: boolean;
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled && !selected}
      className={`text-left p-3 rounded-xl border-2 transition-all duration-200 active:scale-[0.97] ${
        selected
          ? "border-[#2C5F7C] bg-gradient-to-br from-[#2C5F7C]/15 to-[#2C5F7C]/5 shadow-sm shadow-[#2C5F7C]/12"
          : disabled
          ? "border-[#E5E7EB]/8 bg-white/15 opacity-40 cursor-not-allowed"
          : "border-[#E5E7EB]/12 bg-white/25 hover:border-[#E5E7EB]/35"
      }`}
    >
      <div className="flex items-center gap-1.5 mb-0.5">
        <span className="text-[14px]">{icon}</span>
        <span className={`font-serif text-[12px] font-bold ${
          selected ? "text-[#2C5F7C]" : "text-[#333333]"
        }`}>
          {label}
        </span>
        {selected && (
          <span className="ml-auto text-[10px] text-[#2C5F7C]">✓</span>
        )}
      </div>
      <span className="font-sans text-[9px] text-[#6B7280]/70 leading-snug block">
        {desc}
      </span>
    </button>
  );
}

function OptionCard({
  label,
  desc,
  selected,
  onClick,
}: {
  label: string;
  desc: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-3.5 rounded-xl border-2 transition-all duration-200 active:scale-[0.98] ${
        selected
          ? "border-[#2C5F7C] bg-gradient-to-r from-[#2C5F7C]/12 to-[#2C5F7C]/5 shadow-sm shadow-[#2C5F7C]/12"
          : "border-[#E5E7EB]/12 bg-white/25 hover:border-[#E5E7EB]/35"
      }`}
    >
      <div className="flex items-center gap-2">
        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
          selected ? "border-[#2C5F7C] bg-[#2C5F7C]" : "border-[#E5E7EB]/30 bg-transparent"
        }`}>
          {selected && (
            <div className="w-1.5 h-1.5 rounded-full bg-white" />
          )}
        </div>
        <span className="font-serif font-bold text-[13px] text-[#333333]">{label}</span>
      </div>
      <span className="font-sans text-[11px] text-[#6B7280] mt-1 block leading-relaxed ml-6">{desc}</span>
    </button>
  );
}


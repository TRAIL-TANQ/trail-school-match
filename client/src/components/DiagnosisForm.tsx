/*
 * DiagnosisForm - RPGクエスト形式の診断フォーム
 * Design: 古書テーマ、カード形式、STEP1〜6
 * Mobile-first: タッチフレンドリーなボタン、スクロールで進行
 */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Flame, Compass, TreePine, MapPin, Users, ChevronRight, ChevronLeft } from "lucide-react";
import type { DiagnosisInput } from "@/lib/schoolData";

const QUEST_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663286960690/3onwxhANtpgAkHzmhikcoQ/quest-map-bg-2DikbyW7biu93HRJZty2Xd.webp";

interface DiagnosisFormProps {
  onSubmit: (input: DiagnosisInput) => void;
  isCompleted: boolean;
}

const STEPS = [
  { id: 1, title: "学力の現在地", icon: Shield, subtitle: "冒険者のレベルを確認しましょう" },
  { id: 2, title: "性格タイプ", icon: Flame, subtitle: "冒険者の特性を見極めます" },
  { id: 3, title: "興味の方向", icon: Compass, subtitle: "探究の羅針盤を合わせましょう" },
  { id: 4, title: "学びの環境", icon: TreePine, subtitle: "理想のフィールドを選びます" },
  { id: 5, title: "通学条件", icon: MapPin, subtitle: "冒険の拠点を確認します" },
  { id: 6, title: "共学/別学", icon: Users, subtitle: "パーティの編成を決めましょう" },
];

export default function DiagnosisForm({ onSubmit, isCompleted }: DiagnosisFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Partial<DiagnosisInput>>({
    grade: "",
    deviationStandard: "sapix",
    deviationRange: "",
    explorationPower: 3,
    passionLevel: 3,
    selfDrive: 3,
    expressionPower: 3,
    collaborationPower: 3,
    futureOrientation: 3,
    schoolStyle: "こだわらない",
    commuteTime: "any",
    coedPreference: "こだわらない",
  });

  const updateField = <K extends keyof DiagnosisInput>(
    key: K,
    value: DiagnosisInput[K]
  ) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return !!(formData.grade && formData.deviationStandard && formData.deviationRange);
      case 2: return true;
      case 3: return true;
      case 4: return !!formData.schoolStyle;
      case 5: return !!formData.commuteTime;
      case 6: return !!formData.coedPreference;
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
    if (currentStep < 6) {
      setCurrentStep(currentStep + 1);
      scrollToSection();
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      scrollToSection();
    }
  };

  const handleSubmit = () => {
    onSubmit(formData as DiagnosisInput);
  };

  return (
    <section id="quest-section" className="relative py-10 px-4">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${QUEST_BG})` }}
      />
      <div className="absolute inset-0 bg-[#F5E6C8]/90 backdrop-blur-[2px]" />
      {/* Top gold line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent" />

      <div className="relative z-10 max-w-[420px] mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-6"
        >
          <div className="flex items-center justify-center gap-2 mb-1">
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-[#C5A55A]" />
            <span className="font-heading text-[10px] tracking-[0.25em] text-[#B8860B] uppercase">
              Quest
            </span>
            <div className="h-px w-8 bg-gradient-to-l from-transparent to-[#C5A55A]" />
          </div>
          <h2 className="font-serif font-bold text-[#2C1810] text-lg">
            冒険者の情報を入力
          </h2>
        </motion.div>

        {/* Step Progress Bar */}
        <div className="flex items-center justify-center gap-0.5 mb-7 px-2">
          {STEPS.map((step, idx) => (
            <div key={step.id} className="flex items-center">
              <motion.div
                animate={{
                  scale: step.id === currentStep ? 1.15 : 1,
                }}
                transition={{ type: "spring", stiffness: 300 }}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold transition-all duration-300 ${
                  step.id === currentStep
                    ? "bg-gradient-to-b from-[#E5C04B] to-[#8B6914] text-white shadow-md shadow-[#D4AF37]/30"
                    : step.id < currentStep
                    ? "bg-[#C5A55A] text-white/90"
                    : "bg-[#EDD9B3]/50 text-[#B8860B]/30 border border-[#C5A55A]/15"
                }`}
              >
                {step.id < currentStep ? "✓" : step.id}
              </motion.div>
              {idx < STEPS.length - 1 && (
                <div
                  className={`w-3 sm:w-5 h-[2px] mx-0.5 rounded-full transition-colors duration-400 ${
                    step.id < currentStep ? "bg-[#C5A55A]" : "bg-[#C5A55A]/12"
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
            className="parchment-card rounded-2xl p-5 sm:p-6 mb-5 shadow-lg shadow-[#8B6914]/8"
          >
            {/* Step Header */}
            <div className="flex items-center gap-3 mb-1">
              <div className="w-10 h-10 rounded-full bg-gradient-to-b from-[#E5C04B] to-[#8B6914] flex items-center justify-center shadow-md shadow-[#D4AF37]/20 shrink-0">
                {(() => {
                  const Icon = STEPS[currentStep - 1].icon;
                  return <Icon className="w-5 h-5 text-white" />;
                })()}
              </div>
              <div>
                <span className="text-[10px] font-sans text-[#B8860B] font-bold tracking-wider uppercase">
                  Step {currentStep} / 6
                </span>
                <h3 className="font-serif font-bold text-[#2C1810] text-[15px] leading-tight">
                  {STEPS[currentStep - 1].title}
                </h3>
              </div>
            </div>
            <p className="text-[11px] text-[#8B6914]/55 font-sans mb-5 ml-[52px]">
              {STEPS[currentStep - 1].subtitle}
            </p>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-[#C5A55A]/25 to-transparent mb-5" />

            {/* Step Content */}
            <div className="space-y-4">
              {currentStep === 1 && <Step1 formData={formData} updateField={updateField} />}
              {currentStep === 2 && <Step2 formData={formData} updateField={updateField} />}
              {currentStep === 3 && <Step3 formData={formData} updateField={updateField} />}
              {currentStep === 4 && <Step4 formData={formData} updateField={updateField} />}
              {currentStep === 5 && <Step5 formData={formData} updateField={updateField} />}
              {currentStep === 6 && <Step6 formData={formData} updateField={updateField} />}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        {!isCompleted && (
          <div className="flex gap-3">
            {currentStep > 1 && (
              <button
                onClick={handlePrev}
                className="flex-1 py-3.5 rounded-xl border-2 border-[#C5A55A]/30 text-[#8B6914] font-serif font-semibold text-[13px] bg-[#F5E6C8]/30 hover:bg-[#EDD9B3]/50 active:bg-[#EDD9B3] transition-all duration-200 flex items-center justify-center gap-1.5"
              >
                <ChevronLeft className="w-4 h-4" />
                戻る
              </button>
            )}
            {currentStep < 6 ? (
              <button
                onClick={handleNext}
                disabled={!canProceed()}
                className={`flex-1 gold-btn py-3.5 rounded-xl text-[13px] relative overflow-hidden flex items-center justify-center gap-1.5 ${
                  !canProceed() ? "opacity-35 pointer-events-none" : ""
                }`}
              >
                <span className="relative z-10">次のステップへ</span>
                <ChevronRight className="w-4 h-4 relative z-10" />
                <div className="absolute inset-0 gold-shimmer" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!canProceed()}
                className={`flex-1 gold-btn py-4 rounded-xl text-[14px] relative overflow-hidden ${
                  !canProceed() ? "opacity-35 pointer-events-none" : ""
                }`}
              >
                <span className="relative z-10 tracking-wider">おすすめルートを探す</span>
                <div className="absolute inset-0 gold-shimmer" />
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

/* ============================================================
   Step Components
   ============================================================ */

interface StepProps {
  formData: Partial<DiagnosisInput>;
  updateField: <K extends keyof DiagnosisInput>(key: K, value: DiagnosisInput[K]) => void;
}

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

function Step2({ formData, updateField }: StepProps) {
  return (
    <div className="space-y-5">
      <RatingBar
        label="探究力"
        description="自ら問いを見つけ、調べ、考える力"
        value={formData.explorationPower ?? 3}
        onChange={(v) => updateField("explorationPower", v)}
      />
      <RatingBar
        label="情熱度"
        description="好きなことに没頭し、熱中する力"
        value={formData.passionLevel ?? 3}
        onChange={(v) => updateField("passionLevel", v)}
      />
      <RatingBar
        label="自走力"
        description="自分で計画を立て、実行する力"
        value={formData.selfDrive ?? 3}
        onChange={(v) => updateField("selfDrive", v)}
      />
    </div>
  );
}

function Step3({ formData, updateField }: StepProps) {
  return (
    <div className="space-y-5">
      <RatingBar
        label="表現力"
        description="自分の考えを言葉や作品で伝える力"
        value={formData.expressionPower ?? 3}
        onChange={(v) => updateField("expressionPower", v)}
      />
      <RatingBar
        label="協働力"
        description="仲間と協力して目標を達成する力"
        value={formData.collaborationPower ?? 3}
        onChange={(v) => updateField("collaborationPower", v)}
      />
      <RatingBar
        label="未来志向"
        description="テクノロジーや新しい学びへの関心"
        value={formData.futureOrientation ?? 3}
        onChange={(v) => updateField("futureOrientation", v)}
      />
    </div>
  );
}

function Step4({ formData, updateField }: StepProps) {
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

function Step5({ formData, updateField }: StepProps) {
  return (
    <FieldGroup label="通学時間の目安">
      <div className="grid grid-cols-2 gap-2">
        {[
          { value: "30min", label: "30分以内" },
          { value: "45min", label: "45分以内" },
          { value: "60min", label: "60分以内" },
          { value: "90min", label: "90分以内" },
          { value: "any", label: "こだわらない" },
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
  );
}

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

/* ============================================================
   Shared UI Components
   ============================================================ */

function FieldGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block font-sans text-[11px] font-bold text-[#5A4632] mb-2 tracking-wide">
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
          ? "border-[#D4AF37] bg-gradient-to-b from-[#D4AF37]/20 to-[#D4AF37]/8 text-[#8B6914] shadow-sm shadow-[#D4AF37]/15 font-bold"
          : "border-[#C5A55A]/15 bg-white/30 text-[#5A4632] hover:border-[#C5A55A]/40 active:bg-[#EDD9B3]/30"
      }`}
    >
      {label}
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
          ? "border-[#D4AF37] bg-gradient-to-r from-[#D4AF37]/12 to-[#D4AF37]/5 shadow-sm shadow-[#D4AF37]/12"
          : "border-[#C5A55A]/12 bg-white/25 hover:border-[#C5A55A]/35"
      }`}
    >
      <div className="flex items-center gap-2">
        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
          selected ? "border-[#D4AF37] bg-[#D4AF37]" : "border-[#C5A55A]/30 bg-transparent"
        }`}>
          {selected && (
            <div className="w-1.5 h-1.5 rounded-full bg-white" />
          )}
        </div>
        <span className="font-serif font-bold text-[13px] text-[#2C1810]">{label}</span>
      </div>
      <span className="font-sans text-[11px] text-[#6B5744] mt-1 block leading-relaxed ml-6">{desc}</span>
    </button>
  );
}

function RatingBar({
  label,
  description,
  value,
  onChange,
}: {
  label: string;
  description: string;
  value: number;
  onChange: (v: number) => void;
}) {
  const labels = ["低い", "やや低い", "普通", "やや高い", "高い"];

  return (
    <div>
      <div className="flex items-baseline justify-between mb-0.5">
        <span className="font-serif font-bold text-[13px] text-[#2C1810]">{label}</span>
        <span className={`font-sans text-[11px] font-semibold transition-colors ${
          value >= 4 ? "text-[#B8860B]" : value <= 2 ? "text-[#8B6914]/50" : "text-[#8B6914]/70"
        }`}>
          {labels[value - 1]}
        </span>
      </div>
      <p className="font-sans text-[10px] text-[#8B6914]/45 mb-2.5">{description}</p>
      <div className="flex gap-1.5">
        {[1, 2, 3, 4, 5].map((level) => (
          <button
            key={level}
            onClick={() => onChange(level)}
            className={`flex-1 h-10 rounded-lg border-2 transition-all duration-200 flex items-center justify-center text-[12px] font-bold active:scale-95 ${
              level <= value
                ? "border-[#D4AF37] bg-gradient-to-b from-[#D4AF37]/25 to-[#D4AF37]/8 text-[#8B6914] shadow-sm shadow-[#D4AF37]/10"
                : "border-[#C5A55A]/10 bg-white/15 text-[#C5A55A]/25 hover:border-[#C5A55A]/20"
            }`}
          >
            {level}
          </button>
        ))}
      </div>
    </div>
  );
}

/*
 * TRAIL 私立中学相性診断 - メインページ
 * Flow: Hero → 診断フォーム → Loading → Results
 */
import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HeroSection from "@/components/HeroSection";
import DiagnosisForm from "@/components/DiagnosisForm";
import ResultSection from "@/components/ResultSection";
import MonitorBanner from "@/components/MonitorBanner";
import type { DiagnosisInput, SchoolScore } from "@/lib/schoolData";
import { calculateScores } from "@/lib/schoolData";
import { supabase } from "@/lib/supabase";

export default function Home() {
  const [phase, setPhase] = useState<"top" | "form" | "loading" | "result">("top");
  const [results, setResults] = useState<SchoolScore[]>([]);
  const [userInput, setUserInput] = useState<DiagnosisInput | null>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const handleStartDiagnosis = useCallback(() => {
    setPhase("form");
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 150);
  }, []);

  const handleSubmitDiagnosis = useCallback((input: DiagnosisInput) => {
    setUserInput(input);
    setPhase("loading");

    // Simulate AI processing time for dramatic effect
    setTimeout(() => {
      const scores = calculateScores(input);
      setResults(scores);
      setPhase("result");
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 200);

      // Save diagnosis results to Supabase (fire-and-forget)
      if (supabase) {
        const resultScores = scores.map((s) => ({
          schoolId: s.school.id,
          schoolName: s.school.name,
          totalScore: s.totalScore,
          deviationScore: s.deviationScore,
          styleScore: s.styleScore,
          explorationScore: s.explorationScore,
          passionScore: s.passionScore,
          selfDriveScore: s.selfDriveScore,
          futureScore: s.futureScore,
          techScore: s.techScore,
          strengthMatchScore: s.strengthMatchScore,
          growthMatchScore: s.growthMatchScore,
        }));

        supabase
          .from("diagnoses")
          .insert({
            hensachi_source: input.deviationStandard,
            hensachi_value: input.deviationRange,
            inquiry_score: input.explorationPower,
            passion_score: input.passionLevel,
            self_driven_score: input.selfDrive,
            expression_score: input.expressionPower,
            collaboration_score: input.collaborationPower,
            future_score: input.futureOrientation,
            preferred_style: input.schoolStyle,
            coed_pref: input.coedPreference,
            result_scores: resultScores,
          })
          .then(({ error }) => {
            if (error) console.error("Failed to save diagnosis:", error.message);
          });
      }
    }, 2500);
  }, []);

  const handleRestart = useCallback(() => {
    setPhase("top");
    setResults([]);
    setUserInput(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      {/* Hero / Top Section */}
      <HeroSection onStart={handleStartDiagnosis} />

      {/* Diagnosis Form */}
      {(phase === "form" || phase === "loading" || phase === "result") && (
        <div ref={formRef}>
          <DiagnosisForm
            onSubmit={handleSubmitDiagnosis}
            isCompleted={phase === "loading" || phase === "result"}
          />
        </div>
      )}

      {/* Loading Overlay */}
      <AnimatePresence>
        {phase === "loading" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[60] flex items-center justify-center"
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-white/85 backdrop-blur-sm" />

            {/* Loading Content */}
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ delay: 0.1 }}
              className="relative z-10 text-center px-8 w-full max-w-[340px]"
            >
              <h3 className="font-sans font-bold text-[#333333] text-[15px] mb-2">
                お子さまに最適な学校を分析中...
              </h3>
              <p className="font-sans text-[#6B7280] text-[11px] mb-5">
                150校のデータから最適な学校を選定しています
              </p>

              {/* Progress Bar */}
              <div className="relative h-1.5 bg-[#E5E7EB] rounded-full overflow-hidden">
                <div className="absolute inset-y-0 left-0 w-1/4 bg-[#2C5F7C] rounded-full progress-slide" />
              </div>

              {/* Loading dots */}
              <div className="flex justify-center gap-1.5 mt-4">
                <div className="w-1.5 h-1.5 rounded-full bg-[#2C5F7C] loading-dot-1" />
                <div className="w-1.5 h-1.5 rounded-full bg-[#2C5F7C] loading-dot-2" />
                <div className="w-1.5 h-1.5 rounded-full bg-[#2C5F7C] loading-dot-3" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results */}
      {phase === "result" && results.length > 0 && userInput && (
        <div ref={resultRef}>
          <ResultSection
            results={results}
            userInput={userInput}
            onRestart={handleRestart}
          />
        </div>
      )}

      {/* Monitor Banner */}
      <MonitorBanner />
    </div>
  );
}

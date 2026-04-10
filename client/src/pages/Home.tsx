/*
 * TRAIL 私立中学相性診断 - メインページ
 * Design: 古代図書館の冒険書スタイル
 * Flow: Hero → Quest Form → Loading → Results
 */
import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Compass } from "lucide-react";
import HeroSection from "@/components/HeroSection";
import DiagnosisForm from "@/components/DiagnosisForm";
import ResultSection from "@/components/ResultSection";
import MonitorBanner from "@/components/MonitorBanner";
import type { DiagnosisInput, SchoolScore } from "@/lib/schoolData";
import { calculateScores } from "@/lib/schoolData";

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
            <div className="absolute inset-0 bg-[#2C1810]/70 backdrop-blur-sm" />

            {/* Loading Content */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ delay: 0.1 }}
              className="relative z-10 text-center px-8"
            >
              {/* Spinning Compass */}
              <div className="mb-6 flex justify-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-b from-[#D4AF37] to-[#8B6914] flex items-center justify-center shadow-lg shadow-[#D4AF37]/30 loading-compass">
                  <Compass className="w-8 h-8 text-white" />
                </div>
              </div>

              <h3 className="font-serif font-bold text-[#F5E6C8] text-lg mb-2">
                冒険のルートを探索中...
              </h3>
              <p className="font-sans text-[#EDD9B3]/70 text-xs mb-4">
                お子さまに最適な学びのフィールドを分析しています
              </p>

              {/* Loading dots */}
              <div className="flex justify-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#D4AF37] loading-dot-1" />
                <div className="w-2 h-2 rounded-full bg-[#D4AF37] loading-dot-2" />
                <div className="w-2 h-2 rounded-full bg-[#D4AF37] loading-dot-3" />
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

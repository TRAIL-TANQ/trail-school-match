/*
 * MonitorBanner - モニター期間の告知バナー
 * Design: 画面下部に固定、ダークブラウン背景 + ゴールドアクセント
 */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, X } from "lucide-react";

export default function MonitorBanner() {
  const [visible, setVisible] = useState(true);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          transition={{ delay: 0.8, duration: 0.4 }}
          className="fixed bottom-0 left-0 right-0 z-50"
        >
          <div className="bg-gradient-to-r from-[#2C1810] via-[#3D2B1F] to-[#2C1810] border-t border-[#D4AF37]/30 px-4 py-3 shadow-lg shadow-black/20">
            <div className="max-w-[420px] mx-auto flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-[#D4AF37]/15 flex items-center justify-center shrink-0">
                <Clock className="w-3 h-3 text-[#D4AF37]" />
              </div>
              <p className="font-sans text-[10px] text-[#EDD9B3]/80 leading-snug flex-1">
                現在モニター期間中のため、全機能を
                <span className="text-[#D4AF37] font-bold">無料開放</span>
                しています（〜2026/7/10）
              </p>
              <button
                onClick={() => setVisible(false)}
                className="w-6 h-6 rounded-full flex items-center justify-center text-[#EDD9B3]/40 hover:text-[#EDD9B3]/70 transition-colors shrink-0"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

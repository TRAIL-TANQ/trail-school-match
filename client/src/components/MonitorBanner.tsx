/*
 * MonitorBanner - モニター期間の告知バナー（落ち着いたトーン）
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
          <div className="bg-white border-t border-[#E5E7EB] px-4 py-3 shadow-[0_-2px_8px_rgba(0,0,0,0.04)]">
            <div className="max-w-[460px] mx-auto flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-[#4A9B7F]/10 flex items-center justify-center shrink-0">
                <Clock className="w-3 h-3 text-[#4A9B7F]" />
              </div>
              <p className="font-sans text-[11px] text-[#6B7280] leading-snug flex-1">
                現在モニター期間中のため、全機能を
                <span className="text-[#4A9B7F] font-bold">無料開放</span>
                しています（〜2026/7/10）
              </p>
              <button
                onClick={() => setVisible(false)}
                className="w-6 h-6 rounded-full flex items-center justify-center text-[#9CA3AF] hover:text-[#6B7280] transition-colors shrink-0"
                aria-label="閉じる"
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

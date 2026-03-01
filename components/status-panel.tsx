"use client";

import { cn } from "@/lib/utils";
import { useAudioStore } from "@/store/useAudioStore";
import { ConnectionState } from "@/types";
import { AlertCircle } from "lucide-react";

function StatusPanel() {
  const { conectionState, error } = useAudioStore();

  const isConnected =
    conectionState === ConnectionState.CONNECTED;
  const isConnecting =
    conectionState === ConnectionState.CONNECTING;

  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-md pointer-events-none">
      {/* Error Toast */}
      {error && (
        <div className="bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400 px-4 py-2 rounded-full text-sm border border-red-200 dark:border-red-500/20 flex items-center gap-2 shadow-lg animate-in fade-in slide-in-from-top-4 pointer-events-auto">
          <AlertCircle size={16} /> {error}
        </div>
      )}

      {/* Status Badge */}
      <div
        className={cn(
          "px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border transition-all duration-500 flex items-center gap-2 backdrop-blur-sm shadow-sm",

          // 1. Connecting -> primary with pulse
          isConnecting
            ? "bg-primary/10 text-primary border-primary/40 dark:bg-primary/20 dark:text-primary-foreground/80 dark:border-primary/60 animate-pulse"
            : // 2. Connected -> solid primary
              isConnected
              ? "bg-primary/15 text-primary border-primary/50 dark:bg-primary/25 dark:text-primary-foreground dark:border-primary/70"
              : // 3. Default (Ready) -> subtle muted state
                "bg-muted text-muted-foreground border-border dark:bg-muted/20 dark:text-muted-foreground dark:border-border/60",
        )}>
        <div
          className={cn(
            "w-2 h-2 rounded-full",
            // Dot Color
            isConnecting
              ? "bg-primary/80"
              : isConnected
                ? "bg-primary"
                : "bg-muted-foreground",
          )}
        />
        {isConnecting
          ? "Connecting..."
          : isConnected
            ? "Live Session"
            : "Ready to Talk"}
      </div>
    </div>
  );
}

export default StatusPanel;

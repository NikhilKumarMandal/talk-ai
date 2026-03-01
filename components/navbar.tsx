"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import LeftSidebar from "@/components/left-sidebar";
import RightSidebar from "@/components/right-sidebar";

import { KeyRound, LucideLanguages, Settings2, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useApiKeyStore } from "@/store/useApiKeyStore";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function Navbar() {
  const { apiKey, setApiKey, clearApiKey } = useApiKeyStore();
  const [isApiKeySheetOpen, setIsApiKeySheetOpen] = useState(false);
  const [localKey, setLocalKey] = useState("");

  useEffect(() => {
    if (isApiKeySheetOpen) {
      setLocalKey(apiKey ?? "");
    }
  }, [apiKey, isApiKeySheetOpen]);

  return (
    <header className="relative z-50 w-full border-b">
      <div className="relative flex h-16 items-center px-4 md:px-6">
        {/* LEFT: Config */}
        <div className="flex items-center">
          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9">
                  <Settings2 className="h-5 w-5" />
                  <span className="sr-only">Open configuration</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader className="sr-only">
                  <SheetTitle>Configuration</SheetTitle>
                  <SheetDescription>
                    Set your app configuration
                  </SheetDescription>
                </SheetHeader>
                <LeftSidebar />
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* CENTER: Logo (Larger) */}
        <Link
          href="/"
          className="flex items-center gap-3 mx-auto md:absolute md:left-1/2 md:-translate-x-1/2"
        >
          <div className="relative h-11 w-11 overflow-hidden rounded-md">
            <Image
              src="/logo.png"
              alt="Talk AI"
              fill
              className="object-contain"
              priority
            />
          </div>

          <span className="text-lg md:text-xl font-semibold tracking-tight">
            
            <span className="text-primary">Talk</span> AI
          </span>
        </Link>

        {/* RIGHT: API key + Transcript (mobile) */}
        <div className="ml-auto flex items-center gap-2">
          {/* API key manager */}
          <Sheet
            open={isApiKeySheetOpen}
            onOpenChange={setIsApiKeySheetOpen}
          >
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="h-9 px-3">
                <KeyRound className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">
                  {apiKey ? "API key" : "Add API key"}
                </span>
                <span className="sm:hidden">Key</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="flex h-full flex-col px-4 py-6 sm:max-w-sm"
            >
              <SheetHeader className="px-1">
                <SheetTitle>Gemini API key</SheetTitle>
                <SheetDescription>
                  Enter your own Gemini API key to use Talk AI. The key is stored only in your browser.
                </SheetDescription>
              </SheetHeader>
              <div className="mt-6 flex-1 space-y-4 overflow-y-auto px-1">
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="gemini-api-key">
                    API key
                  </label>
                  <input
                    id="gemini-api-key"
                    type="password"
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    placeholder="Paste your Gemini API key"
                    value={localKey}
                    onChange={(e) => setLocalKey(e.target.value)}
                    autoComplete="off"
                  />
                  <p className="text-xs text-muted-foreground">
                    We never send or store your key on any server; it stays in this browser only.
                  </p>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between gap-2 border-t pt-4">
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    onClick={() => {
                      const trimmed = localKey.trim();
                      if (!trimmed) return;
                      setApiKey(trimmed);
                      setIsApiKeySheetOpen(false);
                    }}
                    disabled={!localKey.trim()}
                  >
                    Save key
                  </Button>
                  {apiKey && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        clearApiKey();
                        setLocalKey("");
                      }}
                    >
                      Remove key
                    </Button>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>

          {/* GitHub repo link */}
          <Link
            href="https://github.com/NikhilKumarMandal/talk-ai"
            target="_blank"
            rel="noreferrer"
          >
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <Github className="h-5 w-5" />
              <span className="sr-only">Open GitHub repository</span>
            </Button>
          </Link>

          {/* Transcript (mobile) */}
          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9">
                  <LucideLanguages className="h-5 w-5" />
                  <span className="sr-only">Open transcript</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader className="sr-only">
                  <SheetTitle>Transcript</SheetTitle>
                  <SheetDescription>
                    Voice conversation transcript
                  </SheetDescription>
                </SheetHeader>
                <RightSidebar />
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}

import { Navbar } from "@/components/navbar";

import RightSidebar from "@/components/right-sidebar";
import LeftSidebar from "@/components/left-sidebar";

import StatusPanel from "@/components/status-panel";
import ControlsPanel from "@/components/controls-panel";
import VisualizationPanel from "@/components/visualization-panel";

const App = () => {
  return (
    <div className="h-dvh w-full flex flex-col overflow-hidden">
      <Navbar />

      <div className="flex flex-1 overflow-hidden relative">
        <div className="hidden lg:flex flex-col h-full flex-none w-80 border-r">
          <LeftSidebar />
        </div>

        <main className="flex-1 relative flex flex-col min-w-0 overflow-hidden">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage: "radial-gradient(#fff 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          ></div>

          <div className="relative z-10 flex h-full flex-col items-center gap-6 px-4 py-6 sm:py-8 md:py-10">
            {/* Top Status Bar */}
            <div className="w-full flex justify-center">
              <StatusPanel />
            </div>

            {/* Center Visualization (Takes available space) */}
            <div className="flex-1 w-full flex items-center justify-center">
              <VisualizationPanel />
            </div>

            {/* Bottom Controls */}
            <div className="w-full flex justify-center">
              <ControlsPanel />
            </div>
          </div>
        </main>

        <div className="hidden lg:flex flex-col h-full flex-none w-80 border-l">
          <RightSidebar />
        </div>
      </div>
    </div>
  );
};

export default App;

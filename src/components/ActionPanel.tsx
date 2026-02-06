import { useState } from "react";
import { Hand, Vibrate, Fingerprint, ChevronLeft, ChevronRight } from "lucide-react";

interface ActionPanelProps {
  onShake: () => void;
  onRub: () => void;
  onTouch: () => void;
}

export default function ActionPanel({ onShake, onRub, onTouch }: ActionPanelProps) {
  const [isOpen, setIsOpen] = useState(false);

  const actions = [
    { id: "touch", label: "Touch", icon: Fingerprint, action: onTouch },
    { id: "rub", label: "Rub", icon: Hand, action: onRub },
    { id: "shake", label: "Shake", icon: Vibrate, action: onShake },
  ];

  return (
    <>
      {/* Toggle tab */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed right-0 top-1/2 -translate-y-1/2 z-30 bg-card/60 backdrop-blur-sm border border-border/50 border-r-0 rounded-l-xl p-2 transition-all duration-500"
        style={{ transform: `translateY(-50%) translateX(${isOpen ? "-100%" : "0"})`, right: isOpen ? "5rem" : "0" }}
        aria-label="Toggle actions"
      >
        {isOpen ? <ChevronRight size={18} className="text-muted-foreground/60" /> : <ChevronLeft size={18} className="text-muted-foreground/60" />}
      </button>

      {/* Panel */}
      <div
        className={`fixed right-0 top-1/2 -translate-y-1/2 z-20 transition-transform duration-500 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="bg-card/80 backdrop-blur-sm border border-border/50 border-r-0 rounded-l-2xl p-3 flex flex-col gap-3">
          {actions.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                item.action();
              }}
              className="flex flex-col items-center gap-1 p-3 rounded-xl bg-muted/30 hover:bg-muted/60 active:scale-95 transition-all duration-200 min-w-[3.5rem]"
              aria-label={item.label}
            >
              <item.icon size={22} className="text-foreground/70" />
              <span className="text-[10px] font-handwritten text-muted-foreground/60">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

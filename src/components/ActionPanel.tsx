import { Hand, Vibrate, Fingerprint } from "lucide-react";

interface ActionPanelProps {
  onShake: () => void;
  onRub: () => void;
  onTouch: () => void;
}

export default function ActionPanel({ onShake, onRub, onTouch }: ActionPanelProps) {
  const actions = [
    { id: "touch", label: "Touch", icon: Fingerprint, action: onTouch },
    { id: "rub", label: "Rub", icon: Hand, action: onRub },
    { id: "shake", label: "Shake", icon: Vibrate, action: onShake },
  ];

  return (
    <div className="fixed right-3 top-1/2 -translate-y-1/2 z-20">
      <div className="bg-card/60 backdrop-blur-sm border border-border/40 rounded-2xl p-2.5 flex flex-col gap-2.5">
        {actions.map((item) => (
          <button
            key={item.id}
            onClick={item.action}
            className="flex flex-col items-center gap-1 p-3 rounded-xl bg-muted/20 hover:bg-muted/50 active:scale-90 transition-all duration-200 min-w-[3.5rem]"
            aria-label={item.label}
          >
            <item.icon size={20} className="text-foreground/60" />
            <span className="text-[10px] font-handwritten text-muted-foreground/50">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

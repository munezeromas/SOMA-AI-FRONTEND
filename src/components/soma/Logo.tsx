import logo from "@/assets/soma-logo.png";

export function Logo({ size = 160, withText = true }: { size?: number; withText?: boolean }) {
  // Scale text and gap based on image height
  const gap = Math.max(2, Math.floor(size / 30));
  const textSize = Math.max(12, Math.floor(size / 3.5));
  const subTextSize = Math.max(6, Math.floor(size / 12));

  return (
    <div className="flex items-center select-none group" style={{ gap: `${gap}px` }}>
      <img 
        src={logo} 
        alt="Soma AI" 
        style={{ height: size }} 
        className="object-contain transition-transform group-hover:scale-105" 
      />
      {withText && (
        <div className="flex flex-col -space-y-1">
          <span className="font-black tracking-tighter text-[#0F172A] flex items-center" style={{ fontSize: `${textSize}px` }}>
            Soma<span className="text-[#00C36B]">AI</span>
          </span>
          <span className="font-black uppercase tracking-[0.4em] text-[#00C36B] opacity-90" style={{ fontSize: `${subTextSize}px` }}>
            Learn Your Way
          </span>
        </div>
      )}
    </div>
  );
}
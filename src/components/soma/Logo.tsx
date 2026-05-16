import logo from "@/assets/soma-logo.png";

export function Logo({
  size = 160,
  withText = true,
  lightBg = false,
}: {
  size?: number;
  withText?: boolean;
  lightBg?: boolean;
}) {
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
          <span
            className="font-black tracking-tighter flex items-center"
            style={{
              fontSize: `${textSize}px`,
              color: "#1A3A5C",
              fontFamily: "'Nunito', sans-serif",
            }}
          >
            Soma<span style={{ color: "#4A90D9" }}>AI</span>
          </span>
          <span
            className="font-black uppercase opacity-90"
            style={{
              fontSize: `${subTextSize}px`,
              letterSpacing: "0.3em",
              color: "#4A90D9",
              fontFamily: "'Nunito', sans-serif",
            }}
          >
            Learn Your Way
          </span>
        </div>
      )}
    </div>
  );
}
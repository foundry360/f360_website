type ScoreDonutSize = "sm" | "md" | "lg";

type ScoreDonutProps = {
  score: number;
  size?: ScoreDonutSize;
  label?: string;
  sublabel?: string;
  className?: string;
};

const sizeConfig: Record<
  ScoreDonutSize,
  { dimension: number; stroke: number; scoreClass: string; labelClass: string }
> = {
  sm: { dimension: 80, stroke: 7, scoreClass: "text-lg font-bold", labelClass: "text-[0.65rem]" },
  md: { dimension: 128, stroke: 9, scoreClass: "text-3xl font-bold", labelClass: "text-xs" },
  lg: { dimension: 176, stroke: 11, scoreClass: "text-5xl font-bold sm:text-6xl", labelClass: "text-sm" },
};

function clampScore(score: number): number {
  return Math.max(0, Math.min(100, score));
}

export function ScoreDonut({ score, size = "md", label, sublabel, className = "" }: ScoreDonutProps) {
  const config = sizeConfig[size];
  const value = clampScore(score);
  const radius = (config.dimension - config.stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;
  const center = config.dimension / 2;
  const labelId = label ? `score-donut-${label.replace(/\s+/g, "-").toLowerCase()}` : undefined;

  return (
    <div className={`flex flex-col items-center ${className}`.trim()}>
      <div
        className="relative"
        style={{ width: config.dimension, height: config.dimension }}
        role="img"
        aria-labelledby={labelId}
      >
        <svg
          width={config.dimension}
          height={config.dimension}
          viewBox={`0 0 ${config.dimension} ${config.dimension}`}
          className="-rotate-90"
          aria-hidden
        >
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={config.stroke}
            className="text-border"
          />
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={config.stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="text-accent transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`tabular-nums text-foreground ${config.scoreClass}`}>{value}</span>
        </div>
      </div>
      {label ? (
        <p id={labelId} className={`mt-3 text-center font-medium text-foreground ${config.labelClass}`}>
          {label}
        </p>
      ) : null}
      {sublabel ? (
        <p className={`mt-1 text-center uppercase tracking-[0.12em] text-muted ${config.labelClass}`}>{sublabel}</p>
      ) : null}
    </div>
  );
}

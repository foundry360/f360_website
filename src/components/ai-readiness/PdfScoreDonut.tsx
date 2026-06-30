import { Circle, Svg, Text, View } from "@react-pdf/renderer";

type PdfScoreDonutProps = {
  score: number;
  size?: number;
  label?: string;
};

export function PdfScoreDonut({ score, size = 72, label }: PdfScoreDonutProps) {
  const stroke = 5;
  const radius = (size - stroke) / 2;
  const center = size / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = (Math.max(0, Math.min(100, score)) / 100) * circumference;

  return (
    <View style={{ alignItems: "center", width: size + 16 }}>
      <View style={{ width: size, height: size, position: "relative" }}>
        <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <Circle
            cx={center}
            cy={center}
            r={radius}
            stroke="#e4e4e7"
            strokeWidth={stroke}
            fill="none"
          />
          <Circle
            cx={center}
            cy={center}
            r={radius}
            stroke="#8b6ffd"
            strokeWidth={stroke}
            fill="none"
            strokeDasharray={`${progress} ${circumference}`}
            strokeLinecap="round"
            transform={`rotate(-90 ${center} ${center})`}
          />
        </Svg>
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: size,
            height: size,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ fontSize: size * 0.26, fontWeight: "bold", color: "#0a0a0a" }}>{score}</Text>
        </View>
      </View>
      {label ? (
        <Text style={{ marginTop: 6, fontSize: 8, color: "#52525b", textAlign: "center", maxWidth: size + 24 }}>
          {label}
        </Text>
      ) : null}
    </View>
  );
}

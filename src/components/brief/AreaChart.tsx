// SVG area chart with a scrub readout: move the pointer or use the arrow keys to read each point.
// Also draws the small sparkline variant (no grid, no axis) when spark is set.

import { useId, useMemo } from "react";
import { useScrub } from "@/hooks/brief/useScrub";
import { chartGeometry, fmt } from "@/lib/brief/helper";

type AreaChartProps = {
    values: number[];
    labels: string[];
    label: string;
    prefix?: string;
    unit?: string;
    spark?: boolean;
    className?: string;
};

export function AreaChart({ values, labels, label, prefix = "", unit = "", spark = false, className = "" }: AreaChartProps) {
    const n = values.length;
    const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
    const { pts, line } = useMemo(() => chartGeometry(values, spark), [values, spark]);
    const { plotRef, shown, scrub, drawing, handlers } = useScrub(n);
    const p = pts[shown];
    const text = prefix + fmt(values[shown]) + (unit ? " " + unit : "");

    return (
        <div
            className={("chart " + className).trim() + (scrub ? " is-scrub" : "")}
            role="slider"
            tabIndex={0}
            aria-label={label}
            aria-valuemin={0}
            aria-valuemax={n - 1}
            aria-valuenow={shown}
            aria-valuetext={`${labels[shown]}: ${text}`}
            {...handlers}
        >
            <div className="chart-plot" ref={plotRef}>
                <svg className={drawing ? "chart-svg is-drawing" : "chart-svg"} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                    <defs>
                        <linearGradient id={uid + "g"} x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0" stopColor="oklch(21% .014 262)" stopOpacity=".14" />
                            <stop offset="1" stopColor="oklch(21% .014 262)" stopOpacity="0" />
                        </linearGradient>
                        <clipPath id={uid + "k"}>
                            <rect x="0" y="-5" height="110" width={p[0]} />
                        </clipPath>
                    </defs>
                    {!spark &&
                        [25, 50, 75].map((y) => <line key={y} className="chart-grid" x1="0" x2="100" y1={y} y2={y} />)}
                    <path d={line + " L100 100 L0 100Z"} fill={`url(#${uid}g)`} />
                    <path className="chart-line chart-line--base" d={line} />
                    <path className="chart-line chart-line--hi" clipPath={`url(#${uid}k)`} d={line} />
                </svg>
                <span className="chart-cross" style={{ left: p[0] + "%" }} />
                <span className={shown === n - 1 ? "chart-dot is-end" : "chart-dot"} style={{ left: p[0] + "%", top: p[1] + "%" }} />
                <span className="chart-tip" style={{ left: Math.min(Math.max(p[0], 14), 86) + "%", top: p[1] + "%" }}>
                    <b>{text}</b>
                    <span>{labels[shown]}</span>
                </span>
            </div>
            {!spark && (
                <div className="chart-axis">
                    <span>{labels[0]}</span>
                    <span>{labels[Math.floor(n / 2)]}</span>
                    <span>{labels[n - 1]}</span>
                </div>
            )}
        </div>
    );
}

// Small pure helpers shared by the brief modules: number formatting, queue tones and chart geometry.

export function fmt(value: number, decimals = 0) {
    return value.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}

// first number inside a display string, for example "₱61,200" gives 61200
export function num(text: string) {
    return parseFloat(String(text).replace(/[^0-9.]/g, "")) || 0;
}

export function stageTone(stage: string) {
    const tones: Record<string, string> = { review: "warning", scheduled: "info", posted: "success", trend: "neutral", script: "neutral", make: "neutral" };

    return tones[stage] ?? "neutral";
}

// points in a 100 by 100 box and the line path through them
export function chartGeometry(values: number[], spark: boolean) {
    const n = values.length;
    const min = Math.min(...values);
    const max = Math.max(...values);
    const pad = (max - min) * (spark ? 0.12 : 0.08) || 1;
    const lo = spark ? min - pad : Math.max(0, min - pad);
    const hi = max + pad;
    const pts = values.map((v, i): [number, number] => [(i / (n - 1)) * 100, 100 - ((v - lo) / (hi - lo)) * 100]);
    const line = pts.map((p, i) => (i ? "L" : "M") + p[0].toFixed(2) + " " + p[1].toFixed(2)).join(" ");

    return { pts, line };
}

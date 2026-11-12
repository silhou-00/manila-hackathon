// Ring chart used as the Graph view of the agent runs card. Draws one SVG arc per segment around a
// total in the centre, with a legend of counts beside it. Tiny non-zero segments are widened to a
// visible sliver so a single running job still shows; the legend always carries the real numbers.

export type DonutItem = { label: string; value: number; tone: string };

type DonutProps = { items: DonutItem[]; total: number; totalLabel: string; label: string; caption?: string };

const MIN_SLICE = 2;
const GAP = 0.8;

export function Donut({ items, total, totalLabel, label, caption }: DonutProps) {
    const sum = items.reduce((acc, x) => acc + x.value, 0) || 1;
    const raw = items.map((x) => (x.value > 0 ? Math.max(MIN_SLICE, (x.value / sum) * 100) : 0));
    const scale = 100 / (raw.reduce((acc, x) => acc + x, 0) || 1);
    const slices = raw.map((x) => x * scale);
    const starts = slices.map((_, i) => slices.slice(0, i).reduce((acc, x) => acc + x, 0));
    const visible = slices.filter((x) => x > 0).length;

    return (
        <>
            <div className="gdonut" role="img" aria-label={label}>
                <div className="gdonut-ring">
                    <svg viewBox="0 0 120 120" aria-hidden="true">
                        <circle className="gdonut-track" cx="60" cy="60" r="48" pathLength={100} />
                        {items.map((x, i) => {
                            const len = slices[i];
                            const drawn = visible > 1 ? Math.max(0, len - GAP) : len;

                            if (len === 0) {
                                return null;
                            }

                            return (
                                <circle
                                    key={x.label}
                                    className="gdonut-seg"
                                    data-tone={x.tone}
                                    cx="60"
                                    cy="60"
                                    r="48"
                                    pathLength={100}
                                    strokeDasharray={`${drawn} ${100 - drawn}`}
                                    strokeDashoffset={-starts[i]}
                                />
                            );
                        })}
                    </svg>
                    <span className="gdonut-centre">
                        <span className="gdonut-total num">{total}</span>
                        <span className="gdonut-sub">{totalLabel}</span>
                    </span>
                </div>
                <ul className="gdonut-legend">
                    {items.map((x) => (
                        <li key={x.label} className="gdonut-key" data-tone={x.tone}>
                            <span className="gdonut-dot" />
                            <span className="gdonut-name">{x.label}</span>
                            <span className="gdonut-count num">{x.value}</span>
                        </li>
                    ))}
                </ul>
            </div>
            {caption && <p className="stat-note">{caption}</p>}
        </>
    );
}

// Vertical column chart used as the Graph view of the queue and trends cards. Each column shows its
// value on top and its label underneath, coloured by tone, and grows up from the baseline on mount.
// The whole chart is one image to screen readers, described by the aria-label the caller passes.

export type ColumnItem = { label: string; value: number; display: string; tone?: string };

type ColumnsProps = { items: ColumnItem[]; label: string; caption?: string };

export function Columns({ items, label, caption }: ColumnsProps) {
    const max = Math.max(...items.map((x) => x.value)) || 1;

    return (
        <>
            <div className="gcols" role="img" aria-label={label}>
                {items.map((x, i) => (
                    <div key={x.label} className="gcol" data-tone={x.tone ?? "ink"} data-empty={x.value === 0 ? "" : undefined}>
                        <span className="gcol-value num">{x.display}</span>
                        <span className="gcol-plot">
                            <i style={{ height: `${Math.max(3, Math.round((x.value / max) * 100))}%`, animationDelay: `${i * 40}ms` }} />
                        </span>
                        <span className="gcol-label">{x.label}</span>
                    </div>
                ))}
            </div>
            {caption && <p className="stat-note">{caption}</p>}
        </>
    );
}

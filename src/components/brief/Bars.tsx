// Horizontal bar chart used as the Graph view of list modules: label and value on top, bar under.

export type BarItem = { label: string; value: number; display: string; tone?: string };

type BarsProps = { items: BarItem[]; caption?: string };

export function Bars({ items, caption }: BarsProps) {
    const max = Math.max(...items.map((x) => x.value)) || 1;

    return (
        <>
            <ul className="gbars">
                {items.map((x) => (
                    <li key={x.label} className="gbar" data-tone={x.tone ?? "ink"}>
                        <div className="gbar-top">
                            <span className="gbar-label">{x.label}</span>
                            <span className="gbar-value num">{x.display}</span>
                        </div>
                        <span className="gbar-track">
                            <i style={{ width: `${Math.max(2, Math.round((x.value / max) * 100))}%` }} />
                        </span>
                    </li>
                ))}
            </ul>
            {caption && <p className="stat-note">{caption}</p>}
        </>
    );
}

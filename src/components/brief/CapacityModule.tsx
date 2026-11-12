// Capacity tiles: pods, phones and agents as a rolling count plus a row of dots (on, warning, off).

import type { Capacity } from "@/lib/brief/model";
import { Counter } from "./Counter";

type CapacityModuleProps = { data: Capacity[] };

export function CapacityModule({ data }: CapacityModuleProps) {
    return (
        <div className="grid-stats">
            {data.map((c) => (
                <div key={c.id} className="stat">
                    <span className="stat-label">{c.label}</span>
                    <span className="stat-value">
                        <Counter value={c.value} /> <span className="stat-of">of {c.of}</span>
                    </span>
                    <span className={c.of > 20 ? "cap-dots is-dense" : "cap-dots"} aria-hidden="true">
                        {Array.from({ length: c.of }, (_, i) => (
                            <i key={i} className={i < c.value ? "on" : i < c.value + c.warn ? "warn" : ""} />
                        ))}
                    </span>
                    <span className="stat-note">{c.note}</span>
                </div>
            ))}
        </div>
    );
}

// Summary strip: four stat tiles with rolling numbers and a delta chip. Live offsets from the
// shell are added to each tile's value so the numbers keep moving.

import { Icon } from "@/components/Icon";
import type { Tile } from "@/lib/brief/model";
import { Chip } from "./Chip";
import { Counter } from "./Counter";

type SummaryModuleProps = { tiles: Tile[]; live: Record<string, number> };

export function SummaryModule({ tiles, live }: SummaryModuleProps) {
    return (
        <div className="grid-stats">
            {tiles.map((s) => (
                <div key={s.id} className="stat" data-tile={s.id}>
                    <span className="stat-label">
                        <span className="tile tile--sm">
                            <Icon name={s.icon} size={14} />
                        </span>
                        {s.label}
                    </span>
                    <span className="stat-value">
                        <Counter value={s.value + (live[s.id] ?? 0)} prefix={s.prefix} suffix={s.suffix} decimals={s.decimals} />
                    </span>
                    <span className="stat-row">
                        <Chip text={s.delta} tone={s.tone} arrow={s.arrow} />
                        <span className="stat-note">{s.note}</span>
                    </span>
                </div>
            ))}
        </div>
    );
}

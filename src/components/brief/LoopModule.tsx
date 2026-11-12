// The overnight loop: five stages from finding a trend to remaking it. Closed by default; the
// chevron opens it. The desktop Overnight page opens it from the start. Live offsets from the shell are added per stage.

import { useState, type CSSProperties } from "react";
import { Icon } from "@/components/Icon";
import type { Loop } from "@/lib/brief/model";
import { Counter } from "./Counter";
import { FoldButton } from "./FoldButton";
import { ModuleHead } from "./ModuleHead";

type LoopModuleProps = { data: Loop; live: Record<string, number>; defaultOpen?: boolean };

export function LoopModule({ data, live, defaultOpen = false }: LoopModuleProps) {
    const [open, setOpen] = useState(defaultOpen);

    return (
        <>
            <ModuleHead
                title={data.title}
                meta={data.meta}
                extra={<FoldButton open={open} noun="the loop" onToggle={() => setOpen(!open)} />}
            />
            <div className="fold" data-open={String(open)}>
                <div className="fold-in">
                    <ol className="loop">
                        {data.stages.map((s, i) => (
                            <li key={s.id} className="loop-stage" style={{ "--i": i } as CSSProperties}>
                                <span className="tile">
                                    <Icon name={s.icon} size={16} />
                                </span>
                                <span className="loop-label">{s.label}</span>
                                <span className="loop-value">
                                    <Counter value={s.value + (live["loop-" + i] ?? 0)} />
                                </span>
                                <span className="loop-unit">{s.unit}</span>
                                {i < 4 && (
                                    <span className="loop-arrow">
                                        <Icon name="right" size={16} />
                                    </span>
                                )}
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        </>
    );
}

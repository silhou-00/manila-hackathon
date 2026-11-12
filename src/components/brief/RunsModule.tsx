// Agent runs: finished, running and failed counts as a ring chart (Graph) or a filterable run list (List).

import { useState } from "react";
import { Icon } from "@/components/Icon";
import { num } from "@/lib/brief/helper";
import type { Runs } from "@/lib/brief/model";
import { Donut } from "./Donut";
import { Seg } from "./Seg";
import { ViewsModule } from "./ViewsModule";

type RunsModuleProps = { data: Runs };

export function RunsModule({ data: g }: RunsModuleProps) {
    const [filter, setFilter] = useState("all");
    const total = num(g.meta);
    const failed = g.items.filter((x) => x.status === "error").length;
    const running = g.items.filter((x) => x.status === "running").length;
    const finished = total - failed - running;
    const items = [
        { label: "Finished", value: finished, tone: "success" },
        { label: "Running now", value: running, tone: "info" },
        { label: "Failed", value: failed, tone: "danger" },
    ];

    return (
        <ViewsModule
            id="runs"
            title={g.title}
            meta={g.meta}
            graph={
                <Donut
                    items={items}
                    total={total}
                    totalLabel="runs"
                    label={`${total} agent runs: ${finished} finished, ${running} running, ${failed} failed.`}
                    caption="All 3 failures share one cause: the Pod 07 TikTok login."
                />
            }
            list={
                <>
                    <Seg id="runs" filters={g.filters} value={filter} onChange={setFilter} />
                    <ul className="rows" data-filter-list="runs">
                        {g.items.map((x) => {
                            const stage = x.status === "error" ? "failed" : "ok";

                            return (
                                <li key={x.id} className="row tl-item" data-step={x.status} data-stage={stage} hidden={!(filter === "all" || stage === filter)}>
                                    <span className="tl-marker">
                                        {x.status === "running" ? <span className="spinner" /> : <Icon name={x.status === "error" ? "x" : "check"} size={14} />}
                                    </span>
                                    <div className="row-main">
                                        <span className="row-title">{x.task}</span>
                                        <span className="row-sub">{x.where} · {x.note}</span>
                                    </div>
                                    <span className="row-time num">{x.time}</span>
                                    {x.detail && (
                                        <button type="button" className="icon-btn icon-btn--sm m-only" data-push={x.detail} aria-label="Open details">
                                            <Icon name="right" size={16} />
                                        </button>
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                </>
            }
        />
    );
}

// Content queue: posts by stage as a pipeline column chart (Graph) or a filterable list (List).

import { useState } from "react";
import { stageTone } from "@/lib/brief/helper";
import type { Queue } from "@/lib/brief/model";
import { Chip } from "./Chip";
import { Columns } from "./Columns";
import { Seg } from "./Seg";
import { ViewsModule } from "./ViewsModule";

type QueueModuleProps = { data: Queue };

const ORDER = ["trend", "script", "make", "review", "scheduled", "posted"];

export function QueueModule({ data: q }: QueueModuleProps) {
    const [filter, setFilter] = useState("all");
    const counts: Record<string, number> = {};

    q.items.forEach((x) => {
        counts[x.stage] = (counts[x.stage] || 0) + 1;
    });

    const items = ORDER.map((s) => ({
        label: q.stages[s] ?? s,
        value: counts[s] || 0,
        display: String(counts[s] || 0),
        tone: stageTone(s),
    }));
    const summary = items.map((x) => `${x.label} ${x.value}`).join(", ");

    return (
        <ViewsModule
            id="queue"
            title={q.title}
            meta={`${counts.review || 0} in review`}
            graph={<Columns items={items} label={`Posts by stage: ${summary}.`} caption={`${q.items.length} posts in the queue, by stage.`} />}
            list={
                <>
                    <Seg id="queue" filters={q.filters} value={filter} onChange={setFilter} />
                    <ul className="rows" data-filter-list="queue">
                        {q.items.map((x) => (
                            <li key={x.id} className="row" data-stage={x.stage} hidden={!(filter === "all" || x.stage === filter)}>
                                <div className="row-main">
                                    <span className="row-title">{x.title}</span>
                                    <span className="row-sub">{x.client} · {x.when}</span>
                                </div>
                                <Chip text={q.stages[x.stage]} tone={stageTone(x.stage)} />
                            </li>
                        ))}
                    </ul>
                </>
            }
        />
    );
}

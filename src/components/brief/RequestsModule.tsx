// Studio requests: open requests grouped by status as bars (Graph) or a list (List).

import type { Requests } from "@/lib/brief/model";
import { Bars } from "./Bars";
import { Chip } from "./Chip";
import { ViewsModule } from "./ViewsModule";

type RequestsModuleProps = { data: Requests };

const NAMES: Record<string, string> = { warning: "Waiting for you", info: "In production", neutral: "With the studio" };

export function RequestsModule({ data: q }: RequestsModuleProps) {
    const counts: Record<string, number> = {};

    q.items.forEach((x) => {
        counts[x.tone] = (counts[x.tone] || 0) + 1;
    });

    const items = ["warning", "info", "neutral"]
        .filter((t) => counts[t])
        .map((t) => ({
            label: NAMES[t],
            value: counts[t],
            display: counts[t] + (counts[t] === 1 ? " request" : " requests"),
            tone: t === "neutral" ? "ink" : t,
        }));

    return (
        <ViewsModule
            id="requests"
            title={q.title}
            meta={q.meta}
            graph={<Bars items={items} caption={`${q.items.length} open requests with the studio.`} />}
            list={
                <ul className="rows">
                    {q.items.map((x) => (
                        <li key={x.id} className="row">
                            <div className="row-main">
                                <span className="row-title">{x.title}</span>
                                <span className="row-sub">{x.note}</span>
                            </div>
                            <Chip text={x.status} tone={x.tone} />
                        </li>
                    ))}
                </ul>
            }
        />
    );
}

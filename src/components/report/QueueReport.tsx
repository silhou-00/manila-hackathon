// Full report for the content queue: posts per stage as bars, and every stage listed with its posts,
// client and due time. Then what is due, in time order.

import { Bars } from "@/components/brief/Bars";
import { Chip } from "@/components/brief/Chip";
import type { RoleId } from "@/lib/brief/data";
import { stageTone } from "@/lib/brief/helper";
import { getRole } from "@/lib/brief/model";
import { conclusion } from "@/lib/brief/report";
import { ReportLayout } from "./ReportLayout";

type QueueReportProps = { role: RoleId };

export function QueueReport({ role }: QueueReportProps) {
    const q = getRole(role).queue;

    if (!q) {
        return null;
    }

    const stages = Object.entries(q.stages).map(([id, label]) => ({ id, label, items: q.items.filter((x) => x.stage === id) }));
    const bars = stages.map((s) => ({
        label: s.label,
        value: s.items.length,
        display: s.items.length + (s.items.length === 1 ? " post" : " posts"),
        tone: stageTone(s.id) === "neutral" ? "ink" : stageTone(s.id),
    }));
    const clients = new Set(q.items.map((x) => x.client)).size;
    const review = q.items.filter((x) => x.stage === "review").length;

    const slots = [...new Set(q.items.filter((x) => x.stage !== "posted").map((x) => x.when))];

    // when queued posts are due
    const due = (
        <ol className="report-events">
            {slots.map((when) => {
                const items = q.items.filter((x) => x.when === when && x.stage !== "posted");

                return (
                    <li key={when} className="report-event" data-tone={items.some((x) => x.stage === "review") ? "warning" : "neutral"}>
                        <span className="report-event-time num">{when}</span>
                        <div className="row-main">
                            <span className="row-title">{items.length === 1 ? "1 post" : `${items.length} posts`}</span>
                            <span className="row-sub">{items.map((x) => x.title).join(", ")}</span>
                        </div>
                    </li>
                );
            })}
        </ol>
    );

    return (
        <ReportLayout
            conclusion={conclusion(role, "queue")}
            graphLabel="Posts per stage"
            graph={<Bars items={bars} caption="Trend, script, make, review, scheduled, posted." />}
            listLabel="Every stage"
            list={
                <div className="report-groups">
                    {stages
                        .filter((s) => s.items.length > 0)
                        .map((s) => (
                            <div key={s.id} className="report-group">
                                <h4 className="kicker">
                                    {s.label} · <span className="num">{s.items.length}</span>
                                </h4>
                                <ul className="rows">
                                    {s.items.map((x) => (
                                        <li key={x.id} className="row">
                                            <div className="row-main">
                                                <span className="row-title">{x.title}</span>
                                                <span className="row-sub">{x.client}</span>
                                            </div>
                                            <Chip text={x.when} tone={stageTone(x.stage)} />
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                </div>
            }
            extra={[{ label: "Due today, in order", body: due }]}
            totals={[
                { label: "In the queue", value: String(q.items.length) },
                { label: "Waiting for review", value: String(review) },
                { label: "Clients", value: String(clients) },
            ]}
        />
    );
}

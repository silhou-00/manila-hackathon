// Full report for the overnight loop: each stage's count as bars, and every stage with its count and
// one sentence on what happened there. Then posts per client.

import { Icon } from "@/components/Icon";
import { Bars } from "@/components/brief/Bars";
import type { RoleId } from "@/lib/brief/data";
import { fmt } from "@/lib/brief/helper";
import { getRole } from "@/lib/brief/model";
import { conclusion, LOOP_NOTES, share } from "@/lib/brief/report";
import { ReportLayout } from "./ReportLayout";

type LoopReportProps = { role: RoleId };

export function LoopReport({ role }: LoopReportProps) {
    const loop = getRole(role).loop;

    if (!loop) {
        return null;
    }

    const made = loop.stages.find((s) => s.id === "make")?.value ?? 0;
    const posted = loop.stages.find((s) => s.id === "post")?.value ?? 0;
    const bars = loop.stages.map((s) => ({ label: s.label, value: s.value, display: `${fmt(s.value)} ${s.unit}`, tone: "ink" }));

    const clients = getRole(role).clients?.items ?? [];

    // posts per client
    const perClient = <Bars items={clients.map((c) => ({ label: c.name, value: c.posts, display: `${c.posts} posts`, tone: "ink" }))} caption="Measured posts, last night." />;

    return (
        <ReportLayout
            conclusion={conclusion(role, "loop")}
            graphLabel="Count at each stage"
            graph={<Bars items={bars} caption={loop.meta} />}
            listLabel="Every stage"
            list={
                <ul className="rows">
                    {loop.stages.map((s) => (
                        <li key={s.id} className="row">
                            <span className="report-stage-icon">
                                <Icon name={s.icon} size={16} />
                            </span>
                            <div className="row-main">
                                <span className="row-title">{s.label}</span>
                                <span className="row-sub">{LOOP_NOTES[s.id] ?? ""}</span>
                            </div>
                            <span className="row-amt num">{fmt(s.value)}</span>
                        </li>
                    ))}
                </ul>
            }
            extra={clients.length > 0 ? [{ label: "Posts per client", body: perClient }] : []}
            totals={[
                { label: "Made", value: fmt(made) },
                { label: "Posted", value: fmt(posted) },
                { label: "Posted of made", value: `${share(posted, made)}%` },
            ]}
        />
    );
}

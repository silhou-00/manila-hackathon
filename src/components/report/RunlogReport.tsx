// Full report for the run log: time per step as bars, and every step in full with its sources and
// what the assistant did in that step. Then each source and how many steps read it.

import { Bars } from "@/components/brief/Bars";
import { Timeline } from "@/components/brief/Timeline";
import type { RoleId } from "@/lib/brief/data";
import { getRole } from "@/lib/brief/model";
import { conclusion, RUNLOG_DETAIL } from "@/lib/brief/report";
import { ReportLayout } from "./ReportLayout";

type RunlogReportProps = { role: RoleId };

export function RunlogReport({ role }: RunlogReportProps) {
    const g = getRole(role).runlog;
    const detail = RUNLOG_DETAIL[role];
    const steps = g.steps.map((s, i) => ({ ...s, text: detail[i] ? `${s.text}. ${detail[i]}` : s.text }));
    const sources = new Set(g.steps.flatMap((s) => s.sources)).size;
    const bars = g.steps.map((s, i) => ({ label: `Step ${i + 1} · ${s.time}`, value: s.sources.length, display: s.sources.length === 1 ? "1 source" : `${s.sources.length} sources`, tone: "ink" }));

    const used = [...new Set(g.steps.flatMap((s) => s.sources))];

    // each source and how many steps read it
    const sourceBars = <Bars items={used.map((src) => ({ label: src, value: g.steps.filter((s) => s.sources.includes(src)).length, display: `${g.steps.filter((s) => s.sources.includes(src)).length} steps`, tone: "ink" }))} />;

    return (
        <ReportLayout
            conclusion={conclusion(role, "runlog")}
            graphLabel="Sources read per step"
            graph={<Bars items={bars} caption={`${g.steps.length} steps, ${g.summary.split("·")[1]?.trim() ?? ""} in all.`} />}
            listLabel="Every step"
            list={<Timeline steps={steps} states={steps.map(() => "done")} />}
            extra={[{ label: "Steps per source", body: sourceBars }]}
            totals={[
                { label: "Steps", value: String(g.steps.length) },
                { label: "Sources", value: String(sources) },
                { label: "Took", value: g.summary.split("·")[1]?.trim() ?? g.summary },
            ]}
        />
    );
}

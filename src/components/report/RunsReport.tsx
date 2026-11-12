// Full report for agent runs: counts by status as bars, every listed run grouped as failed, running
// and finished, and a callout on the Pod 07 cause and fix.

import { Icon } from "@/components/Icon";
import { Bars } from "@/components/brief/Bars";
import type { RoleId } from "@/lib/brief/data";
import { num } from "@/lib/brief/helper";
import { getRole } from "@/lib/brief/model";
import { conclusion, POD07_CALLOUT, runGroups } from "@/lib/brief/report";
import { ReportLayout } from "./ReportLayout";

type RunsReportProps = { role: RoleId };

export function RunsReport({ role }: RunsReportProps) {
    const g = getRole(role).runs;

    if (!g) {
        return null;
    }

    const total = num(g.meta);
    const groups = runGroups(g.items);
    const failed = groups[0].items.length;
    const running = groups[1].items.length;
    const finished = total - failed - running;
    const listed = groups.reduce((a, x) => a + x.items.length, 0);
    const bars = [
        { label: "Finished", value: finished, display: String(finished), tone: "success" },
        { label: "Running now", value: running, display: String(running), tone: "info" },
        { label: "Failed", value: failed, display: String(failed), tone: "danger" },
    ];

    return (
        <ReportLayout
            conclusion={conclusion(role, "runs")}
            callout={
                <div className="report-callout" data-tone="danger">
                    <p className="report-callout-title">{POD07_CALLOUT.title}</p>
                    <p>{POD07_CALLOUT.cause}</p>
                    <p>
                        <b>Fix: </b>
                        {POD07_CALLOUT.fix}
                    </p>
                </div>
            }
            graphLabel="Runs by status"
            graph={<Bars items={bars} caption={`${total} runs overnight, 11:40 PM to 5:40 AM.`} />}
            listLabel="Every run with a note"
            list={
                <div className="report-groups">
                    {groups.map((grp) => (
                        <div key={grp.id} className="report-group">
                            <h4 className="kicker">
                                {grp.label} · <span className="num">{grp.id === "done" ? finished : grp.items.length}</span>
                            </h4>
                            <ul className="rows">
                                {grp.items.map((x) => (
                                    <li key={x.id} className="row tl-item" data-step={x.status}>
                                        <span className="tl-marker">
                                            {x.status === "running" ? <span className="spinner" /> : <Icon name={x.status === "error" ? "x" : "check"} size={14} />}
                                        </span>
                                        <div className="row-main">
                                            <span className="row-title">{x.task}</span>
                                            <span className="row-sub">{x.where} · {x.note}</span>
                                        </div>
                                        <span className="row-time num">{x.time}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                    <p className="stat-note">
                        Showing {listed} runs with a note. The other {total - listed} finished without one.
                    </p>
                </div>
            }
            totals={[
                { label: "Runs", value: String(total) },
                { label: "Finished", value: String(finished) },
                { label: "Running", value: String(running) },
                { label: "Failed", value: String(failed) },
            ]}
        />
    );
}

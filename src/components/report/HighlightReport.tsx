// Full report for the overnight highlight: the large chart since posting, then the lead, every
// figure and the takeaway.

import { AreaChart } from "@/components/brief/AreaChart";
import { Chip } from "@/components/brief/Chip";
import type { RoleId } from "@/lib/brief/data";
import { fmt } from "@/lib/brief/helper";
import { getRole } from "@/lib/brief/model";
import { conclusion } from "@/lib/brief/report";
import { ReportLayout } from "./ReportLayout";

type HighlightReportProps = { role: RoleId };

export function HighlightReport({ role }: HighlightReportProps) {
    const h = getRole(role).highlight;
    const c = h.chart;
    const last = c.values[c.values.length - 1] ?? 0;

    return (
        <ReportLayout
            conclusion={conclusion(role, "highlight")}
            graphLabel={c.title}
            graph={
                <div className="report-chart">
                    <AreaChart values={c.values} labels={c.labels} label={c.title} prefix={c.prefix} unit={c.unit} />
                </div>
            }
            listLabel={h.kicker}
            list={
                <div className="report-groups">
                    <p className="report-lead">{h.lead}</p>
                    <ul className="rows">
                        {h.figures.map((f) => (
                            <li key={f.label} className="row">
                                <div className="row-main">
                                    <span className="row-title">{f.label}</span>
                                </div>
                                <Chip text={f.delta} tone={f.tone} />
                                <span className="row-amt num">{f.value}</span>
                            </li>
                        ))}
                    </ul>
                    <p className="report-lead">
                        <b>Takeaway: </b>
                        {h.takeaway}
                    </p>
                    <p className="stat-note">{h.made}</p>
                </div>
            }
            totals={[
                { label: "By 5 AM", value: (c.prefix ?? "") + fmt(last) + " " + c.unit },
                { label: "Hours since posting", value: String(c.labels.length - 1) },
                { label: "Figures", value: String(h.figures.length) },
            ]}
        />
    );
}

// Full report for capacity: pods, phones and agents as bars, a pod-by-pod grid with each pod's
// status and phones online, then phones working hour by hour overnight and what went wrong.

import { AreaChart } from "@/components/brief/AreaChart";
import { Bars } from "@/components/brief/Bars";
import { Chip } from "@/components/brief/Chip";
import type { RoleId } from "@/lib/brief/data";
import { getRole } from "@/lib/brief/model";
import { CAPACITY_INCIDENTS, conclusion, PHONE_HOURS, PODS, sum } from "@/lib/brief/report";
import { ReportLayout } from "./ReportLayout";

type CapacityReportProps = { role: RoleId };

export function CapacityReport({ role }: CapacityReportProps) {
    const cap = getRole(role).capacity;

    if (!cap) {
        return null;
    }

    const bars = cap.map((c) => ({ label: c.label, value: Math.round((c.value / c.of) * 100), display: `${c.value} of ${c.of}`, tone: c.warn ? "warning" : "success" }));
    const phones = sum(PODS.map((p) => p.phones));
    const online = sum(PODS.map((p) => p.online));
    const busy = PODS.filter((p) => p.status === "Busy").length;

    // phones working per hour
    const usage = (
        <div className="report-chart">
            <AreaChart values={PHONE_HOURS.values} labels={PHONE_HOURS.labels} label="Phones working per hour, overnight" unit="of 40 phones" />
        </div>
    );

    // incidents overnight
    const incidents = (
        <ol className="report-events">
            {CAPACITY_INCIDENTS.map((x) => (
                <li key={x.time} className="report-event" data-tone={x.tone}>
                    <span className="report-event-time num">{x.time}</span>
                    <div className="row-main">
                        <span className="row-title">{x.title}</span>
                        <span className="row-sub">{x.note}</span>
                    </div>
                </li>
            ))}
        </ol>
    );

    return (
        <ReportLayout
            conclusion={conclusion(role, "capacity")}
            graphLabel="Online and busy"
            graph={<Bars items={bars} caption="Share of each that is working right now." />}
            listLabel="Every pod"
            list={
                <ul className="report-pods">
                    {PODS.map((p) => (
                        <li key={p.id} className="report-pod" data-tone={p.tone}>
                            <div className="report-pod-top">
                                <span className="row-title">{p.label}</span>
                                <Chip text={p.status} tone={p.tone} />
                            </div>
                            <span className="row-sub num">
                                {p.online} of {p.phones} phones online
                            </span>
                            <span className="row-sub">{p.note}</span>
                        </li>
                    ))}
                </ul>
            }
            extra={[
                { label: "Phones working overnight", body: usage },
                { label: "Incidents", body: incidents },
            ]}
            totals={[
                { label: "Pods", value: String(PODS.length) },
                { label: "Busy", value: String(busy) },
                { label: "Phones online", value: `${online} of ${phones}` },
            ]}
        />
    );
}

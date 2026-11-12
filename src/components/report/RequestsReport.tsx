// Full report for studio requests: requests per status as bars, and every request, open and recently
// delivered, with its status and due date. Then every status change this week, newest first.

import { Bars } from "@/components/brief/Bars";
import { Chip } from "@/components/brief/Chip";
import type { RoleId } from "@/lib/brief/data";
import { getRole } from "@/lib/brief/model";
import { CLOSED_REQUESTS, conclusion, REQUEST_DUE, REQUEST_HISTORY } from "@/lib/brief/report";
import { ReportLayout } from "./ReportLayout";

type RequestsReportProps = { role: RoleId };

export function RequestsReport({ role }: RequestsReportProps) {
    const q = getRole(role).requests;

    if (!q) {
        return null;
    }

    const rows = [...q.items.map((x) => ({ ...x, due: REQUEST_DUE[x.id] ?? "No date yet" })), ...CLOSED_REQUESTS];
    const statuses = [...new Set(rows.map((x) => x.status))];
    const bars = statuses.map((s) => {
        const n = rows.filter((x) => x.status === s).length;
        const tone = rows.find((x) => x.status === s)?.tone ?? "neutral";

        return { label: s, value: n, display: n === 1 ? "1 request" : `${n} requests`, tone: tone === "neutral" ? "ink" : tone };
    });

    // status changes, newest first
    const history = (
        <ol className="report-events">
            {REQUEST_HISTORY.map((x) => (
                <li key={x.time} className="report-event" data-tone={x.tone}>
                    <span className="report-event-time num">{x.time}</span>
                    <span className="row-sub">{x.text}</span>
                </li>
            ))}
        </ol>
    );

    return (
        <ReportLayout
            conclusion={conclusion(role, "requests")}
            graphLabel="Requests by status"
            graph={<Bars items={bars} caption="Open requests and the last two delivered." />}
            listLabel="Every request"
            list={
                <ul className="rows">
                    {rows.map((x) => (
                        <li key={x.id} className="row">
                            <div className="row-main">
                                <span className="row-title">{x.title}</span>
                                <span className="row-sub">
                                    {x.note} · {x.status === "Delivered" ? "Delivered" : "Due"} {x.due}
                                </span>
                            </div>
                            <Chip text={x.status} tone={x.tone} />
                        </li>
                    ))}
                </ul>
            }
            extra={[{ label: "What changed this week", body: history }]}
            totals={[
                { label: "Open", value: String(q.items.length) },
                { label: "Waiting for you", value: String(q.items.filter((x) => x.tone === "warning").length) },
                { label: "Delivered this week", value: String(CLOSED_REQUESTS.length) },
            ]}
        />
    );
}

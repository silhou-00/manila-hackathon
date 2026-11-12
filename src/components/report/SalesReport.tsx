// Full report for TikTok Shop sales by video (mock data): sales as bars, and a row per video with
// sales, orders, times usual orders and share of the day. Then orders through the day.

import { Bars } from "@/components/brief/Bars";
import { AreaChart } from "@/components/brief/AreaChart";
import { Chip } from "@/components/brief/Chip";
import type { RoleId } from "@/lib/brief/data";
import { num } from "@/lib/brief/helper";
import { getRole } from "@/lib/brief/model";
import { conclusion, peso, SALES_HOURS, SALES_USUAL, sum } from "@/lib/brief/report";
import { ReportLayout } from "./ReportLayout";

type SalesReportProps = { role: RoleId };

export function SalesReport({ role }: SalesReportProps) {
    const s = getRole(role).sales;

    if (!s) {
        return null;
    }

    const total = sum(s.items.map((x) => num(x.sales)));
    const orders = sum(s.items.map((x) => x.orders));
    const bars = s.items.map((x) => ({ label: x.title, value: num(x.sales), display: x.sales, tone: x.tag ? "success" : "ink" }));

    // orders through the day
    const hours = (
        <div className="report-chart">
            <AreaChart values={SALES_HOURS.values} labels={SALES_HOURS.labels} label="Orders per 2 hours, yesterday" unit="orders" />
        </div>
    );

    return (
        <ReportLayout
            conclusion={conclusion(role, "sales")}
            graphLabel="Sales by video"
            graph={<Bars items={bars} caption={`Total ${s.total}.`} />}
            listLabel="Every video"
            list={
                <ul className="rows">
                    {s.items.map((x) => {
                        const usual = SALES_USUAL[x.id] ?? "1.0x";

                        return (
                            <li key={x.id} className="row row--bar">
                                <div className="row-main">
                                    <span className="row-title">
                                        {x.title} <Chip text={`${usual} usual`} tone={num(usual) >= 1.3 ? "success" : "neutral"} />
                                    </span>
                                    <span className="row-sub num">
                                        {x.orders} orders · {x.share}% of the day
                                    </span>
                                    <span className="bar">
                                        <i style={{ width: `${x.share}%` }} />
                                    </span>
                                </div>
                                <span className="row-amt num">{x.sales}</span>
                            </li>
                        );
                    })}
                </ul>
            }
            extra={[{ label: "Orders through the day, every 2 hours", body: hours }]}
            totals={[
                { label: "Sales", value: peso(total) },
                { label: "Orders", value: String(orders) },
                { label: "Average order", value: peso(Math.round(total / (orders || 1))) },
            ]}
        />
    );
}

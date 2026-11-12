// Full report for trends from the mock trend scan: growth per term as bars, and a row per term with
// its growth, the matching accounts and a suggested hook. Then each term's last 7 days as a small chart.

import { Bars } from "@/components/brief/Bars";
import { AreaChart } from "@/components/brief/AreaChart";
import { Chip } from "@/components/brief/Chip";
import type { RoleId } from "@/lib/brief/data";
import { num } from "@/lib/brief/helper";
import { getRole } from "@/lib/brief/model";
import { conclusion, TREND_DAYS, TREND_EXTRA, trendSeries } from "@/lib/brief/report";
import { ReportLayout } from "./ReportLayout";

type TrendsReportProps = { role: RoleId };

export function TrendsReport({ role }: TrendsReportProps) {
    const t = getRole(role).trends;
    const extra = TREND_EXTRA[role];
    const bars = t.items.map((x) => ({ label: x.term, value: num(x.growth), display: `+${x.growth}`, tone: x.tone === "success" ? "success" : "neutral" }));
    const rising = t.items.filter((x) => x.tone === "success").length;
    const accounts = new Set(t.items.flatMap((x) => extra[x.id]?.accounts ?? [])).size;

    // 7-day index per trend
    const week = (
        <div className="report-multiples">
            {t.items.map((x) => (
                <div key={x.id} className="report-mini">
                    <div className="report-mini-top">
                        <span className="row-title">{x.term}</span>
                        <span className="row-sub num">+{x.growth}</span>
                    </div>
                    <AreaChart spark className="chart--spark" values={trendSeries(num(x.growth))} labels={TREND_DAYS} label={`${x.term}, last 7 days`} unit="index" />
                </div>
            ))}
        </div>
    );

    return (
        <ReportLayout
            conclusion={conclusion(role, "trends")}
            graphLabel="Growth this week"
            graph={<Bars items={bars} caption="Searches and sounds against last week. Mock trend scan." />}
            listLabel="Every trend"
            list={
                <ul className="rows">
                    {t.items.map((x) => {
                        const more = extra[x.id];

                        return (
                            <li key={x.id} className="row">
                                <div className="row-main">
                                    <span className="row-title">
                                        {x.term} <Chip text={`+${x.growth}`} tone={x.tone} />
                                    </span>
                                    <span className="row-sub">{x.fit}</span>
                                    {more && more.accounts.length > 0 && <span className="row-sub">Accounts: {more.accounts.join(", ")}</span>}
                                    {more && <span className="row-sub">Hook: {more.hook}</span>}
                                </div>
                            </li>
                        );
                    })}
                </ul>
            }
            extra={[{ label: "Last 7 days, 100 is a week ago", body: week }]}
            totals={[
                { label: "Trends", value: String(t.items.length) },
                { label: "Rising", value: String(rising) },
                { label: "Matching accounts", value: String(accounts) },
            ]}
        />
    );
}

// Full report for Meta Ads ad sets (mock data): return per ad set as bars, and a row per ad set with
// spend, return, sales from ads and the suggested move. Then the last 7 days of spend against return.

import { Bars } from "@/components/brief/Bars";
import { AreaChart } from "@/components/brief/AreaChart";
import { Chip } from "@/components/brief/Chip";
import type { RoleId } from "@/lib/brief/data";
import { num } from "@/lib/brief/helper";
import { getRole } from "@/lib/brief/model";
import { AD_DAYS, AD_MOVES, conclusion, peso, sum } from "@/lib/brief/report";
import { ReportLayout } from "./ReportLayout";

type AdsReportProps = { role: RoleId };

export function AdsReport({ role }: AdsReportProps) {
    const a = getRole(role).ads;

    if (!a) {
        return null;
    }

    const spend = sum(a.items.map((x) => num(x.spend)));
    const back = sum(a.items.map((x) => num(x.spend) * num(x.ret)));
    const bars = a.items.map((x) => ({ label: x.name, value: num(x.ret), display: `${x.ret} return`, tone: x.tone === "neutral" ? "ink" : x.tone }));

    // sales from ads per day
    const daily = (
        <div className="report-chart">
            <AreaChart values={AD_DAYS.sales} labels={AD_DAYS.labels} label="Sales from ads per day, last 7 days" prefix="₱" />
        </div>
    );

    // spend against return per day
    const days = (
        <table className="report-table">
            <thead>
                <tr>
                    <th scope="col">Day</th>
                    <th scope="col" className="num">Spend</th>
                    <th scope="col" className="num">Sales from ads</th>
                    <th scope="col" className="num">Return</th>
                </tr>
            </thead>
            <tbody>
                {AD_DAYS.labels.map((d, i) => {
                    const spent = AD_DAYS.spend[i] ?? 0;
                    const sold = AD_DAYS.sales[i] ?? 0;

                    return (
                        <tr key={d}>
                            <td>{d}</td>
                            <td className="num">{peso(spent)}</td>
                            <td className="num">{peso(sold)}</td>
                            <td className="num">{(sold / (spent || 1)).toFixed(1)}x</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );

    return (
        <ReportLayout
            conclusion={conclusion(role, "ads")}
            graphLabel="Return on ad spend"
            graph={<Bars items={bars} caption="Sales from ads for every peso spent, yesterday." />}
            listLabel="Every ad set"
            list={
                <ul className="rows">
                    {a.items.map((x) => (
                        <li key={x.id} className="row">
                            <div className="row-main">
                                <span className="row-title">
                                    {x.name} <Chip text={x.status} tone={x.tone} />
                                </span>
                                <span className="row-sub num">
                                    {x.spend} spent · {x.ret} return · {peso(Math.round(num(x.spend) * num(x.ret)))} in sales
                                </span>
                                <span className="row-sub">Suggested: {AD_MOVES[x.id] ?? "Keep as is"}</span>
                            </div>
                            <span className="row-amt num">{x.ret}</span>
                        </li>
                    ))}
                </ul>
            }
            extra={[
                { label: "Sales from ads, last 7 days", body: daily },
                { label: "Spend against return, per day", body: days },
            ]}
            totals={[
                { label: "Spend", value: peso(spend) },
                { label: "Sales from ads", value: peso(Math.round(back)) },
                { label: "Return", value: (back / (spend || 1)).toFixed(1) + "x" },
            ]}
        />
    );
}

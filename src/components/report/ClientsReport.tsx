// Full report per client: overnight views as bars, a row per client with last night against its
// usual night and its best single post, then a 7-night trend per client, each client's top 3 posts
// and the split of posts across platforms.

import { Bars } from "@/components/brief/Bars";
import { Chip } from "@/components/brief/Chip";
import { Sparkline } from "@/components/brief/Sparkline";
import type { RoleId } from "@/lib/brief/data";
import { fmt, num } from "@/lib/brief/helper";
import { getRole } from "@/lib/brief/model";
import { CLIENT_PLATFORMS, CLIENT_TOP, conclusion, share, sum, timesUsual } from "@/lib/brief/report";
import { ReportLayout } from "./ReportLayout";

type ClientsReportProps = { role: RoleId };

export function ClientsReport({ role }: ClientsReportProps) {
    const c = getRole(role).clients;

    if (!c) {
        return null;
    }

    const total = sum(c.items.map((x) => num(x.views)));
    const posts = sum(c.items.map((x) => x.posts));
    const bars = c.items.map((x, i) => ({ label: x.name, value: num(x.views), display: x.views, tone: i === 0 ? "success" : "ink" }));

    // 7-night trend per client
    const trend = (
        <div className="report-multiples">
            {c.items.map((x) => (
                <div key={x.id} className="report-mini">
                    <div className="report-mini-top">
                        <span className="row-title">{x.name}</span>
                        <span className="row-sub num">{timesUsual(x.values)} night vs usual</span>
                    </div>
                    <Sparkline values={x.values} unit="k views" />
                </div>
            ))}
        </div>
    );

    // top 3 posts per client
    const top = (
        <div className="report-tables">
            {c.items.map((x) => (
                <table key={x.id} className="report-table">
                    <caption>{x.name}</caption>
                    <thead>
                        <tr>
                            <th scope="col">Post</th>
                            <th scope="col">Account</th>
                            <th scope="col" className="num">Views</th>
                            <th scope="col" className="num">vs usual</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(CLIENT_TOP[x.id] ?? []).map((p) => (
                            <tr key={p.title}>
                                <td>{p.title}</td>
                                <td className="row-sub">{p.account}</td>
                                <td className="num">{p.views}</td>
                                <td className="num">{p.usual}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ))}
        </div>
    );

    // posts by platform per client
    const platforms = (
        <div className="report-multiples report-multiples--list">
            {c.items.map((x) => {
                const split = CLIENT_PLATFORMS[x.id] ?? [];

                return (
                    <div key={x.id} className="report-mini">
                        <span className="row-title">{x.name}</span>
                        <Bars items={split.map((p) => ({ label: p.label, value: p.posts, display: `${p.posts} posts`, tone: "ink" }))} />
                    </div>
                );
            })}
        </div>
    );

    return (
        <ReportLayout
            conclusion={conclusion(role, "clients")}
            graphLabel="Views overnight"
            graph={<Bars items={bars} caption="Last night, all of each client's accounts together." />}
            listLabel="Every client"
            list={
                <ul className="rows">
                    {c.items.map((x) => {
                        const usual = timesUsual(x.values);
                        const pct = share(num(x.views), total);

                        return (
                            <li key={x.id} className="row row--bar">
                                <div className="row-main">
                                    <span className="row-title">
                                        {x.name} <Chip text={`${usual} night vs usual`} tone={num(usual) >= 1.3 ? "success" : "neutral"} />
                                    </span>
                                    <span className="row-sub num">
                                        {x.posts} posts · best post {x.best} its usual · {pct}% of views
                                    </span>
                                    <span className="bar">
                                        <i style={{ width: `${pct}%` }} />
                                    </span>
                                </div>
                                <span className="row-amt num">{x.views}</span>
                            </li>
                        );
                    })}
                </ul>
            }
            extra={[
                { label: "Views, last 7 nights", body: trend },
                { label: "Posts by platform", body: platforms },
                { label: "Top 3 posts per client", body: top },
            ]}
            totals={[
                { label: "Views", value: fmt(total) },
                { label: "Posts", value: String(posts) },
                { label: "Clients", value: String(c.items.length) },
            ]}
        />
    );
}

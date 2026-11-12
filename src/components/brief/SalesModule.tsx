// TikTok Shop sales by video: sales as bars (Graph) or rows with a share bar and the total (List).

import { num } from "@/lib/brief/helper";
import type { Sales } from "@/lib/brief/model";
import { Bars } from "./Bars";
import { Chip } from "./Chip";
import { ViewsModule } from "./ViewsModule";

type SalesModuleProps = { data: Sales };

export function SalesModule({ data: s }: SalesModuleProps) {
    const items = s.items.map((x) => ({ label: x.title, value: num(x.sales), display: x.sales, tone: x.tag ? "success" : "ink" }));

    return (
        <ViewsModule
            id="sales"
            title={s.title}
            meta={s.meta}
            graph={<Bars items={items} caption={`Total ${s.total}.`} />}
            list={
                <>
                    <ul className="rows">
                        {s.items.map((x) => (
                            <li key={x.id} className="row row--bar">
                                <div className="row-main">
                                    <span className="row-title">
                                        {x.title}
                                        {x.tag && <> <Chip text={x.tag} tone={x.tone} /></>}
                                    </span>
                                    <span className="row-sub num">{x.orders} orders</span>
                                    <span className="bar">
                                        <i style={{ width: `${x.share * 3}%` }} />
                                    </span>
                                </div>
                                <span className="row-amt num">{x.sales}</span>
                            </li>
                        ))}
                    </ul>
                    <div className="mod-foot">
                        <span>Total</span>
                        <span className="num">{s.total}</span>
                    </div>
                </>
            }
        />
    );
}

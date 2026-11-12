// Per-client overnight results: views as bars (Graph) or rows with a scrubbable sparkline (List).

import { num } from "@/lib/brief/helper";
import type { Clients } from "@/lib/brief/model";
import { Bars } from "./Bars";
import { Chip } from "./Chip";
import { Sparkline } from "./Sparkline";
import { ViewsModule } from "./ViewsModule";

type ClientsModuleProps = { data: Clients };

export function ClientsModule({ data: c }: ClientsModuleProps) {
    const items = c.items.map((x) => ({
        label: `${x.name} · ${x.best} best`,
        value: num(x.views),
        display: x.views,
        tone: x.best === "4.1x" ? "success" : "ink",
    }));

    return (
        <ViewsModule
            id="clients"
            title={c.title}
            meta="112 posted"
            graph={<Bars items={items} caption="Views overnight, per client." />}
            list={
                <>
                    <ul className="rows">
                        {c.items.map((x) => (
                            <li key={x.id} className="row">
                                <div className="row-main">
                                    <span className="row-title">{x.name}</span>
                                    <span className="row-sub num">{x.posts} posts · {x.views} views</span>
                                </div>
                                <Sparkline values={x.values} unit="k views" />
                                <Chip text={x.best} tone={x.best === "4.1x" ? "success" : "neutral"} />
                            </li>
                        ))}
                    </ul>
                    <p className="stat-note">{c.note}</p>
                </>
            }
        />
    );
}

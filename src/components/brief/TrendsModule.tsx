// Trending searches: weekly growth as a column chart, tallest first (Graph) or a ranked list with the client fit (List).

import { num } from "@/lib/brief/helper";
import type { Trends } from "@/lib/brief/model";
import { Chip } from "./Chip";
import { Columns } from "./Columns";
import { ViewsModule } from "./ViewsModule";

type TrendsModuleProps = { data: Trends };

export function TrendsModule({ data: t }: TrendsModuleProps) {
    const items = t.items.map((x) => ({
        label: x.term,
        value: num(x.growth),
        display: (x.tone === "success" ? "+" : "") + x.growth,
        tone: x.tone === "success" ? "success" : "neutral",
    })).sort((a, b) => b.value - a.value);
    const summary = items.map((x) => `${x.label} ${x.display}`).join(", ");

    return (
        <ViewsModule
            id="trends"
            title={t.title}
            meta={t.meta}
            graph={<Columns items={items} label={`Search growth this week: ${summary}.`} caption="Growth in searches this week." />}
            list={
                <ol className="rows">
                    {t.items.map((x, i) => (
                        <li key={x.id} className="row">
                            <span className="row-rank num">{i + 1}</span>
                            <div className="row-main">
                                <span className="row-title">"{x.term}"</span>
                                <span className="row-sub">{x.fit}</span>
                            </div>
                            <Chip text={x.growth} tone={x.tone} arrow={x.tone === "success" ? "up" : ""} />
                        </li>
                    ))}
                </ol>
            }
        />
    );
}

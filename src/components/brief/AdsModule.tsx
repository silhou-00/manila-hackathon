// Meta Ads by ad set: return as bars (Graph) or a table with spend, return, status and a total row (List).

import { Icon } from "@/components/Icon";
import { num } from "@/lib/brief/helper";
import type { Ads } from "@/lib/brief/model";
import { Bars } from "./Bars";
import { Chip } from "./Chip";
import { ViewsModule } from "./ViewsModule";

type AdsModuleProps = { data: Ads };

export function AdsModule({ data: a }: AdsModuleProps) {
    const items = a.items.map((x) => ({
        label: `${x.name} · ${x.spend} spent`,
        value: num(x.ret),
        display: `${x.ret} return`,
        tone: x.tone === "neutral" ? "ink" : x.tone,
    }));

    return (
        <ViewsModule
            id="ads"
            title={a.title}
            meta={a.meta}
            graph={<Bars items={items} caption={`Return per ad set. Total ${a.total[1]} spent at ${a.total[2]}.`} />}
            list={
                <table className="tbl">
                    <thead>
                        <tr>
                            {a.columns.map((c, i) => (
                                <th key={c} scope="col" className={i === 1 || i === 2 ? "r" : undefined}>
                                    {c}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {a.items.map((x) => (
                            <tr key={x.id}>
                                <th scope="row">{x.name}</th>
                                <td className="r num">{x.spend}</td>
                                <td className="r num">{x.ret}</td>
                                <td>
                                    <Chip text={x.status} tone={x.tone} />
                                    {x.detail && (
                                        <button type="button" className="icon-btn icon-btn--sm m-only" data-push={x.detail} aria-label={`Open ${x.name}`}>
                                            <Icon name="right" size={16} />
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <th scope="row">{a.total[0]}</th>
                            <td className="r num">{a.total[1]}</td>
                            <td className="r num">{a.total[2]}</td>
                            <td />
                        </tr>
                    </tfoot>
                </table>
            }
        />
    );
}

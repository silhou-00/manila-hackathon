// One client's overnight card on the Clients page: views against the account's usual, posts made,
// the top video, and what is waiting for that client today. Mock figures only.

import { Icon } from "@/components/Icon";
import type { ClientCardData } from "@/lib/brief/model";
import { Chip } from "./Chip";
import { ModuleHead } from "./ModuleHead";

type ClientCardProps = { data: ClientCardData };

export function ClientCard({ data: c }: ClientCardProps) {
    const lead = c.best === "4.1x";

    return (
        <article className="card mod mod--client" data-state="loaded">
            <ModuleHead title={c.name} meta={c.accounts + " accounts"} />
            <table className="figs">
                <tbody>
                    <tr>
                        <th scope="row">Views overnight</th>
                        <td className="num">{c.views}</td>
                        <td>
                            <Chip text={c.best + " usual"} tone={lead ? "success" : "neutral"} arrow={lead ? "up" : undefined} />
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">Posts made</th>
                        <td className="num">{c.posts}</td>
                        <td></td>
                    </tr>
                    <tr>
                        <th scope="row">Top video</th>
                        <td className="num">{c.top.views}</td>
                        <td>views</td>
                    </tr>
                </tbody>
            </table>
            <p className="stat-note">{c.top.title}</p>
            <div className="bridge" data-tone={c.tone}>
                <span>
                    <Icon name={c.tone === "neutral" ? "check-square" : "clock"} size={16} />
                    {c.waiting}
                </span>
            </div>
        </article>
    );
}

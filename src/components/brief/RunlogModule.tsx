// Run log: how the brief was made, as a step strip (Graph) or a timeline (List). "Run again" jumps
// to the List view and replays the steps one by one, then calls onReplayed.

import { useState } from "react";
import { Icon } from "@/components/Icon";
import { useReplay } from "@/hooks/brief/useReplay";
import type { Runlog } from "@/lib/brief/model";
import { Timeline } from "./Timeline";
import { ViewsModule } from "./ViewsModule";

type RunlogModuleProps = { data: Runlog; onReplayed?: () => void };

export function RunlogModule({ data: g, onReplayed }: RunlogModuleProps) {
    const [view, setView] = useState<"graph" | "list">("graph");
    const { states, busy, start } = useReplay(g.steps.length, () => onReplayed?.());

    function replay() {
        setView("list");
        start();
    }

    return (
        <>
            <ViewsModule
                id="runlog"
                title={g.title}
                meta="5:40 AM"
                view={view}
                onView={setView}
                graph={
                    <ol className="gsteps">
                        {g.steps.map((s, i) => (
                            <li key={i} className="gstep">
                                <span className="gstep-bar" />
                                <span className="gstep-time num">{i + 1} · {s.time}</span>
                                <span className="gstep-text">{s.text}</span>
                            </li>
                        ))}
                    </ol>
                }
                list={
                    <div data-runlog>
                        <Timeline steps={g.steps} states={states} />
                    </div>
                }
            />
            <div className="mod-foot">
                <span className="num">{g.summary}</span>
                <button type="button" className="btn btn-ghost btn-sm" data-replay disabled={busy} onClick={replay}>
                    <Icon name="refresh" size={15} />
                    Run again
                </button>
            </div>
        </>
    );
}

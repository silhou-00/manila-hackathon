// Frame for list modules: title row with a Graph/List switch, and the two views. Graph is the
// default. The view can be driven from outside (the run log replay jumps to List).

import { useState, type ReactNode } from "react";
import { ModuleHead } from "./ModuleHead";
import { Seg } from "./Seg";

type View = "graph" | "list";

type ViewsModuleProps = {
    id: string;
    title: string;
    meta?: ReactNode;
    graph: ReactNode;
    list: ReactNode;
    view?: View;
    onView?: (view: View) => void;
};

const VIEWS = [{ id: "graph", label: "Graph" }, { id: "list", label: "List" }];

export function ViewsModule({ id, title, meta, graph, list, view, onView }: ViewsModuleProps) {
    const [inner, setInner] = useState<View>("graph");
    const current = view ?? inner;
    const change = onView ?? setInner;

    return (
        <>
            <ModuleHead
                title={title}
                meta={meta}
                extra={<Seg id={`view-${id}`} filters={VIEWS} value={current} onChange={(v) => change(v as View)} />}
            />
            <div className="views" data-view={current}>
                <div className="view view-graph">{graph}</div>
                <div className="view view-list">{list}</div>
            </div>
        </>
    );
}

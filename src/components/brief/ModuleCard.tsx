// One dashboard card in its loaded state. Picks the module component by name and wraps it in the
// card frame the CSS expects. A module the current role has no data for renders nothing.
// The open flag opens the folding modules (highlight, loop) on the desktop pages.

import type { ReactNode } from "react";
import type { RoleId } from "@/lib/brief/data";
import { getRole } from "@/lib/brief/model";
import { DATA } from "@/lib/brief/data";
import { FullReport } from "@/components/report/ReportButton";
import { AdsModule } from "./AdsModule";
import { CapacityModule } from "./CapacityModule";
import { ClientsModule } from "./ClientsModule";
import { HighlightModule } from "./HighlightModule";
import { LoopModule } from "./LoopModule";
import { NeedsModule } from "./NeedsModule";
import { QueueModule } from "./QueueModule";
import { RequestsModule } from "./RequestsModule";
import { RunlogModule } from "./RunlogModule";
import { RunsModule } from "./RunsModule";
import { SalesModule } from "./SalesModule";
import { SummaryModule } from "./SummaryModule";
import { TrendsModule } from "./TrendsModule";

type ModuleCardProps = {
    role: RoleId;
    m: string;
    live: Record<string, number>;
    onDraft: (draftId: string) => void;
    onAction: (action: string) => void;
    onRoleSwitch: (role: RoleId) => void;
    onReplayed?: () => void;
    open?: boolean;
};

export function ModuleCard({ role, m, live, onDraft, onAction, onRoleSwitch, onReplayed, open = false }: ModuleCardProps) {
    const r = getRole(role);
    let body: ReactNode = null;

    if (m === "summary") {
        body = <SummaryModule tiles={r.summary} live={live} />;
    } else if (m === "loop") {
        body = <LoopModule data={r.loop} live={live} defaultOpen={open} />;
    } else if (m === "highlight") {
        body = <HighlightModule data={r.highlight} onRoleSwitch={onRoleSwitch} defaultOpen={open} />;
    } else if (m === "needs") {
        body = <NeedsModule data={r.needs} onDraft={onDraft} onAction={onAction} />;
    } else if (m === "capacity" && r.capacity) {
        body = <CapacityModule data={r.capacity} />;
    } else if (m === "queue" && r.queue) {
        body = <QueueModule data={r.queue} />;
    } else if (m === "runs" && r.runs) {
        body = <RunsModule data={r.runs} />;
    } else if (m === "clients" && r.clients) {
        body = <ClientsModule data={r.clients} />;
    } else if (m === "trends") {
        body = <TrendsModule data={r.trends} />;
    } else if (m === "runlog") {
        body = <RunlogModule data={r.runlog} onReplayed={onReplayed} />;
    } else if (m === "sales" && r.sales) {
        body = <SalesModule data={r.sales} />;
    } else if (m === "ads" && r.ads) {
        body = <AdsModule data={r.ads} />;
    } else if (m === "requests" && r.requests) {
        body = <RequestsModule data={r.requests} />;
    }

    if (!body) {
        return null;
    }

    return (
        <article className={`card mod mod--${m}`} data-module={m} data-state="loaded" aria-busy="false" id={`m-${m}`}>
            {body}
            <FullReport role={role} m={m} title={DATA.moduleNames[m as keyof typeof DATA.moduleNames]} />
        </article>
    );
}

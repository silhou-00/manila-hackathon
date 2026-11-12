// Loose types for one role's brief content, plus the single cast from the mock DATA.
// Module fields a role does not have (for example queue on Brand) are optional.

import { DATA, type RoleId } from "./data";

export type Filter = { id: string; label: string; count?: string };
export type Tile = { id: string; label: string; value: number; prefix?: string; suffix?: string; decimals?: number; delta: string; tone: string; arrow?: string; note: string; icon: string };
export type LoopStage = { id: string; label: string; value: number; unit: string; icon: string };
export type Loop = { title: string; meta: string; stages: LoopStage[] };
export type Figure = { label: string; value: string; delta: string; tone: string };
export type ChartData = { title: string; unit: string; prefix?: string; labels: string[]; values: number[] };
export type Highlight = { kicker: string; title: string; lead: string; takeaway: string; figures: Figure[]; made: string; bridge: { text: string; label: string; role: RoleId }; chart: ChartData };
export type Task = { id: string; kicker: string; due: string; title: string; sub: string; quote?: string; cite?: string; primary?: { label: string; draft: string }; secondary?: { label: string; draft?: string; action?: string }; aside?: string; detail?: string };
export type Capacity = { id: string; label: string; value: number; of: number; note: string; warn: number };
export type QueueItem = { id: string; title: string; client: string; stage: string; when: string };
export type Queue = { title: string; stages: Record<string, string>; filters: Filter[]; items: QueueItem[] };
export type RunItem = { id: string; task: string; where: string; status: string; time: string; note: string; detail?: string };
export type Runs = { title: string; meta: string; filters: Filter[]; items: RunItem[] };
export type ClientItem = { id: string; name: string; posts: number; views: string; best: string; values: number[] };
export type Clients = { title: string; items: ClientItem[]; note: string };
export type ClientCardData = { id: string; name: string; accounts: number; posts: number; views: string; best: string; top: { title: string; views: string }; waiting: string; tone: string };
export type TrendItem = { id: string; term: string; growth: string; fit: string; tone: string };
export type Trends = { title: string; meta: string; items: TrendItem[] };
export type Step = { time: string; text: string; sources: string[] };
export type Runlog = { title: string; summary: string; steps: Step[]; errorAt: number; errorText: string };
export type SaleItem = { id: string; title: string; sales: string; orders: number; share: number; tag?: string; tone?: string };
export type Sales = { title: string; meta: string; items: SaleItem[]; total: string };
export type AdItem = { id: string; name: string; spend: string; ret: string; status: string; tone: string; detail?: string };
export type Ads = { title: string; meta: string; columns: string[]; items: AdItem[]; total: string[] };
export type RequestItem = { id: string; title: string; status: string; tone: string; note: string };
export type Requests = { title: string; meta: string; items: RequestItem[] };

export type Role = {
    id: RoleId;
    summary: Tile[];
    loop: Loop;
    highlight: Highlight;
    needs: Task[];
    capacity?: Capacity[];
    queue?: Queue;
    runs?: Runs;
    clients?: Clients;
    clientCards?: ClientCardData[];
    trends: Trends;
    runlog: Runlog;
    sales?: Sales;
    ads?: Ads;
    requests?: Requests;
};

// the one cast from the inferred mock type to the loose shape
export function getRole(role: RoleId): Role {
    return DATA.roles[role] as unknown as Role;
}

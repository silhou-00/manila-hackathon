// Extra mock content and pure helpers for the "View full report" dialog. Reuses the role data from
// data.ts and only adds rows where a card's list is too short to read as a report, plus the
// assistant's conclusions. Every figure is mock; nothing here reads a live account.

import type { RoleId } from "./data";
import { fmt } from "./helper";
import { getRole, type RequestItem, type Role, type RunItem } from "./model";

export const REPORT_MODULES = ["runs", "queue", "clients", "sales", "ads", "trends", "runlog", "capacity", "highlight", "loop", "requests"];

export type Total = { label: string; value: string };
export type RunGroup = { id: string; label: string; tone: string; items: RunItem[] };
export type Pod = { id: string; label: string; status: string; tone: string; phones: number; online: number; note: string };
export type TrendExtra = { accounts: string[]; hook: string };
export type RequestRow = RequestItem & { due: string };

// whether the role has data for a module that has a report
export function hasReport(role: RoleId, m: string): boolean {
    const r = getRole(role);

    if (!REPORT_MODULES.includes(m)) {
        return false;
    }

    return r[m as keyof Role] !== undefined;
}

// whole-number share of a total, in percent
export function share(part: number, total: number): number {
    if (total <= 0) {
        return 0;
    }

    return Math.round((part / total) * 100);
}

// last value against the mean of the ones before it, for example "1.6x"
export function timesUsual(values: number[]): string {
    const before = values.slice(0, -1);
    const last = values[values.length - 1] ?? 0;
    const mean = before.reduce((a, b) => a + b, 0) / (before.length || 1);

    return (mean ? last / mean : 0).toFixed(1) + "x";
}

export function sum(values: number[]): number {
    return values.reduce((a, b) => a + b, 0);
}

export function peso(value: number): string {
    return "₱" + fmt(value);
}

// finished runs without notes, so the list reads like a full night
const EXTRA_RUNS: RunItem[] = [
    { id: "x1", task: "Post · Serum in 10 seconds", where: "Pod 03 · Phone 18", status: "done", time: "10:40 PM", note: "Posted to @kalmaskin.ph" },
    { id: "x2", task: "Make · Night routine, jeepney edition", where: "Pod 02 · Phone 9", status: "done", time: "11:55 PM", note: "2 versions cut, 1 kept" },
    { id: "x3", task: "Find trend · ulan ootd", where: "Pod 04", status: "done", time: "12:30 AM", note: "Up 312% this week" },
    { id: "x4", task: "Post · Latte art teaser", where: "Pod 05 · Phone 13", status: "done", time: "1:05 AM", note: "Posted to @sinag.coffee" },
    { id: "x5", task: "Make · Ulan ootd teaser", where: "Pod 04 · Phone 21", status: "done", time: "1:40 AM", note: "Ready for Pod 07 to post" },
    { id: "x6", task: "Post · Rainy café crawl teaser", where: "Pod 06 · Phone 24", status: "done", time: "3:20 AM", note: "Posted to @sinag.coffee" },
];

export const POD07_CALLOUT = {
    title: "Why Pod 07 failed",
    cause: "TikTok asked phones 31 to 34 for a new login at 2:14 AM, so every post on that pod stopped.",
    fix: "Reconnect Pod 07 from Needs you today. The 3 failed runs queue again on their own.",
};

// runs grouped as failed, running, finished
export function runGroups(items: RunItem[]): RunGroup[] {
    const all = [...items, ...EXTRA_RUNS];
    const groups = [
        { id: "error", label: "Failed", tone: "danger" },
        { id: "running", label: "Running now", tone: "info" },
        { id: "done", label: "Finished", tone: "success" },
    ];

    return groups.map((g) => ({ ...g, items: all.filter((x) => x.status === g.id) }));
}

export const SALES_USUAL: Record<string, string> = { s1: "3.2x", s2: "1.4x", s3: "1.1x", s4: "0.9x", s5: "1.0x" };

export const AD_MOVES: Record<string, string> = {
    a1: "Add ₱5,000 from Sunscreen broad",
    a2: "Keep as is, check again Friday",
    a3: "Pause and move ₱5,000 to Rainy-day routine",
    a4: "Keep, cap at ₱3,000 a day",
};

export const TREND_EXTRA: Record<RoleId, Record<string, TrendExtra>> = {
    studio: {
        t1: { accounts: ["@lakad.ph", "@lakad.runners"], hook: "Wet pavement, then the shoes. No face for the first 2 seconds." },
        t2: { accounts: ["@kalmaskin.ph", "@kalma.routines", "@kalma.men"], hook: "Rain on a jeepney window, then the serum." },
        t3: { accounts: ["@sinag.coffee"], hook: "Commute in the rain, first sip at the counter." },
        t4: { accounts: ["@kalmaskin.ph"], hook: "Myth on screen, then the test in daylight." },
        t5: { accounts: [], hook: "Skip for now. Searches are flat." },
    },
    brand: {
        t1: { accounts: ["@kalmaskin.ph", "@kalma.routines"], hook: "Rainy commute, then the 3-step routine at the office." },
        t2: { accounts: ["@kalmaskin.ph", "@kalma.routines", "@kalma.men"], hook: "Rain on a jeepney window, then the serum." },
        t3: { accounts: ["@kalma.routines"], hook: "Price on screen in the first 3 seconds." },
        t4: { accounts: ["@kalmaskin.ph"], hook: "Myth on screen, then the test in daylight." },
        t5: { accounts: [], hook: "Skip for now. Searches are flat." },
    },
};

export const RUNLOG_DETAIL: Record<RoleId, string[]> = {
    studio: [
        "Read every run from 11:40 PM to 5:36 AM: 210 finished, 1 still running, 3 failed.",
        "Matched 112 posted videos to their accounts. 16 posts were too new to count.",
        "Each post was set against the same account's last 30 days, so small accounts are not judged against big ones.",
        "All 3 failures came from Pod 07 within 2 minutes, with the same TikTok login error.",
        "Picked the 3 items that need a person, and queued 6 Kalma drafts for approval.",
    ],
    brand: [
        "Read 412 orders from yesterday, worth ₱184,320 in total.",
        "Matched each order to the video it came from. 18 videos sold at least once.",
        "Read spend and return for the 4 ad sets that ran yesterday.",
        "Checked which skincare searches rose this week against last week.",
        "Flagged Sunscreen broad at 1.2x and suggested where its budget should go.",
    ],
};

export const PODS: Pod[] = [
    { id: "p01", label: "Pod 01", status: "Busy", tone: "success", phones: 3, online: 3, note: "Measuring 96 posts" },
    { id: "p02", label: "Pod 02", status: "Busy", tone: "success", phones: 3, online: 2, note: "1 phone charging" },
    { id: "p03", label: "Pod 03", status: "Busy", tone: "success", phones: 4, online: 4, note: "Kalma remakes" },
    { id: "p04", label: "Pod 04", status: "Busy", tone: "success", phones: 3, online: 3, note: "Lakad trend scan" },
    { id: "p05", label: "Pod 05", status: "Busy", tone: "success", phones: 3, online: 3, note: "Latte art, 2 of 3" },
    { id: "p06", label: "Pod 06", status: "Busy", tone: "success", phones: 4, online: 4, note: "Sinag posts" },
    { id: "p07", label: "Pod 07", status: "Needs login", tone: "danger", phones: 4, online: 4, note: "TikTok login lost 2:14 AM" },
    { id: "p08", label: "Pod 08", status: "Idle", tone: "neutral", phones: 3, online: 3, note: "Waiting on Pod 07" },
    { id: "p09", label: "Pod 09", status: "Busy", tone: "success", phones: 3, online: 2, note: "1 phone charging" },
    { id: "p10", label: "Pod 10", status: "Idle", tone: "neutral", phones: 4, online: 4, note: "Waiting on Pod 07" },
    { id: "p11", label: "Pod 11", status: "Busy", tone: "success", phones: 3, online: 3, note: "Kalma posts" },
    { id: "p12", label: "Pod 12", status: "Busy", tone: "success", phones: 3, online: 3, note: "Lakad posts" },
];

export const LOOP_NOTES: Record<string, string> = {
    find: "14 rising searches and sounds matched at least one client.",
    make: "Agents cut 128 posts, most of them remakes of Kalma's rain hook.",
    post: "112 went out. 7 are scheduled later, 6 wait for approval and 3 failed on Pod 07.",
    measure: "96 posts were old enough to compare with their account's usual.",
    repeat: "11 posts beat their usual by 1.5x or more, so a remake is queued for each.",
};

export const REQUEST_DUE: Record<string, string> = { rq1: "Before 10 AM today", rq2: "Fri, Nov 14", rq3: "Mon, Nov 17" };

// closed requests, so the report shows more than the open three
export const CLOSED_REQUESTS: RequestRow[] = [
    { id: "rq4", title: "Glass skin under ₱500 test", status: "Delivered", tone: "success", note: "4 videos posted", due: "Nov 10" },
    { id: "rq5", title: "Night routine, jeepney edition", status: "Delivered", tone: "success", note: "6 videos posted", due: "Nov 8" },
];

export const CONCLUSIONS: Record<RoleId, Record<string, string>> = {
    studio: {
        runs: "Only 3 of 214 runs failed, and all 3 share one cause: Pod 07 lost its TikTok login. Reconnect it and they run again.",
        queue: "Six Kalma drafts block the morning. Approve them before 9 AM so the 11:00 AM slots stay on schedule.",
        clients: "Kalma had its best night of the week on one video. Lakad and Sinag stayed close to usual.",
        trends: "\"ulan ootd\" fits two Lakad accounts today. Brief the agents before the evening rain.",
        runlog: "The brief read every run and compared each post with its own account. Nothing was skipped.",
        capacity: "11 of 12 pods are working. Pod 07 is the only one down, and two pods are idle waiting on it.",
        highlight: "One rain hook drove Kalma's night. Remake it for Kalma's other accounts while \"ulan\" is trending.",
        loop: "The loop ran end to end overnight. The only gap is the 3 posts Pod 07 could not send.",
    },
    brand: {
        sales: "One video made a third of yesterday's sales. The rest of the catalogue sold close to usual.",
        ads: "Three ad sets earn their spend. Sunscreen broad does not: move its ₱5,000 to Rainy-day routine.",
        trends: "Rain content is already selling for you. \"ulan ootd\" is the next brief worth sending.",
        runlog: "The brief matched every order to its video and read all 4 ad sets before writing.",
        highlight: "The rainy-day routine is still climbing. Put more budget behind it today.",
        requests: "One request waits on you: 3 scripts to approve before 10 AM. The other two are on track.",
    },
};

// the assistant's line for one module, or a plain fallback
export function conclusion(role: RoleId, m: string): string {
    return CONCLUSIONS[role][m] ?? "Nothing unusual in this report.";
}

export type TopPost = { title: string; account: string; views: string; usual: string };
export type PlatformSplit = { label: string; posts: number };
export type Incident = { time: string; title: string; note: string; tone: string };
export type HistoryRow = { time: string; text: string; tone: string };
export type Series = { labels: string[]; values: number[] };

// the 7 nights behind each client's sparkline, oldest first
export const NIGHT_LABELS = ["Nov 5", "Nov 6", "Nov 7", "Nov 8", "Nov 9", "Nov 10", "Last night"];

// top 3 posts per client last night, views against the same account's usual
export const CLIENT_TOP: Record<string, TopPost[]> = {
    kalma: [
        { title: "Rainy-day skincare routine", account: "@kalmaskin.ph", views: "186,400", usual: "4.1x" },
        { title: "Serum in 10 seconds", account: "@kalma.routines", views: "72,900", usual: "1.9x" },
        { title: "Night routine, jeepney edition", account: "@kalma.men", views: "41,200", usual: "1.6x" },
    ],
    lakad: [
        { title: "Puddle-proof sneakers", account: "@lakad.ph", views: "61,700", usual: "1.8x" },
        { title: "Wet pavement grip test", account: "@lakad.runners", views: "34,800", usual: "1.4x" },
        { title: "Rainy commute fit check", account: "@lakad.ph", views: "22,300", usual: "1.1x" },
    ],
    sinag: [
        { title: "Jeepney commute coffee", account: "@sinag.coffee", views: "38,900", usual: "1.3x" },
        { title: "Latte art teaser", account: "@sinag.coffee", views: "21,600", usual: "1.1x" },
        { title: "Rainy café crawl teaser", account: "@sinag.cafe", views: "17,400", usual: "1.0x" },
    ],
};

// posts per platform per client, adding up to each client's post count
export const CLIENT_PLATFORMS: Record<string, PlatformSplit[]> = {
    kalma: [
        { label: "TikTok", posts: 28 },
        { label: "Reels", posts: 12 },
        { label: "Shorts", posts: 6 },
    ],
    lakad: [
        { label: "TikTok", posts: 22 },
        { label: "Reels", posts: 11 },
        { label: "Shorts", posts: 5 },
    ],
    sinag: [
        { label: "TikTok", posts: 15 },
        { label: "Reels", posts: 9 },
        { label: "Shorts", posts: 4 },
    ],
};

// phones working each hour overnight, out of 40
export const PHONE_HOURS: Series = {
    labels: ["10 PM", "11 PM", "12 AM", "1 AM", "2 AM", "3 AM", "4 AM", "5 AM", "6 AM", "7 AM"],
    values: [31, 35, 38, 39, 39, 33, 32, 32, 33, 34],
};

export const CAPACITY_INCIDENTS: Incident[] = [
    { time: "2:14 AM", title: "Pod 07 lost its TikTok login", note: "Phones 31 to 34 stopped posting. 3 runs failed and wait for a reconnect.", tone: "danger" },
    { time: "2:20 AM", title: "Pods 08 and 10 went idle", note: "Both wait on posts from Pod 07. They start again once it is back.", tone: "neutral" },
    { time: "3:40 AM", title: "2 phones went to charge", note: "Pod 02 phone 6 and Pod 09 phone 26. Both back by 7 AM.", tone: "warning" },
];

// Meta Ads spend and sales from ads per day, last 7 days (mock)
export const AD_DAYS = {
    labels: ["Nov 5", "Nov 6", "Nov 7", "Nov 8", "Nov 9", "Nov 10", "Yesterday"],
    spend: [18200, 19400, 20100, 19800, 21000, 21600, 22400],
    sales: [49100, 53800, 58200, 61400, 66900, 70300, 76160],
};

// orders yesterday in 2-hour blocks, adding up to 412
export const SALES_HOURS: Series = {
    labels: ["12 AM", "2 AM", "4 AM", "6 AM", "8 AM", "10 AM", "12 PM", "2 PM", "4 PM", "6 PM", "8 PM", "10 PM"],
    values: [6, 4, 3, 9, 22, 31, 38, 41, 46, 68, 82, 62],
};

// status changes on studio requests, newest first
export const REQUEST_HISTORY: HistoryRow[] = [
    { time: "Today, 5:40 AM", text: "Rainy-day routine remakes: 3 scripts ready, waiting for you", tone: "warning" },
    { time: "Nov 11, 6:15 PM", text: "Serum launch, week 2 moved to production", tone: "info" },
    { time: "Nov 10, 4:10 PM", text: "Glass skin under ₱500 test delivered, 4 videos posted", tone: "success" },
    { time: "Nov 10, 11:30 AM", text: "Sunscreen myths series briefed, studio picking trends", tone: "neutral" },
    { time: "Nov 8, 7:05 PM", text: "Night routine, jeepney edition delivered, 6 videos posted", tone: "success" },
];

export const TREND_DAYS = ["Nov 5", "Nov 6", "Nov 7", "Nov 8", "Nov 9", "Nov 10", "Today"];

// a 7-day index for a trend, starting at 100 and ending at 100 plus its growth
export function trendSeries(growth: number): number[] {
    return TREND_DAYS.map((_, i) => Math.round(100 + growth * Math.pow(i / (TREND_DAYS.length - 1), 1.6)));
}

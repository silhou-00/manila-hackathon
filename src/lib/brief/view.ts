// Loose view types for the app shell and a typed accessor for one role's data. The shell only reads
// navigation, tabs, layout, notifications, drafts and actions, so the types cover just those.
import { DATA, type RoleId } from "@/lib/brief/data";

export type NavItem = { id: string; label: string; icon: string; modules: string[]; count?: string; tone?: string };
export type NavGroup = { group: string; items: NavItem[] };
export type NavEntry = NavItem | NavGroup;
export type TabItem = { id: string; label: string; icon: string; badge?: string };
export type SlotItem = { m: string; tab: string };
export type Slot = { m?: string; tab?: string; stack?: SlotItem[] };
export type LayoutSection = { cols: string; slots: Slot[] };
export type Notice = { id: string; tone: string; icon: string; title: string; sub: string; unread: boolean };
export type DraftCfg = {
    kicker: string;
    title: string;
    to: string;
    label?: string;
    draft: string;
    confirm: string;
    pending: string;
    done: string;
    desc: string;
    task: string;
};
export type ActionCfg = {
    undo?: boolean;
    pending?: string;
    done: string;
    desc: string;
    undone?: string;
    undoneDesc?: string;
    task: string;
};
export type NeedCfg = { id: string; primary: { label: string; draft: string } };

export type RoleView = {
    id: RoleId;
    label: string;
    person: { name: string; title: string; initials: string };
    nav: NavEntry[];
    tabs: TabItem[];
    layout: LayoutSection[];
    note: { prepared: string; from: string };
    notifications: Notice[];
    drafts: Record<string, DraftCfg>;
    actions: Record<string, ActionCfg>;
    needs: NeedCfg[];
};

export function roleView(role: RoleId): RoleView {
    return DATA.roles[role] as unknown as RoleView;
}

// every page in nav order, with groups opened up
export function navPages(view: RoleView): NavItem[] {
    return view.nav.flatMap((e) => ("group" in e ? e.items : [e]));
}

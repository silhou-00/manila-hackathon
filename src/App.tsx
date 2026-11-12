// App shell. Owns the role, the phone tab, notification read state, the draft dialog and the toasts,
// and composes the sidebar, floating panel, app bar, dock and tab bar around the dashboard cards.
// On desktop it also owns the current sidebar page, mirrored in the URL hash as #/<id> so pages link.
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { AppBar } from "@/components/layout/AppBar";
import { Panel } from "@/components/layout/Panel";
import { Sidebar } from "@/components/layout/Sidebar";
import { Dock, TabBar } from "@/components/layout/TabBar";
import { DraftDialog } from "@/components/overlays/DraftDialog";
import { NotificationsBell } from "@/components/overlays/NotificationsBell";
import { Toaster } from "@/components/ui/sonner";
import { useLive } from "@/hooks/brief/use-live";
import { useMedia } from "@/hooks/brief/use-media";
import { DATA, type RoleId } from "@/lib/brief/data";
import { navPages, roleView, type DraftCfg } from "@/lib/brief/view";

const TOAST_STYLE = {
    "--normal-bg": "var(--surface)",
    "--normal-text": "var(--ink)",
    "--normal-border": "var(--line)",
    "--border-radius": "var(--radius-sm)",
} as React.CSSProperties;

// page id from a #/<id> hash, or null when the hash is not a page link
function readHash(): string | null {
    const match = window.location.hash.match(/^#\/(.+)$/);

    return match ? match[1] : null;
}

type AppProps = {
    onSignOut: () => void;
};

function App({ onSignOut }: AppProps) {
    const [role, setRole] = useState<RoleId>("studio");
    const [tab, setTab] = useState("today");
    const [pageId, setPageId] = useState(() => readHash() ?? "overview");
    const [fade, setFade] = useState<"out" | "in" | null>(null);
    const [scrolled, setScrolled] = useState(false);
    const [draftId, setDraftId] = useState<string | null>(null);
    const [readKeys, setReadKeys] = useState<string[]>([]);
    const [doneTasks, setDoneTasks] = useState<string[]>([]);
    const scrollRef = useRef<HTMLDivElement>(null);
    const timers = useRef<number[]>([]);
    const phone = useMedia("(max-width: 1279px)");

    const view = roleView(role);
    const live = useLive(role);
    const draft = draftId ? (view.drafts[draftId] ?? null) : null;
    const activeTab = view.tabs.find((t) => t.id === tab) ?? view.tabs[0];
    const pages = navPages(view);
    const page = pages.find((p) => p.id === pageId) ?? pages[0];
    const first = view.needs[0];
    const dockLabel = phone && tab === "today" && first && !doneTasks.includes(first.id) ? first.primary.label : null;

    // pending timers cleanup
    useEffect(() => {
        const list = timers.current;

        return () => {
            list.forEach((t) => {
                window.clearTimeout(t);
            });
        };
    }, []);

    // follow the hash when it changes from outside
    useEffect(() => {
        function onHash() {
            const next = readHash();

            if (next) {
                setPageId(next);
            }
        }

        window.addEventListener("hashchange", onHash);

        return () => {
            window.removeEventListener("hashchange", onHash);
        };
    }, []);

    // new page starts at the top
    useEffect(() => {
        scrollRef.current?.scrollTo({ top: 0 });
    }, [pageId]);

    // body flags for the phone layout
    useEffect(() => {
        document.body.dataset.tab = tab;
        document.body.classList.toggle("has-dock", dockLabel !== null);
    }, [tab, dockLabel]);

    function later(fn: () => void, ms: number) {
        timers.current.push(window.setTimeout(fn, ms));
    }

    function goPage(id: string) {
        if (id === page.id) {
            scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });

            return;
        }

        setPageId(id);
        window.history.pushState(null, "", "#/" + id);
    }

    function markTask(id: string, done: boolean) {
        setDoneTasks((prev) => (done ? [...prev.filter((x) => x !== id), id] : prev.filter((x) => x !== id)));

        if (done) {
            document.dispatchEvent(new CustomEvent("md-task-complete", { detail: { id } }));
        }
    }

    // role switch: fade the panel out, swap, fade in
    function switchRole(next: RoleId) {
        if (next === role) {
            return;
        }

        setFade("out");
        later(() => {
            const nextView = roleView(next);

            setRole(next);
            setTab("today");

            if (!navPages(nextView).some((p) => p.id === pageId)) {
                setPageId("overview");
                window.history.replaceState(null, "", "#/overview");
            }

            setFade("in");
            scrollRef.current?.scrollTo({ top: 0 });
            toast.info("Viewing as " + nextView.person.name, {
                description: nextView.person.title + ". Same data, " + nextView.label + " angle.",
            });
            later(() => {
                setFade(null);
            }, 260);
        }, 120);
    }

    function handleSettings() {
        toast.info("Settings are not in this preview", { description: "Profile and workspace settings come in a later build." });
    }

    function handleSearch() {
        toast.info("Search is not in this preview", { description: "Use the sidebar or tabs to move around." });
    }

    function handleTab(next: string) {
        if (next === tab) {
            scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });

            return;
        }

        setTab(next);
        scrollRef.current?.scrollTo({ top: 0 });
    }

    // draft send: loading toast, then success
    function handleSent(cfg: DraftCfg) {
        const id = toast.loading(cfg.pending);

        setDraftId(null);
        later(() => {
            toast.success(cfg.done, { id, description: cfg.desc });
            markTask(cfg.task, true);
        }, 900);
    }

    // direct actions from the cards
    function handleAction(key: string) {
        const a = view.actions[key];

        if (!a) {
            return;
        }

        if (a.undo) {
            markTask(a.task, true);
            toast.success(a.done, {
                description: a.desc,
                action: {
                    label: "Undo",
                    onClick: () => {
                        markTask(a.task, false);
                        toast.info(a.undone ?? "Undone", { description: a.undoneDesc });
                    },
                },
            });

            return;
        }

        const id = toast.loading(a.pending ?? "Working");

        later(() => {
            toast.success(a.done, { id, description: a.desc });
            markTask(a.task, true);
        }, 1300);
    }

    function handleRead(keys: string[]) {
        setReadKeys((prev) => [...prev, ...keys.filter((k) => !prev.includes(k))]);
    }

    function bell(variant: "panel" | "bar") {
        return (
            <NotificationsBell
                variant={variant}
                notices={view.notifications}
                readKeys={readKeys}
                keyPrefix={role}
                onRead={handleRead}
            />
        );
    }

    return (
        <>
            {/* shell: sidebar and floating panel */}
            <div className="shell">
                <Sidebar
                    role={role}
                    view={view}
                    page={page.id}
                    onPage={goPage}
                    onRoleSwitch={switchRole}
                    onSearch={handleSearch}
                    onSettings={handleSettings}
                    onSignOut={onSignOut}
                />
                <Panel
                    role={role}
                    view={view}
                    tab={tab}
                    page={page}
                    desktop={!phone}
                    live={live}
                    fade={fade}
                    scrollRef={scrollRef}
                    bell={bell("panel")}
                    onScrolled={setScrolled}
                    onSearch={handleSearch}
                    onDraft={setDraftId}
                    onAction={handleAction}
                    onRoleSwitch={switchRole}
                />
            </div>

            {/* phone and tablet chrome */}
            <AppBar
                title={activeTab.label}
                sub={view.person.name + " · " + DATA.dateShort}
                initials={view.person.initials}
                scrolled={scrolled}
                bell={bell("bar")}
                onSearch={handleSearch}
                onFlipRole={() => {
                    switchRole(role === "studio" ? "brand" : "studio");
                }}
            />
            <Dock
                label={dockLabel}
                onPress={() => {
                    if (first) {
                        setDraftId(first.primary.draft);
                    }
                }}
            />
            <TabBar tabs={view.tabs} tab={tab} onTab={handleTab} />

            {/* overlays */}
            <DraftDialog cfg={draft} onClose={() => setDraftId(null)} onSent={handleSent} />
            <Toaster style={TOAST_STYLE} />
        </>
    );
}

export default App;

// The floating panel. Renders the date header, then the modules wrapped section > sub > place > box,
// On phone and tablet it renders the role's whole layout and the current
// tab marks which boxes are visible through the is-tab class. On desktop it renders only the modules
// of the current sidebar page. Overview and Brief stack their rows and scroll; other pages fit without scrolling.
// On desktop a folding demo role switch floats in the top right corner of the panel.
import type { ReactNode, RefObject } from "react";
import { toast } from "sonner";
import { Icon } from "@/components/Icon";
import { ModuleCard } from "@/components/brief/ModuleCard";
import { ClientCard } from "@/components/brief/ClientCard";
import { RoleSwitch } from "@/components/layout/RoleSwitch";
import { DATA, type RoleId } from "@/lib/brief/data";
import { getRole } from "@/lib/brief/model";
import type { NavItem, RoleView } from "@/lib/brief/view";

type PanelProps = {
    role: RoleId;
    view: RoleView;
    tab: string;
    page: NavItem;
    desktop: boolean;
    live: Record<string, number>;
    fade: "out" | "in" | null;
    scrollRef: RefObject<HTMLDivElement | null>;
    bell: ReactNode;
    onScrolled: (scrolled: boolean) => void;
    onSearch: () => void;
    onDraft: (draftId: string) => void;
    onAction: (action: string) => void;
    onRoleSwitch: (role: RoleId) => void;
};

function tabClass(base: string, tabs: string, tab: string): string {
    return tabs.split(" ").includes(tab) ? base + " is-tab" : base;
}

export function Panel({ role, view, tab, page, desktop, live, fade, scrollRef, bell, onScrolled, onSearch, onDraft, onAction, onRoleSwitch }: PanelProps) {
    const innerClass = fade === "out" ? "panel-inner is-out" : fade === "in" ? "panel-inner is-in" : "panel-inner";
    const modules = page.modules;
    const stacked = page.id === "overview" || page.id === "brief";

    // one module card
    function card(m: string, open = false) {
        return (
            <ModuleCard
                role={role}
                m={m}
                live={live}
                open={open}
                onDraft={onDraft}
                onAction={onAction}
                onRoleSwitch={onRoleSwitch}
                onReplayed={() => toast.success("Brief made again", { description: "Same steps, same answer." })}
            />
        );
    }

    // overview rows: highlight pairs with needs, every other module runs full width
    function overviewRows(): string[][] {
        const rows: string[][] = [];

        modules.forEach((m) => {
            if (m === "needs" && rows.length > 0 && rows[rows.length - 1][0] === "highlight") {
                rows[rows.length - 1].push(m);
            } else {
                rows.push([m]);
            }
        });

        return rows;
    }

    // desktop page: overview stacks rows, clients adds client cards, others share one row
    function pageSections() {
        if (stacked) {
            return overviewRows().map((row) => (
                <section className="section" key={row.join("-")}>
                    <div className={"sub cols " + (row.length > 1 ? "cols-main-side" : "cols-1")}>
                        {row.map((m) => (
                            <div className="place" key={m}>
                                <div className="box">{card(m, true)}</div>
                            </div>
                        ))}
                    </div>
                </section>
            ));
        }

        const cards = page.id === "clients" ? (getRole(role).clientCards ?? []) : [];

        return (
            <>
                <section className="section">
                    <div className={"sub cols page-cols-" + modules.length}>
                        {modules.map((m) => (
                            <div className="place" key={m}>
                                <div className="box">{card(m, true)}</div>
                            </div>
                        ))}
                    </div>
                </section>
                {cards.length > 0 ? (
                    <section className="section">
                        <div className="sub cols cols-3">
                            {cards.map((c) => (
                                <div className="place" key={c.id}>
                                    <div className="box">
                                        <ClientCard data={c} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                ) : null}
            </>
        );
    }

    return (
        <main className="panel" id="panel">
            <div
                className={desktop ? (stacked ? "scroll is-overview" : "scroll is-pages") : "scroll"}
                ref={scrollRef}
                onScroll={(e) => {
                    onScrolled(e.currentTarget.scrollTop > 4);
                }}
            >
                <div className={innerClass}>
                    {/* date header section */}
                    <section className={tabClass("section", "today", tab)} id="top" data-tab="today">
                        <div className="sub head-row">
                            <div className="place">
                                <div className="box note">
                                    {desktop ? <span className="page-kicker">{page.label}</span> : null}
                                    <span className="note-date">{DATA.date}</span>
                                    <b>{view.note.prepared}</b> {view.note.from}.
                                </div>
                            </div>
                            <div className="place head-actions">
                                <div className="box">
                                    <button type="button" className="icon-btn icon-btn--bordered" aria-label="Search, Ctrl K" onClick={onSearch}>
                                        <Icon name="search" size={18} />
                                    </button>
                                </div>
                                <div className="box">{bell}</div>
                            </div>
                        </div>
                    </section>

                    {/* desktop page modules */}
                    {desktop ? (
                        <div className={"page page--" + page.id} key={role + "-" + page.id}>
                            {pageSections()}
                        </div>
                    ) : null}

                    {/* phone and tablet module sections */}
                    {desktop
                        ? null
                        : view.layout.map((sec, i) => (
                              <section className="section" key={i}>
                                  <div className={"sub cols cols-" + sec.cols}>
                                      {sec.slots.map((s, j) => {
                                          const stack = s.stack ?? [{ m: s.m ?? "", tab: s.tab ?? "" }];
                                          const tabs = stack.map((x) => x.tab).join(" ");

                                          return (
                                              <div className={tabClass("place place-stack", tabs, tab)} data-tab={tabs} key={j}>
                                                  {stack.map((x) => (
                                                      <div className={tabClass("box", x.tab, tab)} data-tab={x.tab} data-slot={x.m} key={x.m}>
                                                          {card(x.m)}
                                                      </div>
                                                  ))}
                                              </div>
                                          );
                                      })}
                                  </div>
                              </section>
                          ))}

                </div>
            </div>

            {/* demo role switch, desktop only */}
            {desktop ? <RoleSwitch role={role} onRoleSwitch={onRoleSwitch} /> : null}
        </main>
    );
}

// Desktop sidebar. Holds search, the page nav, the profile menu, and the collapse to a rail. The nav
// opens with the "Today" group as a folding section, then flat page links; in the rail every page
// shows flat as an icon. The profile opens a menu with settings and log out.
import { useEffect, useState } from "react";
import { Accordion, DropdownMenu } from "radix-ui";
import { Icon } from "@/components/Icon";
import type { RoleId } from "@/lib/brief/data";
import { navPages, type NavItem, type RoleView } from "@/lib/brief/view";

type SidebarProps = {
    role: RoleId;
    view: RoleView;
    page: string;
    onPage: (id: string) => void;
    onRoleSwitch: (role: RoleId) => void;
    onSearch: () => void;
    onSettings: () => void;
    onSignOut: () => void;
};

export function Sidebar({ role, view, page, onPage, onRoleSwitch, onSearch, onSettings, onSignOut }: SidebarProps) {
    const [rail, setRail] = useState(false);
    const groups = view.nav.flatMap((e) => ("group" in e ? [e.group] : []));

    // rail state on body
    useEffect(() => {
        document.body.classList.toggle("is-rail", rail);

        return () => {
            document.body.classList.remove("is-rail");
        };
    }, [rail]);

    function item(it: NavItem) {
        return (
            <button
                type="button"
                key={it.id}
                className="nav-item"
                data-tip={it.label}
                aria-current={it.id === page ? "page" : undefined}
                onClick={() => {
                    onPage(it.id);
                }}
            >
                <Icon name={it.icon} size={17} />
                <span className="nav-text">{it.label}</span>
                {it.count ? (
                    <span className="nav-count" data-tone={it.tone}>
                        {it.count}
                    </span>
                ) : null}
            </button>
        );
    }

    // grouped nav: folding groups, then flat links
    function groupedNav() {
        return (
            <Accordion.Root type="multiple" defaultValue={groups} className="nav-groups">
                {view.nav.map((e) => {
                    if (!("group" in e)) {
                        return item(e);
                    }

                    return (
                        <Accordion.Item value={e.group} key={e.group} className="nav-group">
                            <Accordion.Header asChild>
                                <div>
                                    <Accordion.Trigger className="nav-group-trigger">
                                        <span>{e.group}</span>
                                        <Icon name="down" size={14} />
                                    </Accordion.Trigger>
                                </div>
                            </Accordion.Header>
                            <Accordion.Content className="nav-group-items">{e.items.map((it) => item(it))}</Accordion.Content>
                        </Accordion.Item>
                    );
                })}
            </Accordion.Root>
        );
    }

    return (
        <aside className="sidebar" aria-label="Main">
            <div className="side-top">
                <button
                    type="button"
                    className="icon-btn icon-btn--sm"
                    aria-label={rail ? "Expand sidebar" : "Collapse sidebar"}
                    aria-expanded={!rail}
                    onClick={() => {
                        setRail((r) => !r);
                    }}
                >
                    <Icon name="panel" size={18} />
                </button>
                <span className="wordmark">
                    <i></i>ParallelOS
                </span>
            </div>
            <button
                type="button"
                className="icon-btn icon-btn--sm role-avatar"
                aria-label="Switch role"
                onClick={() => {
                    onRoleSwitch(role === "studio" ? "brand" : "studio");
                }}
            >
                <span className="avatar">{view.person.initials}</span>
            </button>
            <button type="button" className="search-btn" onClick={onSearch}>
                <Icon name="search" size={18} />
                <span className="search-text">Search</span>
                <span className="kbd search-text" style={{ marginLeft: "auto" }}>
                    Ctrl K
                </span>
            </button>
            <nav className="nav nav--flat" aria-label="Pages">
                {rail ? navPages(view).map((it) => item(it)) : groupedNav()}
            </nav>
            <div className="side-bottom">
                <DropdownMenu.Root>
                    <DropdownMenu.Trigger asChild>
                        <button type="button" className="profile" aria-label={"Account, " + view.person.name}>
                            <span className="avatar">{view.person.initials}</span>
                            <span className="profile-text">
                                <b>{view.person.name}</b>
                                <span>{view.person.title}</span>
                            </span>
                        </button>
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Portal>
                        <DropdownMenu.Content className="menu profile-menu" side="top" align="start" sideOffset={8} collisionPadding={12}>
                            <DropdownMenu.Item className="menu-item" onSelect={onSettings}>
                                <Icon name="settings" size={16} />
                                Settings
                            </DropdownMenu.Item>
                            <DropdownMenu.Item className="menu-item" data-danger="" onSelect={onSignOut}>
                                <Icon name="logout" size={16} />
                                Log out
                            </DropdownMenu.Item>
                        </DropdownMenu.Content>
                    </DropdownMenu.Portal>
                </DropdownMenu.Root>
            </div>
        </aside>
    );
}

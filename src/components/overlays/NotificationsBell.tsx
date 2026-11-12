// Bell button with its unread badge and the notifications popover, built on the Radix popover.
// Read state lives in the app, so the badge in the panel and in the app bar stay in step.
import { useState } from "react";
import { Popover } from "radix-ui";
import { Icon } from "@/components/Icon";
import { Seg } from "@/components/layout/Seg";
import { DATA } from "@/lib/brief/data";
import type { Notice } from "@/lib/brief/view";

type NotificationsBellProps = {
    variant: "panel" | "bar";
    notices: Notice[];
    readKeys: string[];
    keyPrefix: string;
    onRead: (keys: string[]) => void;
};

const FILTERS = [
    { id: "all", label: "All" },
    { id: "unread", label: "Unread" },
];

export function NotificationsBell({ variant, notices, readKeys, keyPrefix, onRead }: NotificationsBellProps) {
    const [open, setOpen] = useState(false);
    const [filter, setFilter] = useState("all");
    const copy = DATA.copy.empty.notifications;

    const isUnread = (n: Notice) => n.unread && !readKeys.includes(keyPrefix + n.id);
    const unread = notices.filter(isUnread).length;
    const items = notices.filter((n) => filter !== "unread" || isUnread(n));
    const btnClass = variant === "panel" ? "icon-btn icon-btn--bordered bell" : "icon-btn bell";

    return (
        <Popover.Root open={open} onOpenChange={setOpen}>
            <Popover.Trigger asChild>
                <button type="button" className={btnClass} aria-label="Notifications" aria-expanded={open}>
                    <Icon name="bell" size={18} />
                    {unread > 0 ? <span className="bell-badge">{unread}</span> : null}
                </button>
            </Popover.Trigger>
            <Popover.Portal>
                <Popover.Content
                    className="popover"
                    style={{ position: "relative" }}
                    align="end"
                    sideOffset={8}
                    collisionPadding={12}
                    aria-label="Notifications"
                >
                    <div className="notif-head">
                        <h2>Notifications</h2>
                        <button
                            type="button"
                            className="btn btn-ghost btn-sm"
                            onClick={() => {
                                onRead(notices.map((n) => keyPrefix + n.id));
                            }}
                        >
                            Mark all read
                        </button>
                    </div>
                    <div className="notif-tools">
                        <Seg label="Filter" options={FILTERS} value={filter} onChange={setFilter} />
                    </div>
                    <div className="notif">
                        {items.length ? (
                            <div className="notif-list">
                                {items.map((n) => {
                                    const isNew = isUnread(n);

                                    return (
                                        <div className="notif-item" data-unread={isNew} key={n.id}>
                                            {isNew ? <span className="notif-unread-dot"></span> : null}
                                            <span
                                                className="notif-icon"
                                                style={{ "--tone": "var(--" + (n.tone === "neutral" ? "ink-2" : n.tone) + ")" } as React.CSSProperties}
                                            >
                                                <Icon name={n.icon} size={16} />
                                            </span>
                                            <div>
                                                <p className="notif-title">{n.title}</p>
                                                <p className="notif-sub">{n.sub}</p>
                                            </div>
                                            <div className="notif-acts">
                                                {isNew ? (
                                                    <button
                                                        type="button"
                                                        className="icon-btn icon-btn--sm"
                                                        aria-label="Mark read"
                                                        onClick={() => {
                                                            onRead([keyPrefix + n.id]);
                                                        }}
                                                    >
                                                        <Icon name="check" size={16} />
                                                    </button>
                                                ) : null}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="notif-body">
                                <div className="state" data-kind="empty">
                                    <span className="state-icon">
                                        <Icon name="inbox" size={20} />
                                    </span>
                                    <p className="state-title">{copy[0]}</p>
                                    <p className="state-body">{copy[1]}</p>
                                </div>
                            </div>
                        )}
                    </div>
                </Popover.Content>
            </Popover.Portal>
        </Popover.Root>
    );
}

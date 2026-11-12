// Phone and tablet top bar: the current tab title with the person and date, then search, the bell
// and an avatar that flips the role.
import type { ReactNode } from "react";
import { Icon } from "@/components/Icon";

type AppBarProps = {
    title: string;
    sub: string;
    initials: string;
    scrolled: boolean;
    bell: ReactNode;
    onSearch: () => void;
    onFlipRole: () => void;
};

export function AppBar({ title, sub, initials, scrolled, bell, onSearch, onFlipRole }: AppBarProps) {
    return (
        <header className={scrolled ? "appbar is-scrolled" : "appbar"}>
            <div className="appbar-title">
                <b>{title}</b>
                <span>{sub}</span>
            </div>
            <button type="button" className="icon-btn" aria-label="Search" onClick={onSearch}>
                <Icon name="search" size={20} />
            </button>
            {bell}
            <button type="button" className="avatar-btn" aria-label="Switch role" onClick={onFlipRole}>
                <span className="avatar">{initials}</span>
            </button>
        </header>
    );
}

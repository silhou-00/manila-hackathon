// Phone bottom tab bar and the dock above it. The tab bar switches the visible stack of modules;
// the dock holds the screen's primary action within thumb reach.
import { Icon } from "@/components/Icon";
import type { TabItem } from "@/lib/brief/view";

type TabBarProps = {
    tabs: TabItem[];
    tab: string;
    onTab: (id: string) => void;
};

type DockProps = {
    label: string | null;
    onPress: () => void;
};

export function TabBar({ tabs, tab, onTab }: TabBarProps) {
    return (
        <nav className="tabbar" aria-label="Tabs">
            {tabs.map((t) => (
                <button
                    key={t.id}
                    type="button"
                    className="tab"
                    aria-current={t.id === tab ? "page" : undefined}
                    onClick={() => {
                        onTab(t.id);
                    }}
                >
                    <span className="tab-pill">
                        <Icon name={t.icon} size={18} />
                        {t.badge ? <span className="tab-badge">{t.badge}</span> : null}
                    </span>
                    {t.label}
                </button>
            ))}
        </nav>
    );
}

export function Dock({ label, onPress }: DockProps) {
    return (
        <div className={label ? "dock is-on" : "dock"}>
            {label ? (
                <button type="button" className="btn btn-primary btn-lg" onClick={onPress}>
                    {label}
                </button>
            ) : null}
        </div>
    );
}

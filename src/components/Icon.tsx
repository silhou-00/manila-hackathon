// Icon by name. Maps the icon names used in the brief data and modules to lucide-react
// components, drawn at the same stroke weight as the original kit. Unknown names show info.

import {
    AlertCircle, ArrowRight, ArrowUp, Bell, Bot, Calendar, ChartColumn, Check, CheckCircle, ChevronDown, ChevronLeft,
    ChevronRight, Clock, File, Film, Inbox, Info, Layers, List, Lock, LogOut, Megaphone, Moon, PanelLeft, Receipt, Repeat, RefreshCw,
    Search, Send, Server, Settings, ShoppingBag, SquareCheck, SquareKanban, Sparkles, Store, Sun, TrendingUp, TriangleAlert,
    Undo2, User, Users, X, type LucideIcon,
} from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
    sun: Sun,
    moon: Moon,
    kanban: SquareKanban,
    trending: TrendingUp,
    bot: Bot,
    server: Server,
    store: Store,
    users: Users,
    sparkles: Sparkles,
    film: Film,
    bag: ShoppingBag,
    megaphone: Megaphone,
    inbox: Inbox,
    send: Send,
    "check-square": SquareCheck,
    alert: AlertCircle,
    warn: TriangleAlert,
    info: Info,
    ok: CheckCircle,
    search: Search,
    chart: ChartColumn,
    repeat: Repeat,
    receipt: Receipt,
    bell: Bell,
    panel: PanelLeft,
    check: Check,
    x: X,
    right: ChevronRight,
    left: ChevronLeft,
    down: ChevronDown,
    up: ArrowUp,
    refresh: RefreshCw,
    clock: Clock,
    calendar: Calendar,
    file: File,
    list: List,
    layers: Layers,
    undo: Undo2,
    arrow: ArrowRight,
    user: User,
    lock: Lock,
    settings: Settings,
    logout: LogOut,
};

type IconProps = { name: string; size?: number };

export function Icon({ name, size = 18 }: IconProps) {
    const Glyph = ICONS[name] ?? Info;

    return <Glyph width={size} height={size} strokeWidth={1.9} aria-hidden="true" />;
}

// One task in "Needs you today": check box, kicker and due, title, detail, optional quote and
// the action buttons. Draft buttons open the draft dialog, action buttons run a shell action.

import type { Task } from "@/lib/brief/model";
import { CheckBox } from "./CheckBox";

type TaskItemProps = {
    task: Task;
    checked: boolean;
    folded: boolean;
    onCheck: () => void;
    onDraft: (draftId: string) => void;
    onAction: (action: string) => void;
};

export function TaskItem({ task: t, checked, folded, onCheck, onDraft, onAction }: TaskItemProps) {
    const primary = t.primary;
    const state = (checked ? " is-done" : "") + (folded ? " is-folding" : "");

    return (
        <li className={"task" + state} data-task={t.id}>
            <div className="task-in">
                <CheckBox label={`Mark done: ${t.title}`} checked={checked} onClick={onCheck} />
                <div className="task-body">
                    <div className="task-meta">
                        <span className="kicker">{t.kicker}</span>
                        <span className="task-due">{t.due}</span>
                    </div>
                    <h3 className="task-title">{t.title}</h3>
                    <p className="task-sub">{t.sub}</p>
                    {t.quote && (
                        <blockquote className="task-quote">
                            {t.quote}
                            <cite>{t.cite}</cite>
                        </blockquote>
                    )}
                    <div className="task-actions">
                        {primary && (
                            <button type="button" className="btn btn-primary" data-draft={primary.draft} onClick={() => onDraft(primary.draft)}>
                                {primary.label}
                            </button>
                        )}
                        {t.secondary && (
                            <button
                                type="button"
                                className="btn btn-secondary btn-sm"
                                onClick={() => {
                                    if (t.secondary?.draft) {
                                        onDraft(t.secondary.draft);
                                    } else if (t.secondary?.action) {
                                        onAction(t.secondary.action);
                                    }
                                }}
                            >
                                {t.secondary.label}
                            </button>
                        )}
                        {t.aside && <span className="muted" style={{ fontSize: "var(--text-sm)" }}>{t.aside}</span>}
                    </div>
                </div>
            </div>
        </li>
    );
}

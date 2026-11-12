// "Needs you today": the task list with a progress ring, a count, and a collapsible group of
// finished tasks. Checking a task strikes it, folds it away and moves it to the done group.

import { useState } from "react";
import { Icon } from "@/components/Icon";
import { useTasks } from "@/hooks/brief/useTasks";
import type { Task } from "@/lib/brief/model";
import { CheckBox } from "./CheckBox";
import { TaskItem } from "./TaskItem";

type NeedsModuleProps = { data: Task[]; onDraft: (draftId: string) => void; onAction: (action: string) => void };

export function NeedsModule({ data, onDraft, onAction }: NeedsModuleProps) {
    const { checked, done, status, total, toggle } = useTasks(data);
    const [open, setOpen] = useState(false);

    return (
        <>
            <div className="tasks-head">
                <div className={done.length === total ? "task-ring is-full" : "task-ring"} data-ring>
                    <svg viewBox="0 0 40 40" aria-hidden="true">
                        <circle className="ring-track" cx="20" cy="20" r="17" />
                        <circle className="ring-fill" cx="20" cy="20" r="17" strokeDasharray="106.8" style={{ strokeDashoffset: 106.8 * (1 - done.length / total) }} />
                    </svg>
                    <span className="ring-tick">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12.5l4.5 4.5L19 7" />
                        </svg>
                    </span>
                </div>
                <div>
                    <h2 className="mod-title">Needs you today</h2>
                    <p className="mod-meta">
                        <span data-done-count>{done.length}</span> of {total} done
                    </p>
                </div>
            </div>
            <ul className="task-list" data-tasks>
                {data.map((t) => (
                    <TaskItem
                        key={t.id}
                        task={t}
                        checked={checked.includes(t.id)}
                        folded={done.includes(t.id)}
                        onCheck={() => toggle(t.id, !checked.includes(t.id), true)}
                        onDraft={onDraft}
                        onAction={onAction}
                    />
                ))}
            </ul>
            <div className="done-group" hidden={done.length === 0}>
                <button type="button" className="done-toggle" aria-expanded={open} onClick={() => setOpen(!open)}>
                    <span data-done-label>{done.length} completed</span>
                    <Icon name="down" size={16} />
                </button>
                <ul className="done-list" hidden={!open}>
                    {done.map((id) => {
                        const title = data.find((t) => t.id === id)?.title ?? "";

                        return (
                            <li key={id} className="done-row" data-task={id}>
                                <CheckBox label={`Mark not done: ${title}`} checked onClick={() => toggle(id, false, true)} />
                                <span>{title}</span>
                            </li>
                        );
                    })}
                </ul>
            </div>
            <p className="sr" role="status" aria-live="polite" data-task-status>
                {status}
            </p>
        </>
    );
}

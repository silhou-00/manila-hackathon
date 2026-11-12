// Round tick box used by open tasks and by rows in the done group.

type CheckBoxProps = { label: string; checked: boolean; onClick: () => void };

export function CheckBox({ label, checked, onClick }: CheckBoxProps) {
    return (
        <button type="button" className="task-check" role="checkbox" aria-checked={checked} aria-label={label} onClick={onClick}>
            <span className="task-box">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12.5l4.5 4.5L19 7" />
                </svg>
            </span>
        </button>
    );
}

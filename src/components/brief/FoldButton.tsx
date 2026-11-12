// Chevron button that opens or closes a collapsible module body. Its label flips between Show and Hide.

import { Icon } from "@/components/Icon";

type FoldButtonProps = { open: boolean; noun: string; onToggle: () => void };

export function FoldButton({ open, noun, onToggle }: FoldButtonProps) {
    return (
        <button type="button" className="fold-btn" data-fold aria-expanded={open} aria-label={`${open ? "Hide" : "Show"} ${noun}`} onClick={onToggle}>
            <Icon name="down" size={16} />
        </button>
    );
}

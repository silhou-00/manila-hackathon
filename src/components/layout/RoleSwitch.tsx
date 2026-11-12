// Demo role switch for desktop. Floats in the top right corner of the main panel and folds down to a
// small "Demo" pill, since it exists only to show both sides of the same data. Opening it shows the
// Studio and Brand choice. Phone and tablet use the avatar tap instead.
import { useState } from "react";
import { Collapsible } from "radix-ui";
import { Icon } from "@/components/Icon";
import { Seg } from "@/components/layout/Seg";
import type { RoleId } from "@/lib/brief/data";

type RoleSwitchProps = {
    role: RoleId;
    onRoleSwitch: (role: RoleId) => void;
};

const ROLE_OPTIONS = [
    { id: "studio", label: "Studio" },
    { id: "brand", label: "Brand" },
];

export function RoleSwitch({ role, onRoleSwitch }: RoleSwitchProps) {
    const [open, setOpen] = useState(false);

    return (
        <Collapsible.Root className="role-float" open={open} onOpenChange={setOpen}>
            <Collapsible.Trigger className="role-float-toggle" aria-label={open ? "Hide demo role switch" : "Show demo role switch"}>
                <span className="role-float-tag">Demo</span>
                {open ? null : <span className="role-float-current">{role === "brand" ? "Brand" : "Studio"}</span>}
                <Icon name={open ? "x" : "down"} size={14} />
            </Collapsible.Trigger>
            <Collapsible.Content className="role-float-body">
                <Seg
                    label="View as"
                    options={ROLE_OPTIONS}
                    value={role}
                    onChange={(id) => {
                        onRoleSwitch(id === "brand" ? "brand" : "studio");
                    }}
                />
            </Collapsible.Content>
        </Collapsible.Root>
    );
}

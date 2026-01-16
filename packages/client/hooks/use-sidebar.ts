import { create } from "zustand";

interface SidebarStore {
    collapsed: boolean;
    onExpand: () => void;
    onCollapse: () => void;
    toggle: () => void;
}

export const useSidebar = create<SidebarStore>((set) => ({
    collapsed: false,
    onExpand: () => set(() => ({ collapsed: false })),
    onCollapse: () => set(() => ({ collapsed: true })),
    toggle: () => set((state) => ({ collapsed: !state.collapsed }))
}))
// sidebar/sidebar-items.tsx
import styles from "./index.module.css";

export interface SidebarItemProps {
  icon: string;
  label: string;
  path?: string;
  active?: boolean;
  onClick?: () => void;
}

export default function SidebarItem({
  icon,
  label,
  path = "#",
  active,
  onClick,
}: SidebarItemProps) {
  return (
    <div
      onClick={onClick}
      className={`${styles.sidebarItem} ${active ? styles.itemActive : ""}`}
    >
      <a href={path}>
        <div className={styles.itemIcon}>
          <img src={icon} alt="icon" className="w-6 h-6" />
        </div>
        <div className={styles.itemLabel}>{label}</div>
      </a>
    </div>
  );
}

import type { ReactNode } from 'react';
export type IconName = 'arrow' | 'arrowDown' | 'play' | 'film' | 'grid' | 'home' | 'mail' | 'phone' | 'x' | 'close' | 'chevron' | 'check' | 'plus' | 'upload' | 'logout' | 'eye' | 'settings' | 'users' | 'edit' | 'trash' | 'up' | 'down' | 'lock' | 'spark';
const paths: Record<IconName, ReactNode> = {
    arrow: <path d="M5 12h14M13 6l6 6-6 6"/>,
    arrowDown: <path d="M12 4v16M6 14l6 6 6-6"/>,
    play: <path d="m9 5 11 7-11 7z"/>,
    film: <><rect x="3" y="4" width="18" height="16" rx="3"/><path d="M7 4v16M17 4v16M3 9h4M3 15h4M17 9h4M17 15h4"/></>,
    grid: <><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></>,
    home: <path d="m3 10 9-7 9 7v10H3zM9 20v-7h6v7"/>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="3"/><path d="m3 6 9 7 9-7"/></>,
    phone: <path d="M7 3H4a1 1 0 0 0-1 1c0 9 8 17 17 17a1 1 0 0 0 1-1v-3l-5-2-2 2c-3-1-6-4-7-7l2-2z"/>,
    x: <path d="m4 3 12 18h4L8 3zM20 3l-7 8M4 21l7-8"/>,
    close: <path d="m6 6 12 12M6 18 18 6"/>,
    chevron: <path d="m7 10 5 5 5-5"/>,
    check: <path d="m5 12 4 4L19 6"/>,
    plus: <path d="M12 5v14M5 12h14"/>,
    upload: <path d="M12 16V3m-5 5 5-5 5 5M4 15v5h16v-5"/>,
    logout: <path d="M9 4H4v16h5M10 12h11m-5-5 5 5-5 5"/>,
    eye: <><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></>,
    settings: <><path d="M4 6h16M4 12h16M4 18h16"/><circle cx="8" cy="6" r="2"/><circle cx="16" cy="12" r="2"/><circle cx="10" cy="18" r="2"/></>,
    users: <><circle cx="9" cy="8" r="3"/><path d="M3 21v-3a6 6 0 0 1 12 0v3M16 5a3 3 0 0 1 0 6M18 15a5 5 0 0 1 3 5"/></>,
    edit: <path d="m15 4 5 5-11 11H4v-5zM13 6l5 5"/>,
    trash: <path d="M3 6h18M9 6V3h6v3M5 6l1 15h12l1-15M10 10v7M14 10v7"/>,
    up: <path d="m6 14 6-6 6 6"/>,
    down: <path d="m6 10 6 6 6-6"/>,
    lock: <><rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v3"/></>,
    spark: <path d="m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5z"/>,
};
export function Icon({ name, size = 20, className = '' }: {
    name: IconName;
    size?: number;
    className?: string;
}) {
    return <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}

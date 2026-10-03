import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import { Icon } from './Icon';
export function Modal({ title, children, onClose, className = '' }: {
    title: string;
    children: ReactNode;
    onClose: () => void;
    className?: string;
}) {
    const ref = useRef<HTMLDialogElement>(null);
    useEffect(() => {
        const dialog = ref.current!;
        const previous = document.activeElement as HTMLElement | null;
        dialog.showModal();
        const overflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => { dialog.close(); document.body.style.overflow = overflow; previous?.focus(); };
    }, []);
    return <dialog ref={ref} className={`modal ${className}`} aria-labelledby="modal-title" onCancel={e => { e.preventDefault(); onClose(); }} onClick={e => { if (e.target === e.currentTarget)
        onClose(); }}>
    <div className="modal-body"><div className="modal-top"><h2 id="modal-title">{title}</h2><button className="icon-button" aria-label="Close dialog" onClick={onClose}><Icon name="close"/></button></div>{children}</div>
  </dialog>;
}

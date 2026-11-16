import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { X } from 'lucide-react';
export default function Modal({title,children,onClose,kind='dialog'}:{title:string;children:ReactNode;onClose:()=>void;kind?:string}){
 const ref=useRef<HTMLDivElement>(null);const closeRef=useRef(onClose);closeRef.current=onClose;const[closing,setClosing]=useState(false);
 useEffect(()=>{if(closing){const timer=setTimeout(()=>closeRef.current(),window.matchMedia('(prefers-reduced-motion: reduce)').matches?0:220);return()=>clearTimeout(timer);}},[closing]);
 useEffect(()=>{const previous=document.activeElement as HTMLElement|null;const overflow=document.body.style.overflow;document.body.style.overflow='hidden';ref.current?.focus();
 const handler=(event:KeyboardEvent)=>{if(event.key==='Escape')setClosing(true);if(event.key==='Tab'){const items=ref.current?.querySelectorAll<HTMLElement>('a[href],button:not([disabled]),input,select,textarea,[tabindex="0"]');if(!items?.length){event.preventDefault();return;}const first=items[0],last=items[items.length-1];if(event.shiftKey&&(document.activeElement===first||document.activeElement===ref.current)){event.preventDefault();last.focus();}else if(!event.shiftKey&&(document.activeElement===last||document.activeElement===ref.current)){event.preventDefault();first.focus();}}};document.addEventListener('keydown',handler);return()=>{document.body.style.overflow=overflow;document.removeEventListener('keydown',handler);previous?.focus();};},[]);
 return <div className={`modal-layer ${kind} ${closing?'closing':''}`} onMouseDown={e=>{if(e.target===e.currentTarget)setClosing(true);}}><div ref={ref} role="dialog" aria-modal="true" aria-labelledby="dialog-title" tabIndex={-1} className="modal-panel"><div className="modal-heading"><h2 id="dialog-title">{title}</h2><button className="icon-button" aria-label="Close dialog" onClick={()=>setClosing(true)}><X size={22}/></button></div>{children}</div></div>;
}

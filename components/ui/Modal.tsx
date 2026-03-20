 "use client";
 
 import React, { useEffect, useRef } from "react";
 
 interface ModalProps {
   open: boolean;
   onClose: () => void;
   title: string;
   children?: React.ReactNode;
 }
 
 export function Modal({ open, onClose, title, children }: ModalProps) {
   const dialogRef = useRef<HTMLDivElement>(null);
   const closeRef = useRef<HTMLButtonElement>(null);
 
   useEffect(() => {
     const onKeyDown = (e: KeyboardEvent) => {
       if (e.key === "Escape") onClose();
       if (e.key === "Tab" && dialogRef.current) {
         const focusables = dialogRef.current.querySelectorAll<
           HTMLElement
         >("button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])");
         const first = focusables[0];
         const last = focusables[focusables.length - 1];
         if (!first || !last) return;
         const active = document.activeElement;
         if (e.shiftKey) {
           if (active === first) {
             e.preventDefault();
             last.focus();
           }
         } else {
           if (active === last) {
             e.preventDefault();
             first.focus();
           }
         }
       }
     };
     if (open) {
       document.addEventListener("keydown", onKeyDown);
       // focus close button for accessibility
       closeRef.current?.focus();
     }
     return () => {
       document.removeEventListener("keydown", onKeyDown);
     };
   }, [open, onClose]);
 
   if (!open) return null;
 
   return (
     <div
       className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
       aria-hidden={!open}
     >
       <div
         className="absolute inset-0 bg-black/60 backdrop-blur-md"
         onClick={onClose}
         aria-hidden="true"
       />
       <div
         ref={dialogRef}
         role="dialog"
         aria-modal="true"
         aria-labelledby="modal-title"
         className="relative max-w-lg w-full rounded-2xl border border-white/10 bg-white shadow-2xl"
       >
         <div className="px-6 py-6 sm:px-8">
           <h2
             id="modal-title"
             className="text-xl font-bold text-[#0B0F14]"
           >
             {title}
           </h2>
           <div className="mt-3 text-gray-700">{children}</div>
           <div className="mt-6 flex justify-end">
             <button
               ref={closeRef}
               onClick={onClose}
               className="rounded-full bg-black px-6 py-2.5 text-sm font-bold text-white transition-colors hover:bg-neutral-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2FAE8A]"
             >
               Close
             </button>
           </div>
         </div>
       </div>
     </div>
   );
 }

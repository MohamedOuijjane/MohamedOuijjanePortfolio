 "use client";
 
 import React, { useState, useCallback } from "react";
 import { Modal } from "@/components/ui/Modal";
 import { Github } from "lucide-react";
 
 interface RepoLinkButtonProps {
   href?: string;
   label: string;
   className?: string;
   ariaLabel?: string;
 }
 
 export default function RepoLinkButton({
   href = "#",
   label,
   className = "",
   ariaLabel = "Open GitHub repository",
 }: RepoLinkButtonProps) {
   const [open, setOpen] = useState(false);
 
   const onClick = useCallback(() => {
     if (href && href !== "#") {
       window.open(href, "_blank", "noopener");
     } else {
       setOpen(true);
     }
   }, [href]);
 
   return (
     <>
       <button
         type="button"
         onClick={onClick}
         aria-label={ariaLabel}
         className={className}
       >
         <Github className="h-5 w-5" />
         {label}
       </button>
       <Modal
         open={open}
         onClose={() => setOpen(false)}
         title="Repository Not Available"
       >
         <p>
           This project is a private or enterprise system, so the source code is
           not publicly available.
         </p>
       </Modal>
     </>
   );
 }

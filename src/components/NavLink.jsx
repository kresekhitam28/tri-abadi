// src/components/NavLink.jsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLink({ to, href, className, children, onClick, ...props }) {
  const pathname = usePathname();
  const url = to || href || "/";

  const isActive =
    url === "/"
      ? pathname === "/"
      : pathname === url || pathname.startsWith(url + "/");

  const resolvedClassName =
    typeof className === "function"
      ? className({ isActive })
      : className;

  return (
    <Link href={url} className={resolvedClassName} onClick={onClick} {...props}>
      {children}
    </Link>
  );
}
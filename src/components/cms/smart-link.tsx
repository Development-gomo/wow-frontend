import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

/** Router link for site paths; plain anchor for mailto:, tel: and external URLs. */
export function SmartLink({ to, className, children }: { to: string; className: string; children: ReactNode }) {
  if (/^(mailto:|tel:|https?:)/.test(to)) {
    return <a href={to} className={className}>{children}</a>;
  }
  return <Link to={to} className={className}>{children}</Link>;
}

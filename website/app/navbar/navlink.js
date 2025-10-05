"use client";

import { usePathname } from "next/navigation";

export const Navlink = ({ href, children }) => {
  const pathname = usePathname();
  const isActive = pathname === `/${href}`;

  return (
    <a
      href={`/${href}`}
      data-active={isActive || undefined}
      style={{
        textDecoration: "none",
        fontSize: "1rem",
        padding: "0.75rem 0.75rem",
        borderRadius: "50px",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        position: "relative",
        fontWeight: 500,
        display: "inline-block",
        overflow: "hidden",
        cursor: "pointer",
      }}
      className="text-white data-[active]:text-[#2d7a3e]! data-[active]:[text-shadow:0_1px_3px_rgba(0,0,0,0.2)] bg-transparent data-[active]:bg-[rgba(255,255,255,0.95)] data-[active]:[box-shadow:0_4px_20px_rgba(255,255,255,0.3),0_1px_3px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,1)] data-[active]:[transform:translateY(-1px)]"
      onMouseEnter={(e) => {
        if (!isActive) {
          e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
        }
      }}
      onMouseLeave={(e) => {
        if (!isActive) {
          e.currentTarget.style.background = "transparent";
        }
      }}
    >
      {children}
      {isActive && (
        <span
          style={{
            content: "",
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "50%",
            background:
              "linear-gradient(180deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0) 100%)",
            borderRadius: "50px 50px 0 0",
            pointerEvents: "none",
          }}
        />
      )}
    </a>
  );
};

"use client";

import KiwiFull2 from "../../public/KiwiFull2.png";
import Image from "next/image";
import { Navlink } from "./navlink";
import { usePathname } from "next/navigation";

export default function Navbar() {
  // const [logoHovered, setLogoHovered] = React.useState(false);
  // const [logoWidth, setLogoWidth] = React.useState(90);

  // React.useEffect(() => {
  //   if (logoHovered) {
  //     setLogoWidth(220);
  //   } else {
  //     setLogoWidth(90);
  //   }
  // }, [logoHovered]);

  const navItems = [
    { id: "", label: "Home" },
    { id: "team", label: "Our Team" },
    { id: "data", label: "Data Sources" },
  ];

  const pathname = usePathname();
  const isHome = pathname.split("/").join("") === "";

  const glassStyle = isHome
    ? {
        background: "rgba(0, 0, 0, 0.36)",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(0, 0, 0, 0.15)",
        borderRadius: "60px",
        transition: "transform 0.3s ease, background 0.3s ease",
      }
    : {
        background: "rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255, 255, 255, 0.12)",
        borderRadius: "60px",
        transition: "transform 0.3s ease, background 0.3s ease",
      };

  return (
    <div data-home={isHome || undefined}>
      <nav
        style={{
          background: "transparent",
          padding: "1.5rem 1.5rem",
          position: "sticky",
          top: 0,
          zIndex: 10,
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "1.5rem",
          }}
        >
          <a
            href="/"
            style={{
              ...glassStyle,
              padding: "0.5rem 1rem",
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              overflow: "hidden",
              width: `var(--w)`,
              transition:
                "width 1.5s cubic-bezier(0.19, 1, 0.22, 1), justify-content 1.5s cubic-bezier(0.19, 1, 0.22, 1)",
              position: "relative",
            }}
            className="group/logo hover:[--w:220px] [--w:90px] hover:justify-start justify-center"
          >
            <picture className="w-full h-full">
              <Image
                src={KiwiFull2}
                alt="Kiwi Logo"
                style={{
                  height: "70px",
                  width: "200px",
                  objectFit: "cover",
                  filter: "drop-shadow(0 2px 10px rgba(0, 0, 0, 0.2))",
                  userSelect: "none",
                  flexShrink: 0,
                  transition:
                    "object-position 1.5s cubic-bezier(0.19, 1, 0.22, 1)",
                }}
                className="object-[5%_center] group-hover/logo:object-[left_center]"
              />
            </picture>
          </a>

          <ul
            style={{
              display: "flex",
              flexDirection: "row",
              listStyle: "none",
              gap: "0.5rem",
              ...glassStyle,
              padding: "0.5rem",
              margin: 0,
            }}
          >
            {navItems.map((item) => (
              <li key={item.id} className="flex">
                <Navlink href={item.id}>{item.label}</Navlink>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </div>
  );
}

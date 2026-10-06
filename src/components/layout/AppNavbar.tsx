"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container, Nav, Navbar } from "react-bootstrap";
import { classNames } from "@/utils/classNames";

const NAVIGATION_LINKS = [
  { label: "Home", href: "/" },
  { label: "Omnicore", href: "/omnicore" },
  { label: "Item workflow", href: "/itemworkflow" },
  { label: "Carton workflow", href: "/cartonworkflow" },
  { label: "UUID", href: "/uuid" },
];

export default function AppNavbar() {
  const currentPath = usePathname();

  return (
    <header>
      <Navbar bg="light" data-bs-theme="light">
        <Container fluid className="px-4">
          <Navbar.Brand as={Link} href="/">
            Assurant
          </Navbar.Brand>
          <Nav className="me-auto">
            {NAVIGATION_LINKS.map(({ label, href }) => {
              const isCurrentPage = href === currentPath;

              return (
                <Link
                  key={href}
                  href={href}
                  className={classNames("nav-link", isCurrentPage && "active fw-semibold")}
                  aria-current={isCurrentPage ? "page" : undefined}
                >
                  {label}
                </Link>
              );
            })}
          </Nav>
        </Container>
      </Navbar>
    </header>
  );
}

"use client";

import Link from "next/link";
import { Container, Nav, Navbar } from "react-bootstrap";

const NAVIGATION_LINKS = [
  { label: "Home", href: "/" },
  { label: "Omnicore", href: "/omnicore" },
  { label: "Item workflow", href: "/itemworkflow" },
  { label: "Carton Workflow", href: "/cartonworkflow" },
  { label: "UUID", href: "/uuid" },
];

export default function AppNavbar() {
  return (
    <header>
      <Navbar bg="light" data-bs-theme="light">
        <Container>
          <Navbar.Brand as={Link} href="/">
            Assurant
          </Navbar.Brand>
          <Nav className="me-auto">
            {NAVIGATION_LINKS.map(({ label, href }) => (
              <Link key={href} className="nav-link" href={href}>
                {label}
              </Link>
            ))}
          </Nav>
        </Container>
      </Navbar>
    </header>
  );
}

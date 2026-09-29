"use client";

import Link from "next/link";
import { Navbar, Container, Nav } from "react-bootstrap";

export default function LayoutClient() {
    return <>
    <header>
        <Navbar bg="light" data-bs-theme="light">
          <Container>
            <Navbar.Brand href="#home">Assurant</Navbar.Brand>
            <Nav className="me-auto">
              <Link className="nav-link" href="/">Home</Link>
              <Link className="nav-link" href="/omnicore">Omincore</Link>
              {/* <Link className="nav-link" href="/PhoneCases">Hayla (Old)</Link> */}
              <Link className="nav-link" href="/hayla-system">Item workflow</Link>
              <Link className="nav-link" href="/carton-workflow">Carton Workflow</Link>
              <Link className="nav-link" href="/uuid">UUID</Link>
            </Nav>
          </Container>
        </Navbar>
      </header>
    </>
}
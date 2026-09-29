"use client";

import { Table } from "react-bootstrap";
import CopyText from "../TextCopy";
import UuidLookup from "./UUIDClient";

export default function HaylaSystem() {
  return (
    <>
      <div className="row">
        <div className="col-md-4"><UuidLookup /></div>
      </div>
    </>
  );
}

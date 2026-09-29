"use client";

import { useState } from "react";
import { Card, Table, Button } from "react-bootstrap";
import CopyText from "../TextCopy";

const CARTON_ID: any = "5038044829";

const TRADES: any[] = [
  { manufacturer: "Apple", model: "iPhone 16 Pro Max", code: "A2484", storage: "128GB", carrier: "OTH", item: "123456789", imei: "123456789123456", date: "7/11/26", canceled: "", shortage: "", part: "" },
  { manufacturer: "Samsung", model: "Galaxy S24", code: "A2484", storage: "128GB", carrier: "OTH", item: "123456789", imei: "123456789123456", date: "7/11/26", canceled: "", shortage: "", part: "" },
  { manufacturer: "Apple", model: "iPhone 14", code: "A2484", storage: "128GB", carrier: "OTH", item: "123456789", imei: "123456789123456", date: "7/11/26", canceled: "", shortage: "", part: "" },
  { manufacturer: "Google", model: "Pixel 8", code: "A2484", storage: "128GB", carrier: "OTH", item: "123456789", imei: "123456789123456", date: "7/11/26", canceled: "", shortage: "", part: "" },
  { manufacturer: "Apple", model: "iPhone 15 Pro", code: "A2484", storage: "128GB", carrier: "OTH", item: "123456789", imei: "123456789123456", date: "7/11/26", canceled: "", shortage: "", part: "" },
];

/* Same colors / icons as the forms */
const GRAY: any = "#6b7280";
const GREEN: any = "#15803d";
const LINE: any = "#f0f1f3";

const CopyIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="9" y="9" width="11" height="11" rx="2" />
    <path d="M5 15V5a2 2 0 0 1 2-2h8" />
  </svg>
);

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M5 12l5 5L20 7" />
  </svg>
);

export default function CartonTradesTable() {
  const [copied, setCopied] = useState<any>(null);

  const copy = async (text: any, key: any) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(key);
      setTimeout(() => setCopied(null), 1500);
    } catch (e: any) {}
  };

  // Small gray copy button next to a value
  const CopyBtn = ({ text, id }: any) => (
    <Button
      variant="link"
      size="sm"
      title="Copy"
      className="p-0 ms-1 lh-1 align-baseline"
      style={{ color: copied === id ? GREEN : GRAY, opacity: copied === id ? 1 : 0.6 }}
      onClick={() => copy(text, id)}
    >
      {copied === id ? <CheckIcon /> : <CopyIcon />}
    </Button>
  );

  const th: any = { color: GRAY, fontWeight: 600, fontSize: 13, borderColor: LINE, whiteSpace: "nowrap" };
  const td: any = { borderColor: LINE };
  const empty = <span className="text-muted">—</span>;

  return (
    <Card className="shadow-sm">
      <Card.Body className="p-4">
        <div className="d-flex align-items-baseline gap-2 mb-3">
          <h4 className="fw-bold mb-0">Trades in Carton</h4>
          <span className="font-monospace text-secondary">{CARTON_ID}</span>
          <CopyBtn text={CARTON_ID} id="carton" />
        </div>

        <div className="table-responsive">
          <Table className="mb-0 align-middle" style={{ fontSize: 15 }}>
            <thead>
              <tr>
                <th className="ps-0" style={th}>Manufacturer</th>
                <th style={th}>Model</th>
                <th style={th}>Item</th>
                <th style={th}>IMEI / ESN</th>
                <th style={th}>Trade-in Date</th>
                <th className="text-center" style={th}>Canceled</th>
                <th className="text-center" style={th}>Shortage</th>
                <th className="text-center" style={th}>Part</th>
                <th className="pe-0" style={th}></th>
              </tr>
            </thead>
            <tbody>
              {TRADES.map((t: any, i: any) => (
                <tr key={i}>
                  <td className="ps-0 fw-semibold" style={td}>{t.manufacturer}</td>

                  <td style={td}>
                    <div className="fw-semibold text-nowrap">
                        <CopyText text={t.model} bold />
                    </div>
                    <div className="small text-secondary text-nowrap">
                      <span className="font-monospace">{t.code}</span> · {t.storage} · {t.carrier}
                    </div>
                  </td>

                  <td className="font-monospace text-nowrap" style={td}>
                    <CopyText text={t.item}  />
                  </td>

                  <td className="font-monospace text-nowrap" style={td}>
                    <CopyText text={t.imei} />
                  </td>

                  <td className="font-monospace text-secondary" style={td}>{t.date}</td>
                  <td className="text-center" style={td}>{t.canceled || empty}</td>
                  <td className="text-center" style={td}>{t.shortage || empty}</td>
                  <td className="text-center" style={td}>{t.part || empty}</td>

                  <td className="pe-0 text-end text-nowrap" style={td}>
                    <Button size="sm" variant="primary" className="fw-bold px-3 me-2">Receive</Button>
                    <Button size="sm" variant="outline-danger" className="fw-semibold px-3">Shortage</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Card.Body>
    </Card>
  );
}

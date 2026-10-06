"use client";

import type { ReactNode } from "react";
import { Button, Card, Table } from "react-bootstrap";
import CopyableText from "@/components/ui/CopyableText";
import { classNames } from "@/utils/classNames";
import type { Carton, CartonTrade } from "./cartonTrades";
import styles from "./CartonTradesTable.module.css";

const EMPTY_CELL = <span className="text-muted">—</span>;

function HeadCell({ children, className }: { children?: ReactNode; className?: string }) {
  return <th className={classNames(styles.headCell, className)}>{children}</th>;
}

function Cell({ children, className }: { children: ReactNode; className?: string }) {
  return <td className={classNames(styles.cell, className)}>{children}</td>;
}

interface CartonTradesTableProps {
  carton: Carton;
  onReceive: (trade: CartonTrade) => void;
  onShortage?: (trade: CartonTrade) => void;
}

export default function CartonTradesTable({
  carton,
  onReceive,
  onShortage,
}: CartonTradesTableProps) {
  return (
    <Card className="shadow-sm">
      <Card.Body className="p-4">
        <div className="d-flex align-items-baseline gap-2 mb-3">
          <h4 className="fw-bold mb-0">Trades in Carton</h4>
          <CopyableText text={carton.id} label="Carton ID" monospace className="text-secondary" />
        </div>

        <div className="table-responsive">
          <Table className="mb-0 align-middle" style={{ fontSize: 15 }}>
            <thead>
              <tr>
                <HeadCell className="ps-0">Manufacturer</HeadCell>
                <HeadCell>Model</HeadCell>
                <HeadCell>Item</HeadCell>
                <HeadCell>IMEI / ESN</HeadCell>
                <HeadCell>Trade-in Date</HeadCell>
                <HeadCell className="text-center">Canceled</HeadCell>
                <HeadCell className="text-center">Shortage</HeadCell>
                <HeadCell className="text-center">Part</HeadCell>
                <HeadCell className="pe-0" />
              </tr>
            </thead>
            <tbody>
              {carton.trades.map((trade) => (
                <tr key={`${trade.model}-${trade.imei}`}>
                  <Cell className="ps-0 fw-semibold">{trade.manufacturer}</Cell>

                  <Cell>
                    <div className="fw-semibold text-nowrap">
                      <CopyableText text={trade.model} label="Model" isIdentifier={false} bold />
                    </div>
                    <div className="small text-secondary text-nowrap">
                      <span className="font-monospace">{trade.modelCode}</span> · {trade.storage} ·{" "}
                      {trade.carrier}
                    </div>
                  </Cell>

                  <Cell className="font-monospace text-nowrap">
                    <CopyableText text={trade.itemNumber} label="Item number" />
                  </Cell>

                  <Cell className="font-monospace text-nowrap">
                    <CopyableText text={trade.imei} label="IMEI number" />
                  </Cell>

                  <Cell className="font-monospace text-secondary">{trade.tradeInDate}</Cell>
                  <Cell className="text-center">{trade.canceled || EMPTY_CELL}</Cell>
                  <Cell className="text-center">{trade.shortage || EMPTY_CELL}</Cell>
                  <Cell className="text-center">{trade.part || EMPTY_CELL}</Cell>

                  <Cell className="pe-0 text-end text-nowrap">
                    <Button
                      size="sm"
                      variant="primary"
                      className="fw-bold px-3 me-2"
                      onClick={() => onReceive(trade)}
                    >
                      Receive
                    </Button>
                    <Button
                      size="sm"
                      variant="outline-danger"
                      className="fw-semibold px-3"
                      onClick={() => onShortage?.(trade)}
                    >
                      Shortage
                    </Button>
                  </Cell>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Card.Body>
    </Card>
  );
}

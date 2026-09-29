"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import CopyText from "../TextCopy";
import { Alert, Badge, Form, InputGroup, Table } from "react-bootstrap";
import CopiedBadge from "./CopiedBadge";
import Swal from "sweetalert2";
import Timer from "../Times";
import CartonWorkflowForm from "./CartonWorkflowForm";
import CartonTradesTable from "./TradeInTable";
const validationSchema = Yup.object({
  itemNumber: Yup.number(),
  invoiceNumber: Yup.number(),
  imeiNumber: Yup.number(),
});
export default function CartonWorkflow() {
  const formik: any = useFormik({
    initialValues: {
      itemNumber: "",
      invoiceNumber: "",
      imeiNumber: "",
      imei_esn: "",
    },

    validationSchema,

    onSubmit: (values) => {
      console.log(values);
    },
    onReset: (values) => {},
  });
  const handleCopy = async (fieldName: string) => {
    const value = formik.values[fieldName];

    if (!value) return;

    await navigator.clipboard.writeText(value);
    Swal.mixin({
      toast: true,
      position: "bottom-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    }).fire({
      icon: "success",
      title: `${value} Copied!`,
    });
  };

  const handlePaste = async (fieldName: string) => {
    const value = await navigator.clipboard.readText();

    formik.setFieldValue(fieldName, value);
    
  };
  return (
    <>
    <Timer />
      <div className="container-fluid mt-4">
        <div className="row">
          <div className="col-md-4">
            <CartonWorkflowForm />
          </div>
          <div className="col-md-8">
            <CartonTradesTable />
          </div>
        </div>
      </div>
    </>
  );
}

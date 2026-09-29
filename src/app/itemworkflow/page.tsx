"use client";

import { useState } from "react";
import { Alert, Button, Form, InputGroup } from "react-bootstrap";
import { RadioButtonAfter } from "../PhoneCases/RadioButton";
import { pasteFromClipboard } from "@/utils/Copy.util";
import * as Yup from "yup";
import { useFormik } from "formik";
import CopyText from "../TextCopy";
import Timer from "../Times";
import DeviceInspectionForm from "./QuestionsForm";
import ItemWorkflowForm from "./WorkflowForm";
const validationSchema = Yup.object({
  itemNumber: Yup.number(),
  invoiceNumber: Yup.number(),
  imeiNumber: Yup.number(),
});
export default function HaylaSystem() {
  const FormsCases = ["NTO", "CRS", "BDP"];
  const [currentCase, setCurrentCase] = useState("");

  const formik: any = useFormik({
    initialValues: {
      itemNumber: "",
      invoiceNumber: "",
      imeiNumber: "",
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
            <ItemWorkflowForm />
            {/* <div className="card shadow-sm border-0">
              <Alert variant={"success"}>
                Item <CopyText text={`927468125`} /> Has been proccesed !
              </Alert>
              <div className="card-header border-0">
                <h4>Item Work Flow</h4>
              </div>
              <div className="card-body border-0">
                <form onSubmit={formik.handleSubmit}>
              
                  <Form.Label>Item Number</Form.Label>
                  <InputGroup className="mb-3  cutsom-paste-input">
                    <small onClick={() => handleCopy("itemNumber")}>
                      {" "}
                      <i className="icofont-copy"></i>{" "}
                    </small>

                    <input
                      value={formik.values.itemNumber}
                      name="itemNumber"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="form-control "
                    />
                    <button
                      className="input-group-text"
                      id="basic-addon2"
                      onClick={() => handlePaste("itemNumber")}
                    >
                      Paste
                    </button>
                  </InputGroup>

                  <Form.Label>Invoice Number</Form.Label>
                  <InputGroup className="mb-3 cutsom-paste-input">
                    <small onClick={() => handleCopy("invoiceNumber")}>
                      {" "}
                      <i className="icofont-copy"></i>{" "}
                    </small>

                    <input
                      value={formik.values.invoiceNumber}
                      name="invoiceNumber"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="form-control "
                    />
                    <button
                      className="input-group-text"
                      id="basic-addon2"
                      onClick={() => handlePaste("invoiceNumber")}
                    >
                      Paste
                    </button>
                  </InputGroup>

                  <Form.Label>IMEI Number</Form.Label>
                  <InputGroup className="mb-3  cutsom-paste-input">
                    <small onClick={() => handleCopy("imeiNumber")}>
                      {" "}
                      <i className="icofont-copy"></i>{" "}
                    </small>

                    <input
                      value={formik.values.imeiNumber}
                      name="imeiNumber"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="form-control "
                    />
                    <button
                      className="input-group-text"
                      id="basic-addon2"
                      onClick={() => handlePaste("imeiNumber")}
                    >
                      Paste
                    </button>
                  </InputGroup>

                  <button className="btn btn-outline-primary btn-sm mb-2 me-2">
                    Revert To Recipt
                  </button>
                  <button className="btn btn-outline-primary btn-sm mb-2 me-2">
                    Re Inspected
                  </button>
                  <button className="btn btn-outline-primary btn-sm mb-2 me-2">
                    Item Lockup
                  </button>
                  <div></div>
                  <button
                    type="submit"
                    className="btn btn-primary btn-sm mb-2 me-2 px-4"
                  >
                    Search
                  </button>
                  <button
                    className="mb-2 me-2 btn btn-outline-danger btn-sm px-4"
                    onClick={() => formik.resetForm()}
                  >
                    Clear
                  </button>
                </form>
              </div>
            </div> */}
          </div>
          <div className="col-md-3"></div>
          <div className="col-md-5">
            <DeviceInspectionForm defaultMode="NTO" onSubmit={(data: any) => console.log(data)} />
            {/* <div className="card shadow-sm p-3 rounded-3 border-0">
              <div className="card-header">
                <h4>Item Workflow</h4>
              </div>
              <div className="card-body">
                <div>
                  {FormsCases.map((fcb) => (
                    <Button
                      onClick={() => setCurrentCase(fcb)}
                      variant={`${fcb === currentCase ? "secondary" : "outline-secondary"}`}
                      className="me-2"
                    >
                      {fcb}
                    </Button>
                  ))}
                  <Button
                    onClick={() => setCurrentCase("")}
                    variant="outline-secondary"
                  >
                    Clear
                  </Button>
                </div>
                <div className="mt-3">
                  
                   {currentCase === "NTO" ? (
                    <>
                      <label
                        className=""
                        style={{ fontWeight: "bold", color: "#363636" }}
                      >
                        Does the device on?
                      </label>
                      <div className="d-flex">
                        <RadioButtonAfter name="DTDOA" label="yes" />
                        <RadioButtonAfter name="DTDOA" label="no" />
                        <RadioButtonAfter name="DTDOA" label="Unverfied" />
                      </div>

                      <label
                        className="mt-3"
                        style={{ fontWeight: "bold", color: "#363636" }}
                      >
                        Device color
                      </label>

                      <Form.Select
                        aria-label="Default select example"
                        className="w-50"
                      >
                        <option>select color</option>
                        <option value="1">red</option>
                        <option value="2">green</option>
                        <option value="3">blue</option>
                        <option value="3">white</option>
                        <option value="3">black</option>
                      </Form.Select>
                    </>
                  ) : null}

                  {currentCase === "CRS" ? (
                    <>
                      <label
                        className=""
                        style={{ fontWeight: "bold", color: "#363636" }}
                      >
                        Does the device on?
                      </label>
                      <div className="d-flex">
                        <RadioButtonAfter name="DTDOA" label="yes" />
                        <RadioButtonAfter name="DTDOA" label="no" />
                        <RadioButtonAfter name="DTDOA" label="Unverfied" />
                      </div>

                      <label
                        className="mt-3"
                        style={{ fontWeight: "bold", color: "#363636" }}
                      >
                        is the device customer activation locked cleared?
                      </label>
                      <div className="d-flex">
                        <RadioButtonAfter name="ULC" label="yes" />
                        <RadioButtonAfter name="ULC" label="no" />
                        <RadioButtonAfter name="ULC" label="Unverfied" />
                      </div>

                      <label
                        className="mt-3"
                        style={{ fontWeight: "bold", color: "#363636" }}
                      >
                        Does the screen on?
                      </label>
                      <div className="d-flex">
                        <RadioButtonAfter name="DSOA" label="yes" />
                        <RadioButtonAfter name="DSOA" label="no" />
                        <RadioButtonAfter name="DSOA" label="Unverfied" />
                      </div>

                      <label
                        className="mt-3"
                        style={{ fontWeight: "bold", color: "#363636" }}
                      >
                        Does the device take charge?
                      </label>
                      <div className="d-flex">
                        <RadioButtonAfter name="CHRGX" label="yes" />
                        <RadioButtonAfter name="CHRGX" label="no" />
                        <RadioButtonAfter name="CHRGX" label="Unverified" />
                      </div>

                      <label
                        className="mt-3"
                        style={{ fontWeight: "bold", color: "#363636" }}
                      >
                        Device color
                      </label>

                      <Form.Select
                        aria-label="Default select example"
                        className="w-50"
                      >
                        <option>select color</option>
                        <option value="1">red</option>
                        <option value="2">green</option>
                        <option value="3">blue</option>
                        <option value="3">white</option>
                        <option value="3">black</option>
                      </Form.Select>
                    </>
                  ) : null}

                  {currentCase === "BDP" ? (
                    <>
                      <label
                        className="mt-3"
                        style={{ fontWeight: "bold", color: "#363636" }}
                      >
                        Does the device on?
                      </label>
                      <div className="d-flex">
                        <RadioButtonAfter name="DTDO" label="yes" />
                        <RadioButtonAfter name="DTDO" label="no" />
                        <RadioButtonAfter name="DTDO" label="Unverfied" />
                      </div>
                      <label
                        className="mt-3"
                        style={{ fontWeight: "bold", color: "#363636" }}
                      >
                        is the device customer activation locked cleared?
                      </label>
                      <div className="d-flex">
                        <RadioButtonAfter name="ULC" label="yes" />
                        <RadioButtonAfter name="ULC" label="no" />
                        <RadioButtonAfter name="ULC" label="Unverfied" />
                      </div>

                      <label
                        className="mt-3"
                        style={{ fontWeight: "bold", color: "#363636" }}
                      >
                        Does the screen turn on?
                      </label>
                      <div className="d-flex">
                        <RadioButtonAfter name="DSO" label="yes" />
                        <RadioButtonAfter name="DSO" label="no" />
                        <RadioButtonAfter name="DSO" label="Unverfied" />
                      </div>
                      <label
                        className=" mt-2"
                        style={{ fontWeight: "bold", color: "#363636" }}
                      >
                        are all the connectors/ports/under covers perfect?
                      </label>
                      <div className="d-flex">
                        <RadioButtonAfter name="AATCPUCP" label="yes" />
                        <RadioButtonAfter name="AATCPUCP" label="no" />
                        <RadioButtonAfter name="AATCPUCP" label="unverfied" />
                      </div>
                      <div className="ms-3 mb-2">
                        <small className="text-muted d-block">
                          (Just if No)
                        </small>
                        <input type="checkbox" id="DMC" />{" "}
                        <label htmlFor="DMC" className="text-muted me-1 ">
                          Damged Connectors
                        </label>{" "}
                        <br />
                        <input type="checkbox" id="STMOD" />{" "}
                        <label htmlFor="STMOD" className="text-muted me-1 ">
                          SIM tray missing or damaged
                        </label>
                        <br />
                        <input type="checkbox" id="MP" />{" "}
                        <label htmlFor="MP" className="text-muted me-1 ">
                          Missing parts{" "}
                        </label>{" "}
                        <br />
                      </div>

                      <label
                        className="mt-3"
                        style={{ fontWeight: "bold", color: "#363636" }}
                      >
                        Does the device take charge?
                      </label>
                      <div className="d-flex">
                        <RadioButtonAfter name="DTC" label="yes" />
                        <RadioButtonAfter name="DTC" label="no" />
                        <RadioButtonAfter name="DTC" label="Unverified" />
                      </div>
                    </>
                  ) : null}

                  {currentCase === "" ? (
                    <>
                      <div>
                        <label
                          className="mt-3"
                          style={{ fontWeight: "bold", color: "#363636" }}
                        >
                          Does the device on?
                        </label>
                        <div className="d-flex">
                          <RadioButtonAfter name="DTDO" label="yes" />
                          <RadioButtonAfter name="DTDO" label="no" />
                          <RadioButtonAfter name="DTDO" label="Unverfied" />
                        </div>

                        <label
                          className="mt-3"
                          style={{ fontWeight: "bold", color: "#363636" }}
                        >
                          is the device customer activation locked cleared?
                        </label>
                        <div className="d-flex">
                          <RadioButtonAfter name="ULC" label="yes" />
                          <RadioButtonAfter name="ULC" label="no" />
                          <RadioButtonAfter name="ULC" label="Unverfied" />
                        </div>

                        <label
                          className="mt-3"
                          style={{ fontWeight: "bold", color: "#363636" }}
                        >
                          Does the screen turn on?
                        </label>
                        <div className="d-flex">
                          <RadioButtonAfter name="DSO" label="yes" />
                          <RadioButtonAfter name="DSO" label="no" />
                          <RadioButtonAfter name="DSO" label="Unverfied" />
                        </div>

                        <label
                          className="mt-3"
                          style={{ fontWeight: "bold", color: "#363636" }}
                        >
                          is the screen free of cracks
                        </label>
                        <div className="d-flex">
                          <RadioButtonAfter name="DSFC" label="yes" />
                          <RadioButtonAfter
                            name="DSFC"
                            label="Major burns and cracks"
                          />
                          <RadioButtonAfter
                            name="DSFC"
                            label="Minor burns and cracks"
                          />
                          <RadioButtonAfter name="DSFC" label="unverfied" />
                        </div>

                        <label
                          className="mt-3"
                          style={{ fontWeight: "bold", color: "#363636" }}
                        >
                          is the screen free of any Bruising/Burn-in ?
                        </label>
                        <div className="d-flex">
                          <RadioButtonAfter name="FOFBB" label="yes" />
                          <RadioButtonAfter
                            name="FOFBB"
                            label="Major bruising/burn-in and cracks"
                          />
                          <RadioButtonAfter
                            name="FOFBB"
                            label="Minor bruising/burn-in and cracks"
                          />
                          <RadioButtonAfter name="FOFBB" label="unverfied" />
                        </div>
                        <label
                          className="mt-3"
                          style={{ fontWeight: "bold", color: "#363636" }}
                        >
                          are all surfaces perfect ?
                        </label>
                        <div className="d-flex">
                          <RadioButtonAfter name="AASP" label="yes" />
                          <RadioButtonAfter
                            name="AASP"
                            label="small/light scratches and/or scuff marks"
                          />
                          <RadioButtonAfter
                            name="AASP"
                            label="large/heavy scratches and/or scuff marks"
                          />
                          <RadioButtonAfter name="AASP" label="unverfied" />
                        </div>

                        <label
                          className=" mt-2"
                          style={{ fontWeight: "bold", color: "#363636" }}
                        >
                          are all the connectors/ports/under covers perfect?
                        </label>
                        <div className="d-flex">
                          <RadioButtonAfter name="AATCPUCP" label="yes" />
                          <RadioButtonAfter name="AATCPUCP" label="no" />
                          <RadioButtonAfter name="AATCPUCP" label="unverfied" />
                        </div>
                        <div className="ms-3 mb-2">
                          <small className="text-muted d-block">
                            (Just if No)
                          </small>
                          <input type="checkbox" id="DMC" />{" "}
                          <label htmlFor="DMC" className="text-muted me-1 ">
                            Damged Connectors
                          </label>{" "}
                          <br />
                          <input type="checkbox" id="STMOD" />{" "}
                          <label htmlFor="STMOD" className="text-muted me-1 ">
                            SIM tray missing or damaged
                          </label>
                          <br />
                          <input type="checkbox" id="MP" />{" "}
                          <label htmlFor="MP" className="text-muted me-1 ">
                            Missing parts{" "}
                          </label>{" "}
                          <br />
                        </div>

                        <label
                          className=" mt-2"
                          style={{ fontWeight: "bold", color: "#363636" }}
                        >
                          Battery Health
                        </label>
                        <div className="d-flex">
                          <RadioButtonAfter
                            name="BBH"
                            label="Greater than or equals 70%"
                          />
                          <RadioButtonAfter name="BBH" label="less then 70%" />
                          <RadioButtonAfter name="BBH" label="unverfied" />
                        </div>

                        <label
                          className=" mt-2"
                          style={{ fontWeight: "bold", color: "#363636" }}
                        >
                          Does the speaker and microphone work?
                        </label>
                        <div className="d-flex">
                          <RadioButtonAfter name="SAM" label="yes" />
                          <RadioButtonAfter name="SAM" label="no" />
                          <RadioButtonAfter name="SAM" label="unverfied" />
                        </div>

                        <label
                          className="mt-3"
                          style={{ fontWeight: "bold", color: "#363636" }}
                        >
                          Does the device take charge?
                        </label>
                        <div className="d-flex">
                          <RadioButtonAfter name="DTC" label="yes" />
                          <RadioButtonAfter name="DTC" label="no" />
                          <RadioButtonAfter name="DTC" label="Unverified" />
                        </div>

                        <label
                          className="mt-3"
                          style={{ fontWeight: "bold", color: "#363636" }}
                        >
                          does the device hav working exterior buttons? (home,
                          volume, muted, keypad){" "}
                        </label>
                        <div className="d-flex">
                          <RadioButtonAfter name="EBW" label="yes" />
                          <RadioButtonAfter name="EBW" label="no" />
                          <RadioButtonAfter name="EBW" label="Unverified" />
                        </div>

                        <label
                          className="mt-3"
                          style={{ fontWeight: "bold", color: "#363636" }}
                        >
                          does the device have less than 3 missing pixels ?
                        </label>
                        <div className="d-flex">
                          <RadioButtonAfter name="3P" label="yes" />
                          <RadioButtonAfter name="3P" label="no" />
                          <RadioButtonAfter name="3P" label="Unverified" />
                        </div>

                        <label
                          className="mt-3"
                          style={{ fontWeight: "bold", color: "#363636" }}
                        >
                          Does the front camera work?
                        </label>
                        <div className="d-flex">
                          <RadioButtonAfter name="FCW" label="yes" />
                          <RadioButtonAfter name="FCW" label="no" />
                          <RadioButtonAfter name="FCW" label="Unverified" />
                        </div>

                        <label
                          className="mt-3"
                          style={{ fontWeight: "bold", color: "#363636" }}
                        >
                          Does the rear camera work?
                        </label>
                        <div className="d-flex">
                          <RadioButtonAfter name="RCW" label="yes" />
                          <RadioButtonAfter name="RCW" label="no" />
                          <RadioButtonAfter name="RCW" label="Unverified" />
                        </div>

                        <label
                          className="mt-3"
                          style={{ fontWeight: "bold", color: "#363636" }}
                        >
                          Automation tool proof of succeccful data clear
                        </label>
                        <div className="d-flex">
                          <RadioButtonAfter name="ATPOSDC" label="yes" />
                          <RadioButtonAfter name="ATPOSDC" label="no" />
                          <RadioButtonAfter name="ATPOSDC" label="Unverified" />
                        </div>
                        <label
                          className="mt-3"
                          style={{ fontWeight: "bold", color: "#363636" }}
                        >
                          Has the device been data wiped ?
                        </label>
                        <div className="d-flex">
                          <RadioButtonAfter name="DWiped" label="yes" />
                          <RadioButtonAfter name="DWiped" label="no" />
                          <RadioButtonAfter name="DWiped" label="Unverified" />
                        </div>
                      </div>
                    </>
                  ) : null}

                  <button className="mb-2 mt-2 me-2 btn btn-primary mt-3  px-4">
                    Proccess
                  </button> 
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
}

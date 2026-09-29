"use client";

import { Button, Form } from "react-bootstrap";
import RadioButton, { RadioButtonAfter } from "./RadioButton";
import { useState } from "react";
import Timer from "../Times";

export default function Page() {
  const [noAATCPUCP, setNoAATCPUCP] = useState(false);

  return (
    <>
      <div className="container">
        <Timer />
        <div className="row">
          <div className="col-md-8">
            <div className="mt-4" style={{ backgroundColor: "#f6f6f6" }}>
              <label className="mt-2">Does the device on?</label>
              <div className="d-flex">
                <RadioButton name="DTDO" label="yes" />
                <RadioButton name="DTDO" label="no" />
                <RadioButton name="DTDO" label="Unverfied" />
              </div>

              <label className="mt-2">
                is the device customer activation locked cleared?
              </label>
              <div className="d-flex">
                <RadioButton name="ULC" label="yes" />
                <RadioButton name="ULC" label="no" />
                <RadioButton name="ULC" label="Unverfied" />
              </div>

              <label className="mt-2">Does the screen turn on?</label>
              <div className="d-flex">
                <RadioButton name="DSO" label="yes" />
                <RadioButton name="DSO" label="no" />
                <RadioButton name="DSO" label="Unverfied" />
              </div>

              <label className="mt-2">is the screen free of cracks</label>
              <div className="d-flex">
                <RadioButton name="DSFC" label="yes" />
                <RadioButton name="DSFC" label="Major burns and cracks" />
                <RadioButton name="DSFC" label="Minor burns and cracks" />
                <RadioButton name="DSFC" label="unverfied" />
              </div>

              <label className="mt-2">
                is the screen free of any Bruising/Burn-in ?
              </label>
              <div className="d-flex">
                <RadioButton name="FOFBB" label="yes" />
                <RadioButton
                  name="FOFBB"
                  label="Major bruising/burn-in and cracks"
                />
                <RadioButton
                  name="FOFBB"
                  label="Minor bruising/burn-in and cracks"
                />
                <RadioButton name="FOFBB" label="unverfied" />
              </div>
              <label className="mt-2">are all surfaces perfect ?</label>
              <div className="d-flex">
                <RadioButton name="AASP" label="yes" />
                <RadioButton
                  name="AASP"
                  label="small/light scratches and/or scuff marks"
                />
                <RadioButton
                  name="AASP"
                  label="large/heavy scratches and/or scuff marks"
                />
                <RadioButton name="AASP" label="unverfied" />
              </div>

              <label className=" mt-2">
                are all the connectors/ports/under covers perfect?
              </label>
              <div className="d-flex">
                <RadioButton name="AATCPUCP" label="yes" />
                <RadioButton name="AATCPUCP" label="no" />
                <RadioButton name="AATCPUCP" label="unverfied" />
              </div>
              <div className="mb-2">
                <small className="text-muted d-block">Just if No</small>
                <input type="checkbox" /> Damged Connectors <br />
                <input type="checkbox" /> SIM tray missing or damaged
                <br />
                <input type="checkbox" /> Missing parts <br />
              </div>

              <label className=" mt-2">Battery Health</label>
              <div className="d-flex">
                <RadioButton name="BBH" label="Greater than or equals 70%" />
                <RadioButton name="BBH" label="less then 70%" />
                <RadioButton name="BBH" label="unverfied" />
              </div>

              <label className=" mt-2">
                Does the speaker and microphone work?
              </label>
              <div className="d-flex">
                <RadioButton name="SAM" label="yes" />
                <RadioButton name="SAM" label="no" />
                <RadioButton name="SAM" label="unverfied" />
              </div>

              <label className="mt-2">Does the device take charge?</label>
              <div className="d-flex">
                <RadioButton name="DTC" label="yes" />
                <RadioButton name="DTC" label="no" />
                <RadioButton name="DTC" label="Unverified" />
              </div>

              <label className="mt-2">
                does the device hav working exterior buttons? (home, volume,
                muted, keypad){" "}
              </label>
              <div className="d-flex">
                <RadioButton name="EBW" label="yes" />
                <RadioButton name="EBW" label="no" />
                <RadioButton name="EBW" label="Unverified" />
              </div>

              <label className="mt-2">
                does the device have less than 3 missing pixels ?
              </label>
              <div className="d-flex">
                <RadioButton name="3P" label="yes" />
                <RadioButton name="3P" label="no" />
                <RadioButton name="3P" label="Unverified" />
              </div>

              <label className="mt-2">Does the front camera work?</label>
              <div className="d-flex">
                <RadioButton name="FCW" label="yes" />
                <RadioButton name="FCW" label="no" />
                <RadioButton name="FCW" label="Unverified" />
              </div>

              <label className="mt-2">Does the rear camera work?</label>
              <div className="d-flex">
                <RadioButton name="RCW" label="yes" />
                <RadioButton name="RCW" label="no" />
                <RadioButton name="RCW" label="Unverified" />
              </div>

              <label className="mt-2">
                Automation tool proof of succeccful data clear
              </label>
              <div className="d-flex">
                <RadioButton name="ATPOSDC" label="yes" />
                <RadioButton name="ATPOSDC" label="no" />
                <RadioButton name="ATPOSDC" label="Unverified" />
              </div>
              <label className="mt-2">Has the device been data wiped ?</label>
              <div className="d-flex">
                <RadioButton name="DWiped" label="yes" />
                <RadioButton name="DWiped" label="no" />
                <RadioButton name="DWiped" label="Unverified" />
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div
              className="shadow mt-4 p-4 rounded-3"
              style={{ backgroundColor: "#f3f6f9" }}
            >
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
                Does the user lock cleared?
              </label>
              <div className="d-flex">
                <RadioButtonAfter name="ULCA" label="yes" />
                <RadioButtonAfter name="ULCA" label="no" />
                <RadioButtonAfter name="ULCA" label="Unverfied" />
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
                Does the screen free cracks?
              </label>
              <div className="d-flex">
                <RadioButtonAfter name="DSFCA" label="yes" />
                <RadioButtonAfter name="DSFCA" label="Major burns and cracks" />
                <RadioButtonAfter name="DSFCA" label="Minor burns and cracks" />
                <RadioButtonAfter name="DSFCA" label="unverfied" />
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
                Do the external buttons work?
              </label>
              <div className="d-flex">
                <RadioButtonAfter name="EXTBW" label="yes" />
                <RadioButtonAfter name="EXTBW" label="no" />
                <RadioButtonAfter name="EXTBW" label="Unverified" />
              </div>

              <label
                className="mt-3"
                style={{ fontWeight: "bold", color: "#363636" }}
              >
                Does the screen have three or more dead pixels?
              </label>
              <div className="d-flex">
                <RadioButtonAfter name="PXLD3" label="yes" />
                <RadioButtonAfter name="PXLD3" label="no" />
                <RadioButtonAfter name="PXLD3" label="Unverified" />
              </div>

              <label
                className="mt-3"
                style={{ fontWeight: "bold", color: "#363636" }}
              >
                Does the microphone work?
              </label>
              <div className="d-flex">
                <RadioButtonAfter name="MICQ7" label="yes" />
                <RadioButtonAfter name="MICQ7" label="no" />
                <RadioButtonAfter name="MICQ7" label="Unverified" />
              </div>

              <label
                className="mt-3"
                style={{ fontWeight: "bold", color: "#363636" }}
              >
                Does the front camera work?
              </label>
              <div className="d-flex">
                <RadioButtonAfter name="FCA9" label="yes" />
                <RadioButtonAfter name="FCA9" label="no" />
                <RadioButtonAfter name="FCA9" label="Unverified" />
              </div>

              <label
                className="mt-3"
                style={{ fontWeight: "bold", color: "#363636" }}
              >
                Does the rear camera work?
              </label>
              <div className="d-flex">
                <RadioButtonAfter name="RCM4" label="yes" />
                <RadioButtonAfter name="RCM4" label="no" />
                <RadioButtonAfter name="RCM4" label="Unverified" />
              </div>

              <label
                className="mt-3"
                style={{ fontWeight: "bold", color: "#363636" }}
              >
                Has the data been wiped?
              </label>
              <div className="d-flex">
                <RadioButtonAfter name="WIPEZ8" label="yes" />
                <RadioButtonAfter name="WIPEZ8" label="no" />
                <RadioButtonAfter name="WIPEZ8" label="Unverified" />
              </div>

              <label
                className="mt-3"
                style={{ fontWeight: "bold", color: "#363636" }}
              >
                Device color
              </label>

              <Form.Select aria-label="Default select example" className="w-50">
                <option>select color</option>
                <option value="1">red</option>
                <option value="2">green</option>
                <option value="3">blue</option>
                <option value="3">white</option>
                <option value="3">black</option>
              </Form.Select>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

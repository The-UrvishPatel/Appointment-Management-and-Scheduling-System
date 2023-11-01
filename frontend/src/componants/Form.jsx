import React, { useState } from "react";
import PatientRegistration from "./PatientRegistration";
import DoctorRegistration from "./DoctorRegistration";
import DoctorLogin from "./DoctorLogin";
import PatientLogin from "./PatientLogin";
// import Loading from "./Loading";
// import axios from "axios";
import "./form.css";
import {
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
} from "mdb-react-ui-kit";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export default function MDBForm() {

  const navigate = useNavigate();

  useEffect(() => {

    let tokenOwner = "";
    let dataToSend;

    const patientToken = localStorage.getItem("unity-jwt-patient");
    const doctorToken = localStorage.getItem("unity-jwt-doctor");

    if (patientToken || doctorToken) {

      dataToSend = {
        istoken: true,
        token: "",
        purpose: "verify",
        email: "",
        password: "",
      };

      if (patientToken) {

        dataToSend.token = patientToken;
        tokenOwner = "patient";
      
      } else {
      
        dataToSend.token = doctorToken;
        tokenOwner = "doctor";
      
      }

      const fetchData = async () => {

      try {

        let response = await axios.post(`${tokenOwner}/login`, dataToSend);
      
        if(tokenOwner==="doctor")
        {
          localStorage.setItem("unity-doctor-id", response.data.doctor._id);
        }
        else
        {
          localStorage.setItem("unity-patient-id", response.data.patient._id);
        }

          navigate("/");

      } catch (err) {

        navigate("/");
        console.error("Error fetching user info:", err);
        
      }

      };

      fetchData();

    } else {
      
      navigate("/form");
    
    }

  }, []);

  const [loginRegisterActive, setLoginRegisterActive] = useState("login");
  const [userType, setUserType] = useState("patient"); // Added userType state

  const handleLoginRegisterClick = (tab) => {

    setLoginRegisterActive(tab);
  
  };

  const handleUserTypeClick = (type) => {

    setUserType(type);
  
  };

  return (
    <div className="forms">

      <div className="form-allFormsContainer">

        <div className="outer-tabs">

          <MDBTabs pills justify className="form-switchContainer" style={{width: "100%"}}>

            <MDBTabsItem>
              <MDBTabsLink
                onClick={() => handleLoginRegisterClick("login")}
                active={loginRegisterActive === "login"}
                style={{
                  backgroundColor: loginRegisterActive === "login" ? "#471e75" : "#893be3",
                  color: "white",
                  margin: "0px",
                  borderTopRightRadius: "0px",
                  borderBottomRightRadius: "0px",
                  borderBottomLeftRadius: "0px",
                }}
              >
                Login
              </MDBTabsLink>
            </MDBTabsItem>

            <MDBTabsItem>
              <MDBTabsLink
                onClick={() => handleLoginRegisterClick("register")}
                active={loginRegisterActive === "register"}
                style={{
                  backgroundColor: loginRegisterActive === "register" ? "#471e75" : "#893be3",
                  color: "white",
                  margin: "0px",
                  borderTopLeftRadius: "0px",
                  borderBottomLeftRadius: "0px",
                  borderBottomRightRadius: "0px",
                }}
              >
                Patient Registration
              </MDBTabsLink>
            </MDBTabsItem>

          </MDBTabs>

        </div>

        <MDBTabsContent className="form-formInputs">

          <MDBTabsPane show={loginRegisterActive === "login"}>

            <div className="inner-tabs">
              <MDBTabs pills justify className="mt-2 form-switchContainer" style={{width: "60%"}}>
                <MDBTabsItem>
                  <MDBTabsLink
                    onClick={() => handleUserTypeClick("patient")}
                    active={userType === "patient"}
                    style={{
                      backgroundColor: userType === "patient" ? "#471e75" : "#893be3",
                      color: "white",
                    }}
                  >
                    Patient
                  </MDBTabsLink>
                </MDBTabsItem>
                <MDBTabsItem>
                  <MDBTabsLink
                    onClick={() => handleUserTypeClick("doctor")}
                    active={userType === "doctor"}
                    style={{
                      backgroundColor: userType === "doctor" ? "#471e75" : "#893be3",
                      color: "white",
                    }}
                  >
                    Doctor
                  </MDBTabsLink>
                </MDBTabsItem>
              </MDBTabs>
            </div>
            {userType === "patient" ? (
              // patient Login Form
              <PatientLogin />
            ) : (
              // doctor Login Form
              <DoctorLogin />
            )}
          </MDBTabsPane>

          <MDBTabsPane show={loginRegisterActive === "register"}>
            <PatientRegistration />
          </MDBTabsPane>
        
        </MDBTabsContent>

      </div>
    </div>
  );
}

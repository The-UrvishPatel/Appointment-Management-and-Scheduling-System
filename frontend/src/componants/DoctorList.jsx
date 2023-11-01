import React from "react";
import { useNavigate } from "react-router-dom";
import './search.css'

const DoctorList = (props) => {

    let doctors = props.doctors
    
    const navigate = useNavigate();

    const handleOnClick = (doctor) => {

        localStorage.setItem('unity-doctor-id-click',doctor._id);
        navigate('/slotSelection');
    }

    return (
      <div className="doctor-card-container">
        {doctors.map((doctor, index) => (
          <div key={index} onClick={() => {handleOnClick(doctor)}} className="doctor-card">
            <h3 style={{fontWeight: "600"}}>Name : {doctor.name}</h3>
            <span style={{margin: "10px"}}>Location: {doctor.venue}</span>
            <span style={{margin: "10px"}}>Specialty: {doctor.speciality}</span>
            <span style={{margin: "10px"}}>Email: {doctor.email}</span>
          </div>
        ))}
      </div>
    );
};

export default DoctorList;
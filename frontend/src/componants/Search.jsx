import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import DoctorList from "./DoctorList";
import axios from "axios";
import './search.css'
import { MDBInput, MDBBtn } from "mdb-react-ui-kit";
import Footer from "./Footer";
import Navbar from './Navbar';

const Search = () => {
    const [doctors, setDoctors] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredDoctors, setFilteredDoctors] = useState([]);

    
    const navigate = useNavigate()

    useEffect(() => {
      const fetchData = async () => {
        await axios
          .get("http://127.0.0.1:5000/doctor/list")
          .then((response) => {
            console.log(response.data.doctorsList);
            setDoctors(response.data.doctorsList);
            setFilteredDoctors(response.data.doctorsList);
          })
          .catch((err) => {
            console.log(err);
          });
      };
      fetchData();
    },[]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = doctors.filter((doctor) =>
        doctor.name.toLowerCase().includes(query.toLowerCase()) ||
        doctor.email.toLowerCase().includes(query.toLowerCase()) || 
        doctor.speciality.toLowerCase().includes(query.toLowerCase()) ||
        doctor.venue.toLowerCase().includes(query.toLowerCase())
        // doctor.location.toLowerCase().includes(query.toLowerCase()) ||
    );
    setFilteredDoctors(filtered);
  };


  return (
    <>
    <Navbar />
    <div className="search-container">
      <h1 className="title">Doctor's List</h1>
      <input
        type="text"
        placeholder="Search by name, location, or specialty"
        value={searchQuery}
        onChange={(e) => handleSearch(e.target.value)}
        className="search-box"
      />
      <DoctorList doctors={filteredDoctors} />
    </div>
      <Footer />
    </>
  );
};

export default Search;

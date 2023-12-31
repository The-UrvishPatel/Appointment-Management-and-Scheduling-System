import React from 'react'
import { useNavigate } from 'react-router-dom';
import { MDBInput, MDBBtn } from "mdb-react-ui-kit";
import DoctorProfilePage from './DoctorProfilePage';
import "./dashboard.css"
import Footer from './Footer'

function AdminDashboard() {

    const navigate = useNavigate()

  return (
    <div>
        <div className='dashboard-navigation'>
          <MDBBtn onClick={()=>{ navigate("/calendar") }} style={{background: "#471e75", margin:0, fontWeight: 600}} block>Calendar</MDBBtn>
          <MDBBtn onClick={()=>{ navigate("/") }} style={{background: "#471e75", margin: 0, fontWeight: 600}} block>Home</MDBBtn>
      </div>
      <DoctorProfilePage/>
      <Footer />
    </div>
  )
}

export default AdminDashboard;

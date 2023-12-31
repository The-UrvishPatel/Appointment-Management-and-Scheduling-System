import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminProfilePage from "./componants/AdminProfilePage";
import LandingPage from "./componants/LandingPage";
import Form from "./componants/Form";
import Layout from "./componants/Layout";
import AdminLogin from "./componants/AdminLogin";
import "./App.css";
import AdminDashboard from "./componants/AdminDashboard";
import PatientDashboard from "./componants/PatientDashboard";
import DoctorDashboard from "./componants/DoctorDashboard";
import Calendar from "./componants/Calendar";
import DoctorRegistration from "./componants/DoctorRegistration";
import Search from "./componants/Search";
import SlotSelection from "./componants/SlotSelection"
import ChooseSlots from "./componants/ChooseSlots"
import Footer from "./componants/Footer";

function App() {

  


  return (
    <>
      <div className='App'>
        <BrowserRouter>

          <Routes>

            <Route path='/' element={<Layout />}>
              <Route index path='/' element={<LandingPage />} />
              <Route path='/form' element={<Form />} />
              <Route path='/about' element={<Footer />} />

            </Route>
            

            <Route path='/adminprofile' element={<AdminProfilePage />} />
            <Route path='/adminLogin' element={<AdminLogin />} />
            <Route path='/adminDashboard' element={<AdminDashboard />} />
            <Route path='/doctorRegistration' element={<DoctorRegistration />} />
            <Route path='/patientDashboard' element={<PatientDashboard />} />
            <Route path='/doctorDashboard' element={<DoctorDashboard />} />
            <Route path='/calendar' element={<Calendar />} />
            <Route path='/bookAppointment' element={<Search />} />
            <Route path='/slotSelection' element={<ChooseSlots />} />
            
            <Route
              path='/calender'
              element={<Calendar startAccessor='start' endAccessor='end' />}
            />

          </Routes>
          
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;

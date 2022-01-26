import { useState, useEffect } from "react";
import { BiCalendar } from "react-icons/bi"
import Search from "./components/Search"
import AddAppointment from "./components/AddAppointment"
import "./App.css"

const App = () => {
  const [appointmentList, setAppointmentList] = useState([]);

  const getAppointments = async () => {
     const response = await fetch("data.json")
     const data = await response.json();
     setAppointmentList(data);
  }
  useEffect(() => {
    getAppointments();
  }, []);

  return (
    <div className="App container mx-auto mt-3 font-thin">
      <h1 className="text-5xl mb-3">
        <BiCalendar className="inline-block text-red-400 align-top" />Your Appointments
      </h1>
      <AddAppointment />
      <Search />
      {appointmentList.map(
        appointment=>(
          <h1 key={appointment.id}>{appointment.petName}</h1>
        )
      )}
    </div>
  );
}

export default App;

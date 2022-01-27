import { useState, useEffect } from "react";
import { BiCalendar } from "react-icons/bi";
import Search from "./components/Search";
import AddAppointment from "./components/AddAppointment";
import AppointmentInfo from "./components/AppointmentInfo";
import "./App.css";

const App = () => {
  const [appointmentList, setAppointmentList] = useState([]);

  const getAppointments = async () => {
    const url = 'data.json'
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      // body: JSON.stringify({ listId, description, order }),
    };
    const response = await fetch(url, requestOptions);
    const data = await response.json();
    setAppointmentList(data);
  };
  useEffect(() => {
    getAppointments();
  }, []);

  return (
    <div className="App container mx-auto mt-3 font-thin">
      <h1 className="text-5xl mb-3">
        <BiCalendar className="inline-block text-red-400 align-top" />
        Your Appointments
      </h1>
      <AddAppointment />
      <Search />
      <ul className="divide-y divide-gray-200">
        {appointmentList.map((appointment) => (
          <AppointmentInfo key={appointment.id} appointment={appointment}/>
        ))}
      </ul>
    </div>
  );
};

export default App;

import { useState, useEffect } from "react";
import { BiCalendar } from "react-icons/bi";
import Search from "./components/Search";
import AddAppointment from "./components/AddAppointment";
import AppointmentInfo from "./components/AppointmentInfo";
import "./App.css";

const App = () => {
  const [appointmentList, setAppointmentList] = useState([]);
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("petName");
  const [orderBy, setOrderBy] = useState("asc");

  const filteredList = appointmentList
    .filter(
      (appointment) =>
        appointment.petName.toLowerCase().includes(query.toLowerCase()) ||
        appointment.ownerName.toLowerCase().includes(query.toLowerCase()) ||
        appointment.aptNotes.toLowerCase().includes(query.toLowerCase())
    )
    .sort((a, b) => {
      let order = orderBy === "asc" ? 1 : -1;
      return a[sortBy].toLowerCase() < b[sortBy].toLowerCase()
        ? -1 * order
        : order;
    });

  const getAppointments = async () => {
    const url = "data.json";
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
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
      <Search
        query={query}
        onQueryChange={(myQuery) => setQuery(myQuery)}
        sortBy={sortBy}
        onSortByChange={(mySortBy) => setSortBy(mySortBy)}
        orderBy={orderBy}
        onOrderByChange={(myOrderBy) => setOrderBy(myOrderBy)}
      />
      <ul className="divide-y divide-gray-200">
        {filteredList.map((appointment) => (
          <AppointmentInfo
            key={appointment.id}
            appointment={appointment}
            onDelete={(id) => {
              setAppointmentList(
                appointmentList.filter((appointment) => appointment.id !== id)
              );
            }}
          />
        ))}
      </ul>
    </div>
  );
};

export default App;

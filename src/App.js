import './App.css';
import React, { useEffect, useState } from 'react';

function App() {
  // This are the state variables for the project
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [guestList, setGuestList] = useState([]);
  const [loading, setLoading] = useState(true);

  const baseUrl = 'https://guest-list-krisztina-komocsin.herokuapp.com';

  // Getting all guests
  useEffect(() => {
    async function getGuestList() {
      // I am fetching the backend server to get my list of guests
      const response = await fetch(`${baseUrl}/guests`);
      const allGuests = await response.json();

      setGuestList(allGuests);
      setLoading(false);
    }
    getGuestList().catch(() => {});
  }, []);

  // Creating new guest

  async function newGuest() {
    const response = await fetch(`${baseUrl}/guests`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ firstName: firstName, lastName: lastName }),
    });
    const createdGuest = await response.json();
    setFirstName('');
    setLastName('');

    setGuestList([...guestList, createdGuest]);
  }
  // Submitting the form

  const onSubmit = (event) => {
    event.preventDefault();
  };

  // Updating guest
  function updateAttendance(id, status) {
    async function updateGuest() {
      const response = await fetch(`${baseUrl}/guests/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ attending: true }),
      });
      const updatedGuest = await response.json();

      const guestListCopy = [...guestList];
      const findGuest = guestListCopy.find((guest) => guest.id === id);
      findGuest.attending = true;

      console.log(findGuest);

      setGuestList(guestListCopy);
      return updatedGuest;
    }
  }
  // Deleting guest
  function handleDelete(id) {
    async function deleteGuest() {
      const response = await fetch(`${baseUrl}/guests/${id}`, {
        method: 'DELETE',
      });
      const deletedGuest = await response.json();
      console.log(deletedGuest);
    }
    const updatedList = guestList.filter((guest) => guest.id !== id);
    setGuestList(updatedList);
  }
  return (
    <div className="App">
      <h1>GUEST LIST</h1>
      <form onSubmit={onSubmit}>
        <input
          placeholder="First Name"
          value={firstName}
          onChange={(event) => setFirstName(event.currentTarget.value)}
        />
        <input
          placeholder="Last Name"
          value={lastName}
          onChange={(event) => setLastName(event.currentTarget.value)}
        />
        <button
          onClick={() => {
            newGuest().catch(() => {});
          }}
          className="button-add"
        >
          Add guest
        </button>
      </form>
      {guestList.map((guest) => {
        return (
          <li key={guest.id}>
            {guest.firstName} {guest.lastName}
            {guest.attending}
          </li>
        );
      })}
    </div>
  );
}

export default App;

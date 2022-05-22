/* eslint-disable react/hook-use-state */
import './App.css';
import React, { useEffect, useState } from 'react';

const baseUrl = 'http://localhost:4000';

function App() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  useEffect(() => {
    async function getGuests() {
      const response = await fetch(`${baseUrl}/guests`);
      const allGuests = await response.json();
      const cleanedUsers = await allGuests.map((user) => {
        return {
          name: user.firstName.first,
          surname: user.lastName.last,
          id: user.id,
          attending: user.attending,
        };
      });
      setGuests(cleanedUsers);
    }
    getGuests();
  }, []);

  return (
    <div className="App">
      <h1>GUEST LIST</h1>
      <form
        className="guest-list"
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <div>
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
          <button className="button-add">Add guest</button>
          <button>Remove guest</button>
          <input
            aria-label={`${guest.firstName} ${guest.lastName} ${guest.attending}`}
          />
        </div>
      </form>
    </div>
  );
}

export default App;

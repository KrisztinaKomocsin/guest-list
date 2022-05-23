import './App.css';
import React, { useEffect, useState } from 'react';

function App2() {
  // This are the state variables for the project
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [guestList, setGuestList] = useState([]);
  const [loading, setLoading] = useState(true);

  const baseUrl = 'https://guest-list-krisztina-komocsin.herokuapp.com';

  //getting all guests
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

  //create new guest

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
  //submitting the form

  const onSubmit = (event) => {
    event.preventDefault();
  };
  // updating guest
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

export default App2;

/*function App() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [guestList, setGuestList] = useState([]);
  const [loading, setLoading] = useState(true);

  const baseUrl = 'http://localhost:4000';

  //getting all guests

  useEffect(() => {
    async function getGuestList() {
      const response = await fetch(`${baseUrl}/guests`);
      const allGuests = await response.json();

      setGuestList(allGuests);
      setLoading(false);
    }
    getGuestList().catch(() => {});
    //getGuestList();
  }, []);

  //create new guest

  async function newGuest() {
    const response = await fetch(`${baseUrl}/guests`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ firstName: 'firstName', lastName: 'lastName' }),
    });
    const createdGuest = await response.json();
    setFirstName('');
    setLastName('');

    setGuestList([...guestList, createdGuest]);
  }

  //submitting the form
}

const onSubmit = (event) => {
  event.preventDefault();
};
//updating guest
async function updatedGuest() {
  const response = await fetch(`${baseUrl}/guests/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ attending: true }),
  });
  const updatedGuest = await response.json();
  console.log(updatedGuest);
  const guestListCopy = [...guestList];
  const findGuest = guestListCopy.find((guest) => guest.id === id);
  findGuest.attending = true;

  console.log(findGuest);

  setGuestList(guestListCopy);
  return updatedGuest;
}

// removing Guest

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
    <form onSubmit={event}>
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
  </div>
);

export default App;*/

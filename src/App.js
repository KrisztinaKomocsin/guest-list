import './App.css';

function App() {
  return (
    <div className="App">
      <h1>GUEST LIST</h1>
      <div className="Form">
        <div className="guestName">
          <input
            placeholder="First Name"
            //value={firstName}
            // onChange={(event) => setTopText(event.currentTarget.value)}
          />
          <input
            placeholder="Last Name"
            //value={lastName}
            //onChange={(event) => setBottomText(event.currentTarget.value)}
          />
          <button>Return</button>
          <button>Remove</button>
        </div>
      </div>
    </div>gi
  );
}

export default App;

import React from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [peer, setPeer] = React.useState<string>("");
  const [ws, setWS] = React.useState<WebSocket>();

  React.useEffect(() => {
    const ws = new WebSocket("ws://localhost:7545");
    ws.onopen = () => {
      console.log("Connected :)");
    };
    ws.onclose = () => {
      console.log("dis connected :(");
    };
    ws.onmessage = () => {
      console.log("on message");
    };
    setWS(ws);
  }, []);

  const onAddPeer = React.useCallback(() => {
    fetch("http://localhost:8080/addToPeer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        peer,
      }),
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [peer]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <input placeholder="peer" onChange={(e) => setPeer(e.target.value)} />
        <button onClick={onAddPeer}>connected</button>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer">
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

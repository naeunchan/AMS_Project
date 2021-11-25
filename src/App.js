import { useState } from "react";

function App() {
    const [username, setUsername] = useState(null);

    return <div className="App">{username ? username : "hello"}</div>;
}

export default App;

import React from "react";
import Greeting from "./components/Greeting";
import Counter from "./components/Counter";
import Form from "./components/Form";

function App() {
  return (
    <div>
      <Greeting name="Huma" />
      <Greeting name="John" />
      <Counter />
      <Form />
    </div>
  );
}

export default App;

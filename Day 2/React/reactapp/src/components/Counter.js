import React, { useState, useEffect } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("Component Mounted or Updated");

    return () => {
      console.log("Component Will Unmount (Cleanup)");
    };
  }, [count]); // Runs whenever `count` changes

  function increase() {
    setCount(count + 1);
  }
  return (
    <div>
      <h2>Timer: {count}</h2>
      <button onClick={increase}>Increase</button>
    </div>
  );
}

export default Counter;

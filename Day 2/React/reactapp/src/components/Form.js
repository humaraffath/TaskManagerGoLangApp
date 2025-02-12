import { useState } from "react";

const Form = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
  });

  const handleChange = (e) => {
    setData({
      ...data, //spread previous state
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); //stops reloading
    alert(`Name: ${data.name}, Email: ${data.email}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label> Enter your name: </label>
      <input
        type="text"
        name="name"
        value={data.name} //""
        onChange={handleChange}
      />
      <label> Enter your email: </label>
      <input
        type="email"
        name="email"
        value={data.email} //""
        onChange={handleChange}
      />
      <button type="submit"> Submit </button>
    </form>
  );
};
export default Form;

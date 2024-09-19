import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "./features/userSlice";

function App() {
  const User = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const [user, setUser] = useState("");
  function handlerSubmit(e) {
    e.preventDefault();
    dispatch(addUser(user));
  }
  return (
    <section className="flex justify-center items-center flex-col">
      <h1>{User ? `Hello, ${User}` : "No user added"}</h1> {/* Display User */}
      <form onSubmit={handlerSubmit}>
        <input
          type="text"
          value={user}
          onChange={(e) => {
            setUser(e.target.value);
          }}
          placeholder="Enter username"
        />
        <button type="submit">Add user</button>
      </form>
    </section>
  );
}

export default App;

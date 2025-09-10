import React, { useState } from "react";

export default function Users() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || age === "") {
      return alert("Malumotlarni kirigizin");
    }
    if (Number(age) < 0) {
      return alert("Min yosh 0");
    }

    if (editingUser) {
      
      const updatedUsers = users.map((user) =>
        user.id === editingUser.id ? { ...user, name, age: Number(age) } : user
      );
      setUsers(updatedUsers);
      setEditingUser(null);
    } else {
      
      const newUser = {
        id: Date.now(),
        name,
        age: Number(age),
      };
      setUsers([...users, newUser]);
    }    
    setName("");
    setAge("");
  };

  const handleDelete = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const handleUpdate = (user) => {
    setName(user.name);
    setAge(user.age);
    setEditingUser(user);
  };

  const cancelEdit = () => {
    setName("");
    setAge("");
    setEditingUser(null);
  };

  return (
    <section className="max-w-[1152px] mx-auto mt-[40px] grid grid-cols-3 gap-6">
      <div className="col-span-1 bg-purple-500 p-6 rounded-2xl text-white">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {editingUser ? "Update User" : "Add User"}
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Name"
            className="p-3 rounded-[12px] text-gray-800"
          />
          <input
            required
            value={age}
            onChange={(e) => setAge(e.target.value)}
            type="number"
            placeholder="Age"
            className="p-3 rounded-[12px] text-gray-800"
          />

          <div className="flex gap-3">
            <button className="flex-1 bg-yellow-400 text-gray-900 font-semibold py-2 rounded-[12px]">
              {editingUser ? "Update" : "Submit"}
            </button>
            {editingUser && (
              <button
                type="button"
                onClick={cancelEdit}
                className="flex-1 bg-red-500 text-white font-semibold py-2 rounded-[12px]"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      
      <div className="col-span-2 bg-gray-50 p-6 rounded-2xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          User List
        </h2>
        {users.length === 0 ? (
          <p className="text-center text-gray-500">No users yet...</p>
        ) : (
          <div className="grid gap-6 grid-cols-2">
            {users.map((user) => (
              <div key={user.id} className="p-5 bg-white rounded-[12px]">
                <h3 className="text-xl font-bold text-gray-800">{user.name}</h3>
                <p className="text-gray-600 mt-1">{user.age} years old</p>

                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() => handleUpdate(user)}
                    className="flex-1 bg-blue-600  text-white py-2 rounded-[12px]"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="flex-1 bg-red-500 text-white py-2 rounded-[12px]"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

"use client";
import { useState, useEffect } from "react";
import type { FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import { addUser, editUser } from "../redux/slice";
import type { User } from "../types/user";

type FormProps = {
  editData: User | null;
  onCancelEdit: () => void;
  onClose: () => void;
};

export default function UserForm({
  editData,
  onCancelEdit,
  onClose,
}: FormProps) {
  const dispatch = useDispatch();

  const users = useSelector((state: RootState) => state.users.users);
  console.log("User:",users);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  // Edit mode
  useEffect(() => {
    if (editData) {
      setName(editData.name);
      setPhone(editData.phone);
      setEmail(editData.email);
    } else {
      setName("");
      setPhone("");
      setEmail("");
    }
  }, [editData]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (name.trim() === "" || phone.trim() === "" || email.trim() === "") {
      alert("Please fill all fields");
      return;
    }

    if (editData) {
      const updatedUser: User = {
        id: editData.id,
        name: name,
        phone: phone,
        email: email,
      };

      dispatch(editUser(updatedUser));

      alert("User Updated Successfully");

      onCancelEdit();
    } else {
      const newUser: User = {
        id: String(
          users.length > 0
            ? Math.max(...users.map((user) => Number(user.id))) + 1
            : 1,
        ),

        name: name,
        phone: phone,
        email: email,
      };

      dispatch(addUser(newUser));

      alert("User Added Successfully");
    }

    setName("");
    setPhone("");
    setEmail("");
  };

  return (
    <div>
      <hr />
      <div className="close">
        <h2>Add New User</h2>
        <button className="close-btn" onClick={onClose}>
          {" "}
          ✖
        </button>
      </div>
      <form className="user-form" onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>

          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label>Phone:</label>

          <input
            type="tel"
            placeholder="Enter your phone.no"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div>
          <label>Email:</label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="button add-button">
            {editData ? "Update User" : "Add User"}
          </button>

          {editData && (
            <button
              className="button delete-button"
              type="button"
              onClick={() => {
                onCancelEdit();
                setName("");
                setPhone("");
                setEmail("");
              }}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

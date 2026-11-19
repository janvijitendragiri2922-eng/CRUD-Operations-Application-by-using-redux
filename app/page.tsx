"use client";
import UsersTable from "./components/Table";
import UserForm from "./components/Form";
import type { RootState } from "./redux/store";
import type { User } from "./types/user";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function Home() {
  const users = useSelector((state: RootState) => state.users.users);
  const [showForm, setShowForm] = useState(false);
  const [editUser, setEditUser] = useState<User | null>(null);
  const handleEdit = (user: User) => {
    console.log("Selected user:", user);
    setEditUser(user);
    setShowForm(true);
  };

  return (
    <div>
      <main>
        <h2> CRUD Application by using Redux</h2>
        <br />
        <div className="user-header">
          <h2 className="h2">Users List</h2>
          <button
            className="button add-button"
            onClick={() => {
              setEditUser(null);
              setShowForm(true);
            }}
          >
            +Add User
          </button>
        </div>
        {showForm && (
          <UserForm
            editData={editUser}
            onClose={() => {
              setEditUser(null);
              setShowForm(false);
            }}
            onCancelEdit={() => {
              setEditUser(null);
              setShowForm(false);
            }}
          />
        )}

        <UsersTable users={users} onEdit={handleEdit} />
      </main>
    </div>
  );
}

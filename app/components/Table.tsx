"use client";
import { useDispatch } from "react-redux";
import { deleteUser } from "../redux/slice";
import { User } from "../types/user";
type Props = {
  users: User[];
  onEdit: (user: User) => void;
};
export default function UsersTable({ users, onEdit }: Props) {
  const dispatch = useDispatch();

  return (
    <section>
      <div className="table-wrap">
        <table>
          <thead>
            <tr >
              <th>ID</th>
              <th>Name</th>
              <th>Mobile No.</th>
              <th>Email Id</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr className="inside" 
                  key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.phone}</td>

                <td>{user.email}</td>
                <td>
                  <button
                    type="button"
                    className="button update-button"
                    onClick={() => onEdit(user)}
                  >
                    Edit
                  </button>
                  <hr />
                  <button
                    type="button"
                    className="button delete-button"
                    onClick={() => dispatch(deleteUser(user.id))}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

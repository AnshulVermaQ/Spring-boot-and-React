import React, { useState } from "react";
import toast from "react-hot-toast";
import { deleteUser } from "../../Services/UserService";

const UserList = ({ users = [], setUsers }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const deleteUserById = async (userId) => {
    try {
      const response = await deleteUser(userId);
      if (response.status === 200) {
        const updatedUsers = users.filter((user) => user.userId !== userId);
        setUsers(updatedUsers);
        toast.success("User deleted");
      } else {
        toast.error("Failed to delete user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Error deleting user");
    }
  };

  return (
    <div className="container-fluid px-3" style={{ maxWidth: "100%" }}>
      <div className="row">
        <div className="input-group mb-3">
          <input
            type="text"
            name="keyword"
            id="keyword"
            placeholder="Search by name or email"
            className="form-control"
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
            style={{
              borderRadius: "5px 0 0 5px",
              borderRight: "none",
            }}
          />
          <span
            className="input-group-text"
            style={{
              backgroundColor: "#ffc107",
              borderRadius: "0 5px 5px 0",
            }}
          >
            <i className="bi bi-search"></i>
          </span>
        </div>
      </div>

      <div
        className="row g-3"
        style={{
          maxHeight: "calc(95vh - 150px)",
          overflowY: "auto",
        }}
      >
        {filteredUsers.map((user, index) => (
          <div key={index} className="col-12">
            <div
              className="card p-3"
              style={{
                backgroundColor: "#343a40",
                color: "white",
                borderRadius: "10px",
                boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
              }}
            >
              <div className="d-flex align-items-center">
                <div className="flex-grow-1">
                  <h5 className="mb-1" style={{ color: "#ffc107" }}>
                    {user.name}
                  </h5>
                  <p className="mb-0">{user.email}</p>
                  <small style={{ color: "#adb5bd" }}>{user.role}</small>
                </div>
                <div>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteUserById(user.userId)}
                    style={{ marginLeft: "10px" }}
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {filteredUsers.length === 0 && (
          <div className="text-center text-muted mt-3">No users found</div>
        )}
      </div>
    </div>
  );
};

export default UserList;

import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import Spinner from "../../Shared/Spinner/Spinner";

const Users = () => {
  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/users`);
      const data = await res.json();
      return data;
    },
  });

  const handleMakeAdmin = (id, email) => {
    fetch(`http://localhost:5000/users/admin/${id}`, {
      method: "PUT",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.acknowledged) {
          toast.success(`${email} is given the admin rights.`);
          // if a user document is modified refetch the users
          refetch();
        }
      });
  };

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div>
      <h1 className="text-3xl mb-4">All Users</h1>
      {/* show users */}
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Admin</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {user.role !== "admin" && (
                    <button
                      onClick={() => handleMakeAdmin(user._id, user.email)}
                      className="btn btn-xs btn-secondary"
                    >
                      Make Admin
                    </button>
                  )}
                </td>
                <td>
                  <button className="btn btn-xs btn-error">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;

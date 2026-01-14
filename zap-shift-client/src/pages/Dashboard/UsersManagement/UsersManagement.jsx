// import { useQuery } from '@tanstack/react-query';
// import React from 'react';
// import useAxiosSecure from '../../../hooks/useAxiosSecure';
// import { FaUserShield } from 'react-icons/fa';
// import Swal from 'sweetalert2';



// const UsersManagement = () => {
// const axiosSecure= useAxiosSecure();

// const { refetch , data : users = [] } = useQuery({
//     queryKey : ['users', searchText],
//     queryFn : async() => {
//         const res = await axiosSecure
//     .get(`/users?searchText=${searchText}`
//     );
//    return res.data;

//     }
// })

// const  handleMakeAdmin = user => {
// const roleInfo = {role: 'admin'}
//  // todo ;must ask for confirmatiom before proceed
// axiosSecure.patch(`/users/${user._id}/role`, roleInfo)  
// .then(res =>{
//     console.log(res.data); 
//   if(res.data.modifiedCount){
//      refetch()

//     Swal.fire({
//              position: "top-end",
//              icon: "success",
//              title: `${user.displayName} Marked as Admin`,
//              showConfirmButton: false,
//              timer: 2000
//            });

//   }

// })

// }

// const handleRemoveAdmin = user => {
//   const roleInfo = {role: 'user'}
//   // todo ;must ask for confirmatiom before proceed
//   axiosSecure.patch(`/users/${user._id}/role`, roleInfo)
//    .then(res => {
//    if (res.data.modifiedCount){
//     refetch();
//      Swal.fire({
//              position: "top-end",
//              icon: "success",
//              title: `${user.displayName} Remove from Admin`,
//              showConfirmButton: false,
//              timer: 2000
//            });
//    }

//    })

// }

//   return (
//     <div>

// <h2 className='text-4xl'> Manage Users{users.length}</h2>
// <div className="overflow-x-auto">
//   <table className="table">
//     {/* head */}
//     <thead>
//       <tr>
//         <th>
//            #
//         </th>
//         <th>User</th>
//         <th>Email</th>
//          <th>Role</th>
//         <th>Admin Actions</th>
//         <th>Other Actions</th>
//       </tr>
//     </thead>
//     <tbody>
//       {users.map((user, index) => <tr>
//         <td>
//         { index + 1}
//         </td>
//         <td>
//             {user.email}
//         </td>
//    <td>
//             {user.role}
//         </td>
//          <td>
//             {user.role === 'admin' ? <button 
//             onClick = {() => handleRemoveAdmin(Admin)}
//      className = 'btn bg-red-400'>
//                <FaShieldOff></FaShieldOff>
//             </button> : 
//                <button 
//                onClick = { () => handleMakeAdmin(Admin)}
//                className = 'btn bg-green-500'>
//                 <FaUserShield></FaUserShield>
//             </button>}
//         </td>

      
//         <td>Admin</td>
//         <th>
//         Actions
//         </th>
//       </tr> )}
     
     
     
    
//     </tbody>
//   </table>
// </div>
//     </div>
//   );
// };

// export default UsersManagement;

import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaUserShield, FaShieldAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';

const UsersManagement = () => {
  const axiosSecure = useAxiosSecure();
  const [searchText, setSearchText] = useState('');

  // Fetch all users with search
  const { refetch, data: users = [] } = useQuery({
    queryKey: ['users', searchText],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?searchText=${searchText}`);
      return res.data;
    },
  });

  // Make Admin
  const handleMakeAdmin = (user) => {
    const roleInfo = { role: 'admin' };

    axiosSecure.patch(`/users/${user._id}/role`, roleInfo).then((res) => {
      if (res.data.modifiedCount) {
        refetch();
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: `${user.displayName || user.email} is now an Admin`,
          showConfirmButton: false,
          timer: 2000,
        });
      }
    });
  };

  // Remove Admin
  const handleRemoveAdmin = (user) => {
    const roleInfo = { role: 'user' };

    axiosSecure.patch(`/users/${user._id}/role`, roleInfo).then((res) => {
      if (res.data.modifiedCount) {
        refetch();
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: `${user.displayName || user.email} is no longer Admin`,
          showConfirmButton: false,
          timer: 2000,
        });
      }
    });
  };

  return (
    <div>
      <h2 className="text-4xl mb-4">
        Manage Users ({users.length})
      </h2>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search user..."
        className="input input-bordered mb-4 w-full max-w-xs"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>#</th>
              <th>User</th>
              <th>Email</th>
              <th>Role</th>
              <th>Admin Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>

                <td>{user.displayName || "No Name"}</td>

                <td>{user.email}</td>

                <td>{user.role}</td>

                <td>
                  {user.role === 'admin' ? (
                    <button
                      onClick={() => handleRemoveAdmin(user)}
                      className="btn bg-red-400 text-white"
                    >
                      <FaShieldAlt />
                    </button>
                  ) : (
                    <button
                      onClick={() => handleMakeAdmin(user)}
                      className="btn bg-green-500 text-white"
                    >
                      <FaUserShield />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersManagement;

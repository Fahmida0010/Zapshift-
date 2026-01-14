import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaEye, FaTrash, FaUserCheck } from 'react-icons/fa';
import { IoPersonRemoveSharp } from "react-icons/io5";
import Swal from 'sweetalert2';

const ApproveRiders = () => {
const axiosSecure = useAxiosSecure();
 

  const { refetch, data: riders = [] } = useQuery({
    queryKey: ['riders', 'pending'],
    queryFn: async () => {
      const res = await axiosSecure.get('/riders');
      return res.data;
    }
  });

  // ----------------------------
  // Update Rider Status Function
  // ----------------------------
  const updateRiderStatus = (rider, status) => {
    const updateInfo = {
      status: status,
      email: rider.email
    };

    axiosSecure.patch(`/riders/${rider._id}`, updateInfo)
      .then(res => {
        if (res.data.modifiedCount) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `Rider status set to ${status}.`,
            showConfirmButton: false,
            timer: 2000
          });
        }
      });
  };

  // Approve
  const handleApproval = (rider) => {
    updateRiderStatus(rider, 'approved');
  };

  // Reject
  const handleRejection = (rider) => {
    updateRiderStatus(rider, 'rejected');
  };

  // Delete
  const handleDelete = (id) => {
    console.log("Delete rider:", id);
  };


  return (
    <div>
      <h2 className="text-5xl mb-4">
        Riders Pending Approval: {riders.length}
      </h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
                <th>District</th>
              <th>Application Status</th>
              <th>Work Status</th>
              <th>Actions</th>  
            </tr>
          </thead>

          <tbody>
            {riders.map((rider, index) => (
              <tr key={rider._id}>
                <td>{index + 1}</td>
                <td>{rider.name}</td>
                <td>{rider.email}</td>
                  <td>{rider.district}</td>
                <td>
    <p
      className={`${rider.status === 'approved'
       ? 'text-green-800'
            : 'text-red-500'
                      }`}
                  >
                    {rider.status}
                  </p>
                </td>
              

                <td className="flex gap-2">
                   <button
                    className="btn">
                    <FaEye></FaEye>
                  </button>
                  
                  <button
        onClick={() => handleApproval(rider._id)}
                    className="btn"
                  >
                    <FaUserCheck />
                  </button>

                  <button
                    onClick={() => handleRejection(rider._id)}
                    className="btn"
                  >
                    <IoPersonRemoveSharp />
                  </button>

                  <button
                    onClick={() => handleDelete(rider._id)}
                    className="btn"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
   
    </div>
  
  
   
    
  );
};

export default ApproveRiders;



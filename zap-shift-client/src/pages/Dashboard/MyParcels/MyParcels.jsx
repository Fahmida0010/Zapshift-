import React from 'react'
import useAuth from '../../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { FaMagnifyingGlass } from "react-icons/fa6";
import Swal from 'sweetalert2';
import { Link } from 'react-router';

const MyParcels = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: parcels = [] , refetch } = useQuery({
    queryKey: ['my-parcels', user?.email],
   // enabled:!!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user.email}`);
      return res.data;
    }
  });

const handleParcelDelete = (id) => {
   // console.log('id');
Swal.fire({
  title: "Are you sure?",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, delete it!"
}).then((result) => {
  if (result.isConfirmed) {

 axiosSecure
 .delete(`/parcels/${id}`)
 .then(res => {
   console.log(res.data);

   if (res.data.deletedCount){
    refetch();
   }
 })
    Swal.fire({
      title: "Deleted!",
      text: "Your Parcel request has been deleted.",
      icon: "success"
    });
  }
});
}
const handlePayment =async(parcel)=>{
 const paymentInfo={
  cost : parcel.cost,
  parcelId: parcel._id,
  senderEmail: parcel.senderEmail,
  parcelName: parcel.parcelName,
  trackingId : parcel.trackingId
 }
 const res = await axiosSecure.
 post('/payment-checkout-session', paymentInfo);
 // console.log(res.data.url);
window.location.assign(res.data.url);

}
  return (
    <div>
      <h2 className='p-4'>All of my Parcels: {parcels.length}</h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Cost</th>
              <th>Payment </th>
              <th>Tracking Id</th>
              <th>Delivery Status</th>
                <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {
              parcels.map((parcel, index) =>
                <tr key={parcel._id}>   {/* fixed key */}
                  <th>{index + 1}</th>
                  <td>{parcel.parcelName}</td>
                  <td>{parcel.cost}</td>
                  <td>
                    {
           parcel.paymentStatus==='paid'?
           <span className='text-green-500'>paid</span>
                      :
      
      <button 
      onClick = {()=>handlePayment(parcel)}
      className='btn btn-primary'>
        Pay</button>  
               }
        <td>
  <Link to = {`/parcel-track/${parcel.tracking}`}>
  {parcel.trackingId}</Link>
        </td>
                  </td>
                  <td>{parcel.trackingId}</td>
             <td>{parcel.deliveryStatus}</td>

     <button className='btn btn-square hover:bg-primary'></button>
                  <FaMagnifyingGlass></FaMagnifyingGlass>
        <button className='btn btn-square hover:bg-primary'></button>
            <FaEdit></FaEdit>
   <button
   onClick ={ () => handleParcelDelete(parcel._id)}
    className='btn btn-square hover:bg-primary'>
    </button>
            <FaTrashAlt/>

  <td/>
                </tr>
              )
            }
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default MyParcels;


import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const PaymentHistory = () => {

 const {user} = useAuth();
    const axiosSecure = useAxiosSecure()    
    const {data:payments = []}= useQuery({
    queryKey : ['payments', user.email ],
      queryFn: async() => {
        const res = await 
 axiosSecure.get(`/payments?email=${user.email}`)
  return res.data;


      }

    })


  return (
   <div className="overflow-x-auto">
  <table className="table table-zebra">
    {/* head */}
    <thead>
      <tr>
        <th></th>
        <th>Name</th>
        <th>Amount</th>
        <th>Transaction Id</th>
         <th>Paid Time</th>
      </tr>
    </thead>
    <tbody>
    
    {
        payments.map((payment, index) => <tr
     key ={payment._id}>
        <th>{index + 1 }</th>
        <td>{payment.parcelName}</td>
        <td>{payment.amount}</td>
        <td>{payment.transactionId}</td>
        <td>{new Date(payment.paidAt).toLocaleString()}</td>

      </tr> )
    }
     

    </tbody>
  </table>
</div>
  );
};

export default PaymentHistory;
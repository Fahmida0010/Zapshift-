import React from 'react';
import useAuth from '../hooks/useAuth';
import useRole from '../hooks/useRole';
import Loading from '../components/Loading/Loading';

const RiderRoutes = ({children}) => {
const {loading, user } = useAuth();
 const {role, roleLoading  } = useRole()


if (loading || !user || roleLoading){
    return <Loading></Loading>
}

 if(role !=='rider'){
  return <Forbidden></Forbidden>  
 }

   
 
  return (
    <div>


    </div>
  );
};

export default RiderRoutes;
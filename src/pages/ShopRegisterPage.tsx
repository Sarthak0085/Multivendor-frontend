// import React, { useEffect } from 'react'
// import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import ShopCreate from "../components/Shop/ShopCreate";

import ShopRegister from "../components/Shop/Auth/ShopRegister"

const ShopRegisterPage = () => {
//   const navigate = useNavigate();
//   const { isSeller,seller } = useSelector((state) => state.seller);

//   useEffect(() => {
//     if(isSeller === true){
//       navigate(`/shop/${seller._id}`);
//     }
//   }, [])
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <ShopRegister />
      </div>
    </div>
  )
}

export default ShopRegisterPage
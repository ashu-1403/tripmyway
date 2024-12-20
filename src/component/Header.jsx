import React, { useEffect } from 'react';
import logo from '../assets/logo.svg';
import {Button} from "../components/ui/button";

function Header() {
  const user = JSON.parse(localStorage.getItem('user'|| "null"));
  useEffect(()=>{
      console.log(user)
  },[])
  return (
    <div className='p-2 shadow-sm flex justify-between items-center px-5'>
      <div className='flex items-center gap-2'>
      <img src={logo} alt="Company Logo" />
      <h2 className=' font-bold text- cursor-default'>TripMyWay</h2>

      </div>
      <div>
       {user ? 
       <div className='flex gap-4'>
        <Button variant = "outline" className="" > My trips</Button>
        <img src={user?.picture}  className="h-10 w-10 rounded-full" alt="" />

       </div>:<Button>Sign In</Button>
       }
      </div>
      
      
    </div>
  );
}

export default Header;

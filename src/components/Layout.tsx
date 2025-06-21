
import Sidebar from './SidebarAdmin';
import Navbar from './NavbarAdmin';
import { Outlet } from 'react-router-dom';

const LayoutAdmin = () => {

  return (
    <div
    className="relative h-screen w-full overflow-x-hidden"
 
  >
   
  
    <div className="flex h-full bg-base-300">
      <div className="flex-shrink-0 h-full z-50 shadow-md">
        <Sidebar  />
      </div>
      <div className="flex flex-col w-full h-full">
        <div className="flex shadow-md sticky top-0 z-50">
          <Navbar />
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          <Outlet />
         <div className='w-full flex justify-center my-5'>
          <a href="#" target="_blank" rel="noopener noreferrer">  &copy; STUPER @{new Date().getFullYear()}</a>
         </div>
        </div>
      </div>
    </div>
  
  </div>
  
  );
};

export default LayoutAdmin;
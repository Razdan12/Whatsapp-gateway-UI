import { FC } from 'react';
import { BsFillBellFill } from 'react-icons/bs';
import { CiCircleList, CiSun } from 'react-icons/ci';
import { FaMoon } from 'react-icons/fa';

const Navbar = () => {
  return (
    <div className="navbar bg-base-100 shadow-sm px-5">
      <div className="navbar-start">
        <label
          htmlFor="my-drawer-2"
          className="drawer-button lg:hidden text-xl cursor-pointer"
        >
          <CiCircleList />
        </label>
      </div>

      <div className="navbar-end gap-4">
       
        <button className="btn btn-ghost btn-circle">
          <div className="indicator">
            <BsFillBellFill className="text-xl" />
            <span className="badge badge-xs badge-primary indicator-item"></span>
          </div>
        </button>
        <div className="avatar">
          <div className="w-10 ring-primary ring-offset-base-100 rounded-full ring ring-offset-2">
            <img
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              alt="avatar"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

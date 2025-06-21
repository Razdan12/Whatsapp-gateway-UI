import React, { useEffect, useState } from 'react';
import { RiCloseLargeFill } from 'react-icons/ri';
import { iconMapping } from './IconMapping';
import { Link } from 'react-router-dom';

import { sidebarList } from '@/constant/SidebarItems';

interface Menu {
  label: string;
  path: string;
  icon: string;
  subLabel?: Subtitle[];
  permission?: string[];
}

type Subtitle = {
  label: string;
  path: string;
  permission?: string[];
};

interface SidebarProps {
  logo: string;
}

const Sidebar = () => {
  const Side = sessionStorage.getItem('side') || '/';
  const [data, setData] = useState<any[]>(sidebarList);
  const [activeMenuItem, setActiveMenuItem] = useState<string>(Side);

  const handleMenuItemClick = (name: string) => {
    setActiveMenuItem(name);
    sessionStorage.setItem('side', name);
  };

  //   useEffect(() => {
  //     setData(
  //       sidebarList.filter((item) =>
  //         item.permission?.some(
  //           (permission) => sessionStorage.getItem(permission) === 'true'
  //         )
  //       )
  //     );
  //   }, []);

  return (
    <div>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          />
          <ul className="menu w-60 bg-base-100 min-h-screen shadow top-0 sticky">
            <div className="w-full p-4 flex justify-between mb-10 items-center pb-6">
              <div className="flex justify-start items-start gap-1 w-full">
                
                <span className="text-lg font-bold">Admin Panel</span>
              </div>
              <label
                htmlFor="my-drawer-2"
                className="text-3xl font-bold lg:hidden"
              >
                <RiCloseLargeFill />
              </label>
            </div>
            <ul className="menu w-full text-base gap-2">
              {data.map((item: Menu, index: number) => (
                <React.Fragment key={`menu-${index}`}>
                  {item.subLabel && item.subLabel.length > 0 ? (
                    <li className="">
                      <details>
                        <summary>
                          <span className='text-xl' >{iconMapping[item.icon]}</span>
                          <a>{item.label}</a>
                        </summary>
                        <ul>
                          {item.subLabel?.map(
                            (subItem: Subtitle, subIndex: number) => (
                              <Link to={subItem.path} key={`link-${subIndex}`}>
                                <li
                                  className={`transition duration-200 ${
                                    activeMenuItem === subItem.path
                                      ? 'bg-green-100  rounded-xl text-base-100 border-r-4 border-green-500'
                                      : ''
                                  }`}
                                  onClick={() =>
                                    handleMenuItemClick(subItem.path)
                                  }
                                >
                                  <p>{subItem.label}</p>
                                </li>
                              </Link>
                            )
                          )}
                        </ul>
                      </details>
                    </li>
                  ) : (
                    <Link to={item.path} key={`link-${index}`}>
                      <li
                        className={` transition duration-200 ${
                          activeMenuItem === item.path
                            ? 'bg-green-100  rounded-xl text-base-100 border-r-4 border-green-500'
                            : ''
                        }`}
                        onClick={() => handleMenuItemClick(item.path)}
                      >
                        <div className='flex items-center gap-2'>
                          <span className='text-xl' >{iconMapping[item.icon]}</span>
                          <p>{item.label}</p>
                        </div>
                      </li>
                    </Link>
                  )}
                </React.Fragment>
              ))}
            </ul>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

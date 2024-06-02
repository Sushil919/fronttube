import PropTypes from 'prop-types';
import { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { BiChevronDown } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { HiMenuAlt3 } from "react-icons/hi";
import { AiOutlineClose, AiOutlineLogout } from "react-icons/ai";
import { Link } from "react-router-dom";
import CustomButton from "./CustomButton";
import { useSelector } from "react-redux";

function MenuList({ user, onClick }) {
  const handleLogout = () => {
    // Dispatch logout action
  };

  return (
    <div>
      <Menu as="div" className="inline-block text-left">
        <div className="flex">
          <Menu.Button className="inline-flex gap-2 w-full rounded-md bg-white md:px-4 py-2 text-sm font-medium text-gray-700 hover:bg-opacity-20 ">
            <div className="leading[80px] flex flex-col items-start">
              <p className="text-sm font-semibold ">
                {user?.firstName ?? user?.name}
              </p>
              <span className="text-sm text-red-600 ">
                {user?.jobTitle ?? user?.email}
              </span>
            </div>

            <img
              src={user?.profileUrl}
              alt="user profile"
              className="w-10 h-10 rounded-full object-cover "
            />
            <BiChevronDown
              className="h-8 w-8 text-gray-600"
              aria-hidden="true"
            />
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute z-50 right-2 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg focus:outline-none ">
            <div className="p-1 ">
              <Menu.Item>
                {({ active }) => (
                  <Link
                    to={`${
                      user?.accountType ? "user-profile" : "company-profile"
                    }`}
                    className={`${
                      active ? "bg-red-500 text-white" : "text-gray-900"
                    } group flex w-full items-center rounded-md p-2 text-sm`}
                    onClick={onClick}
                  >
                    <CgProfile
                      className={`${
                        active ? "text-white" : "text-gray-600"
                      } mr-2 h-5 w-5  `}
                      aria-hidden="true"
                    />
                    {user?.accountType ? "User Profile" : "Company Profile"}
                  </Link>
                )}
              </Menu.Item>

              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => handleLogout()}
                    className={`${
                      active ? "bg-red-500 text-white" : "text-gray-900"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    <AiOutlineLogout
                      className={`${
                        active ? "text-white" : "text-gray-600"
                      } mr-2 h-5 w-5  `}
                      aria-hidden="true"
                    />
                    Log Out
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}

MenuList.propTypes = {
  user: PropTypes.shape({
    firstName: PropTypes.string,
    name: PropTypes.string,
    jobTitle: PropTypes.string,
    email: PropTypes.string,
    profileUrl: PropTypes.string,
    accountType: PropTypes.string,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};

const Navbar = () => {
  const user = useSelector((state) => state.user.user); // Corrected user selector
  const [isOpen, setIsOpen] = useState(false);

  const handleCloseNavbar = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <div className="relative bg-[#FF0000] z-50">
        <nav className="container mx-auto flex items-center justify-between p-5">
          <div>
            <Link to="/" className="text-white font-bold text-xl">
              Crew<span className="text-gray-900">Tube</span>
            </Link>
          </div>

          <ul className="hidden lg:flex gap-10 text-base">
            <li>
              <Link to="/">Showcase Talent</Link>
            </li>
            <li>
              <Link to="/companies">Browse Creators</Link>
            </li>
            <li>
              <Link to="/upload-job">Post a Job</Link>
            </li>
            <li>
              <Link to="/about-us">About Us</Link>
            </li>
          </ul>

          <div className="hidden lg:block">
            {!user?.token ? (
              <Link to="/user-auth">
                <CustomButton
                  title="Sign In"
                  containerStyles="text-white py-1.5 px-5 focus:outline-none hover:bg-red-700 hover:text-white rounded-full text-base border border-white"
                />
              </Link>
            ) : (
              <div>
                <MenuList user={user} onClick={handleCloseNavbar} />
              </div>
            )}
          </div>

          <button
            className="block lg:hidden text-white"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            {isOpen ? <AiOutlineClose size={26} /> : <HiMenuAlt3 size={26} />}
          </button>
        </nav>

        {/* MOBILE MENU */}
        <div
          className={`${
            isOpen ? "absolute flex bg-[#FF0000]" : "hidden"
          } container mx-auto lg:hidden flex-col pl-8 gap-3 py-5`}
        >
          <Link to="/" onClick={handleCloseNavbar}>
            Showcase Talent
          </Link>
          <Link to="/companies" onClick={handleCloseNavbar}>
            Browse Creators
          </Link>
          <Link
            onClick={handleCloseNavbar}
            to={
              user?.accountType === "seeker" ? "applly-gistory" : "upload-job"
            }
          >
            {user?.accountType === "seeker" ? "Applications" : "Upload Job"}
          </Link>
          <Link to="/about-us" onClick={handleCloseNavbar}>
            About Us
          </Link>

          <div className="w-full py-10">
            {!user?.token ? (
              <a href="/user-auth">
                <CustomButton
                  title="Sign In"
                  containerStyles="text-white py-1.5 px-5 focus:outline-none hover:bg-red-700 hover:text-white rounded-full text-base border border-white"
                />
              </a>
            ) : (
              <div>
                <MenuList user={user} onClick={handleCloseNavbar} />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
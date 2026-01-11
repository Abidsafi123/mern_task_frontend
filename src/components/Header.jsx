import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser, reset } from "../features/auth/authSlice";
import { toast } from "react-toastify";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //  correct selector
  const { user } = useSelector((state) => state.auth);

  //  logout handler
  const onLogout = () => {
    dispatch(logoutUser());
    toast.success(`${user.username} you has been logged out`)
    dispatch(reset());
    navigate("/login");
  };

  return (
    <header data-aos='fade-down' className="flex justify-between mx-5 items-center py-3 border-b-2">
      <h1 className="text-2xl font-semibold cursor-pointer" onClick={()=> navigate('/')} data-aos='fade-right'>Task Creator</h1>

      <ul className="flex gap-4">
        {user ? (
        <li>
  <button
    onClick={onLogout}
    className="flex items-center gap-2 text-white uppercase rounded px-2 py-1 bg-black cursor-pointer"
  >
    <FaSignOutAlt size={20} />
    <span className="text-xl" >Logout</span>
  </button>
</li>

            
          
        ) : (
          <>
            <li className="flex items-center gap-2">
            
              <Link to="/login">
                 <button
                className="flex items-center gap-2 text-white uppercase rounded px-3 py-2 bg-black cursor-pointer"
              >
                <FaSignOutAlt size={20} />
                <span className="text-xl">Login</span>
              </button>
               
              </Link>
            </li>

             <li className="flex items-center gap-2">
            
              <Link to="/register">
                 <button
                className="flex items-center gap-2 text-white uppercase rounded px-3 py-2 bg-black cursor-pointer"
               
              >
                <FaSignOutAlt size={20} />
                <span className="text-xl">Register</span>
              </button>
               
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
};

export default Header;

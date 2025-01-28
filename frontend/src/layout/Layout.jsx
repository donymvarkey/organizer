import { BookmarkIcon, LogOutIcon } from "lucide-react";
import Avatar from "../components/Avatar";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/authSlice";
import { clearLocalStorage } from "../api/LocalStorage";
import { Link, useNavigate } from "react-router";

const Layout = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const signOutUser = async () => {
    dispatch(logout());
    clearLocalStorage();
    navigate("/auth/signin");
  };

  return (
    <div className="max-w-screen max-h-screen px-10">
      <div className="py-5 flex items-center justify-between">
        <div className="flex items-center">
          <BookmarkIcon className="w-8 h-8 text-indigo-600" />
          <span className="ml-2 text-xl font-bold text-gray-900">
            Organizer
          </span>
        </div>
        <div className="flex items-center gap-x-2">
          <Link
            to={"/profile"}
            className="flex items-center justify-center gap-2"
            href="/profile"
          >
            <Avatar size="sm" name={user?.name} />
            <span>{user?.name}</span>
          </Link>

          <button
            className="bg-indigo-600 text-white flex items-center justify-center gap-2 rounded-md px-4 py-2"
            onClick={signOutUser}
          >
            <LogOutIcon className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </div>
      <div className="w-full">{children}</div>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;

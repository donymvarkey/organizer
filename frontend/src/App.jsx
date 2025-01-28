import { useEffect } from "react";
import AppRoutes from "./Routes";
import { checkIfAuthenticated } from "./helpers";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { setToken, setUser } from "./store/authSlice";
import { getItemFromLocalStorage } from "./api/LocalStorage";
import { userProfileApi } from "./api";

const App = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (checkIfAuthenticated()) {
      const accessToken = getItemFromLocalStorage("access_token");
      userProfileApi().then((data) => {
        dispatch(setUser(data?.data));
      });
      dispatch(setToken(accessToken));
      navigate("/dashboard");
    }
  }, []);
  return (
    <div>
      <AppRoutes />
    </div>
  );
};

export default App;

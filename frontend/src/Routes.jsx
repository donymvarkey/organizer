import { Routes, Route } from "react-router";
import Landing from "./pages/Landing";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import List from "./pages/List";
import ProtectedRoute from "./components/PrivateRoute";
import { checkIfAuthenticated } from "./helpers";
import Profile from "./pages/Profile";

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        exact
        element={<ProtectedRoute isAuthenticated={checkIfAuthenticated()} />}
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/list/:collectionId" element={<List />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
      <Route path="/" element={<Landing />} />
      <Route path="/auth/signin" element={<SignIn />} />
      <Route path="/auth/signup" element={<SignUp />} />
    </Routes>
  );
};

export default AppRoutes;

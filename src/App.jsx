import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from "react-router-dom";

import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import Home from "./pages/Home";
import { useEffect, useState } from "react";
import { auth, db } from "./firebase/config";
import { doc, getDoc } from "firebase/firestore";
import Rootlayout from "./layout/Rootlayout";
import Dashboard from "./pages/Dashboard";

const App = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true); // I can handle the state of the app using the loading screen to know if a user is authenticated

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserDetails(docSnap.data());
        } else {
          setUserDetails(null);
          console.log("User data Not Found, Please sign-up");
        }
      } else {
        setUserDetails(null);
        console.log("User is not logged in");
      }
      setLoading(false); // So if User is authenticated, we Set loading state to false
    });

    return () => unsubscribe(); // Cleanup function to unsubscribe from onAuthStateChanged
  }, []);

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div>Loading...</div>
      </div>
    );
  }

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Rootlayout />}>
        <Route index element={<Home />} />
        <Route
          path="/dashboard"
          element={
            userDetails ? (
              <Dashboard id={userDetails.id} />
            ) : (
              <Navigate to="/log-in" />
            )
          }
        />
        <Route
          path="/sign-up"
          element={userDetails ? <Navigate to="/dashboard" /> : <SignUp />}
        />
        <Route
          path="/log-in"
          element={userDetails ? <Navigate to="/dashboard" /> : <LogIn />}
        />
      </Route>
    )
  );

  // console.log(userDetails);

  return <RouterProvider router={router} />;
};

const styles = {
  loadingContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh", // Here we set the height of the loading container to the entire screen
  },
};

export default App;

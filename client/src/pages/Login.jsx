import { Button, Typography } from "@mui/material";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { Navigate } from "react-router-dom";
import { graphqlRequest } from "../utils/request";

const Login = () => {
  const handleLoginWithGoogle = async () => {
    const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();
    const {
      user: { uid, displayName },
    } = await signInWithPopup(auth, googleProvider);

    const data = await graphqlRequest({
      query: `mutation Register($uid: String!, $name: String!) {
      register(uid: $uid, name: $name) {
        uid
        name
      }
    }
    `,
      variables: { uid, name: displayName },
    });
    console.log("graphqlRequest Register ~ data:", data);
  };

  if (localStorage.getItem("accessToken")) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Typography variant="h5" sx={{ marginBottom: "10px" }}>
        Welcome to Note App
      </Typography>
      <Button variant="outlined" onClick={handleLoginWithGoogle}>
        Sign in with Google
      </Button>
    </>
  );
};

export default Login;

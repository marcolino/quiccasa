import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { Auth } from "aws-amplify";
import { AuthContext } from "../../providers/AuthProvider";

const SignOut = () => {
  const history = useHistory();
  const { setAuth } = useContext(AuthContext);

  Auth.signOut()
    .then((data) => {
      console.log('signed out');
      setAuth({isAuthenticated: false, user: null})
      history.push("/");
    })
    .catch((err) => {
      alert(err.message);
      console.log(err);
    })
  ;

  return null;
};

export default SignOut;

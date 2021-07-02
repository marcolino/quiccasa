import { useHistory } from "react-router-dom";
import { Auth } from "aws-amplify";

const SignOut = () => {
  const history = useHistory();

  Auth.signOut()
    .then((data) => {
      console.log('signed out');
      history.push("/signin");
    })
    .catch((err) => {
      alert(err.message);
      console.log(err);
    })
  ;

  return null;
};

export default SignOut;

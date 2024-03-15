import useField from "../hooks/useField";
import useSignup from "../hooks/useSignup";
import { useNavigate } from "react-router-dom";

const Signup = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const email = useField("email");
  const password = useField("password");
  const firstName = useField("firstName");
  const lastName = useField("lastName");
  const phoneNumber = useField("phoneNumber");
  const role = useField("role")
  const { signup, error } = useSignup("/api/users/signup");

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await signup({ email: email.value, password: password.value, firstName: firstName.value, 
      lastName: lastName.value, phoneNumber: phoneNumber.value, role: role.value });
    if (!error) {
      console.log("success");
      setIsAuthenticated(true);
      navigate("/");
    }
  };

  return (
    <>
      <form className="signup" onSubmit={handleFormSubmit}>
        <h3>Sign Up</h3>
        <label>Email address:</label>
        <input {...email} />
        <label>Password:</label>
        <input {...password} />
        <label>First name:</label>
        <input {...firstName} />
        <label>Last name:</label>
        <input {...lastName} />
        <label>Phone:</label>
        <input {...phoneNumber} />
        <label>role:</label>
        <input {...role} />
        <button>Sign up</button>
      </form>
    </>
  );
};

export default Signup;
import { useEffect, useState } from "react";
import Joi from "joi";
import "./App.css";

const firstNameSchema = Joi.string()
  .required()
  .min(5)
  .label("First Name")
  .messages({
    "string.empty": `Your {#label} can not be empty`,
    "string.min": `Your {#label} has to be at least {#limit} chars`,
  });

const lastNameSchema = Joi.string()
  .required()
  .min(5)
  .label("Last Name")
  .messages({
    "string.empty": `Your {#label} can not be empty`,
    "string.min": `Your {#label} has to be at least {#limit} chars`,
  });

const emailSchema = Joi.string()
  .required()
  .email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  })
  .label("Email")
  .messages({
    "string.empty": `Your {#label} can not be empty`,
  });

const passwordSchema = Joi.string()
  .required()
  .pattern(/^[a-zA-Z0-9]{3,30}$/)
  .label("Password")
  .messages({
    "string.empty": `Your {#label} can not be empty`,
    "string.pattern.base": `Your {#label} should be alphanumeric and within 3 to 30 characters`,
  });

const confirmPasswordSchema = Joi.string()
  .required()
  .pattern(/^[a-zA-Z0-9]{3,30}$/)
  .label("Confirm Password")
  .messages({
    "string.empty": `Your {#label} can not be empty`,
    "string.pattern.base": `Your {#label} should be alphanumeric and within 3 to 30 characters`,
  });

const schema = Joi.object({
  username: Joi.string()
    .alphanum()
    .pattern(/^[a-zA-Z0-9]{3,30}$/)
    .min(8)
    .max(30)
    .required()
    .label("Username")
    .messages({
      "string.pattern.base":
        "Your {#label} does not matche the suggested pattern",
      "string.base": `Your {#label} should match the suggested pattern`,
      "string.alphanum": `Your {#label} must only contain alpha-numeric characters`,
      "string.empty": `Your {#label} can not be empty`,
      "string.min": `Your {#label} has to be at least {#limit} chars`,
      "string.max": `Your {#label} can not be more then {#limit} chars`,
      "any.required": `Your {#label} is required`,
    }),
  password: Joi.string().pattern(/^[a-zA-Z0-9]{3,30}$/),
  repeat_password: Joi.ref("password"),
  access_token: [Joi.string(), Joi.number()],
  birth_year: Joi.number().integer().min(1900).max(2013),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
})
  .options({ abortEarly: false })
  .with("username", "birth_year")
  .xor("password", "access_token")
  .with("password", "repeat_password");

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

function App() {
  const [profileInfo, setProfileInfo] = useState(initialState);
  const [profileInfoError, setProfileInfoError] = useState(initialState);

  useEffect(() => {
    const data = {
      username: "123saasffdaf ad sadf asdf adsf123saasffdaf ad sadf asdf adsf123saasffdaf ad sadf asdf adsf123saasffdaf ad sadf asdf adsf123saasffdaf ad sadf asdf adsf",
      password: "",
      repeat_password: "password",
      birth_year: 0,
    };
    const validate = schema.validate(data);
    console.log({ validate: validate.error });
  });

  const handleChange = (e) => {
    setProfileInfo((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleError = (key, value, schema) => {
    try {
      Joi.attempt(value, schema);
      return true;
    } catch (error) {
      setProfileInfoError({
        ...initialState,
        [key]: error.message,
      });
      return false;
    }
  };

  const validateField = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    switch (name) {
      case "firstName":
        handleError(name, value, firstNameSchema);
        break;
      case "lastName":
        handleError(name, value, lastNameSchema);
        break;
      case "email":
        handleError(name, value, emailSchema);
        break;
      case "password":
        handleError(name, value, passwordSchema);
        break;
      case "confirmPassword":
        const valid = handleError(name, value, confirmPasswordSchema);
        if(valid && profileInfo.password !== profileInfo.confirmPassword) {
          setProfileInfoError({
            ...initialState,
            [name]: 'Confirm Password should match password.',
          });
        } else if (valid) {
          setProfileInfoError(initialState);
        }
        break;
      default:
        setProfileInfoError(initialState);
    }
  };

  return (
    <div className="App">
      <div>
        <label>First Name: </label>
        <input
          type="text"
          value={profileInfo.firstName}
          name="firstName"
          onChange={handleChange}
          onBlur={validateField}
        />
        {profileInfoError.firstName && <p>{profileInfoError.firstName}</p>}
      </div>
      <div>
        <label>Last Name: </label>
        <input
          type="text"
          value={profileInfo.lastName}
          name="lastName"
          onChange={handleChange}
          onBlur={validateField}
        />
        {profileInfoError.lastName && <p>{profileInfoError.lastName}</p>}
      </div>
      <div>
        <label>Email: </label>
        <input
          type="email"
          value={profileInfo.email}
          name="email"
          onChange={handleChange}
          onBlur={validateField}
        />
        {profileInfoError.email && <p>{profileInfoError.email}</p>}
      </div>
      <div>
        <label>Password: </label>
        <input
          type="password"
          value={profileInfo.password}
          name="password"
          onChange={handleChange}
          onBlur={validateField}
        />
        {profileInfoError.password && <p>{profileInfoError.password}</p>}
      </div>
      <div>
        <label>Confirm Password: </label>
        <input
          type="password"
          value={profileInfo.confirmPassword}
          name="confirmPassword"
          onChange={handleChange}
          onBlur={validateField}
        />
        {profileInfoError.confirmPassword && (
          <p>{profileInfoError.confirmPassword}</p>
        )}
      </div>
    </div>
  );
}

export default App;

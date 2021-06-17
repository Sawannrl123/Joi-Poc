import { useState } from "react";
import Joi from "joi";

const prefixSchema = Joi.string().required().label("Prefix").messages({
  "string.empty": `Your {#label} can not be empty`,
});

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

const schemaObj = {
  prefixSchema,
  firstNameSchema,
  lastNameSchema,
  emailSchema,
  passwordSchema,
  confirmPasswordSchema
}

const schema = Joi.object(schemaObj).options({ abortEarly: false });

const initialState = {
  prefix: "",
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

function JoiValidation() {
  const [profileInfo, setProfileInfo] = useState(initialState);
  const [profileInfoError, setProfileInfoError] = useState(initialState);

  const handleChange = (e) => {
    setProfileInfo((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleError = (key, value, schema) => {
    try {
      Joi.attempt(value, schema);
      setProfileInfoError((prevState) => ({
        ...prevState,
        [key]: "",
      }));
      return true;
    } catch (error) {
      setProfileInfoError((prevState) => ({
        ...prevState,
        [key]: error.message,
      }));
      return false;
    }
  };

  const validateField = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    switch (name) {
      case "prefix":
        handleError(name, value, prefixSchema);
        break;
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
        if (valid && profileInfo.password !== profileInfo.confirmPassword) {
          setProfileInfoError((prevState) => ({
            ...prevState,
            [name]: "Confirm Password should match password.",
          }));
        } else if (valid) {
          setProfileInfoError((prevState) => ({
            ...prevState,
            confirmPassword: "",
          }));
        }
        break;
      default:
        console.log("Default");
    }
  };

  const handleSubmit = () => {
    const { error: { details } = {} } = schema.validate(profileInfo);
    if (details) {
      const errorObj = details.reduce(
        (initial, current) => ({
          ...initial,
          [current.path[0]]: current.message,
        }),
        initialState
      );
      setProfileInfoError(errorObj);
    } else {
      setProfileInfoError(initialState);
      alert("Validated");
    }
  };

  return (
    <div className="Joi">
      <div>
        <label>Prefix: </label>
        <select name="prefix" value={profileInfo.prefix} onBlur={validateField} onChange={handleChange} >
          <option value="">Prefix</option>
          <option value="mr">Mr</option>
          <option value="ms">Ms</option>
          <option value="mrs">Mrs</option>
        </select>
        {profileInfoError.prefix && <p>{profileInfoError.prefix}</p>}
      </div>
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
      <button onClick={handleSubmit}>Continue</button>
    </div>
  );
}

export default JoiValidation;

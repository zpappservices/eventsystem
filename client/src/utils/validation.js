const validateContact = (form, setError) => {
  const newError = {};

  if (!form.email) {
    newError.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(form.email)) {
    newError.email = "Please enter a valid email";
  }

  if (!form.phone) {
    newError.phone = "Phone number is required";
  } else if (!/^\+?[0-9]{1,4}?[-.\s]?[0-9]+$/.test(form.phone)) {
    newError.phone = "Please enter a valid phone number";
  }

  setError(newError);
  return Object.keys(newError).length === 0;
};

const validateTicket = (form, setError) => {
  const newError = {};

  if (!form.name) {
    newError.name = "Ticket name is required";
  }
  if (!form.type) {
    newError.type = "Ticket type is required";
  }
  if (!form.quantity) {
    newError.quantity = "Ticket Quantity is required";
  }
  if (!form.price) {
    newError.price = "Ticket price is required";
  }

  console.log(newError);

  setError(newError);
  return Object.keys(newError).length === 0;
};

const checkComplete = (fields) => {
  let isValid = true;

  Object.keys(fields).forEach((field) => {
    const value = fields[field];

    if (typeof value === "string" && value.trim().length < 1) {
      isValid = false;
    }
  });

  return isValid;
};

const validateInfoForm = (form, isChecked, setErrors) => {
  const newErrors = {};

  if (!form.firstName.trim()) newErrors.firstName = "First name is required";
  if (!form.lastName.trim()) newErrors.lastName = "Last name is required";
  if (!form.phone.trim()) newErrors.phone = "Last name is required";

  if (!form.phone.trim()) {
    newErrors.phone = "Phone number is required";
  } else if (form.phone.trim().length !== 11) {
    newErrors.phone = "Mobile number length is invalid";
  }

  if (!form.email.trim()) {
    newErrors.email = "Email is required";
  } else if (!validateEmail(form.email)) {
    newErrors.email = "Enter a valid email address";
  }
  
  if (!isChecked) {
    newErrors.isChecked = "You must accept the Terms and Conditions";
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export {
  validateContact,
  validateTicket,
  checkComplete,
  validateInfoForm,
  validateEmail,
};

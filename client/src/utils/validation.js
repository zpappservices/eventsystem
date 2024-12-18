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
    
    console.log(newError)

  setError(newError);
  return Object.keys(newError).length === 0;
};

export { validateContact, validateTicket };

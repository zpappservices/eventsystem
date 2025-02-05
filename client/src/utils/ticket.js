const createTicketContext = (ticketData) => {
  let quantities = ticketData?.map(() => 0); // Initialize with zero quantities for each type

  const getGrandTotalQuantity = () => {
    return quantities?.reduce((acc, qty) => acc + qty, 0);
  };

  const getTotalCost = () => {
    return ticketData.reduce(
      (acc, ticket, index) => acc + ticket?.price * quantities[index],
      0
    );
  };

  const getEventInfo = () => {
    return ticketData?.map((ticket, index) => ({
      ...ticket,
      quantity: quantities[index], // Add the corresponding quantity
    }));
  };

  const updateQuantity = (index, value) => {
    quantities = [...quantities]; // Create a copy to avoid mutating directly
    quantities[index] = value;
  };

  return {
    getTicketData: () => ticketData,
    setTicketData: (newTicketData) => {
      ticketData = newTicketData;
      quantities = newTicketData.map(() => 0); // Reset quantities
    },
    getQuantities: () => quantities,
    getGrandTotalQuantity,
    getTotalCost,
    updateQuantity,
    getEventInfo,
  };
};

// Example usage
const ticketContext = createTicketContext([
  { name: "General Admission", price: 10 },
  { name: "VIP", price: 20 },
]);

ticketContext.setTicketData([
  { name: "Early Bird", price: 5 },
  { name: "Regular", price: 15 },
]);

export { createTicketContext };

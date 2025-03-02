import React, { createContext, useContext, useState } from "react";

// Create the TicketContext
const TicketContext = createContext();

// TicketProvider to wrap the app or specific components
export const TicketProvider = ({ children }) => {
  const ticketData = [
    { ticketType: "Regular", price: 5000 },
    { ticketType: "VIP", price: 10000 },
    { ticketType: "Silver Table", price: 20000 },
    { ticketType: "Gold Table", price: 50000 },
    { ticketType: "Diamond Table", price: 150000 },
  ];
  const [cart, setCart] = useState([]);

  const [quantities, setQuantities] = useState(
    ticketData.map(() => 0) // Initialize with zero quantities for each type
  );

  // Calculate total quantity
  const grandTotalQuantity = quantities.reduce((acc, qty) => acc + qty, 0);

  // Calculate total cost
  const totalCost = ticketData.reduce(
    (acc, ticket, index) => acc + ticket.price * quantities[index],
    0
  );

  const eventInfo = ticketData.map((ticket, index) => ({
    ...ticket,
    quantity: quantities[index], // Add the corresponding quantity
  }));

  // Update quantity for a specific ticket type
  const updateQuantity = (index, value) => {
    setQuantities((prev) => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
  };

  return (
    <TicketContext.Provider
      value={{
        ticketData,
        quantities,
        grandTotalQuantity,
        totalCost,
        updateQuantity,
        eventInfo,
        cart,
        setCart
      }}
    >
      {children}
    </TicketContext.Provider>
  );
};

// Custom hook to use TicketContext
export const useTicketContext = () => {
  const context = useContext(TicketContext);
  if (!context) {
    throw new Error("useTicketContext must be used within a TicketProvider");
  }
  return context;
};

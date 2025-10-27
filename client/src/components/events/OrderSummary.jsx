import {
  Calendar,
  MapPin,
  Clock,
} from "lucide-react";

const OrderSummary = ({ event, tickets, selectedTickets, platformFee }) => {
  const subtotal = selectedTickets.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const serviceCharges = platformFee || subtotal * 0.01;
  const total = subtotal + serviceCharges;

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-6">
      <div className="mb-6">
        <div className="w-full h-48 bg-gradient-to-r from-orange-400 to-red-500 rounded-lg mb-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="text-center text-white">
              <div className="text-sm mb-2">31 JUN</div>
              <div className="text-2xl font-bold mb-2">ELEGANT EVENT</div>
              <div className="text-sm">CELEBRATION NIGHT</div>
            </div>
          </div>
          <div className="absolute top-4 right-4 text-white text-right">
            <div className="text-xs">YOUR CURATED</div>
            <div className="text-xl font-bold">31</div>
            <div className="text-xs">JUN</div>
          </div>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {event.name}
        </h3>
        <div className="flex items-center text-gray-600 text-sm mb-1">
          <Calendar size={14} className="mr-2" />
          {event.date}
        </div>
        <div className="flex items-center text-gray-600 text-sm mb-1">
          <MapPin size={14} className="mr-2" />
          {event.location}
        </div>
        <div className="flex items-center text-gray-600 text-sm">
          <Clock size={14} className="mr-2" />
          {event.time}
        </div>
      </div>

      <div className="border-t pt-4">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">
          Order Summary
        </h4>

        {selectedTickets.map((ticket) => (
          <div
            key={ticket.id}
            className="flex justify-between items-center mb-2"
          >
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">{ticket.name}</span>
              <span className="text-sm text-gray-400">x{ticket.quantity}</span>
            </div>
            <span className="text-sm font-medium">
              ₦{(ticket.price * ticket.quantity).toLocaleString()}
            </span>
          </div>
        ))}

        <div className="border-t pt-4 mt-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span>₦{subtotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Service charges</span>
            <span>₦{serviceCharges.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-lg font-bold border-t pt-2 mt-2">
            <span>Total Amount</span>
            <span>₦{total.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// import { useState } from "react";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
// import { Label } from "@/components/ui/label";
// import { toast } from "sonner";
// import { motion } from "framer-motion";
// const API_BASE_URL = import.meta.env.VITE_API_URL;
// //const API_BASE_URL = "http://127.0.0.1:8000/api";

// interface OrderResponse {
//   order_number: string;
//   status: string;
//   tracking_link: string;
//   tracking_number: string;
//   customer_name: string;
//   phone: string;
//   total: string;
//   created_at: string;
// }

// const TrackOrder = () => {
//   const [orderNumberInput, setOrderNumberInput] = useState("");
//   const [order, setOrder] = useState<OrderResponse | null>(null);
//   const [loading, setLoading] = useState(false);

//   const handleTrack = async () => {
//     const trimmed = orderNumberInput.trim();
//     if (!trimmed) {
//       toast.error("Please enter your order number");
//       return;
//     }
//     setLoading(true);
//     setOrder(null);
//     try {
//       const res = await fetch(
//         `${API_BASE_URL}/orders/track/${encodeURIComponent(trimmed)}/`
//       );
//       if (!res.ok) {
//         if (res.status === 404) {
//           toast.error("Order not found. Please check your order number.");
//         } else {
//           toast.error("Failed to fetch order details. Please try again.");
//         }
//         return;
//       }
//       const data = await res.json();
//       setOrder(data);
//     } catch (err) {
//       console.error(err);
//       toast.error("Something went wrong. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen container mx-auto px-4 py-8">
//       <motion.h1
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="text-3xl sm:text-4xl font-bold mb-6"
//       >
//         Track Your Order
//       </motion.h1>

//       <Card className="max-w-xl">
//         <CardHeader>
//           <CardTitle>Enter Order Number</CardTitle>
//         </CardHeader>
//         <CardContent className="space-y-4">
//           <div>
//             <Label htmlFor="orderNumber">Order Number</Label>
//             <div className="flex gap-2 mt-1">
//               <Input
//                 id="orderNumber"
//                 value={orderNumberInput}
//                 onChange={(e) =>
//                   setOrderNumberInput(e.target.value.toUpperCase())
//                 }
//                 placeholder="e.g. AS20251212ABCD"
//                 onKeyDown={(e) => e.key === "Enter" && handleTrack()}
//               />
//               <Button onClick={handleTrack} disabled={loading}>
//                 {loading ? "Checking..." : "Track"}
//               </Button>
//             </div>
//           </div>

//           {order && (
//             <div className="mt-4 space-y-3 border-t border-border pt-4">
//               <p className="text-sm">
//                 <span className="font-semibold">Order Number:</span>{" "}
//                 {order.order_number}
//               </p>
//               <p className="text-sm">
//                 <span className="font-semibold">Status:</span>{" "}
//                 {order.status.toUpperCase()}
//               </p>
//               <p className="text-sm">
//                 <span className="font-semibold">Customer:</span>{" "}
//                 {order.customer_name} ({order.phone})
//               </p>
//               <p className="text-sm">
//                 <span className="font-semibold">Total:</span> ₹
//                 {Number(order.total).toLocaleString("en-IN")}
//               </p>
//               <p className="text-sm">
//                 <span className="font-semibold">Placed On:</span>{" "}
//                 {new Date(order.created_at).toLocaleString()}
//               </p>

//               {order.tracking_link ? (
//                 <p className="text-sm">
//                   <span className="font-semibold">Tracking:</span>{" "}
//                   <a
//                     href={order.tracking_link}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-primary underline"
//                   >
//                     Click here to track your shipment
//                   </a>
//                 </p>
//               ) : (
//                 <p className="text-xs text-muted-foreground">
//                   Tracking link is not available yet. Please check back later.
//                 </p>
//               )}
//             </div>
//           )}
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default TrackOrder;
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { motion } from "framer-motion";

const API_BASE_URL = import.meta.env.VITE_API_URL;

interface OrderResponse {
  order_number: string;
  status: string;
  tracking_link: string;
  tracking_number: string;
  customer_name: string;
  phone: string;
  total: string;
  created_at: string;
}

const TrackOrder = () => {
  const [orderNumberInput, setOrderNumberInput] = useState("");
  const [phoneInput, setPhoneInput] = useState("");
  const [orders, setOrders] = useState<OrderResponse[]>([]);
  const [loading, setLoading] = useState(false);

  const handleTrack = async () => {
    const orderNo = orderNumberInput.trim();
    const phone = phoneInput.trim();

    if (!orderNo && !phone) {
      toast.error("Please enter order number or phone number");
      return;
    }

    setLoading(true);
    setOrders([]);

    try {
      const queryParams = new URLSearchParams();
      if (orderNo) queryParams.append("order_number", orderNo);
      if (phone) queryParams.append("phone", phone);

      const res = await fetch(
        `${API_BASE_URL}/orders/track/?${queryParams.toString()}`
      );

      if (!res.ok) {
        if (res.status === 404) {
          toast.error("No orders found. Please check your details.");
        } else {
          toast.error("Failed to fetch order details. Please try again.");
        }
        return;
      }

      const data = await res.json();
      // Wrap single object in array if only one order returned
      setOrders(Array.isArray(data) ? data.slice(0, 4) : [data]);
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen container mx-auto px-4 py-8">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl sm:text-4xl font-bold mb-6"
      >
        Track Your Order
      </motion.h1>

      <Card className="max-w-xl">
        <CardHeader>
          <CardTitle>Enter Order Number or Phone Number</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Order Number Input */}
          <div>
            <Label htmlFor="orderNumber">Order Number</Label>
            <Input
              id="orderNumber"
              value={orderNumberInput}
              onChange={(e) =>
                setOrderNumberInput(e.target.value.toUpperCase())
              }
              placeholder="e.g. AS20251212ABCD"
              onKeyDown={(e) => e.key === "Enter" && handleTrack()}
            />
          </div>

          {/* Phone Input */}
          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              value={phoneInput}
              onChange={(e) => setPhoneInput(e.target.value)}
              placeholder="e.g. 9876543210"
              maxLength={10}
              onKeyDown={(e) => e.key === "Enter" && handleTrack()}
            />
          </div>

          <Button onClick={handleTrack} disabled={loading}>
            {loading ? "Checking..." : "Track"}
          </Button>

          {/* Orders Display */}
          {orders.length > 0 &&
            orders.map((order) => (
              <div
                key={order.order_number}
                className="mt-4 space-y-3 border-t border-border pt-4"
              >
                <p className="text-sm">
                  <span className="font-semibold">Order Number:</span>{" "}
                  {order.order_number}
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Status:</span>{" "}
                  {order.status.toUpperCase()}
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Customer:</span>{" "}
                  {order.customer_name} ({order.phone})
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Total:</span> ₹
                  {Number(order.total).toLocaleString("en-IN")}
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Placed On:</span>{" "}
                  {new Date(order.created_at).toLocaleString()}
                </p>

                {order.tracking_link ? (
                  <p className="text-sm">
                    <span className="font-semibold">Tracking:</span>{" "}
                    <a
                      href={order.tracking_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary underline"
                    >
                      Click here to track your shipment
                    </a>
                  </p>
                ) : (
                  <p className="text-xs text-muted-foreground">
                    Tracking link is not available yet. Please check back later.
                  </p>
                )}
              </div>
            ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default TrackOrder;

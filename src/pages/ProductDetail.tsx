// import { useState, useEffect } from "react";
// import { useParams, Link } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { useCart } from "@/context/CartContext";
// import {
//   ShoppingCart,
//   Plus,
//   Minus,
//   ArrowLeft,
//   Share2,
//   Loader2,
// } from "lucide-react";
// import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
// import { motion } from "framer-motion";
// import { WishlistButton } from "@/components/WishlistButton";
// import {
//   RecentlyViewed,
//   addToRecentlyViewed,
// } from "@/components/RecentlyViewed";
// import { toast } from "sonner";
// import axios from "axios";
// import type { Product as CartProduct } from "@/types/product";

// // --- Types matching Django API Response ---
// interface APIColor {
//   name: string;
//   hex_value: string;
// }

// interface APIImage {
//   image: string;
// }

// interface APIProduct {
//   id: number;
//   name: string;
//   slug: string;
//   description: string;
//   price: string | number;
//   discountPrice: string | number;
//   discountPercent: number;
//   in_stock: boolean;
//   category: number;
//   fabric_type: number | null;
//   category_name: string;
//   fabric_type_name: string | null;
//   images: APIImage[];
//   colors: APIColor[];
// }

// const ProductDetail = () => {
//   const { id } = useParams<{ id: string }>();
//   const [product, setProduct] = useState<APIProduct | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(false);
//   const { cart, addToCart, updateQuantity } = useCart();
//   const [selectedImage, setSelectedImage] = useState(0);
//   const [scale, setScale] = useState(1);
//   const BASE_URL = import.meta.env.VITE_API_URL;

//   // Fetch Product Data
//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         setLoading(true);
//         const response = await axios.get(`${BASE_URL}/products/${id}/detail/`);
//         setProduct(response.data);
//         setError(false);
//       } catch (err) {
//         console.error("Error fetching product:", err);
//         setError(true);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (id) fetchProduct();
//   }, [id]);

//   useEffect(() => {
//     if (product) {
//       addToRecentlyViewed(product.id.toString());
//     }
//   }, [product]);

//   // Check cart status
//   const cartItem = product
//     ? cart.find((item) => item.id === product.id.toString())
//     : null;

//   const handleShare = async () => {
//     if (!product) return;
//     if (navigator.share) {
//       try {
//         await navigator.share({
//           title: product.name,
//           text: product.description,
//           url: window.location.href,
//         });
//       } catch {
//         // User cancelled
//       }
//     } else {
//       navigator.clipboard.writeText(window.location.href);
//       toast.success("Link copied to clipboard!");
//     }
//   };

//   // --- Adapters & Handlers ---
//   const getPrice = (p: APIProduct) =>
//     typeof p.price === "string" ? parseFloat(p.price) : p.price;

//   const getDiscountPrice = (p: APIProduct) =>
//     typeof p.discountPrice === "string"
//       ? parseFloat(p.discountPrice)
//       : p.discountPrice;

//   const handleAddToCart = () => {
//     if (!product) return;

//     const productForCart: CartProduct = {
//       id: product.id.toString(),
//       name: product.name,
//       description: product.description,
//       price: getPrice(product),
//       discountPrice: getDiscountPrice(product),
//       discountPercent: product.discountPercent,
//       inStock: product.in_stock,
//       category: product.category.toString(),
//       fabricType: product.fabric_type
//         ? product.fabric_type.toString()
//         : "Standard",
//       images: product.images.map((img) => img.image),
//       colors: product.colors.map((c) => c.name),
//       category_name: product.category_name,
//       fabric_type_name: product.fabric_type_name,
//     };

//     addToCart(productForCart);
//     toast.success("Added to cart");
//   };

//   const handleIncrement = () => {
//     if (cartItem && product) {
//       updateQuantity(product.id.toString(), cartItem.quantity + 1);
//     } else {
//       handleAddToCart();
//     }
//   };

//   const handleDecrement = () => {
//     if (cartItem && product) {
//       updateQuantity(product.id.toString(), cartItem.quantity - 1);
//     }
//   };

//   // --- Render States ---
//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <Loader2 className="h-8 w-8 animate-spin text-primary" />
//       </div>
//     );
//   }

//   if (error || !product) {
//     return (
//       <div className="min-h-screen container mx-auto px-4 py-16 text-center">
//         <h2 className="text-2xl font-bold mb-4">Product not found</h2>
//         <Link to="/collections">
//           <Button>Back to Collections</Button>
//         </Link>
//       </div>
//     );
//   }

//   // Safe Image Access
//   const currentImageSrc = product.images[selectedImage]?.image || "";
//   const displayPrice = getPrice(product);
//   const displayDiscountPrice = getDiscountPrice(product);

//   return (
//     <div className="min-h-screen container mx-auto px-4 py-4 sm:py-8">
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         className="mb-4 sm:mb-6 flex items-center justify-between"
//       >
//         <Link to="/collections">
//           <Button variant="ghost" className="group">
//             <ArrowLeft className="mr-2 h-4 w-4 transition-smooth group-hover:-translate-x-1" />
//             <span className="hidden sm:inline">Back to Collections</span>
//             <span className="sm:hidden">Back</span>
//           </Button>
//         </Link>
//         <div className="flex items-center gap-2">
//           <Button variant="ghost" size="icon" onClick={handleShare}>
//             <Share2 className="h-5 w-5" />
//           </Button>
//           <WishlistButton
//             productId={product.id.toString()}
//             productName={product.name}
//           />
//         </div>
//       </motion.div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
//         {/* Image Section with Double-Click Zoom */}
//         <motion.div
//           initial={{ opacity: 0, x: -20 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.5 }}
//         >
//           <div className="sticky top-24">
//             <div className="relative aspect-[3/4] overflow-hidden rounded-lg border border-border bg-muted mb-4">
//               {currentImageSrc ? (
//                 <TransformWrapper
//                   initialScale={1}
//                   minScale={1}
//                   maxScale={3}
//                   doubleClick={{ mode: "zoomIn" }}
//                   wheel={{ disabled: true }}
//                   pinch={{ disabled: true }}
//                   panning={{ disabled: scale <= 1 }}
//                   onTransformed={(ref) => {
//                     setScale(ref.state.scale);
//                   }}
//                 >
//                   <TransformComponent
//                     wrapperClass="w-full h-full"
//                     contentClass="w-full h-full"
//                   >
//                     <img
//                       src={currentImageSrc}
//                       alt={product.name}
//                       className="w-full h-full object-cover"
//                     />
//                   </TransformComponent>
//                 </TransformWrapper>
//               ) : (
//                 <div className="flex items-center justify-center h-full text-muted-foreground">
//                   No Image Available
//                 </div>
//               )}

//               {product.discountPercent > 0 && (
//                 <div className="absolute top-4 left-4 bg-red-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg z-10">
//                   {product.discountPercent}% OFF
//                 </div>
//               )}
//               <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-xs backdrop-blur-sm z-10">
//                 Double tap to zoom
//               </div>
//             </div>

//             <div className="grid grid-cols-4 gap-2">
//               {product.images.map((imgObj, index) => (
//                 <button
//                   key={index}
//                   onClick={() => {
//                     setSelectedImage(index);
//                     setScale(1);
//                   }}
//                   className={`aspect-[3/4] overflow-hidden rounded-lg border-2 transition-smooth ${
//                     selectedImage === index
//                       ? "border-primary"
//                       : "border-border hover:border-primary/50"
//                   }`}
//                 >
//                   <img
//                     src={imgObj.image}
//                     alt={`${product.name} view ${index + 1}`}
//                     className="w-full h-full object-cover"
//                   />
//                 </button>
//               ))}
//             </div>
//           </div>
//         </motion.div>

//         {/* Product Info */}
//         <motion.div
//           initial={{ opacity: 0, x: 20 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.5 }}
//           className="space-y-6"
//         >
//           <div>
//             <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
//             <div className="flex items-baseline space-x-3 mb-6">
//               {product.discountPercent > 0 ? (
//                 <>
//                   <span className="text-3xl font-bold text-primary">
//                     ₹{displayDiscountPrice.toLocaleString("en-IN")}
//                   </span>
//                   <span className="text-xl text-muted-foreground line-through">
//                     ₹{displayPrice.toLocaleString("en-IN")}
//                   </span>
//                   <span className="text-sm font-semibold text-green-600">
//                     Save ₹
//                     {(displayPrice - displayDiscountPrice).toLocaleString(
//                       "en-IN"
//                     )}
//                   </span>
//                 </>
//               ) : (
//                 <span className="text-3xl font-bold text-primary">
//                   ₹{displayPrice.toLocaleString("en-IN")}
//                 </span>
//               )}
//             </div>
//           </div>

//           <div className="border-t border-border pt-6">
//             <h3 className="font-semibold mb-3">Product Description</h3>
//             <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
//               {product.description}
//             </p>
//           </div>

//           {/* Colors */}
//           <div className="border-t border-border pt-6">
//             <h3 className="font-semibold mb-3">Color</h3>
//             <div className="flex flex-wrap gap-3">
//               {product.colors.length > 0 ? (
//                 product.colors.map((color) => (
//                   <div
//                     key={color.name}
//                     className="flex items-center gap-2"
//                     title={color.name}
//                   >
//                     <div
//                       className="w-6 h-6 rounded-full border-2 border-border shadow-sm"
//                       style={{ backgroundColor: color.hex_value }}
//                     />
//                     <span className="text-sm text-muted-foreground">
//                       {color.name}
//                     </span>
//                   </div>
//                 ))
//               ) : (
//                 <span className="text-sm text-muted-foreground">Standard</span>
//               )}
//             </div>
//           </div>

//           <div className="border-t border-border pt-6">
//             <h3 className="font-semibold mb-3">Product Details</h3>
//             <dl className="space-y-2">
//               <div className="flex justify-between">
//                 <dt className="text-muted-foreground">Category:</dt>
//                 <dd className="font-medium">{product.category_name}</dd>
//               </div>
//               <div className="flex justify-between">
//                 <dt className="text-muted-foreground">Fabric:</dt>
//                 <dd className="font-medium">
//                   {product.fabric_type_name || "N/A"}
//                 </dd>
//               </div>
//               <div className="flex justify-between">
//                 <dt className="text-muted-foreground">Availability:</dt>
//                 <dd
//                   className={`font-medium ${
//                     product.in_stock ? "text-green-600" : "text-red-600"
//                   }`}
//                 >
//                   {product.in_stock ? "In Stock" : "Out of Stock"}
//                 </dd>
//               </div>
//               <div className="flex justify-between">
//                 <dt className="text-muted-foreground">Product ID:</dt>
//                 <dd className="font-medium font-mono text-sm">{product.id}</dd>
//               </div>
//             </dl>
//           </div>

//           {/* Add to Cart Actions */}
//           <div className="border-t border-border pt-6 space-y-4">
//             {!product.in_stock ? (
//               <Button
//                 size="lg"
//                 disabled
//                 className="w-full text-lg py-6 bg-muted text-muted-foreground"
//               >
//                 Out of Stock
//               </Button>
//             ) : cartItem ? (
//               <div className="flex items-center justify-between bg-primary/10 rounded-lg p-4">
//                 <Button
//                   size="icon"
//                   variant="ghost"
//                   onClick={handleDecrement}
//                   className="h-10 w-10 hover:bg-primary hover:text-primary-foreground"
//                 >
//                   <Minus className="h-5 w-5" />
//                 </Button>
//                 <span className="font-bold text-xl text-primary px-8">
//                   {cartItem.quantity}
//                 </span>
//                 <Button
//                   size="icon"
//                   variant="ghost"
//                   onClick={handleIncrement}
//                   className="h-10 w-10 hover:bg-primary hover:text-primary-foreground"
//                 >
//                   <Plus className="h-5 w-5" />
//                 </Button>
//               </div>
//             ) : (
//               <Button
//                 onClick={handleAddToCart}
//                 size="lg"
//                 className="w-full bg-gradient-primary hover:opacity-90 transition-smooth text-lg py-6"
//               >
//                 <ShoppingCart className="mr-2 h-5 w-5" />
//                 Add to Cart
//               </Button>
//             )}

//             <Link to="/cart" className="block">
//               <Button variant="outline" size="lg" className="w-full">
//                 View Cart
//               </Button>
//             </Link>
//           </div>
//         </motion.div>
//       </div>

//       {/* Recently Viewed */}
//       <RecentlyViewed currentProductId={id || ""} />
//     </div>
//   );
// };

// export default ProductDetail;
import { useState, useEffect, useRef } from "react"; // Added useRef
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import {
  ShoppingCart,
  Plus,
  Minus,
  ArrowLeft,
  Share2,
  Loader2,
} from "lucide-react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { motion } from "framer-motion";
import { WishlistButton } from "@/components/WishlistButton";
import {
  RecentlyViewed,
  addToRecentlyViewed,
} from "@/components/RecentlyViewed";
import { toast } from "sonner";
import axios from "axios";
import type { Product as CartProduct } from "@/types/product";

// ... [Interfaces APIColor, APIImage, APIProduct remain the same] ...
interface APIColor {
  name: string;
  hex_value: string;
}

interface APIImage {
  image: string;
}

interface APIProduct {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: string | number;
  discountPrice: string | number;
  discountPercent: number;
  in_stock: boolean;
  category: number;
  fabric_type: number | null;
  category_name: string;
  fabric_type_name: string | null;
  images: APIImage[];
  colors: APIColor[];
}

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<APIProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { cart, addToCart, updateQuantity } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);

  // State to track if we are currently zoomed in
  const [isZoomed, setIsZoomed] = useState(false);

  const BASE_URL = import.meta.env.VITE_API_URL;

  // ... [Fetch Product & Cart Logic remains the same] ...
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${BASE_URL}/products/${id}/detail/`);
        setProduct(response.data);
        setError(false);
      } catch (err) {
        console.error("Error fetching product:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchProduct();
  }, [id]);

  useEffect(() => {
    if (product) {
      addToRecentlyViewed(product.id.toString());
    }
  }, [product]);

  const cartItem = product
    ? cart.find((item) => item.id === product.id.toString())
    : null;

  const handleShare = async () => {
    if (!product) return;
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.description,
          url: window.location.href,
        });
      } catch {
        /* User cancelled */
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  // ... [Adapters & Handlers remain the same] ...
  const getPrice = (p: APIProduct) =>
    typeof p.price === "string" ? parseFloat(p.price) : p.price;

  const getDiscountPrice = (p: APIProduct) =>
    typeof p.discountPrice === "string"
      ? parseFloat(p.discountPrice)
      : p.discountPrice;

  const handleAddToCart = () => {
    if (!product) return;
    const productForCart: CartProduct = {
      id: product.id.toString(),
      name: product.name,
      description: product.description,
      price: getPrice(product),
      discountPrice: getDiscountPrice(product),
      discountPercent: product.discountPercent,
      inStock: product.in_stock,
      category: product.category.toString(),
      fabricType: product.fabric_type
        ? product.fabric_type.toString()
        : "Standard",
      images: product.images.map((img) => img.image),
      colors: product.colors.map((c) => c.name),
      category_name: product.category_name,
      fabric_type_name: product.fabric_type_name,
    };
    addToCart(productForCart);
    toast.success("Added to cart");
  };

  const handleIncrement = () => {
    if (cartItem && product)
      updateQuantity(product.id.toString(), cartItem.quantity + 1);
    else handleAddToCart();
  };

  const handleDecrement = () => {
    if (cartItem && product)
      updateQuantity(product.id.toString(), cartItem.quantity - 1);
  };

  // ... [Render States remain the same] ...
  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );

  if (error || !product) {
    return (
      <div className="min-h-screen container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Product not found</h2>
        <Link to="/collections">
          <Button>Back to Collections</Button>
        </Link>
      </div>
    );
  }

  const currentImageSrc = product.images[selectedImage]?.image || "";
  const displayPrice = getPrice(product);
  const displayDiscountPrice = getDiscountPrice(product);

  return (
    <div className="min-h-screen container mx-auto px-4 py-4 sm:py-8">
      {/* ... [Header & Navigation remains the same] ... */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mb-4 sm:mb-6 flex items-center justify-between"
      >
        <Link to="/collections">
          <Button variant="ghost" className="group">
            <ArrowLeft className="mr-2 h-4 w-4 transition-smooth group-hover:-translate-x-1" />
            <span className="hidden sm:inline">Back to Collections</span>
            <span className="sm:hidden">Back</span>
          </Button>
        </Link>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={handleShare}>
            <Share2 className="h-5 w-5" />
          </Button>
          <WishlistButton
            productId={product.id.toString()}
            productName={product.name}
          />
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* --- Image Section with Fixed Zoom Logic --- */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="sticky top-24">
            <div className="relative aspect-[3/4] overflow-hidden rounded-lg border border-border bg-muted mb-4">
              {currentImageSrc ? (
                <TransformWrapper
                  initialScale={1}
                  minScale={1}
                  maxScale={3}
                  // Smart Toggle Logic:
                  // 1. If currently zoomed (scale > 1), double click triggers 'reset' (zooms out).
                  // 2. If not zoomed (scale = 1), double click triggers 'zoomIn'.
                  doubleClick={{
                    disabled: false,
                    mode: isZoomed ? "reset" : "zoomIn",
                  }}
                  // Disable pinch/pan/wheel when not zoomed to allow page scrolling
                  pinch={{ disabled: !isZoomed }}
                  panning={{ disabled: !isZoomed }}
                  wheel={{ disabled: !isZoomed }}
                  // Track scale changes to update state
                  onTransformed={(ref) => {
                    const scale = ref.state.scale;
                    // Optimization: Only update state if crossing the threshold
                    if (scale > 1 && !isZoomed) setIsZoomed(true);
                    if (scale <= 1 && isZoomed) setIsZoomed(false);
                  }}
                >
                  <TransformComponent
                    wrapperClass="w-full h-full"
                    contentClass="w-full h-full"
                  >
                    <img
                      src={currentImageSrc}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </TransformComponent>
                </TransformWrapper>
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  No Image Available
                </div>
              )}

              {product.discountPercent > 0 && (
                <div className="absolute top-4 left-4 bg-red-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg z-10">
                  {product.discountPercent}% OFF
                </div>
              )}

              <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-xs backdrop-blur-sm z-10 pointer-events-none">
                {isZoomed ? "Double tap to reset" : "Double tap to zoom"}
              </div>
            </div>

            <div className="grid grid-cols-4 gap-2">
              {product.images.map((imgObj, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSelectedImage(index);
                    setIsZoomed(false); // Reset zoom state when changing image
                  }}
                  className={`aspect-[3/4] overflow-hidden rounded-lg border-2 transition-smooth ${
                    selectedImage === index
                      ? "border-primary"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <img
                    src={imgObj.image}
                    alt={`${product.name} view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* --- Product Info Section (Unchanged) --- */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          {/* ... [Rest of the Product Info JSX remains exactly the same] ... */}
          <div>
            <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
            <div className="flex items-baseline space-x-3 mb-6">
              {product.discountPercent > 0 ? (
                <>
                  <span className="text-3xl font-bold text-primary">
                    ₹{displayDiscountPrice.toLocaleString("en-IN")}
                  </span>
                  <span className="text-xl text-muted-foreground line-through">
                    ₹{displayPrice.toLocaleString("en-IN")}
                  </span>
                  <span className="text-sm font-semibold text-green-600">
                    Save ₹
                    {(displayPrice - displayDiscountPrice).toLocaleString(
                      "en-IN"
                    )}
                  </span>
                </>
              ) : (
                <span className="text-3xl font-bold text-primary">
                  ₹{displayPrice.toLocaleString("en-IN")}
                </span>
              )}
            </div>
          </div>

          <div className="border-t border-border pt-6">
            <h3 className="font-semibold mb-3">Product Description</h3>
            <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
              {product.description}
            </p>
          </div>

          <div className="border-t border-border pt-6">
            <h3 className="font-semibold mb-3">Color</h3>
            <div className="flex flex-wrap gap-3">
              {product.colors.length > 0 ? (
                product.colors.map((color) => (
                  <div
                    key={color.name}
                    className="flex items-center gap-2"
                    title={color.name}
                  >
                    <div
                      className="w-6 h-6 rounded-full border-2 border-border shadow-sm"
                      style={{ backgroundColor: color.hex_value }}
                    />
                    <span className="text-sm text-muted-foreground">
                      {color.name}
                    </span>
                  </div>
                ))
              ) : (
                <span className="text-sm text-muted-foreground">Standard</span>
              )}
            </div>
          </div>

          <div className="border-t border-border pt-6">
            <h3 className="font-semibold mb-3">Product Details</h3>
            <dl className="space-y-2">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Category:</dt>
                <dd className="font-medium">{product.category_name}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Fabric:</dt>
                <dd className="font-medium">
                  {product.fabric_type_name || "N/A"}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Availability:</dt>
                <dd
                  className={`font-medium ${
                    product.in_stock ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {product.in_stock ? "In Stock" : "Out of Stock"}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Product ID:</dt>
                <dd className="font-medium font-mono text-sm">{product.id}</dd>
              </div>
            </dl>
          </div>

          <div className="border-t border-border pt-6 space-y-4">
            {!product.in_stock ? (
              <Button
                size="lg"
                disabled
                className="w-full text-lg py-6 bg-muted text-muted-foreground"
              >
                Out of Stock
              </Button>
            ) : cartItem ? (
              <div className="flex items-center justify-between bg-primary/10 rounded-lg p-4">
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={handleDecrement}
                  className="h-10 w-10 hover:bg-primary hover:text-primary-foreground"
                >
                  <Minus className="h-5 w-5" />
                </Button>
                <span className="font-bold text-xl text-primary px-8">
                  {cartItem.quantity}
                </span>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={handleIncrement}
                  className="h-10 w-10 hover:bg-primary hover:text-primary-foreground"
                >
                  <Plus className="h-5 w-5" />
                </Button>
              </div>
            ) : (
              <Button
                onClick={handleAddToCart}
                size="lg"
                className="w-full bg-gradient-primary hover:opacity-90 transition-smooth text-lg py-6"
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
            )}
            <Link to="/cart" className="block">
              <Button variant="outline" size="lg" className="w-full">
                View Cart
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>

      <RecentlyViewed currentProductId={id || ""} />
    </div>
  );
};

export default ProductDetail;

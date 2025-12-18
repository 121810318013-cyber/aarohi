// import { Link } from "react-router-dom";
// import { Mail, Phone, MapPin, Clock } from "lucide-react";
// import logo from "@/assets/logo.png";

// export const Footer = () => {
//   return (
//     <footer className="bg-muted/30 border-t border-border mt-8 sm:mt-16">
//       <div className="container mx-auto px-4 py-8 sm:py-12">
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
//           {/* Brand */}
//           <div className="col-span-2 md:col-span-1">
//             <Link to="/" className="inline-block mb-3 sm:mb-4">
//               <img
//                 src={logo}
//                 alt="Aarohi Selections Logo"
//                 className="h-12 sm:h-16 w-auto"
//               />
//             </Link>
//             <p className="text-xs sm:text-sm text-muted-foreground">
//               Your destination for authentic and elegant Indian sarees. Quality
//               craftsmanship meets timeless tradition.
//             </p>
//           </div>

//           {/* Quick Links */}
//           <div>
//             <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">
//               Quick Links
//             </h4>
//             <ul className="space-y-1.5 sm:space-y-2">
//               <li>
//                 <Link
//                   to="/"
//                   className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-smooth"
//                 >
//                   Home
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   to="/collections"
//                   className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-smooth"
//                 >
//                   Collections
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   to="/about"
//                   className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-smooth"
//                 >
//                   About Us
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   to="/contact"
//                   className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-smooth"
//                 >
//                   Contact
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   to="/track-order"
//                   className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-smooth"
//                 >
//                   Track Order
//                 </Link>
//               </li>
//             </ul>
//           </div>

//           {/* Legal & Policies */}
//           <div>
//             <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">
//               Legal & Policies
//             </h4>
//             <ul className="space-y-1.5 sm:space-y-2">
//               <li>
//                 <Link
//                   to="/policies"
//                   className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-smooth"
//                 >
//                   Policies
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   to="/returns-policy"
//                   className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-smooth"
//                 >
//                   Returns Policy
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   to="/policies#terms"
//                   className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-smooth"
//                 >
//                   Terms & Conditions
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   to="/policies#privacy"
//                   className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-smooth"
//                 >
//                   Privacy Policy
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   to="/policies#shipping-policy"
//                   className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-smooth"
//                 >
//                   Shipping Policy
//                 </Link>
//               </li>
//             </ul>
//           </div>

//           {/* Contact Info */}
//           <div>
//             <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">
//               Contact Us
//             </h4>
//             <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-muted-foreground">
//               <li className="flex items-center space-x-2">
//                 <Phone className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary flex-shrink-0" />
//                 <span className="truncate">+91 8639619426</span>
//               </li>
//               <li className="flex items-center space-x-2">
//                 <Mail className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary flex-shrink-0" />
//                 <span className="truncate text-[10px] sm:text-sm">
//                   info@aarohiselections.in
//                 </span>
//               </li>
//             </ul>
//           </div>

//           {/* Business Hours */}
//           <div className="col-span-2 md:col-span-1">
//             <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">
//               Business Hours
//             </h4>
//             <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground">
//               <li className="flex items-start space-x-2">
//                 <Clock className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary mt-0.5 flex-shrink-0" />
//                 <div>
//                   <p>Monday - Saturday</p>
//                   <p className="text-[10px] sm:text-xs">10:00 AM - 8:00 PM</p>
//                 </div>
//               </li>
//               <li className="flex items-start space-x-2">
//                 <Clock className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary mt-0.5 flex-shrink-0" />
//                 <div>
//                   <p>Sunday</p>
//                   <p className="text-[10px] sm:text-xs">10:00 AM - 5:00 PM</p>
//                 </div>
//               </li>
//             </ul>
//           </div>
//         </div>

//         <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-border text-center">
//           <p className="text-xs sm:text-sm text-muted-foreground">
//             © {new Date().getFullYear()} Aarohi Selections. All rights reserved.
//             |{" "}
//             <Link
//               to="/policies"
//               className="hover:text-primary transition-smooth"
//             >
//               View Legal Policies
//             </Link>
//           </p>
//         </div>
//       </div>
//     </footer>
//   );
// };
import { Link } from "react-router-dom";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Facebook,
  Instagram,
  Youtube,
  Twitter,
} from "lucide-react";
import logo from "@/assets/logo.png";

export const Footer = () => {
  return (
    <footer className="bg-muted/30 border-t border-border mt-8 sm:mt-16">
      <div className="container mx-auto px-4 py-8 sm:py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="inline-block mb-3 sm:mb-4">
              <img
                src={logo}
                alt="Aarohi Selections Logo"
                className="h-12 sm:h-16 w-auto"
              />
            </Link>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Your destination for authentic and elegant Indian sarees. Quality
              craftsmanship meets timeless tradition.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">
              Quick Links
            </h4>
            <ul className="space-y-1.5 sm:space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-smooth"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/collections"
                  className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-smooth"
                >
                  Collections
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-smooth"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-smooth"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/track-order"
                  className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-smooth"
                >
                  Track Order
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Policies */}
          <div>
            <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">
              Legal & Policies
            </h4>
            <ul className="space-y-1.5 sm:space-y-2">
              <li>
                <Link
                  to="/policies"
                  className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-smooth"
                >
                  Policies
                </Link>
              </li>
              <li>
                <Link
                  to="/returns-policy"
                  className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-smooth"
                >
                  Returns Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/policies#terms"
                  className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-smooth"
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  to="/policies#privacy"
                  className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-smooth"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/policies#shipping"
                  className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-smooth"
                >
                  Shipping Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">
              Contact Us
            </h4>
            <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-muted-foreground">
              <li className="flex items-center space-x-2">
                <Phone className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary flex-shrink-0" />
                <span className="truncate">+91 8639619426</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary flex-shrink-0" />
                <a
                  href="mailto:info@aarohiselections.in"
                  className="truncate text-[10px] sm:text-sm hover:text-primary transition-smooth"
                >
                  info@aarohiselections.in
                </a>
              </li>
            </ul>
          </div>

          {/* Business Hours */}
          <div className="col-span-2 md:col-span-1">
            <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">
              Business Hours
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground">
              <li className="flex items-start space-x-2">
                <Clock className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p>Monday - Saturday</p>
                  <p className="text-[10px] sm:text-xs">10:00 AM - 8:00 PM</p>
                </div>
              </li>
              <li className="flex items-start space-x-2">
                <Clock className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p>Sunday</p>
                  <p className="text-[10px] sm:text-xs">10:00 AM - 5:00 PM</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Media Section */}
        <div className="mt-8 pt-8 border-t border-border">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-center sm:text-left">
              <h4 className="font-semibold mb-3 text-sm sm:text-base text-muted-foreground">
                Follow Us
              </h4>
              <div className="flex space-x-3">
                <a
                  href="https://facebook.com/aarohiselections"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 hover:bg-primary/10 rounded-lg transition-all duration-200 hover:scale-110"
                  aria-label="Facebook"
                >
                  <Facebook className="h-5 w-5 text-primary hover:text-blue-600" />
                </a>
                <a
                  href="https://instagram.com/aarohiselections"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 hover:bg-primary/10 rounded-lg transition-all duration-200 hover:scale-110"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5 text-primary hover:text-pink-500" />
                </a>
                <a
                  href="https://youtube.com/@aarohiselections"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 hover:bg-primary/10 rounded-lg transition-all duration-200 hover:scale-110"
                  aria-label="YouTube"
                >
                  <Youtube className="h-5 w-5 text-primary hover:text-red-500" />
                </a>
                <a
                  href="https://twitter.com/aarohiselections"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 hover:bg-primary/10 rounded-lg transition-all duration-200 hover:scale-110"
                  aria-label="Twitter"
                >
                  <Twitter className="h-5 w-5 text-primary hover:text-blue-400" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-border text-center">
          <p className="text-xs sm:text-sm text-muted-foreground">
            © {new Date().getFullYear()} Aarohi Selections. All rights reserved.
            |{" "}
            <Link
              to="/policies"
              className="hover:text-primary transition-smooth"
            >
              View Legal Policies
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

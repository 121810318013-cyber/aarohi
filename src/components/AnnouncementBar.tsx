import { motion } from 'framer-motion';

interface AnnouncementBarProps {
  messages?: string[];
}

const defaultMessages = [
  '✨ Free Shipping on orders above ₹5000',
  '🎁 Use code WELCOME10 for 10% off your first order',
  '🛍️ New arrivals every week - Stay tuned!',
  '💫 100% Authentic Handcrafted Sarees',
  '📞 WhatsApp us for personalized assistance',
];

export const AnnouncementBar = ({ messages = defaultMessages }: AnnouncementBarProps) => {
  // Repeat messages many times for seamless infinite scroll
  const repeatedMessages = [...messages, ...messages, ...messages, ...messages];

  return (
    <div className="bg-gradient-primary text-primary-foreground py-2 overflow-hidden">
      <div className="flex">
        <motion.div
          className="flex whitespace-nowrap"
          animate={{
            x: ['0%', '-50%'],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: 'loop',
              duration: 45,
              ease: 'linear',
            },
          }}
        >
          {repeatedMessages.map((message, index) => (
            <span key={index} className="mx-8 text-sm font-medium">
              {message}
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

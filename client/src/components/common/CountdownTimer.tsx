import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Set the countdown to 30 days from now
const getInitialDate = () => {
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 30);
  return targetDate;
};

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00'
  });
  
  useEffect(() => {
    const targetDate = getInitialDate();
    
    const interval = setInterval(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();
      
      if (difference <= 0) {
        // Countdown has ended
        clearInterval(interval);
        setTimeLeft({
          days: '00',
          hours: '00',
          minutes: '00',
          seconds: '00'
        });
        return;
      }
      
      // Calculate remaining time
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      
      // Update state with padded values
      setTimeLeft({
        days: days.toString().padStart(2, '0'),
        hours: hours.toString().padStart(2, '0'),
        minutes: minutes.toString().padStart(2, '0'),
        seconds: seconds.toString().padStart(2, '0')
      });
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="grid grid-cols-4 gap-4 max-w-sm mx-auto mb-8">
      <CountdownItem value={timeLeft.days} label="Days" />
      <CountdownItem value={timeLeft.hours} label="Hours" />
      <CountdownItem value={timeLeft.minutes} label="Minutes" />
      <CountdownItem value={timeLeft.seconds} label="Seconds" />
    </div>
  );
};

interface CountdownItemProps {
  value: string;
  label: string;
}

const CountdownItem = ({ value, label }: CountdownItemProps) => (
  <motion.div 
    className="flex flex-col items-center"
    animate={{ opacity: 1 }}
    initial={{ opacity: 0 }}
    transition={{ duration: 0.5 }}
  >
    <motion.div 
      className="text-3xl md:text-4xl font-serif text-[#FF9E2C]"
      key={value}
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 200 }}
    >
      {value}
    </motion.div>
    <div className="text-sm text-[#E8E8E8]">{label}</div>
  </motion.div>
);

export default CountdownTimer;

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export const UptimeCounter = () => {
  const launchDate = new Date("1998-11-20T00:00:00Z");
  const [timeElapsed, setTimeElapsed] = useState({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const updateCounter = () => {
      const now = new Date();
      const diff = now.getTime() - launchDate.getTime();

      const seconds = Math.floor(diff / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);
      const years = Math.floor(days / 365.25);
      const months = Math.floor((days % 365.25) / 30.44);

      setTimeElapsed({
        years,
        months: months,
        days: Math.floor((days % 365.25) % 30.44),
        hours: hours % 24,
        minutes: minutes % 60,
        seconds: seconds % 60,
      });
    };

    updateCounter();
    const interval = setInterval(updateCounter, 1000);
    return () => clearInterval(interval);
  }, []);

  const TimeUnit = ({ value, label }: { value: number; label: string }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center"
    >
      <div className="relative">
        <div className="absolute inset-0 bg-primary/20 blur-xl rounded-lg" />
        <div className="relative bg-card border-2 border-primary/50 rounded-lg p-4 md:p-6 min-w-[80px] md:min-w-[120px]">
          <div className="text-3xl md:text-5xl font-bold font-mono text-primary animate-glow-pulse">
            {value.toString().padStart(2, "0")}
          </div>
        </div>
      </div>
      <div className="text-xs md:text-sm text-muted-foreground mt-2 uppercase tracking-wider">
        {label}
      </div>
    </motion.div>
  );

  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
            MISSION UPTIME
          </h2>
          <p className="text-muted-foreground text-sm md:text-base">
            Continuous operation since November 20, 1998
          </p>
        </motion.div>

        <div className="grid grid-cols-3 md:grid-cols-6 gap-4 md:gap-6 max-w-6xl mx-auto">
          <TimeUnit value={timeElapsed.years} label="Years" />
          <TimeUnit value={timeElapsed.months} label="Months" />
          <TimeUnit value={timeElapsed.days} label="Days" />
          <TimeUnit value={timeElapsed.hours} label="Hours" />
          <TimeUnit value={timeElapsed.minutes} label="Minutes" />
          <TimeUnit value={timeElapsed.seconds} label="Seconds" />
        </div>
      </div>
    </section>
  );
};

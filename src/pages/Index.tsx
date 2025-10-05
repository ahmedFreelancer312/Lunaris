import { motion } from "framer-motion";
import { StarField } from "@/components/StarField";
import { UptimeCounter } from "@/components/UptimeCounter";
import MapPlaceholder from "@/components/MapPlaceholder";
import { Timeline } from "@/components/Timeline";
import { Scientests } from "@/components/Scientests";
import { Quiz } from "@/components/Quiz";
import EyesEmbed from "@/components/EyesEmbed";
import ISSExperience from "@/components/ISSExperience";

const Index = () => {
  return (
    <div className="relative min-h-screen bg-gradient-cosmic overflow-hidden">
      <StarField />

      <section className="relative min-h-screen flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="container mx-auto px-4 text-center relative z-10"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mb-8"
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight">
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-glow-pulse">
                ISS 25th
              </span>
              <br />
              <span className="bg-gradient-to-r from-accent via-primary to-secondary bg-clip-text text-transparent">
                Anniversary
              </span>
            </h1>

            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: 0.8, duration: 1 }}
              className="h-1 bg-gradient-to-r from-transparent via-primary to-transparent max-w-2xl mx-auto"
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="text-lg md:text-2xl text-foreground/80 max-w-3xl mx-auto leading-relaxed"
          >
            Celebrating 27 years of humanity's continuous presence in space.
            <br />
            <span className="text-primary">
              A marvel of international cooperation and scientific achievement.
            </span>
          </motion.p>

          <motion.div
            animate={{
              y: [0, -20, 0],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="mt-12 text-6xl md:text-8xl opacity-50"
          >
            🛰️
          </motion.div>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center p-2">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1.5 h-1.5 bg-primary rounded-full"
              />
            </div>
          </motion.div>
        </motion.div>
      </section>
      <EyesEmbed />

      <MapPlaceholder />
      <UptimeCounter />

      <Timeline />

      <Scientests />

      <ISSExperience />
   
      <Quiz />
            <></>
      <footer className="relative py-12 border-t border-primary/20">
        <div className="container mx-auto px-4 text-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-muted-foreground"
          >
            International Space Station • 27 Years of Excellence
            <br />
            <span className="text-xs">1998 - 2025 and beyond</span>
          </motion.p>
        </div>
      </footer>
    </div>
  );
};

export default Index;

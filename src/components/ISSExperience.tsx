"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const ISSExperience = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative py-20">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-8"
      >
        <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
          🛰 VIRTUAL ISS EXPERIENCE
        </h2>
        <p className="text-muted-foreground">
          Step inside the International Space Station — in real-time 3D
        </p>
      </motion.div>

      <div className="relative w-full h-[800px] rounded-2xl overflow-hidden border border-primary/50 shadow-[0_0_40px_rgba(0,200,255,0.3)] bg-black">
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-black stars-bg z-10">
            <p className="text-white text-xl animate-pulse">
              Loading Space Experience...
            </p>
          </div>
        )}

        <iframe
          src="https://www.nasa.gov/wp-content/uploads/static/UnityBuild/index.html"
          allowFullScreen
          className="w-full h-full"
          onLoad={() => setIsLoaded(true)}
        ></iframe>
      </div>
    </section>
  );
};

export default ISSExperience;

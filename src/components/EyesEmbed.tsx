"use client";

const EyesEmbed = () => {
  return (
    <section className="py-20 text-center">
      <h2 className="text-3xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
        🌌 Explore the ISS in 3D
      </h2>
      <p className="text-muted-foreground mb-8">
        Real-time interactive visualization powered by NASA Eyes
      </p>

      <div className="relative w-full h-[600px] md:h-[750px] rounded-2xl overflow-hidden border border-[#00CFFF]/40 shadow-[0_0_30px_#00CFFF55] bg-black">
        <div className="absolute inset-0 rounded-2xl shadow-[0_0_60px_#00CFFF44] pointer-events-none" />
        <iframe
          src="https://eyes.nasa.gov/apps/solar-system/#/sc_iss?rate=1&time=2025-10-05T09%3A12%3A06.125+00%3A00&interactPrompt=true&surfaceMapTiling=true&lighting=flood"
          allowFullScreen
          className="w-full h-full rounded-2xl"
        ></iframe>
      </div>
    </section>
  );
};

export default EyesEmbed;

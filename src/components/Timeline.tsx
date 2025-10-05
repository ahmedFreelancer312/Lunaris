import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

const timelineEvents = [
  {
    year: "1998",
    title: "Overview of ISS",
    description:
      "The International Space Station (ISS) is a large space laboratory in low Earth orbit, jointly operated by multiple space agencies including NASA (USA), Roscosmos (Russia), ESA (Europe), JAXA (Japan), and CSA (Canada). It serves as a microgravity research facility, a hub for scientific experiments in fields like biology, physics, astronomy and Earth observation. The station is continuously occupied by astronauts since November 2000, and is equipped with modules for living quarters, laboratories, solar panels for power, docking ports, and more. Orbiting at roughly 400 km above Earth, the ISS enables long-duration space missions and international cooperation in space.",
    image:
      "https://tse1.mm.bing.net/th/id/OIP.TxLYf6BkJaHleO9JvGOmvgHaE8?w=474&h=474&c=7&p=0",
  },
  {
    year: "1998",
    title: "First ISS Moudle Launched",
    description:
      "On November 20, 1998, the Zarya module was launched into orbit, marking the beginning of the construction of the International Space Station (ISS). Zarya (which means 'Sunrise' in Russian) was built in Russia with funding from the United States. It provided early power, propulsion, and guidance for the ISS before other modules were added. Launched aboard a Russian Proton-K rocket from the Baikonur Cosmodrome in Kazakhstan, Zarya was the first piece of a massive international collaboration. Although it was not designed for long-term habitation, it served as a crucial foundation for connecting future modules such as Unity (USA) and Zvezda (Russia).",
    image:
      "https://tse4.mm.bing.net/th/id/OIP.f01NpRaoSRHi0RxjoPfZJwHaE8?pid=Api",
  },
  {
    year: "1998",
    title: "Assembly Of ISS",
    description:
      "The assembly of the ISS began in the late 1990s and has involved over 40 flights to deliver modules, trusses, solar arrays, and other elements into orbit. Primidi +3 Wikipedia +3 NASA +3 Each major part was launched separately (by rockets like the Russian Proton, Space Shuttle missions, and others) and then connected in space via dockings and spacewalks. Everything Explained Today +3 NASA +3 Primidi +3 Here are some of the key modules and their launch dates: Zarya (Functional Cargo Block, FGB): Launched 20 November 1998. It was the first module, providing propulsion, electrical power, and storage during the early stages.",
    image:
      "https://tse3.mm.bing.net/th/id/OIP.MOnGHpcmliLQZhhRC9JKywHaKB?cb=12&w=474&h=474&c=7&p=0",
  },
  {
    year: "1995 - 1998",
    title: " Development Phase 1 NASA–Mir (1995–1998)",
    description:
      "Phase 1 of the NASA‑Mir Program (1995‑1998) was an essential precursor to the International Space Station (ISS). It involved cooperative operations between NASA and the Russian Space Agency (RSA), during which U.S. astronauts lived for long durations on the Mir space station and the Space Shuttle docked repeatedly with Mir to exchange crews, deliver equipment, conduct scientific research, and test procedures. During Phase 1: The U.S. sent up to ten Shuttle‑Mir docking missions between 1995 and 1997. Seven U.S. astronauts and around twenty Russian cosmonauts participated in flights and crew increments.",
    image:
      "https://tse3.mm.bing.net/th/id/OIP.T1rvxjbRuoCdbhmtzQxy6gHaHW?cb=12&w=474&h=474&c=7&p=0",
  },
  {
    year: "1998 - 2001",
    title: "Phase 2 – ISS Construction (from 1998 onward)",
    description:
      "Started in November 1998, multiple modules, trusses, solar arrays, airlocks, and other elements were launched by the United States, Russia, Europe, Japan, and Canada. These pieces were docked or berthed together in orbit, using spacecraft like the Space Shuttle, Russian rockets, and later commercial vehicles. The work involved many spacewalks, robotic arms (like Canadarm2), and integration of life‑support, power, habitation, and scientific lab modules.Zarya (Functional Cargo Block) was launched on 20 November 1998, as the first module and provided initial propulsion, guidance, and power.",
    image:
      "https://tse4.mm.bing.net/th/id/OIP.SzRQSuxMeJ_9ViZXRSMv6AHaFj?w=474&h=474&c=7&p=0",
  },
  {
    year: "2018",
    title: "20th Anniversary",
    description:
      "On November 20, 2018, the International Space Station celebrated the 20th anniversary of the launch of its first module, Zarya. Zarya was launched from the Baikonur Cosmodrome aboard a Russian Proton rocket in 1998, marking the beginning of the ISS assembly. Twenty years later, ISS had grown into a massive orbiting laboratory, involving more than 200 crew members from nearly 20 countries, hosting continuous human presence since the first long‑duration crew (Expedition 1) arrived in November 2000. The anniversary was marked by reflections on the ISS’s contributions to science, international cooperation, human spaceflight, and engineering achievements.",
    image:
      "https://cdn.mos.cms.futurecdn.net/msH2Z7BdG8uYqV2aaXHjgn-1200-80.jpg.webp", 
  },
  {
    year: "2023",
    title: "25 Years & Beyond",
    description:
      "In 2023, the International Space Station celebrated its 25th anniversary of assembly when the Unity (Node 1) and Zarya (FGB) modules were first joined in orbit on December 6, 1998. Space +2 Space +2 Over the course of its life, ISS has supported thousands of scientific experiments from over 100 countries, hosted nearly 300 people from more than 20 nations, and served as a platform for international cooperation, education, and technological development. ISS partners (NASA, Roscosmos, ESA, JAXA, CSA) have officially agreed to keep the station running through at least 2030, ensuring continuity of research, international cooperation, and presence in low Earth orbit.",
    image:
      "https://tse1.mm.bing.net/th/id/OIP.CWtUfyadTRzMfoHHqbI5EgHaE6?cb=12&w=474&h=474&c=7&p=0",
  },
];

export const Timeline = () => {
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/5 to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            MISSION TIMELINE
          </h2>
          <p className="text-muted-foreground">Key milestones in ISS history</p>
        </motion.div>

        <div className="relative">
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent -translate-y-1/2" />

          <div className="overflow-x-auto pb-8 scrollbar-hide">
            <div className="flex gap-6 md:gap-8 min-w-max px-4">
              {timelineEvents.map((event, index) => (
                <motion.div
                  key={event.year}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative flex-shrink-0"
                >
                  <Card className="w-[300px] md:w-[350px] bg-card/80 backdrop-blur border-primary/30 hover:border-primary/60 transition-all duration-300 hover:shadow-glow group overflow-hidden rounded-2xl">
                    <div className="relative h-48 rounded-t-2xl overflow-hidden">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                      <div className="absolute bottom-2 left-2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-bold">
                        {event.year}
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
                        {event.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {event.description}
                      </p>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

export default Timeline;

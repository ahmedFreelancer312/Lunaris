"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Satellite, Moon } from "lucide-react";
import L from "leaflet";

const ISS_SVG_URL = "/real iss.png";
const FETCH_INTERVAL_MS = 5000;
const TRAIL_MAX_POINTS = 30;
const INITIAL_CENTER: [number, number] = [0, 0];
const INITIAL_ZOOM = 1.5;

const createISSIcon = () =>
  L.icon({
    iconUrl: ISS_SVG_URL,
    iconSize: [100, 75],
    iconAnchor: [21, 21],
    popupAnchor: [0, -12],
    className: "iss-marker-icon",
  });

const MapPlaceholder: React.FC = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const leafletMapRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const trailLineRef = useRef<L.Polyline | null>(null);
  const [lastPosition, setLastPosition] = useState<[number, number] | null>(
    null
  );
  const [darkMode, setDarkMode] = useState(false);
  const darkLayerRef = useRef<L.TileLayer | null>(null);

  useEffect(() => {
    if (!document.getElementById("leaflet-css")) {
      const link = document.createElement("link");
      link.id = "leaflet-css";
      link.rel = "stylesheet";
      link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      document.head.appendChild(link);
    }
  }, []);

  useEffect(() => {
    if (!mapRef.current || leafletMapRef.current) return;

    const map = L.map(mapRef.current, {
      center: INITIAL_CENTER,
      zoom: INITIAL_ZOOM,
      scrollWheelZoom: false,
      attributionControl: false,
      zoomControl: true,
    });

    const baseLayer = L.tileLayer(
      "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
      {
        maxZoom: 17,
        attribution:
          'Map data: &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
          '<a href="https://opentopomap.org/">OpenTopoMap</a>',
      }
    ).addTo(map);

    const darkLayer = L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
      {
        subdomains: "abcd",
        maxZoom: 19,
        opacity: 0.35,
      }
    );
    darkLayerRef.current = darkLayer;

    const trailLine = L.polyline([], {
      color: "#fafbfcff",
      weight: 2,
      opacity: 0.9,
      dashArray: "4 6",
      interactive: false,
    }).addTo(map);

    const issIcon = createISSIcon();
    const marker = L.marker(INITIAL_CENTER, {
      icon: issIcon,
      interactive: false,
    }).addTo(map);

    leafletMapRef.current = map;
    markerRef.current = marker;
    trailLineRef.current = trailLine;

    return () => {
      try {
        map.remove();
      } catch {}
      leafletMapRef.current = null;
      markerRef.current = null;
      trailLineRef.current = null;
      darkLayerRef.current = null;
    };
  }, []);

  useEffect(() => {
    let mounted = true;
    const fetchAndUpdate = async () => {
      try {
        const res = await fetch(
          "https://api.wheretheiss.at/v1/satellites/25544"
        );
        if (!res.ok) throw new Error("ISS API error");
        const data = await res.json();

        const lat = Number(data.latitude);
        const lon = Number(data.longitude);
        if (!Number.isFinite(lat) || !Number.isFinite(lon)) return;

        const newPos: [number, number] = [lat, lon];
        if (!mounted) return;

        setLastPosition(newPos);

        if (markerRef.current) markerRef.current.setLatLng(newPos);
        trailLineRef.current?.setLatLngs(
          [...trailLineRef.current.getLatLngs(), newPos].slice(
            -TRAIL_MAX_POINTS
          )
        );
      } catch {}
    };

    fetchAndUpdate();
    const id = setInterval(fetchAndUpdate, FETCH_INTERVAL_MS);
    return () => {
      mounted = false;
      clearInterval(id);
    };
  }, []);

  const toggleDarkMode = () => {
    if (!leafletMapRef.current || !darkLayerRef.current) return;
    if (darkMode) {
      leafletMapRef.current.removeLayer(darkLayerRef.current);
    } else {
      darkLayerRef.current.addTo(leafletMapRef.current);
    }
    setDarkMode(!darkMode);
  };

  return (
    <section className="relative py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-6"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
            LIVE TRACKING
          </h2>
          <p className="text-muted-foreground mb-2">
            Real-time ISS position and trajectory
          </p>
          <button
            onClick={toggleDarkMode}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary/80 hover:bg-primary/95 text-white rounded-lg shadow-md"
          >
            <Moon className="w-5 h-5" />
            {darkMode ? "Light Mode" : "Soft Dark Mode"}
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative max-w-5xl mx-auto"
        >
          <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-lg" />

          <div className="relative bg-gradient-to-br from-card via-star-field to-card border-2 border-primary/50 rounded-2xl p-4 md:p-8 min-h-[420px] md:min-h-[620px] flex flex-col items-center justify-center overflow-hidden shadow-glow">
            <div className="absolute inset-0 opacity-10">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `
                    linear-gradient(hsl(var(--primary)) 1px, transparent 1px),
                    linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)
                  `,
                  backgroundSize: "50px 50px",
                }}
              />
            </div>

            <motion.div
              animate={{ y: [-8, 8, -8], rotate: [0, 6, -6, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-10 mb-6"
            >
              <div className="absolute inset-0 bg-primary/30 blur-2xl rounded-full" />
              <Satellite className="w-16 h-16 md:w-28 md:h-28 text-primary relative animate-glow-pulse" />
            </motion.div>

            <div className="relative z-10 w-full max-w-4xl mx-auto">
              <div
                className="rounded-xl overflow-hidden shadow-lg"
                style={{
                  borderRadius: 16,
                  boxShadow: "0 8px 40px rgba(2,6,23,0.6)",
                }}
              >
                <div
                  ref={mapRef}
                  style={{
                    height: 460,
                    width: "100%",
                    borderRadius: 16,
                    background:
                      "linear-gradient(180deg, rgba(0,0,0,0.25), rgba(0,0,0,0.35))",
                  }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MapPlaceholder;

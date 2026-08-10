"use client";

import { useEffect, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";
import { shop } from "@/lib/content";

/**
 * Dark raster map, loaded only once it is about to be seen.
 * Tiles: CARTO dark basemap over OpenStreetMap data — no key, attribution kept.
 */
export default function DarkMap({ label }: { label: string }) {
  const host = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = host.current;
    if (!el) return;

    let map: import("leaflet").Map | undefined;
    let cancelled = false;

    const build = async () => {
      const L = (await import("leaflet")).default;
      if (cancelled || !host.current) return;

      map = L.map(host.current, {
        center: [shop.lat, shop.lon],
        zoom: 15,
        zoomControl: false,
        scrollWheelZoom: false,
        attributionControl: true,
      });

      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
        {
          maxZoom: 19,
          attribution: "© OpenStreetMap · © CARTO",
        },
      ).addTo(map);

      L.control.zoom({ position: "bottomright" }).addTo(map);

      L.marker([shop.lat, shop.lon], {
        title: shop.name,
        alt: shop.name,
        icon: L.divIcon({
          className: "",
          iconSize: [18, 18],
          iconAnchor: [9, 9],
          html: `<span class="relative block h-[18px] w-[18px]">
            <span class="absolute inset-0 rounded-full border border-ember" style="animation: pulse-ring 2.6s cubic-bezier(0.16,1,0.3,1) infinite"></span>
            <span class="absolute inset-[4px] rounded-full bg-ember"></span>
          </span>`,
        }),
      }).addTo(map);

      setReady(true);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          observer.disconnect();
          void build();
        }
      },
      { rootMargin: "300px" },
    );

    observer.observe(el);

    return () => {
      cancelled = true;
      observer.disconnect();
      map?.remove();
    };
  }, []);

  return (
    <div className="relative h-full w-full overflow-hidden bg-coal">
      <div
        ref={host}
        role="img"
        aria-label={label}
        className={`h-full w-full transition-opacity duration-700 ease-out-expo [&_.leaflet-container]:bg-coal ${
          ready ? "opacity-100" : "opacity-0"
        }`}
      />
      {!ready && (
        <div
          aria-hidden
          className="absolute inset-0 bg-[repeating-linear-gradient(135deg,transparent_0_14px,color-mix(in_oklab,var(--color-bone)_5%,transparent)_14px_15px)]"
        />
      )}
    </div>
  );
}

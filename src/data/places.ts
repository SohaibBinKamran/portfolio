// Every place visited, for the Aerial Mode globe (`components/travel/AerialMode.tsx`).
// Coordinates are approximate (public city-level lat/lon, not surveyed).
// `trip` groups cities visited on the same trip so the globe can draw a
// thin connecting line between them; places with no `trip` travelled alone.
//
// `location` matches a photo's `location` field in `data/photography.ts`
// exactly — that's how the globe looks up real photos for a pin. Places
// with no match yet (most of Pakistan and Germany, plus every other
// country here) get an honest "no photos here yet" state instead of a
// fabricated one.

export type Place = {
  city: string;
  country: string;
  lat: number;
  lon: number;
  trip?: string;
};

export const places: Place[] = [
  { city: "Riyadh", country: "Saudi Arabia", lat: 24.7136, lon: 46.6753 },

  // Pakistan
  { city: "Karachi", country: "Pakistan", lat: 24.8607, lon: 67.0011, trip: "pk" },
  { city: "Hunza", country: "Pakistan", lat: 36.3167, lon: 74.6500, trip: "pk" },
  { city: "Kashmir", country: "Pakistan", lat: 34.3700, lon: 73.4711, trip: "pk" },
  { city: "Lahore", country: "Pakistan", lat: 31.5497, lon: 74.3436, trip: "pk" },
  { city: "Islamabad", country: "Pakistan", lat: 33.6844, lon: 73.0479, trip: "pk" },
  { city: "Sargodha", country: "Pakistan", lat: 32.0836, lon: 72.6711, trip: "pk" },
  { city: "Sialkot", country: "Pakistan", lat: 32.4945, lon: 74.5229, trip: "pk" },
  { city: "Balakot", country: "Pakistan", lat: 34.5502, lon: 73.3536, trip: "pk" },
  { city: "Mansehra", country: "Pakistan", lat: 34.3329, lon: 73.2075, trip: "pk" },
  { city: "Murree", country: "Pakistan", lat: 33.9070, lon: 73.3943, trip: "pk" },

  // Spain
  { city: "Madrid", country: "Spain", lat: 40.4168, lon: -3.7038, trip: "es" },
  { city: "Palma de Mallorca", country: "Spain", lat: 39.5696, lon: 2.6502, trip: "es" },

  // Germany
  { city: "Siegen", country: "Germany", lat: 50.8747, lon: 8.0243, trip: "de" },
  { city: "Cologne", country: "Germany", lat: 50.9375, lon: 6.9603, trip: "de" },
  { city: "Berlin", country: "Germany", lat: 52.5200, lon: 13.4050, trip: "de" },
  { city: "Frankfurt", country: "Germany", lat: 50.1109, lon: 8.6821, trip: "de" },
  { city: "Dusseldorf", country: "Germany", lat: 51.2277, lon: 6.7735, trip: "de" },
  { city: "Dortmund", country: "Germany", lat: 51.5136, lon: 7.4653, trip: "de" },
  { city: "Triesdorf", country: "Germany", lat: 49.2075, lon: 10.6247, trip: "de" },
  { city: "Munich", country: "Germany", lat: 48.1351, lon: 11.5820, trip: "de" },

  // Czechia
  { city: "Prague", country: "Czechia", lat: 50.0755, lon: 14.4378 },

  // Azerbaijan
  { city: "Baku", country: "Azerbaijan", lat: 40.4093, lon: 49.8671 },
];

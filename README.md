# A Carpooler

This is my personal rewrite of our (failed) attempt to create a carpooling webapp at RidgeHacks. Very bare bones (at the moment)

Relies on LocationIQ API for forward geocoding. You must define an API key as an environment variable (in .env file in project root). The name for the environment variable by default is "SECRET_LOCATIONIQ_API_KEY"

Also required is a  [Vroom Express](https://github.com/VROOM-Project/vroom-express) instance, which runs on port 3000 by default. Initial setup for this can take a signifigant amount of ram, depending on the map file (.osm.pbf) file used. For reference, the US Northeast took ~8 gigabytes by itself. I do not know how this process goes on machines with less (available) memory.

- [ ] Review + refactor and project restructuring (I don't need separate files for 30 lines)
- [ ] .yml configuration for setting up API Keys, Vroom Express URL, perhaps even additional VRP providers via external API
- [ ] Make UI + UX not awful
- [ ] View routes on a map
- [ ] Dynamically change routes
- [ ] Add more parameters on route optimization (male to female ratio, max distance, etc.)

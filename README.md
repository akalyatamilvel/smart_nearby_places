# Smart Nearby Places Recommender 

A modern, location-based web application that recommends nearby places based on user mood and distance.  
Built using open-source map data with a strong focus on UX, performance, and clean architecture.

🔗 **Live Demo:** https://smartnearbyplaces.vercel.app/

---

## Features

- 📍 **Live User Location Detection** using browser geolocation
- **Mood-based Place Recommendations**
  - ☕ Cafe
  - ❤️ Restaurant
  - 🍔 Quick Bite
  - 💸 Budget
- **Interactive Map View** using Leaflet & OpenStreetMap
- **Color-Coded Map Markers** for each mood
- **Distance Filter** (1–50 km)
- **Smart API Caching** to reduce repeated requests
- **Loading Indicators & Smooth Animations**
- **Modern UI** with gradient background & glassmorphism design
- **No Paid APIs** – fully open-source and ethical

---

## Tech Stack

| Layer | Technology |
|------|-----------|
Frontend | React (JavaScript)
Maps | Leaflet + OpenStreetMap
Places Data | Overpass API
Styling | CSS + Inline Styles
State Management | React Hooks
Deployment | Vercel

---

## How the App Works

1. The app requests the user’s location via browser geolocation
2. User selects a **mood**
3. The app queries the **Overpass API** using mapped OpenStreetMap amenity tags
4. Results are:
   - distance-calculated
   - sorted by proximity
   - cached for performance
5. Places are displayed on:
   - an interactive map
   - a scrollable list view

---

## How to Run This Project Locally

1️⃣ Clone the Repository
```bash
git clone https://github.com/akalyatamilvel/smart-nearby-places.git
```
2️⃣ Navigate into the Project Directory
```bash
cd smart-nearby-places
```
3️⃣ Install Dependencies
```bash
npm install
```
4️⃣ Start the Development Server
```bash
npm start
```
🌐 Open in Browser
http://localhost:3000

📍 Note: Please allow location access in your browser for full functionality.


---


## Design Decisions

Avoided proprietary APIs (e.g., Google Maps)

Used open data sources only

Kept the app lightweight and demo-safe

Prioritized clarity, usability, and maintainability

## Deployment

The app is deployed using Vercel and runs over HTTPS, enabling geolocation support.

## Author

Akalya Tamilvel Senbakam

Student | Frontend Developer

Built with ❤️ using React and open-source mapping tools.

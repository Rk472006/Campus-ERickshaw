<div align="center">
  <img src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png" alt="E-Rickshaw Logo" width="80" />
  <h1 align="center">Campus E-Rickshaw Ecosystem</h1>
  <p align="center">
    A production-grade, real-time ride-hailing infrastructure built specifically for university campus mobility.
  </p>
</div>

<br />

## 🌟 Overview

The Campus E-Rickshaw Ecosystem is a complete full-stack mobility solution designed to orchestrate spontaneous ride requests, active driver dispatching, and high-level administrative oversight. Utilizing modern WebSockets and robust backend atomic locking, it guarantees zero dispatch collisions and scales across both desktop command centers and mobile interfaces.

### Modules Built Inside
- **🧑‍🎓 Passenger PWA**: Responsive React application allowing students to call rides, track approaching rickshaws dynamically, and provide post-ride quality feedback.
- **🚗 Driver Mobile / Web Apps**: A dual-platform React & Expo React Native solution for drivers. Receives pinged passenger requests, limits assignments dynamically, and automatically routes OSRM street-level driving paths.
- **👑 Admin Global Command**: Real-time analytical dashboard monitoring the live placement and exact dispatch route of every active rickshaw on campus, paired with a secure Fleet Management protocol for registering or suspending drivers over the air.
- **⚙️ Node.js Engine**: Express server heavily loaded with Mongoose and Socket.IO. Handles atomic ride acceptance rules, timeout loops, and token-based Firebase Authentication bridging.

---

## ⚡ Key Features

- **Real-Time Websocket Tracking**: Complete ecosystem connected via Socket.io. Passenger apps track the exact Leaflet map coordinates of the single assigned driver speeding toward them.
- **Atomic Dispatch Integrity**: MongoDB document locks completely eliminate "Double Booking". If two drivers tap accept within milliseconds, the query restricts authorization to exactly one driver physically.
- **Algorithmic Timeout Circuits**: 
   - Passengers have an automatic 3-minute search countdown that alerts them if no drivers are active.
   - Driver incoming requests silently self-purge after a 25-second ignore window.
- **Live Fleet Table & OSRM Routing**: Admins watching the grid see dynamic UI lines drawn strictly via the Open Source Routing Machine rather than point-to-point drawing, displaying accurate road traversals.
- **Air-Tight Authentication**: Native Firebase Auth on the client side, backed by the `firebase-admin` SDK on the backend. Allows Admins to securely generate driver credentials without polluting their login sessions.

---

## 🛠️ Technology Stack

| Domain | Technologies |
| :--- | :--- |
| **Frontend Applications** | React, Vite, Expo (React Native), Tailwind CSS / Raw CSS |
| **Backend Architecture** | Node.js, Express.js |
| **Database & Auth** | MongoDB (Mongoose), Firebase Authentication & Admin SDK |
| **Geospatial & Comm** | Socket.IO, React-Leaflet, Open Source Routing Machine (OSRM) API |

---

## 🚀 Getting Started

### Prerequisites
Before running, you must configure a `.env` file inside the `backend` directly containing your database and authentication secrets:
```env
# Backend .env
PORT=5000
MONGO_URI=mongodb+srv://<your-cluster>.mongodb.net/erickshaw
JWT_SECRET=your_hyper_secure_jwt_secret

# Firebase Admin SDK configuration
FIREBASE_PROJECT_ID=campus-rickshaw
FIREBASE_CLIENT_EMAIL=firebase-adminsdk@...
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n..."
```

### Installation

Clone the repository and install all node modules across the microservice stack.

```bash
# Clone the codebase
git clone https://github.com/Rk472006/Campus-ERickshaw.git

# Install Backend
cd backend && npm install

# Install Passenger Web App
cd ../passenger-app && npm install

# Install Driver Portal (Web)
cd ../driver-web-app && npm install

# Install Admin Command Dashboard
cd ../admin-dashboard && npm install

# Install Driver Expo App (Mobile)
cd ../driver-app && npm install
```

### Running the Services
To ignite the ecosystem, spin up each micro-service in separate terminal windows.

**1. Database & Socket Engine:**
```bash
cd backend
npm run dev
```

**2. The Client Frontends (Web):**
```bash
cd passenger-app
npm run dev
```
```bash
cd admin-dashboard
npm run dev
```

**3. The Mobile Application:**
To test the mobile driver layout natively:
```bash
cd driver-app
npx expo start
```
*Note: Scan the QR code with your iPhone (Camera) or Android (Expo Go) to interact with exactly what the drivers see.*

---

## 📱 Interface Showcase

#### 1. Passenger Request Flow
Search for availability, cancel seamlessly, and watch your explicitly mapped driver traverse the campus roads towards your drop pin.

#### 2. Fleet Administration
The right-hand side panel tracks live fleets with Custom Sort prioritization (`Requested > Accepted > Arrived > Ongoing`). Admins hold the power to suspend accounts instantly, automatically firing Socket disconnect events and terminating the driver's layout!

---

<div align="center">
<i>Architected for Next-Generation Transit Scalability. 🛺</i>
</div>

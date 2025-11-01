# BookIt - A Full-Stack Travel Booking Application

BookIt is a complete web application where users can browse exciting travel experiences, check for available dates and times, and complete a booking. This project demonstrates a real-world full-stack workflow, from database design to frontend UI implementation and cloud deployment.

---

### **Live Demo & Links**

*   **Hosted Application:** https://book-it-beige.vercel.app/
*   **Live Backend API:** https://book-it-sdxv.onrender.com/api/experiences
*   **GitHub Repository:** https://github.com/Ravi-TFI/book-it

---

### **Features**

*   **Dynamic Experience Listing:** Browse a variety of travel experiences fetched from the backend.
*   **Search Functionality:** Filter experiences by title or location.
*   **Detailed View:** View experience details, description, and available slots.
*   **Date & Time Selection:** Interactive calendar and time slot selection with real-time availability.
*   **Quantity Selector:** Choose the number of participants.
*   **Booking Flow:** A seamless checkout process with user info collection.
*   **Promo Code Validation:** Apply discount codes for flat or percentage-based offers.
*   **Responsive Design:** Fully mobile-friendly UI built with TailwindCSS.

---

### **Tech Stack**

*   **Frontend:** React, TypeScript, Vite, TailwindCSS, Axios
*   **Backend:** Node.js, Express.js
*   **Database:** PostgreSQL
*   **Deployment:** Vercel (Frontend), Render (Backend & Database)

---

### **Setup and Run Locally**

**Prerequisites:**
*   Node.js (v18 or later)
*   npm
*   PostgreSQL installed and running

**1. Clone the repository:**
```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
cd YOUR_REPO_NAME
```

**2. Setup the Backend:**
```bash
cd backend
npm install

# Create a .env file in the 'backend' directory
# and add your local PostgreSQL connection string:
# DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/DATABASE_NAME"

npm start
```
The backend will run on `http://localhost:5000`. It will automatically create and seed the database tables on first run.

**3. Setup the Frontend:**
```bash
cd ../frontend
npm install

# Create a .env file in the 'frontend' directory (optional for local dev)
# The default API URL is http://localhost:5000

npm run dev
```
The frontend will be available at `http://localhost:5173`.

---

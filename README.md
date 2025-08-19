# 🌍 Travel Tracker: Countries I’ve Been To  

A simple full-stack project to track countries you’ve visited and visualize them on a world map.  
Built with **Node.js, Express, PostgreSQL, and EJS templates**.  

---

## 🚀 Features
- Add a country by name using a form.  
- Store data in a PostgreSQL database.  
- Highlight visited countries on a world map.  
- Display total number of countries visited.  

---

## 🛠️ Tech Stack
- **Backend**: Node.js, Express  
- **Frontend**: EJS Templates, CSS  
- **Database**: PostgreSQL  
- **Visualization**: Data-Driven Map (e.g., D3.js / GeoJSON / Chart library depending on your implementation)  

---

## 📂 Project Structure
├── public/ Static files (CSS, JS, images)
├── views/ EJS templates
│ ├── index.ejs
├── db/ Database setup and queries
├── app.js Main Express app
├── package.json
└── README.md

## ⚡ Installation & Setup
1. **Clone this repository**
   git clone https://github.com/udit-rai/travel-tracker.git
   cd travel-tracker
2. **Install Dependencies**
    npm install
3. **Set Up DB**
    A. Create a Database (PgAdmin if not CLI skilled yet)
    B. Create the Table 

    ```CREATE TABLE countries (
  id SERIAL PRIMARY KEY,
  country_name VARCHAR(100) UNIQUE NOT NULL
    );```
4. **DB Values**
    To connect with Tables, pg will require db information like authentication, port number
    etc. This version simply hardcodes it since it was on localhost.
5. **Run App**
    node index.js
6. **Visit App**
    Visit: http://localhost:3000
# Wanderlust

# 🌍 Wanderlust

**Wanderlust** is a full-stack travel and stay booking web application inspired by platforms like Airbnb.  
It allows users to explore, list, and book beautiful vacation stays around the world.

---

## 🚀 Features

✅ **User Authentication** – Sign up, log in, and manage sessions securely  
✅ **Listings & Reviews** – Add, edit, and delete property listings with detailed descriptions and reviews  
✅ **Image Uploads** – Cloud-based image hosting for listings (e.g., via Cloudinary)  
✅ **Map Integration** – Interactive maps to locate properties easily  
✅ **Flash Messages & Error Handling** – Clean UI feedback and validations  
✅ **Responsive Design** – Fully responsive and modern interface for desktop and mobile  
✅ **Secure & Scalable Backend** – Built using Express, MongoDB, and Node.js

---

## 🏗️ Tech Stack

| Category | Technology |
|-----------|-------------|
| **Frontend** | HTML, CSS, JavaScript, EJS |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB (with Mongoose ORM) |
| **Authentication** | Passport.js |
| **Hosting / Cloud** | Render / Cloudinary / MongoDB Atlas |
| **Version Control** | Git & GitHub |

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/<your-username>/wanderlust.git
cd wanderlust


Install dependencies
npm install

3️⃣ Set up environment variables

Create a .env file in the root directory and add:

CLOUDINARY_CLOUD_NAME=<your_cloud_name>
CLOUDINARY_KEY=<your_api_key>
CLOUDINARY_SECRET=<your_api_secret>
MAPBOX_TOKEN=<your_mapbox_token>
DB_URL=<your_mongodb_connection_string>
SESSION_SECRET=<your_secret>
PORT=3000

4️⃣ Run the app
npm start


Then open http://localhost:3000
 in your browser.

📁 Folder Structure
Wanderlust/
│
├── public/          # Static assets (CSS, JS, images)
├── routes/          # Express routes
├── models/          # Mongoose models
├── views/           # EJS templates
├── middleware/      # Custom middleware
├── utils/           # Helper functions
├── app.js           # Main app entry point
└── package.json     # Dependencies & scripts

💡 Future Enhancements

✈️ Add flight booking integration

🗺️ Add travel guides and local attraction recommendations

💬 Real-time chat between host and traveler

🌐 Multi-language support

🤝 Contributing

Pull requests are welcome!
If you’d like to contribute, fork the repository and create a feature branch.


🧑‍💻 Author

Shreyash Yadav

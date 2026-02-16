Learn Lingo Language Tutors App

An interactive web application for a company that connects users with experienced language tutors for online learning.
Built with React, Firebase, and React Hook Form, the app allows users to browse tutors, book trial lessons, and manage favorite teachers.

🚀 Features
🏠 Home Page

Displays key advantages of the company.

Includes a “Get Started” link that redirects to the Teachers page.

Styled according to the design mockup (or custom color variations).

👩‍🏫 Teachers Page

Displays a list of tutors fetched from Firebase Realtime Database.
Supports filtering by(in progress):
Language taught
Student level
Price per hour

Loads 4 cards at a time with a “Load more” button to fetch additional tutors.

❤️ Favorites Page (Private)
Accessible only for authorized users.
Displays tutors added to the user’s Favorites.
Favorites persist even after page refresh using Firebase or localStorage.
Removing a favorite updates the UI and data instantly.

🔐 Authentication (Firebase)
Implemented using Firebase Authentication:

Sign Up / Log In / Log Out /Sign in Gogle /
Get current user
Protected routes (Favorites page)
Auth state is stored in a Zustand store for global access.

🧾 Forms and Validation
All forms use React Hook Form and Yup for validation:
Registration Form
Login Form
Book Trial Lesson Form

Each field is required and provides real-time validation messages.
Forms reset after successful submission.

💬 Modal Windows
The application includes several modals:
Login Modal – for user sign-in
Registration Modal – for account creation
Book Trial Lesson Modal – for scheduling a trial session
AuthRequired Modal – shown when an unauthenticated user tries to access a restricted feature

All modals can be closed by:
Clicking the close button
Clicking the backdrop
Pressing the Esc key

Additional Features
Google Sign‑In Support Both Login and Registration modals include an option to sign in or register using Google OAuth.

Automatic Switch Between Registration and Login In the Registration Modal, if the user enters an email address that is already registered in the system, the modal automatically switches to the Login form. This ensures a seamless experience and prevents duplicate accounts.

🧠 Firebase Database Structure
Collection: teachers

Field Type Description
name string Teacher’s first name
surname string Teacher’s last name
languages string[] Languages taught
levels string[] Levels taught (A1–C2)
rating number Average rating
reviews object[] Student reviews
price_per_hour number Hourly rate
lessons_done number Number of completed lessons
avatar_url string Profile image
lesson_info string Short description
conditions string Lesson conditions
experience string Teacher’s experience

You can fill the collection using teachers.json.

⚙️ Technologies Used
React + Vite
Firebase Authentication & Realtime Database
React Router
Zustand (state management)
React Hook Form + Yup (form validation)
React Hot Toast (notifications)
CSS Modules (scoped styling)
TypeScript

🧩 Project Structure
\\\
src/
├── components/
│ ├── Advantages/
│ ├── AuthBar/
│ ├── AuthForm/
│ ├── AuthMenu/
│ ├── BookTrialLessonForm/
│ ├── Button/
│ ├── Container/
│ ├── HeroBanners/
│ ├── HeroImg/
│ ├── Icon/
│ ├── Imac/
│ ├── InputField/
│ ├── Logo/
│ ├── LoginForm/
│ ├── Modal/
│ ├── NavBar/
│ ├── RegisterForm/
│ ├── service/
│ ├── TeacherCard/
│ ├── TeacherList/
│ ├── TeachersSection/
│ ├── UserMenu/
│ ├── utils/
│ │ ├──filtering
│ │ ├──pagination
│ └── Icon/
├── pages/
│ ├── Home/
│ ├── Teachers/
│ ├── Favorites/
│ └── NotFoundPage/
├── zustand/
│ ├── stores/
├── service/
│ ├── firebase.ts
│ └── useAuthActions.ts
└── validation/
├── validation.ts
└── passwordSchema.ts
\\\

🌐 Deployment

The app can be deployed using:

GitHub Pages: https://github.com/Mykhajlo-Berezhnyj/LearnLingo.git

Netlify: https://learnlingo-app.netlify.app/

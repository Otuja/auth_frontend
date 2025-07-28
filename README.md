Custom Authentication Frontend
A modern, secure authentication frontend built with React, Vite, and Tailwind CSS, integrated with a Django REST Framework backend. This application provides user registration with OTP email verification (via Brevo), login, logout, and a protected dashboard. The design features a responsive yellow-to-white gradient UI, ensuring a seamless user experience across devices.
Features

User Registration: Sign up with username, email, and password, followed by OTP verification sent via email.
Login: Authenticate users with username and password, storing a token in localStorage.
OTP Verification: Verify accounts using a 6-digit OTP sent to the user's email.
Resend OTP: Request a new OTP if the initial email fails or expires.
Logout: Securely invalidate the user's token and clear localStorage.
Protected Dashboard: Accessible only to authenticated users, displaying a personalized greeting.
Responsive Design: Styled with Tailwind CSS, featuring a yellow-to-white gradient and split layout.
Toast Notifications: User feedback via react-toastify for success, warning, and error messages.
Google Sign-In Placeholder: UI for future Google OAuth integration.

Tech Stack

Frontend:
React 18
Vite (build tool)
Tailwind CSS (styling)
Axios (API requests)
React Router (navigation)
React Toastify (notifications)
React Icons (UI icons)


Backend (assumed, not included):
Django with Django REST Framework
Brevo (Sendinblue) for transactional emails
Token authentication (rest_framework.authtoken)



Prerequisites

Node.js (v16 or higher)
npm or Yarn
A running Django backend with the following endpoints:
POST /api/account/register/
POST /api/account/login/
POST /api/account/verify-otp/
POST /api/account/resend-otp/
POST /api/account/logout/


Brevo API key configured in the backend
CORS configured to allow requests from the frontend (e.g., http://localhost:5173)

Installation

Clone the Repository:
git clone <your-repository-url>
cd custom-auth-frontend


Install Dependencies:
npm install

or
yarn install


Configure Environment Variables:Create a .env file in the project root and add:
VITE_API_URL=http://127.0.0.1:8000

Replace http://127.0.0.1:8000 with your Django backend URL if different.

Run the Development Server:
npm run dev

or
yarn dev

The app will be available at http://localhost:5173 (or the port specified by Vite).


Usage

Home Page (/):

Displays a welcome message with options to sign in or sign up (for unauthenticated users) or access the dashboard and log out (for authenticated users).
Features a lock icon and yellow-to-white gradient design.


Registration (/register):

Enter username, email, and password.
On success, redirects to /verify-otp with an OTP sent to the provided email.
If email sending fails, a warning is shown, allowing OTP resend.


OTP Verification (/verify-otp):

Enter username and OTP code received via email.
On success, activates the account and redirects to /login.
Includes a "Resend OTP" link to request a new OTP.


Login (/login):

Enter username and password.
Stores authToken and username in localStorage and redirects to /dashboard.


Dashboard (/dashboard):

Protected route accessible only to authenticated users.
Displays a personalized greeting (e.g., "Hello, johnpraise!").
Includes a "Log Out" button to invalidate the token and redirect to /login.


Logout (/logout):

Clears localStorage and calls the backend /api/account/logout/ endpoint to delete the token.
Redirects to /login with a success notification.



Project Structure
custom-auth-frontend/
├── public/
├── src/
│   ├── components/
│   │   ├── Home.jsx           # Welcome page with sign-in/sign-up or dashboard/logout links
│   │   ├── Login.jsx          # Login form
│   │   ├── Register.jsx       # Registration form
│   │   ├── OTPVerify.jsx      # OTP verification form with resend option
│   │   ├── Dashboard.jsx      # Protected dashboard for authenticated users
│   │   ├── ProtectedRoute.jsx # Route wrapper for authenticated routes
│   ├── App.jsx                # Main app with routing
│   ├── main.jsx              # Entry point
│   ├── index.css             # Tailwind CSS imports
├── .env                      # Environment variables (VITE_API_URL)
├── package.json              # Dependencies and scripts
├── vite.config.js            # Vite configuration
├── README.md                 # This file

Dependencies
Install the following packages (already included in package.json):
npm install react react-dom react-router-dom axios react-toastify react-icons

Tailwind CSS Setup

Ensure Tailwind CSS is configured in index.css:

@tailwind base;
@tailwind components;
@tailwind utilities;


Verify tailwind.config.js:

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};

Backend Requirements
The frontend expects a Django backend with:

Token Authentication: Using rest_framework.authtoken.
Endpoints:
POST /api/account/register/: Accepts username, email, password; returns detail and triggers OTP email.
POST /api/account/login/: Accepts username, password; returns token, username, email, detail.
POST /api/account/verify-otp/: Accepts username, otp_code; returns detail.
POST /api/account/resend-otp/: Accepts username; returns detail.
POST /api/account/logout/: Requires Authorization: Token <token>; returns detail.


Brevo Integration: Configured with BREVO_API_KEY for OTP emails.
CORS: Allows requests from http://localhost:5173.

Troubleshooting

401 Unauthorized on Register/Login:

Ensure RegisterView and LoginAPIView have permission_classes = [AllowAny] in views.py.
Verify no Authorization header is sent in axios requests for /register/ or /login/.
Check settings.py has no DEFAULT_PERMISSION_CLASSES set to IsAuthenticated.


403 Forbidden on Logout:

Confirm the Authorization: Token <token> header is sent in the logout request.
Check localStorage for a valid authToken (DevTools > Application > Local Storage).
Verify LogoutAPIView uses IsAuthenticated and the token exists in rest_framework.authtoken.models.Token.


OTP Email Issues:

Check Brevo’s Transactional > Email Activity for sent emails.
Verify BREVO_API_KEY and DEFAULT_FROM_EMAIL (jp9backup@gmail.com) in the backend .env.
Ensure tenacity is retrying transient failures (logs in INFO level).


CORS Errors:

Ensure django-cors-headers is installed and configured:# settings.py
INSTALLED_APPS = ['corsheaders', ...]
MIDDLEWARE = ['corsheaders.middleware.CorsMiddleware', ...]
CORS_ALLOWED_ORIGINS = ['http://localhost:5173']




Logs:

Check Django logs:tail -f /path/to/your/logs


Check browser console (DevTools > Console) for JavaScript errors.



Future Improvements

Google OAuth: Implement Google Sign-In using an OAuth provider.
Password Reset: Add a password reset flow with email-based OTP verification.
Token Expiry: Use djangorestframework-simplejwt for refresh tokens.
Profile Page: Allow users to update their username or email.
Rate Limiting: Enforce stricter throttling on sensitive endpoints (already configured at 20/hour for anon users).

Password Reset: add forget password

Contributing

Fork the repository.
Create a feature branch (git checkout -b feature/your-feature).
Commit changes (git commit -m "Add your feature").
Push to the branch (git push origin feature/your-feature).
Open a pull request.

License
This project is licensed under the MIT License.
Contact
For issues or feature requests, contact John Praise Otuka or open an issue on the repository.
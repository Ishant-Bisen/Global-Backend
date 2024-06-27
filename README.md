# Loan Management System

This project is a loan management system with separate routes for users and administrators. It provides functionality for user authentication, bank account management, loan allocation, withdrawal requests, and payment integration.

## Features

### Admin Routes
- Admin registration and login
- View user details
- Allocate loan amounts to users
- View user bank details

### User Routes
- User registration and login
- Email verification for new users
- Password reset functionality
- Add and view bank details
- Add and view beneficiary details
- Submit withdrawal requests

### Authentication
- JWT-based authentication
- Password hashing using bcrypt
- Email verification for new user signups
- OTP-based password reset

### Payment Integration
- Paytm payment gateway integration

## Tech Stack

- Node.js
- Express.js
- MongoDB (assumed based on the use of models)
- JSON Web Tokens (JWT) for authentication
- bcrypt for password hashing
- Nodemailer for email notifications
- EJS for view templating
- Paytm SDK for payment integration

## Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables in a `.env` file:
   - PORT
   - SRT (JWT secret)
   - AUTH_EMAIL (for email notifications)
   - AUTH_PASS (for email notifications)
   - MongoDB connection string
   - PAYTM_FINAL_URL
   - PAYTM_MERCHANT_KEY
   - Other Paytm configuration variables (MID, WEBSITE, CHANNEL_ID, etc.)
4. Start the server: `npm start`

## API Endpoints

### Authentication Routes
- POST `/global/auth/signup`: Register a new user
- GET `/global/auth/login`: User login
- POST `/global/auth/forgot/password`: Initiate password reset
- PUT `/global/auth/reset/password`: Reset password with OTP

### Admin Routes
- POST `/global/admin/signin`: Register a new admin
- GET `/global/admin/login`: Admin login
- GET `/global/admin/get/user/details`: Get all user details
- GET `/global/admin/get/user/bankdetails`: Get user bank details
- POST `/global/admin/user/amount/allocation`: Allocate loan amount to user

### User Routes
- POST `/global/user/add/bank/details`: Add user bank details
- GET `/global/user/get/bank/details`: Get user's bank details
- POST `/global/user/add/beneficiary/details`: Add beneficiary details
- GET `/global/user/get/beneficiary/details`: Get beneficiary details
- POST `/global/user/withdraw/request`: Submit a withdrawal request

### Payment Routes
- GET `/payment/with/paytm`: Initiate Paytm payment
- GET `/payment/with/paytm/response`: Handle Paytm payment response

## Email Notifications

The system uses Nodemailer to send:
- Verification emails for new user signups
- OTP emails for password reset functionality

## Security

- Passwords are hashed using bcrypt before storage
- JWT is used for maintaining user sessions
- Email verification required for new user signups
- OTP-based password reset for enhanced security
- Input validation and error handling are implemented for most routes

## Payment Integration

The project integrates Paytm payment gateway for processing payments. It includes:
- Initiating payments with dynamic order IDs and amounts
- Handling payment responses and verifying checksums
- Rendering payment pages using EJS templates

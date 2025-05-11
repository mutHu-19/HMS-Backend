# HMS (Hospital Management System) - Backend

![Project Structure](https://img.shields.io/badge/Structure-Organized-brightgreen)
![Node.js](https://img.shields.io/badge/Node.js-18.x-green)
![Express](https://img.shields.io/badge/Express-4.x-lightgrey)
![MongoDB](https://img.shields.io/badge/MongoDB-5.x-green)
![API Tested](https://img.shields.io/badge/API-Tested%20with%20Postman-blue)

A robust backend system for Hospital Management built with Node.js, Express, and MongoDB. This system handles patient registration, doctor appointments, messaging, and administrative functions for healthcare facilities.

## ✨ Key Features

- **User Management**
  - Patient registration and authentication
  - Admin and doctor account management
  - Secure JWT authentication

- **Appointment System**
  - Book, update, and cancel appointments
  - Track appointment statuses
  - Doctor availability management

- **Messaging System**
  - Secure communication between patients and staff
  - Message history tracking

- **Admin Dashboard**
  - Manage all system users
  - Oversee appointments and messages
  - System analytics and reporting

## 🚀 Project Structure

```
HMS-Backend/
├── config/                 # Configuration files
├── controller/             # Business logic handlers
│   ├── appointmentController.js
│   ├── messageController.js
│   └── userController.js
├── database/               # Database connection
│   └── dbConnection.js
├── middleware/             # Custom middleware
│   ├── auth.js
│   ├── catchAsyncErrors.js
│   └── errorMiddleware.js
├── models/                 # MongoDB schemas
│   ├── appointmentSchema.js
│   ├── messageSchema.js
│   └── userSchema.js
├── router/                 # Route definitions
│   ├── appointmentRouter.js
│   ├── messageRouter.js
│   └── userRouter.js
├── utils/                  # Utility functions
│   ┣── jwtToken.js
├── .gitignore
└── app.js                  # Main application entry point
```

## 🔧 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/mutHu-19/HMS-Backend.git
   cd HMS-Backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp config.env.example config.env
   # Edit config.env with your credentials
   ```

4. Start the server:
   ```bash
   npm start
   ```

## 🌐 API Documentation

All APIs have been thoroughly tested with Postman. You can access the complete Postman collection here:

[![Run in Postman](https://run.pstmn.io/button.svg)]([https://www.postman.com/your-postman-link](https://.postman.co/workspace/API-postman-certificate~41201e66-d4f2-49af-ad92-4149c6f03e20/collection/40552469-38dae73c-5639-4269-8474-e81290f6ab2c?action=share&creator=40552469))

### Available Endpoints:

#### Authentication
- `POST /api/v1/user/login` - User login
- `GET /api/v1/user/logout` - User logout

#### User Management
- `POST /api/v1/user/register` - Patient registration
- `POST /api/v1/user/admin/new` - Add new admin
- `POST /api/v1/user/doctor/new` - Add new doctor
- `GET /api/v1/user/doctors` - Get all doctors
- `GET /api/v1/user/admin/:id` - Get admin details
- `GET /api/v1/user/patient/:id` - Get patient details

#### Appointment Management
- `POST /api/v1/appointment/new` - Create new appointment
- `GET /api/v1/appointment/all` - Get all appointments
- `PUT /api/v1/appointment/update` - Update appointment status
- `DELETE /api/v1/appointment/delete` - Delete appointment

#### Messaging
- `POST /api/v1/message/send` - Send new message
- `GET /api/v1/message/all` - Get all messages

## 🛠️ Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT
- **Error Handling**: Custom error middleware
- **Security**: Helmet, CORS, Rate limiting
- **API Testing**: Postman

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

## 📧 Contact

MutHu-19 - [Your Email](mailto:your.email@example.com)

Project Link: [https://github.com/mutHu-19/HMS-Backend](https://github.com/mutHu-19/HMS-Backend)

---

Give a ⭐️ if this project helped you! Happy coding! 🚀

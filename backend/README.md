# Home Harmony Hub Backend API

A comprehensive backend API for the Home Harmony Hub frontend application.

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd home-harmony-hub-main/backend
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env
# Edit .env with your actual values
```

4. Start MongoDB
```bash
# Make sure MongoDB is running on localhost:27017
mongod
```

5. Start the server
```bash
# Development
npm run dev

# Production
npm start
```

## 📁 Project Structure

```
backend/
├── src/
│   ├── config/
│   │   ├── database.js          # MongoDB connection
│   │   └── jwt.js              # JWT token utilities
│   ├── controllers/
│   │   ├── authController.js     # Authentication logic
│   │   ├── userController.js     # User profile management
│   │   ├── serviceController.js   # Service CRUD operations
│   │   ├── bookingController.js   # Booking management
│   │   └── opportunityController.js # Collaboration opportunities
│   ├── middleware/
│   │   ├── auth.js              # Authentication middleware
│   │   ├── errorHandler.js       # Error handling
│   │   └── validation.js        # Input validation
│   ├── models/
│   │   ├── User.js              # User schema
│   │   ├── Service.js           # Service schema
│   │   ├── Booking.js           # Booking schema
│   │   ├── Opportunity.js       # Opportunity schema
│   │   └── Review.js            # Review schema
│   ├── routes/
│   │   ├── authRoutes.js         # Auth endpoints
│   │   ├── userRoutes.js         # User endpoints
│   │   ├── serviceRoutes.js      # Service endpoints
│   │   ├── bookingRoutes.js      # Booking endpoints
│   │   └── opportunityRoutes.js  # Opportunity endpoints
│   └── server.js               # Main server file
├── .env.example                 # Environment variables template
├── .gitignore                  # Git ignore file
├── package.json                # Dependencies and scripts
└── README.md                  # This file
```

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication.

### Token Types
- **Access Token**: 15 minutes expiration
- **Refresh Token**: 7 days expiration (stored in HTTP-only cookie)

### Protected Routes
All routes except `/api/auth/register`, `/api/auth/login`, and `/api/auth/refresh` require authentication.

## 📚 API Endpoints

### Authentication (`/api/auth`)
- `POST /register` - Register new user
- `POST /login` - User login
- `POST /refresh` - Refresh access token
- `POST /logout` - User logout
- `GET /me` - Get current user info

### Users (`/api/users`)
- `GET /profile` - Get user profile
- `PUT /profile` - Update user profile
- `POST /avatar` - Upload user avatar
- `GET /services` - Get user's services (providers)
- `GET /bookings` - Get user's bookings

### Services (`/api/services`)
- `GET /` - Get all services (with pagination, filtering)
- `GET /:id` - Get service by ID
- `POST /` - Create new service (providers only)
- `PUT /:id` - Update service (providers only)
- `DELETE /:id` - Delete service (providers only)
- `GET /search` - Search services

### Bookings (`/api/bookings`)
- `GET /` - Get all user bookings
- `GET /:id` - Get booking by ID
- `POST /` - Create new booking
- `PUT /:id` - Update booking
- `PATCH /:id/cancel` - Cancel booking

### Opportunities (`/api/opportunities`)
- `GET /` - Get all opportunities
- `GET /:id` - Get opportunity by ID
- `POST /` - Create new opportunity
- `POST /:id/apply` - Apply to opportunity
- `PUT /:id` - Update opportunity
- `DELETE /:id` - Delete opportunity

## 📝 Response Format

All API responses follow this format:

```json
{
  "success": boolean,
  "data": any,
  "message": string,
  "error": string (if applicable)
}
```

### Success Response Example
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "64a1b2c3d4e5f6",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user"
    }
  },
  "message": "Operation completed successfully"
}
```

### Error Response Example
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "Please provide a valid email"
    }
  ]
}
```

## 🔒 Security Features

- **Password Hashing**: bcrypt with 10 salt rounds
- **JWT Authentication**: Secure token-based authentication
- **Rate Limiting**: 100 requests per 15 minutes per IP
- **CORS**: Configured for frontend origin
- **Input Validation**: Comprehensive validation using express-validator
- **Helmet**: Security headers
- **HTTP-Only Cookies**: Secure refresh token storage

## 🗄️ Database Models

### User Model
```javascript
{
  name: String (required, 2-50 chars),
  email: String (required, unique, valid email),
  password: String (required, hashed, min 6 chars),
  role: String (user/provider/admin),
  phone: String (optional),
  location: String (optional),
  avatar: String (optional),
  isVerified: Boolean (default: false),
  rating: Number (0-5, default: 0),
  specialties: [String] (optional),
  bio: String (max 500 chars)
}
```

### Service Model
```javascript
{
  name: String (required, max 100 chars),
  category: String (required, enum),
  description: String (required, max 500 chars),
  priceRange: { min: Number, max: Number } (required),
  duration: String (optional),
  image: String (optional),
  isActive: Boolean (default: true),
  provider: ObjectId (ref: User),
  rating: Number (0-5, default: 0),
  reviewCount: Number (default: 0),
  availability: String (enum),
  location: String (optional),
  specialties: [String] (optional)
}
```

### Booking Model
```javascript
{
  service: ObjectId (ref: Service, required),
  customer: ObjectId (ref: User, required),
  provider: ObjectId (ref: User, required),
  date: Date (required),
  time: String (required),
  duration: Number (required),
  price: Number (required),
  status: String (enum, default: pending),
  location: String (required),
  description: String (max 1000 chars),
  paymentStatus: String (enum, default: pending),
  notes: String (max 1000 chars)
}
```

### Opportunity Model
```javascript
{
  title: String (required, max 200 chars),
  description: String (required, max 1000 chars),
  category: String (required, enum),
  budget: { min: Number, max: Number } (required),
  location: String (required),
  deadline: Date (required),
  postedBy: ObjectId (ref: User, required),
  applicants: [{ user: ObjectId, appliedAt: Date, message: String }],
  status: String (enum, default: open),
  urgent: Boolean (default: false),
  skillsRequired: [String] (optional),
  images: [String] (optional)
}
```

## 🧪 Environment Variables

Create a `.env` file based on `.env.example`:

```bash
PORT=5000
MONGODB_URI=mongodb://localhost:27017/home_harmony_hub
JWT_SECRET=your_jwt_secret_key_here
JWT_REFRESH_SECRET=your_refresh_secret_key_here
JWT_EXPIRE=15m
JWT_REFRESH_EXPIRE=7d
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

## 🔄 Development Workflow

1. **Setup Development Environment**
   - Install MongoDB locally
   - Copy `.env.example` to `.env`
   - Update environment variables

2. **Run Development Server**
   ```bash
   npm run dev
   ```
   - Server runs on http://localhost:5000
   - Auto-restarts on file changes

3. **Test API Endpoints**
   - Use Postman or similar API client
   - Test all endpoints with proper authentication

4. **Database Management**
   - Use MongoDB Compass for database inspection
   - Seed data for testing

## 🚀 Deployment

1. **Production Environment**
   - Set `NODE_ENV=production`
   - Configure production MongoDB URI
   - Use strong JWT secrets

2. **Start Production Server**
   ```bash
   npm start
   ```

## 📊 Monitoring & Logging

- **Request Logging**: Morgan middleware (development mode)
- **Error Logging**: Comprehensive error handling
- **Health Check**: `/health` endpoint for monitoring

## 🔧 Scripts

```json
{
  "scripts": {
    "start": "node src/server.js",
    "dev": "nodemon src/server.js",
    "test": "jest"
  }
}
```

## 📝 API Usage Examples

### Register User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "role": "user"
  }'
```

### Login User
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Create Service
```bash
curl -X POST http://localhost:5000/api/services \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <access_token>" \
  -d '{
    "name": "Plumbing Service",
    "category": "plumbing",
    "description": "Professional plumbing services",
    "priceRange": { "min": 50, "max": 100 },
    "location": "New York"
  }'
```

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check MONGODB_URI in .env file
   - Verify network connectivity

2. **JWT Token Issues**
   - Check JWT_SECRET in .env
   - Verify token format in Authorization header
   - Check token expiration

3. **CORS Issues**
   - Verify FRONTEND_URL matches your frontend URL
   - Check browser console for CORS errors

4. **File Upload Issues**
   - Ensure uploads directory exists
   - Check file size limits (5MB max)
   - Verify multer configuration

## 📞 Support

For issues and questions:
- Check the error logs in the console
- Review API documentation
- Test endpoints with proper authentication
- Verify environment variables

## 🔄 Version History

- **v1.0.0**: Initial release with core features
  - User authentication and authorization
  - Service management
  - Booking system
  - Opportunity collaboration
  - File upload support
  - Comprehensive validation
  - Security middleware

# Education Platform - Backend Server

A comprehensive NestJS backend for the Education Platform with real-time features for live streaming, chat, and notifications.

## 🚀 Features

### Teacher Role (المعلم)
- ✅ Create and manage courses
- ✅ Upload materials (Videos, PDFs, Assignments)
- ✅ Start/End live streams (بث مباشر)
- ✅ View enrolled students list
- ✅ Real-time chat with students during live sessions
- ✅ Grade assignments

### Student Role (الطالب)
- ✅ Register / Login
- ✅ Browse published courses
- ✅ Enroll in courses
- ✅ Watch uploaded lessons
- ✅ Join live streams
- ✅ Real-time chat during live sessions
- ✅ Raise hand feature (رفع اليد)
- ✅ Receive notifications when live starts

## 📁 Project Structure

```
server/
├── src/
│   ├── main.ts                    # Application entry point
│   ├── app.module.ts              # Root module
│   │
│   ├── models/                    # Mongoose schemas
│   │   ├── user.model.ts
│   │   ├── course.model.ts
│   │   ├── material.model.ts
│   │   ├── live-stream.model.ts
│   │   ├── chat-message.model.ts
│   │   ├── notification.model.ts
│   │   └── enrollment.model.ts
│   │
│   ├── middleware/                # Guards, strategies, decorators
│   │   ├── jwt.strategy.ts
│   │   ├── guards/
│   │   │   ├── jwt-auth.guard.ts
│   │   │   └── roles.guard.ts
│   │   └── decorators/
│   │       ├── roles.decorator.ts
│   │       ├── public.decorator.ts
│   │       └── current-user.decorator.ts
│   │
│   ├── modules/                   # Feature modules
│   │   ├── auth/                  # Authentication
│   │   ├── users/                 # User management
│   │   ├── courses/               # Course management
│   │   ├── materials/             # Course materials (videos, PDFs, assignments)
│   │   ├── live-stream/           # Live streaming
│   │   ├── chat/                  # Real-time chat
│   │   ├── notifications/         # Push notifications
│   │   └── enrollment/            # Course enrollment
│   │
│   └── sockets/                   # WebSocket gateways
│       ├── live-stream.gateway.ts
│       ├── chat.gateway.ts
│       └── notifications.gateway.ts
│
├── uploads/                       # Uploaded files
├── package.json
├── tsconfig.json
└── .env.example
```

## 🛠 Installation

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Edit .env with your configuration
```

## ⚙️ Configuration

Edit `.env` file:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/education_platform
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=7d
CORS_ORIGIN=http://localhost:4200
```

## 🚀 Running the Server

```bash
# Development mode
npm run start:dev

# Production mode
npm run build
npm run start:prod
```

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login
- `GET /api/auth/profile` - Get current user profile
- `PATCH /api/auth/change-password` - Change password

### Users
- `GET /api/users` - List users (Admin/Teacher)
- `GET /api/users/teachers` - List teachers
- `GET /api/users/students` - List students
- `PATCH /api/users/profile` - Update profile
- `PATCH /api/users/:id` - Admin update user

### Courses
- `POST /api/courses` - Create course (Teacher)
- `GET /api/courses` - List published courses
- `GET /api/courses/my-courses` - Teacher's courses
- `GET /api/courses/enrolled` - Student's enrolled courses
- `GET /api/courses/:id` - Get course details
- `PATCH /api/courses/:id` - Update course
- `PATCH /api/courses/:id/publish` - Publish course
- `DELETE /api/courses/:id` - Delete course

### Materials
- `POST /api/materials` - Upload material (Teacher)
- `POST /api/materials/upload` - Upload file
- `GET /api/materials/course/:courseId` - Get course materials
- `GET /api/materials/course/:courseId/videos` - Get videos
- `GET /api/materials/course/:courseId/pdfs` - Get PDFs
- `GET /api/materials/course/:courseId/assignments` - Get assignments
- `POST /api/materials/:id/submit` - Submit assignment (Student)
- `POST /api/materials/:id/grade` - Grade assignment (Teacher)

### Live Streams
- `POST /api/live-streams` - Schedule live stream (Teacher)
- `GET /api/live-streams/upcoming` - Upcoming streams
- `GET /api/live-streams/live` - Currently live streams
- `POST /api/live-streams/:id/start` - Start stream (Teacher)
- `POST /api/live-streams/:id/end` - End stream (Teacher)

### Enrollment
- `POST /api/enrollments` - Enroll in course
- `DELETE /api/enrollments/:courseId` - Unenroll
- `GET /api/enrollments/my-enrollments` - My enrollments
- `GET /api/enrollments/check/:courseId` - Check enrollment status

### Notifications
- `GET /api/notifications` - Get notifications
- `GET /api/notifications/unread-count` - Unread count
- `PATCH /api/notifications/:id/read` - Mark as read
- `POST /api/notifications/mark-all-read` - Mark all as read

### Chat
- `GET /api/chat/messages/:liveStreamId` - Get chat messages
- `POST /api/chat/send` - Send message
- `DELETE /api/chat/messages/:messageId` - Delete message
- `PATCH /api/chat/messages/:messageId/pin` - Pin message (Teacher)

## 🔌 WebSocket Events

### Live Stream Namespace (`/live-stream`)
- `joinRoom` - Join live stream room
- `leaveRoom` - Leave stream room
- `raiseHand` - Raise hand (Student)
- `lowerHand` - Lower hand
- `answerHand` - Answer raised hand (Teacher)
- `startStream` - Start streaming (Teacher)
- `endStream` - End streaming (Teacher)

### Chat Namespace (`/chat`)
- `joinChat` - Join chat room
- `leaveChat` - Leave chat room
- `sendMessage` - Send message
- `deleteMessage` - Delete message
- `pinMessage` - Pin message (Teacher)
- `typing` - Typing indicator

### Notifications Namespace (`/notifications`)
- Auto-connects and receives real-time notifications

## 🔒 Authentication

The API uses JWT (JSON Web Token) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## 👥 User Roles

- **STUDENT** - Default role, can browse and enroll in courses
- **TEACHER** - Can create courses, upload materials, start live streams
- **ADMIN** - Full access to all features

## 📝 License

MIT License

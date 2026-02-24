/**
 * API Routes Configuration
 * 
 * This file documents all available API routes in the application.
 * Routes are implemented in their respective module controllers.
 */

export const API_ROUTES = {
  // Authentication Routes
  AUTH: {
    BASE: '/api/auth',
    REGISTER: '/api/auth/register',
    LOGIN: '/api/auth/login',
    PROFILE: '/api/auth/profile',
    CHANGE_PASSWORD: '/api/auth/change-password',
    ME: '/api/auth/me',
  },

  // User Routes
  USERS: {
    BASE: '/api/users',
    BY_ID: '/api/users/:id',
    PROFILE: '/api/users/profile',
    TEACHERS: '/api/users/teachers',
    STUDENTS: '/api/users/students',
    DEACTIVATE: '/api/users/:id/deactivate',
  },

  // Course Routes
  COURSES: {
    BASE: '/api/courses',
    ALL: '/api/courses/all',
    BY_ID: '/api/courses/:id',
    MY_COURSES: '/api/courses/my-courses',
    ENROLLED: '/api/courses/enrolled',
    CATEGORIES: '/api/courses/categories',
    STUDENTS: '/api/courses/:id/students',
    PUBLISH: '/api/courses/:id/publish',
    ARCHIVE: '/api/courses/:id/archive',
  },

  // Material Routes
  MATERIALS: {
    BASE: '/api/materials',
    UPLOAD: '/api/materials/upload',
    BY_ID: '/api/materials/:id',
    BY_COURSE: '/api/materials/course/:courseId',
    VIDEOS: '/api/materials/course/:courseId/videos',
    PDFS: '/api/materials/course/:courseId/pdfs',
    ASSIGNMENTS: '/api/materials/course/:courseId/assignments',
    PROGRESS: '/api/materials/course/:courseId/progress',
    SUBMIT: '/api/materials/:id/submit',
    GRADE: '/api/materials/:id/grade',
    COMPLETE: '/api/materials/:id/complete',
  },

  // Live Stream Routes
  LIVE_STREAMS: {
    BASE: '/api/live-streams',
    BY_ID: '/api/live-streams/:id',
    BY_ROOM: '/api/live-streams/room/:roomId',
    UPCOMING: '/api/live-streams/upcoming',
    LIVE: '/api/live-streams/live',
    PARTICIPANTS: '/api/live-streams/room/:roomId/participants',
    START: '/api/live-streams/:id/start',
    END: '/api/live-streams/:id/end',
  },

  // Enrollment Routes
  ENROLLMENTS: {
    BASE: '/api/enrollments',
    MY_ENROLLMENTS: '/api/enrollments/my-enrollments',
    BY_COURSE: '/api/enrollments/course/:courseId',
    CHECK: '/api/enrollments/check/:courseId',
    PROGRESS: '/api/enrollments/:courseId/progress',
    COMPLETE_MATERIAL: '/api/enrollments/:courseId/complete-material/:materialId',
    MY_STATS: '/api/enrollments/my-stats',
    COURSE_STATS: '/api/enrollments/course/:courseId/stats',
  },

  // Chat Routes
  CHAT: {
    SEND: '/api/chat/send',
    MESSAGES: '/api/chat/messages/:liveStreamId',
    RECENT: '/api/chat/messages/:liveStreamId/recent',
    PINNED: '/api/chat/messages/:liveStreamId/pinned',
    DELETE: '/api/chat/messages/:messageId',
    PIN: '/api/chat/messages/:messageId/pin',
  },

  // Notification Routes
  NOTIFICATIONS: {
    BASE: '/api/notifications',
    UNREAD_COUNT: '/api/notifications/unread-count',
    MARK_READ: '/api/notifications/:id/read',
    MARK_ALL_READ: '/api/notifications/mark-all-read',
  },
};

// WebSocket Namespaces
export const WS_NAMESPACES = {
  LIVE_STREAM: '/live-stream',
  CHAT: '/chat',
  NOTIFICATIONS: '/notifications',
};

// WebSocket Events
export const WS_EVENTS = {
  LIVE_STREAM: {
    // Client Events
    JOIN_ROOM: 'joinRoom',
    LEAVE_ROOM: 'leaveRoom',
    RAISE_HAND: 'raiseHand',
    LOWER_HAND: 'lowerHand',
    ANSWER_HAND: 'answerHand',
    START_STREAM: 'startStream',
    END_STREAM: 'endStream',
    GET_PARTICIPANTS: 'getParticipants',
    
    // Server Events
    USER_JOINED: 'userJoined',
    USER_LEFT: 'userLeft',
    HAND_RAISED: 'handRaised',
    HAND_LOWERED: 'handLowered',
    HAND_ANSWERED: 'handAnswered',
    STREAM_STARTED: 'streamStarted',
    STREAM_ENDED: 'streamEnded',
    PARTICIPANT_COUNT: 'participantCount',
  },

  CHAT: {
    // Client Events
    JOIN_CHAT: 'joinChat',
    LEAVE_CHAT: 'leaveChat',
    SEND_MESSAGE: 'sendMessage',
    DELETE_MESSAGE: 'deleteMessage',
    PIN_MESSAGE: 'pinMessage',
    TYPING: 'typing',

    // Server Events
    NEW_MESSAGE: 'newMessage',
    MESSAGE_DELETED: 'messageDeleted',
    MESSAGE_PINNED: 'messagePinned',
    USER_TYPING: 'userTyping',
  },

  NOTIFICATIONS: {
    // Server Events
    NOTIFICATION: 'notification',
    LIVE_STREAM_STARTED: 'liveStreamStarted',
  },
};

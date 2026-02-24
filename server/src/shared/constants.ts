/**
 * Shared Constants
 */

// User Roles
export const USER_ROLES = {
  TEACHER: 'teacher',
  STUDENT: 'student',
  ADMIN: 'admin',
} as const;

// Course Status
export const COURSE_STATUS = {
  DRAFT: 'draft',
  PUBLISHED: 'published',
  ARCHIVED: 'archived',
} as const;

// Course Level
export const COURSE_LEVEL = {
  BEGINNER: 'beginner',
  INTERMEDIATE: 'intermediate',
  ADVANCED: 'advanced',
} as const;

// Material Types
export const MATERIAL_TYPES = {
  VIDEO: 'video',
  PDF: 'pdf',
  ASSIGNMENT: 'assignment',
  DOCUMENT: 'document',
  LINK: 'link',
} as const;

// Assignment Status
export const ASSIGNMENT_STATUS = {
  NOT_SUBMITTED: 'not_submitted',
  SUBMITTED: 'submitted',
  GRADED: 'graded',
  LATE: 'late',
} as const;

// Live Stream Status
export const LIVE_STREAM_STATUS = {
  SCHEDULED: 'scheduled',
  LIVE: 'live',
  ENDED: 'ended',
  CANCELLED: 'cancelled',
} as const;

// Message Types
export const MESSAGE_TYPES = {
  TEXT: 'text',
  SYSTEM: 'system',
  HAND_RAISE: 'hand_raise',
  HAND_LOWER: 'hand_lower',
  JOIN: 'join',
  LEAVE: 'leave',
} as const;

// Notification Types
export const NOTIFICATION_TYPES = {
  LIVE_STREAM_STARTING: 'live_stream_starting',
  LIVE_STREAM_STARTED: 'live_stream_started',
  LIVE_STREAM_ENDED: 'live_stream_ended',
  NEW_MATERIAL: 'new_material',
  ASSIGNMENT_DUE: 'assignment_due',
  ASSIGNMENT_GRADED: 'assignment_graded',
  COURSE_ENROLLED: 'course_enrolled',
  COURSE_UPDATE: 'course_update',
  SYSTEM: 'system',
} as const;

// Enrollment Status
export const ENROLLMENT_STATUS = {
  ACTIVE: 'active',
  COMPLETED: 'completed',
  DROPPED: 'dropped',
  SUSPENDED: 'suspended',
} as const;

// Pagination Defaults
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100,
} as const;

// File Upload Limits
export const FILE_LIMITS = {
  MAX_FILE_SIZE: 100 * 1024 * 1024, // 100MB
  ALLOWED_VIDEO_TYPES: ['video/mp4', 'video/webm', 'video/ogg'],
  ALLOWED_PDF_TYPES: ['application/pdf'],
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
} as const;

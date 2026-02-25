/**
 * Arabic Language Teacher - Seed Script
 * Run: node server/seed-arabic.js
 * 
 * Creates:
 * - 1 admin, 1 teacher (أحمد محمد), 1 student account
 * - 9 Arabic courses (3 per stage: primary, preparatory, secondary)
 * - Videos + PDFs + Exams for each course
 * - Student enrolled in all courses
 */

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/education_platform';

// ── Schemas ────────────────────────────────────
const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ['student', 'teacher', 'admin'], default: 'student' },
  isActive: { type: Boolean, default: true },
  phone: String,
  department: String,
  specialization: String,
  teachingCourses: [{ type: mongoose.Types.ObjectId, ref: 'Course' }],
  enrolledCourses: [{ type: mongoose.Types.ObjectId, ref: 'Course' }],
}, { timestamps: true });

const CourseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  shortDescription: String,
  thumbnail: String,
  teacher: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
  category: String,
  level: { type: String, enum: ['beginner', 'intermediate', 'advanced'], default: 'beginner' },
  stage: { type: String, enum: ['primary', 'preparatory', 'secondary'] },
  grade: Number,
  status: { type: String, enum: ['draft', 'published', 'archived'], default: 'draft' },
  price: { type: Number, default: 0 },
  isFree: { type: Boolean, default: true },
  tags: [String],
  duration: { type: Number, default: 0 },
  enrolledStudents: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
  enrollmentCount: { type: Number, default: 0 },
  materials: [{ type: mongoose.Types.ObjectId, ref: 'Material' }],
  liveStreams: [{ type: mongoose.Types.ObjectId, ref: 'LiveStream' }],
  rating: { type: Number, default: 0 },
  startDate: Date,
  endDate: Date,
}, { timestamps: true });

const MaterialSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  type: { type: String, enum: ['video', 'pdf', 'assignment', 'document', 'link'], required: true },
  course: { type: mongoose.Types.ObjectId, ref: 'Course', required: true },
  uploadedBy: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
  fileUrl: String,
  fileName: String,
  fileSize: Number,
  mimeType: String,
  duration: Number,
  thumbnail: String,
  order: { type: Number, default: 0 },
  isPublished: { type: Boolean, default: true },
}, { timestamps: true });

const ExamSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  course: { type: mongoose.Types.ObjectId, ref: 'Course', required: true },
  teacher: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
  questions: [{
    text: { type: String, required: true },
    type: { type: String, enum: ['multiple_choice', 'true_false'], default: 'multiple_choice' },
    options: [String],
    correctAnswer: { type: Number, required: true },
    points: { type: Number, default: 1 },
  }],
  passingScore: { type: Number, default: 60 },
  timeLimit: { type: Number, default: 30 },
  maxAttempts: { type: Number, default: 3 },
  isActive: { type: Boolean, default: true },
  showResults: { type: Boolean, default: true },
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);
const Material = mongoose.model('Material', MaterialSchema);
const Exam = mongoose.model('Exam', ExamSchema);

// ── Users ──────────────────────────────────────
const users = [
  {
    firstName: 'مدير',
    lastName: 'النظام',
    email: 'admin@test.com',
    password: 'admin123',
    role: 'admin',
  },
  {
    firstName: 'أحمد',
    lastName: 'محمد',
    email: 'teacher@test.com',
    password: 'teacher123',
    role: 'teacher',
    department: 'اللغة العربية',
    specialization: 'نحو وصرف وبلاغة',
  },
  {
    firstName: 'محمد',
    lastName: 'علي',
    email: 'student@test.com',
    password: 'student123',
    role: 'student',
  },
];

// ── Courses Data ───────────────────────────────
const coursesData = [
  // ═══ المرحلة الابتدائية ═══
  {
    title: 'أساسيات اللغة العربية - الصف الرابع الابتدائي',
    description: 'كورس شامل لطلاب الصف الرابع الابتدائي يتضمن شرح قواعد النحو الأساسية مثل الجملة الاسمية والفعلية، والفاعل والمفعول به، مع تدريبات تفاعلية وأنشطة ممتعة لتثبيت المعلومات. يشمل أيضاً قراءة نصوص أدبية مبسطة وتعليم الإملاء والخط.',
    shortDescription: 'تأسيس في النحو والقراءة والإملاء',
    category: 'اللغة العربية',
    level: 'beginner',
    stage: 'primary',
    grade: 4,
    status: 'published',
    price: 0,
    isFree: true,
    duration: 120,
    enrollmentCount: 85,
    rating: 4.8,
    tags: ['نحو', 'إملاء', 'قراءة', 'ابتدائي'],
  },
  {
    title: 'النحو المبسط - الصف الخامس الابتدائي',
    description: 'شرح وافٍ لقواعد النحو للصف الخامس الابتدائي. يتناول الكورس الحال والتمييز والنعت والعطف والبدل مع أمثلة من الحياة اليومية وتمارين تفاعلية. كذلك يشمل تحليل نصوص شعرية ونثرية مناسبة للمرحلة.',
    shortDescription: 'قواعد النحو والتعبير الكتابي',
    category: 'اللغة العربية',
    level: 'beginner',
    stage: 'primary',
    grade: 5,
    status: 'published',
    price: 0,
    isFree: true,
    duration: 150,
    enrollmentCount: 72,
    rating: 4.7,
    tags: ['نحو', 'تعبير', 'ابتدائي'],
  },
  {
    title: 'اللغة العربية الشاملة - الصف السادس الابتدائي',
    description: 'مراجعة شاملة ومكثفة لمنهج الصف السادس الابتدائي في اللغة العربية. يغطي الكورس المبني للمعلوم والمبني للمجهول، وأسماء الإشارة والأسماء الموصولة، والتعبير الإبداعي والوظيفي، مع نماذج امتحانات واختبارات تدريبية.',
    shortDescription: 'مراجعة شاملة للصف السادس',
    category: 'اللغة العربية',
    level: 'beginner',
    stage: 'primary',
    grade: 6,
    status: 'published',
    price: 50,
    isFree: false,
    duration: 180,
    enrollmentCount: 93,
    rating: 4.9,
    tags: ['نحو', 'بلاغة', 'تعبير', 'ابتدائي'],
  },

  // ═══ المرحلة الاعدادية ═══
  {
    title: 'النحو والصرف - الصف الأول الاعدادي',
    description: 'كورس متكامل لشرح النحو والصرف للصف الأول الاعدادي. يتناول أنواع الخبر، وكان وأخواتها، وإن وأخواتها، مع شرح مفصل للتصريف وأوزان الأفعال. يتضمن فيديوهات شرح واضحة وملخصات PDF وامتحانات تدريبية.',
    shortDescription: 'النحو والصرف للأول الاعدادي',
    category: 'اللغة العربية',
    level: 'intermediate',
    stage: 'preparatory',
    grade: 1,
    status: 'published',
    price: 0,
    isFree: true,
    duration: 200,
    enrollmentCount: 120,
    rating: 4.8,
    tags: ['نحو', 'صرف', 'اعدادي'],
  },
  {
    title: 'البلاغة والنصوص - الصف الثاني الاعدادي',
    description: 'شرح شامل للبلاغة العربية للصف الثاني الاعدادي يشمل التشبيه والاستعارة والكناية والمحسنات البديعية. كذلك يتضمن تحليل النصوص الأدبية والشعرية مع استخراج الجماليات. فيديوهات شرح عالية الجودة مع ملخصات ونماذج امتحانات.',
    shortDescription: 'بلاغة ونصوص أدبية',
    category: 'اللغة العربية',
    level: 'intermediate',
    stage: 'preparatory',
    grade: 2,
    status: 'published',
    price: 75,
    isFree: false,
    duration: 220,
    enrollmentCount: 95,
    rating: 4.6,
    tags: ['بلاغة', 'نصوص', 'أدب', 'اعدادي'],
  },
  {
    title: 'مراجعة نهائية - الصف الثالث الاعدادي',
    description: 'مراجعة نهائية شاملة ومكثفة لمنهج اللغة العربية كاملاً للصف الثالث الاعدادي. يشمل مراجعة النحو (المنصوبات والمجرورات والمرفوعات)، والقراءة، والنصوص، والتعبير. مع حل نماذج امتحانات المحافظات وتوقعات الامتحان.',
    shortDescription: 'مراجعة نهائية شاملة للشهادة الاعدادية',
    category: 'اللغة العربية',
    level: 'intermediate',
    stage: 'preparatory',
    grade: 3,
    status: 'published',
    price: 100,
    isFree: false,
    duration: 300,
    enrollmentCount: 210,
    rating: 4.9,
    tags: ['مراجعة', 'نحو', 'امتحانات', 'اعدادي'],
  },

  // ═══ المرحلة الثانوية ═══
  {
    title: 'النحو المتقدم - الصف الأول الثانوي',
    description: 'شرح تفصيلي لمنهج النحو للصف الأول الثانوي. يتناول الكورس إعراب الجمل، والممنوع من الصرف، واسم الفاعل واسم المفعول، والمصادر والمشتقات. مع تدريبات مكثفة على الإعراب وتحليل الجمل.',
    shortDescription: 'النحو المتقدم والإعراب',
    category: 'اللغة العربية',
    level: 'advanced',
    stage: 'secondary',
    grade: 1,
    status: 'published',
    price: 0,
    isFree: true,
    duration: 250,
    enrollmentCount: 155,
    rating: 4.7,
    tags: ['نحو', 'إعراب', 'مشتقات', 'ثانوي'],
  },
  {
    title: 'البلاغة والأدب - الصف الثاني الثانوي',
    description: 'دراسة معمقة في البلاغة العربية والأدب العربي عبر العصور. يشمل الكورس البلاغة (البيان والبديع والمعاني)، وتاريخ الأدب العربي من العصر الجاهلي إلى العصر الحديث، مع تحليل نصوص من أمهات الكتب.',
    shortDescription: 'بلاغة وأدب عبر العصور',
    category: 'اللغة العربية',
    level: 'advanced',
    stage: 'secondary',
    grade: 2,
    status: 'published',
    price: 120,
    isFree: false,
    duration: 280,
    enrollmentCount: 130,
    rating: 4.8,
    tags: ['بلاغة', 'أدب', 'نصوص', 'ثانوي'],
  },
  {
    title: 'مراجعة شاملة - الصف الثالث الثانوي',
    description: 'المراجعة الشاملة والنهائية لمنهج اللغة العربية للثانوية العامة. يغطي الكورس جميع فروع المادة: النحو والصرف، البلاغة، الأدب والنصوص، القراءة، والتعبير. مع حل أسئلة امتحانات السنوات السابقة وتوقعات امتحان هذا العام.',
    shortDescription: 'مراجعة الثانوية العامة الشاملة',
    category: 'اللغة العربية',
    level: 'advanced',
    stage: 'secondary',
    grade: 3,
    status: 'published',
    price: 150,
    isFree: false,
    duration: 400,
    enrollmentCount: 340,
    rating: 4.9,
    tags: ['مراجعة', 'ثانوية عامة', 'نحو', 'بلاغة', 'ثانوي'],
  },
];

// ── Materials Data ─────────────────────────────
const materialsMap = {
  'أساسيات اللغة العربية - الصف الرابع الابتدائي': {
    videos: [
      { title: 'الجملة الاسمية والجملة الفعلية', description: 'شرح الفرق بين الجملة الاسمية والفعلية مع أمثلة تفاعلية', duration: 1200, fileUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },
      { title: 'الفاعل وأنواعه', description: 'تعريف الفاعل وأنواعه (اسم ظاهر - ضمير متصل - ضمير مستتر)', duration: 1500, fileUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },
      { title: 'المفعول به', description: 'شرح المفعول به وعلامات نصبه مع تدريبات', duration: 1350, fileUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },
      { title: 'أسماء الإشارة', description: 'أسماء الإشارة للقريب والبعيد مع إعرابها', duration: 1100, fileUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },
    ],
    pdfs: [
      { title: 'ملخص قواعد النحو - الصف الرابع', description: 'ملخص شامل لجميع القواعد النحوية', fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' },
      { title: 'تدريبات الإملاء والخط', description: 'أوراق عمل لتحسين الإملاء والخط العربي', fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' },
    ],
  },
  'النحو المبسط - الصف الخامس الابتدائي': {
    videos: [
      { title: 'الحال وأنواعه', description: 'شرح الحال المفرد والجملة وشبه الجملة', duration: 1400, fileUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },
      { title: 'التمييز', description: 'التمييز الملفوظ والتمييز الملحوظ مع أمثلة', duration: 1300, fileUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },
      { title: 'النعت (الصفة)', description: 'النعت المفرد ونعت الجملة وشبه الجملة', duration: 1250, fileUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },
      { title: 'العطف والبدل', description: 'حروف العطف وأنواع البدل مع تطبيقات', duration: 1500, fileUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },
      { title: 'التعبير الكتابي', description: 'كيف تكتب موضوع تعبير متميز', duration: 1200, fileUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },
    ],
    pdfs: [
      { title: 'ملخص النحو - الصف الخامس', description: 'ملخص شامل لقواعد الصف الخامس', fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' },
    ],
  },
  'اللغة العربية الشاملة - الصف السادس الابتدائي': {
    videos: [
      { title: 'المبني للمعلوم والمبني للمجهول', description: 'الفرق بين المبني للمعلوم والمبني للمجهول وكيفية التحويل', duration: 1600, fileUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },
      { title: 'الأسماء الموصولة', description: 'الأسماء الموصولة الخاصة والمشتركة مع إعرابها', duration: 1300, fileUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },
      { title: 'ظرف الزمان والمكان', description: 'أنواع الظروف وإعرابها ومواضعها في الجملة', duration: 1200, fileUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },
      { title: 'التعبير الإبداعي والوظيفي', description: 'الفرق بين التعبير الإبداعي والوظيفي مع نماذج', duration: 1400, fileUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },
      { title: 'نموذج امتحان شامل مع الحل', description: 'حل نموذج امتحان كامل خطوة بخطوة', duration: 1800, fileUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },
    ],
    pdfs: [
      { title: 'ملخص شامل - الصف السادس', description: 'مراجعة نهائية لكل فروع المادة', fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' },
      { title: 'نماذج امتحانات بالإجابات', description: '5 نماذج امتحانات مع الإجابات النموذجية', fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' },
    ],
  },
  'النحو والصرف - الصف الأول الاعدادي': {
    videos: [
      { title: 'أنواع الخبر (مفرد - جملة - شبه جملة)', description: 'شرح تفصيلي لأنواع الخبر الثلاثة مع الإعراب', duration: 1800, fileUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },
      { title: 'كان وأخواتها', description: 'الأفعال الناسخة وعملها في الجملة الاسمية', duration: 1600, fileUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },
      { title: 'إن وأخواتها', description: 'الحروف الناسخة وعملها مع أمثلة وتدريبات', duration: 1500, fileUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },
      { title: 'الفعل الصحيح والمعتل', description: 'أنواع الفعل من حيث الصحة والاعتلال', duration: 1400, fileUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },
      { title: 'الميزان الصرفي', description: 'كيفية وزن الكلمات على الميزان الصرفي', duration: 1300, fileUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },
      { title: 'تدريبات إعرابية شاملة', description: 'حل تدريبات إعراب متنوعة على جميع الدروس', duration: 2000, fileUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },
    ],
    pdfs: [
      { title: 'ملخص النحو - أولى اعدادي', description: 'ملخص شامل لقواعد النحو', fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' },
      { title: 'ملخص الصرف - أولى اعدادي', description: 'ملخص كامل لدروس الصرف', fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' },
      { title: 'نماذج امتحانات مجابة', description: 'مجموعة نماذج امتحانات مع الحل', fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' },
    ],
  },
  'البلاغة والنصوص - الصف الثاني الاعدادي': {
    videos: [
      { title: 'التشبيه وأركانه', description: 'أنواع التشبيه (تام - مفصل - بليغ - تمثيلي)', duration: 1500, fileUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },
      { title: 'الاستعارة المكنية والتصريحية', description: 'شرح الاستعارة بنوعيها مع أمثلة من الشعر والنثر', duration: 1700, fileUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },
      { title: 'الكناية', description: 'الكناية عن صفة وعن موصوف وعن نسبة', duration: 1400, fileUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },
      { title: 'المحسنات البديعية', description: 'الطباق والمقابلة والجناس والسجع', duration: 1600, fileUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },
      { title: 'تحليل نص شعري', description: 'كيف تحلل قصيدة وتستخرج الجماليات', duration: 1900, fileUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },
    ],
    pdfs: [
      { title: 'ملخص البلاغة - ثانية اعدادي', description: 'ملخص جميع دروس البلاغة', fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' },
      { title: 'تدريبات على النصوص', description: 'أسئلة وتدريبات على النصوص المقررة', fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' },
    ],
  },
  'مراجعة نهائية - الصف الثالث الاعدادي': {
    videos: [
      { title: 'مراجعة المنصوبات', description: 'المفعول به، المفعول لأجله، المفعول المطلق، الحال، التمييز', duration: 2200, fileUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },
      { title: 'مراجعة المجرورات', description: 'حروف الجر، الإضافة، الاسم المجرور بحرف جر', duration: 1800, fileUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },
      { title: 'مراجعة المرفوعات', description: 'الفاعل، نائب الفاعل، المبتدأ والخبر، اسم كان وأخواتها', duration: 2000, fileUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },
      { title: 'مراجعة القراءة والنصوص', description: 'مراجعة جميع دروس القراءة والنصوص', duration: 2400, fileUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },
      { title: 'حل امتحانات المحافظات', description: 'حل أهم امتحانات المحافظات للسنوات السابقة', duration: 2800, fileUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },
      { title: 'توقعات الامتحان', description: 'أهم الأسئلة المتوقعة في الامتحان', duration: 1500, fileUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },
    ],
    pdfs: [
      { title: 'ملخص النحو الشامل - ثالثة اعدادي', description: 'كل قواعد النحو في ملخص واحد', fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' },
      { title: 'نماذج امتحانات المحافظات', description: '10 نماذج امتحانات حقيقية مع الإجابات', fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' },
      { title: 'المراجعة الليلة قبل الامتحان', description: 'ملخص سريع لأهم النقاط', fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' },
    ],
  },
  'النحو المتقدم - الصف الأول الثانوي': {
    videos: [
      { title: 'الممنوع من الصرف', description: 'أسباب منع الاسم من الصرف وعلامات إعرابه', duration: 1800, fileUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },
      { title: 'اسم الفاعل واسم المفعول', description: 'صياغة اسم الفاعل واسم المفعول وإعمالهما', duration: 2000, fileUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },
      { title: 'المصادر الصريحة والمؤولة', description: 'المصدر الصريح والمصدر المؤول وإعرابهما', duration: 1700, fileUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },
      { title: 'إعراب الجمل', description: 'الجمل التي لها محل من الإعراب والتي ليس لها محل', duration: 2200, fileUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },
      { title: 'أسلوب الشرط', description: 'أدوات الشرط الجازمة وغير الجازمة', duration: 1600, fileUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },
    ],
    pdfs: [
      { title: 'ملخص النحو - أولى ثانوي', description: 'ملخص شامل لجميع دروس النحو', fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' },
      { title: 'تدريبات إعرابية مكثفة', description: '100 جملة للتدريب على الإعراب', fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' },
    ],
  },
  'البلاغة والأدب - الصف الثاني الثانوي': {
    videos: [
      { title: 'علم البيان - مراجعة شاملة', description: 'التشبيه والاستعارة والكناية والمجاز المرسل', duration: 2400, fileUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },
      { title: 'علم البديع', description: 'المحسنات اللفظية (الجناس والسجع) والمعنوية (الطباق والمقابلة)', duration: 1800, fileUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },
      { title: 'علم المعاني', description: 'الأساليب الخبرية والإنشائية وأغراضها البلاغية', duration: 2000, fileUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },
      { title: 'الأدب في العصر الجاهلي والإسلامي', description: 'خصائص الشعر والنثر في العصرين الجاهلي والإسلامي', duration: 2200, fileUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },
      { title: 'الأدب في العصر العباسي والحديث', description: 'تطور الأدب العربي من العصر العباسي إلى العصر الحديث', duration: 2100, fileUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },
      { title: 'تحليل النصوص الأدبية', description: 'منهجية تحليل النصوص واستخراج الجماليات', duration: 2500, fileUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },
    ],
    pdfs: [
      { title: 'ملخص البلاغة الكامل', description: 'جميع دروس البلاغة في ملخص واحد مع أمثلة', fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' },
      { title: 'تاريخ الأدب العربي - ملخص', description: 'ملخص تاريخ الأدب عبر العصور', fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' },
      { title: 'نماذج تحليل نصوص', description: 'نماذج محلولة لتحليل نصوص شعرية ونثرية', fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' },
    ],
  },
  'مراجعة شاملة - الصف الثالث الثانوي': {
    videos: [
      { title: 'مراجعة النحو - الجزء الأول', description: 'مراجعة شاملة للنحو: الإعراب والبناء، المرفوعات', duration: 2800, fileUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },
      { title: 'مراجعة النحو - الجزء الثاني', description: 'المنصوبات والمجرورات والتوابع', duration: 2600, fileUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },
      { title: 'مراجعة البلاغة', description: 'مراجعة شاملة لعلوم البلاغة الثلاثة', duration: 2400, fileUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },
      { title: 'مراجعة الأدب والنصوص', description: 'مراجعة المدارس الأدبية والنصوص المقررة', duration: 2200, fileUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },
      { title: 'مراجعة القراءة', description: 'مراجعة دروس القراءة مع الأسئلة المتوقعة', duration: 1800, fileUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },
      { title: 'حل امتحانات الثانوية العامة', description: 'حل امتحانات الثانوية العامة للسنوات الخمس الأخيرة', duration: 3600, fileUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },
      { title: 'التعبير الإبداعي - كيف تحصل على الدرجة النهائية', description: 'نصائح وتقنيات لكتابة تعبير متميز', duration: 1500, fileUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },
    ],
    pdfs: [
      { title: 'ملخص النحو الشامل - ثالثة ثانوي', description: 'كل قواعد النحو للثانوية العامة', fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' },
      { title: 'ملخص البلاغة والأدب', description: 'ملخص البلاغة وتاريخ الأدب', fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' },
      { title: 'بنك أسئلة الثانوية العامة', description: 'جميع أسئلة الامتحانات السابقة مصنفة حسب الفرع', fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' },
      { title: 'توقعات الامتحان', description: 'أهم الأسئلة المتوقعة لامتحان هذا العام', fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' },
    ],
  },
};

// ── Exams Data ─────────────────────────────────
const examsMap = {
  'أساسيات اللغة العربية - الصف الرابع الابتدائي': [
    {
      title: 'اختبار الجملة الاسمية والفعلية',
      description: 'اختبار على الدرس الأول: التمييز بين الجملة الاسمية والفعلية',
      passingScore: 60,
      timeLimit: 15,
      maxAttempts: 3,
      questions: [
        { text: 'ما نوع الجملة: "الطالبُ مجتهدٌ"؟', type: 'multiple_choice', options: ['جملة اسمية', 'جملة فعلية', 'شبه جملة', 'لا شيء مما سبق'], correctAnswer: 0, points: 2 },
        { text: 'ما نوع الجملة: "يذهبُ الطالبُ إلى المدرسة"؟', type: 'multiple_choice', options: ['جملة اسمية', 'جملة فعلية', 'شبه جملة', 'جملة استفهامية'], correctAnswer: 1, points: 2 },
        { text: 'المبتدأ يكون مرفوعاً دائماً', type: 'true_false', options: ['صح', 'خطأ'], correctAnswer: 0, points: 1 },
        { text: 'الفاعل في جملة "شرحَ المعلمُ الدرسَ" هو:', type: 'multiple_choice', options: ['شرحَ', 'المعلمُ', 'الدرسَ', 'لا يوجد فاعل'], correctAnswer: 1, points: 2 },
        { text: 'الجملة الاسمية تبدأ بـ:', type: 'multiple_choice', options: ['فعل', 'اسم', 'حرف', 'ظرف'], correctAnswer: 1, points: 1 },
      ],
    },
  ],
  'النحو والصرف - الصف الأول الاعدادي': [
    {
      title: 'اختبار كان وأخواتها وإن وأخواتها',
      description: 'اختبار شامل على الأفعال الناسخة والحروف الناسخة',
      passingScore: 60,
      timeLimit: 20,
      maxAttempts: 3,
      questions: [
        { text: '"كان" ترفع المبتدأ وتنصب الخبر', type: 'true_false', options: ['صح', 'خطأ'], correctAnswer: 0, points: 1 },
        { text: '"إنّ" تنصب المبتدأ وترفع الخبر', type: 'true_false', options: ['صح', 'خطأ'], correctAnswer: 0, points: 1 },
        { text: 'ما إعراب "مجتهداً" في: "كان الطالبُ مجتهداً"؟', type: 'multiple_choice', options: ['اسم كان', 'خبر كان منصوب', 'حال', 'مفعول به'], correctAnswer: 1, points: 2 },
        { text: 'أي من الآتي ليس من أخوات كان؟', type: 'multiple_choice', options: ['أصبح', 'ظلّ', 'لعلّ', 'ليس'], correctAnswer: 2, points: 2 },
        { text: 'أي من الآتي من أخوات إنّ؟', type: 'multiple_choice', options: ['كان', 'لعلّ', 'ظلّ', 'بات'], correctAnswer: 1, points: 2 },
        { text: '"لكنّ" تفيد:', type: 'multiple_choice', options: ['التوكيد', 'التمني', 'الاستدراك', 'الرجاء'], correctAnswer: 2, points: 2 },
      ],
    },
  ],
  'مراجعة نهائية - الصف الثالث الاعدادي': [
    {
      title: 'امتحان تجريبي شامل',
      description: 'امتحان تجريبي يحاكي امتحان نهاية العام',
      passingScore: 50,
      timeLimit: 45,
      maxAttempts: 5,
      questions: [
        { text: 'ما إعراب "الكتابَ" في: "قرأتُ الكتابَ"؟', type: 'multiple_choice', options: ['فاعل', 'مفعول به منصوب', 'مبتدأ', 'خبر'], correctAnswer: 1, points: 2 },
        { text: '"في الصباح" تُعرب:', type: 'multiple_choice', options: ['مفعول فيه', 'جار ومجرور (شبه جملة)', 'ظرف زمان', 'حال'], correctAnswer: 1, points: 2 },
        { text: 'المفعول لأجله منصوب دائماً', type: 'true_false', options: ['صح', 'خطأ'], correctAnswer: 0, points: 1 },
        { text: '"إياك نعبد" - "إياك" ضمير في محل:', type: 'multiple_choice', options: ['رفع فاعل', 'نصب مفعول به', 'جر بالإضافة', 'رفع مبتدأ'], correctAnswer: 1, points: 2 },
        { text: 'الفعل المضارع يُجزم بعد:', type: 'multiple_choice', options: ['إنّ', 'لم', 'قد', 'سوف'], correctAnswer: 1, points: 2 },
        { text: '"ما أجملَ السماءَ!" أسلوب:', type: 'multiple_choice', options: ['استفهام', 'تعجب', 'نداء', 'شرط'], correctAnswer: 1, points: 1 },
        { text: 'الاسم المجرور يكون بعد:', type: 'multiple_choice', options: ['حرف نصب', 'حرف جر', 'حرف جزم', 'حرف عطف'], correctAnswer: 1, points: 2 },
        { text: '"العلمُ نورٌ" - خبر المبتدأ هو:', type: 'multiple_choice', options: ['العلمُ', 'نورٌ', 'محذوف', 'لا يوجد خبر'], correctAnswer: 1, points: 1 },
      ],
    },
  ],
  'النحو المتقدم - الصف الأول الثانوي': [
    {
      title: 'اختبار الممنوع من الصرف والمشتقات',
      description: 'اختبار على الممنوع من الصرف واسم الفاعل واسم المفعول',
      passingScore: 60,
      timeLimit: 25,
      maxAttempts: 3,
      questions: [
        { text: '"أحمد" ممنوع من الصرف لأنه:', type: 'multiple_choice', options: ['اسم أعجمي', 'على وزن الفعل', 'مختوم بألف ونون', 'جمع مؤنث سالم'], correctAnswer: 1, points: 2 },
        { text: 'اسم الفاعل من "كتبَ" هو:', type: 'multiple_choice', options: ['مكتوب', 'كاتب', 'كتابة', 'مكتبة'], correctAnswer: 1, points: 2 },
        { text: 'اسم المفعول من "فهمَ" هو:', type: 'multiple_choice', options: ['فاهم', 'مفهوم', 'فهيم', 'مفاهيم'], correctAnswer: 1, points: 2 },
        { text: 'الممنوع من الصرف يُجر بالفتحة بدل الكسرة', type: 'true_false', options: ['صح', 'خطأ'], correctAnswer: 0, points: 1 },
        { text: '"مصابيح" ممنوعة من الصرف لأنها:', type: 'multiple_choice', options: ['اسم علم', 'صيغة منتهى الجموع', 'صفة على وزن أفعل', 'اسم أعجمي'], correctAnswer: 1, points: 2 },
      ],
    },
  ],
  'مراجعة شاملة - الصف الثالث الثانوي': [
    {
      title: 'امتحان تجريبي - الثانوية العامة',
      description: 'امتحان تجريبي يحاكي امتحان الثانوية العامة في اللغة العربية',
      passingScore: 50,
      timeLimit: 60,
      maxAttempts: 5,
      questions: [
        { text: '"لا طالبَ مهمل" - "طالبَ" اسم لا النافية للجنس:', type: 'multiple_choice', options: ['مرفوع', 'مبني على الفتح', 'منصوب', 'مجرور'], correctAnswer: 1, points: 2 },
        { text: '"كم كتاباً قرأت" - "كم" هنا:', type: 'multiple_choice', options: ['استفهامية', 'خبرية', 'شرطية', 'نافية'], correctAnswer: 0, points: 2 },
        { text: 'التشبيه الذي حُذف منه وجه الشبه والأداة يسمى:', type: 'multiple_choice', options: ['تشبيه تام', 'تشبيه مفصل', 'تشبيه بليغ', 'تشبيه تمثيلي'], correctAnswer: 2, points: 2 },
        { text: '"الجندي أسد" استعارة تصريحية', type: 'true_false', options: ['صح', 'خطأ'], correctAnswer: 0, points: 1 },
        { text: 'مدرسة الديوان رائدها:', type: 'multiple_choice', options: ['أحمد شوقي', 'العقاد والمازني', 'أبو شادي', 'نازك الملائكة'], correctAnswer: 1, points: 2 },
        { text: 'المفعول المطلق يأتي:', type: 'multiple_choice', options: ['قبل الفعل فقط', 'بعد الفعل من لفظه أو معناه', 'بعد الاسم', 'قبل الحرف'], correctAnswer: 1, points: 2 },
        { text: '"أينما تذهب أذهب معك" - أسلوب:', type: 'multiple_choice', options: ['تعجب', 'قسم', 'شرط', 'نداء'], correctAnswer: 2, points: 1 },
        { text: 'البحتري ينتمي إلى العصر:', type: 'multiple_choice', options: ['الجاهلي', 'الأموي', 'العباسي', 'الحديث'], correctAnswer: 2, points: 2 },
        { text: '"نامت العيون" - كناية عن:', type: 'multiple_choice', options: ['صفة (الغفلة)', 'موصوف', 'نسبة', 'ليست كناية'], correctAnswer: 0, points: 2 },
        { text: '"لا تنهَ عن خلقٍ وتأتي مثله" - "تنهَ" فعل مضارع:', type: 'multiple_choice', options: ['مرفوع', 'منصوب', 'مجزوم', 'مبني'], correctAnswer: 2, points: 2 },
      ],
    },
  ],
};

// ── Seed Function ──────────────────────────────
async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear
    await Promise.all([
      User.deleteMany({}),
      Course.deleteMany({}),
      Material.deleteMany({}),
      Exam.deleteMany({}),
    ]);
    console.log('🗑️  Cleared existing data');

    // Create users
    const createdUsers = [];
    for (const userData of users) {
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      const user = await User.create({ ...userData, password: hashedPassword });
      createdUsers.push(user);
      console.log(`👤 Created ${user.role}: ${user.email}`);
    }

    const teacher = createdUsers.find(u => u.role === 'teacher');
    const student = createdUsers.find(u => u.role === 'student');

    // Create courses
    const createdCourses = [];
    for (const courseData of coursesData) {
      const course = await Course.create({
        ...courseData,
        teacher: teacher._id,
        enrolledStudents: [student._id],
      });
      createdCourses.push(course);
      console.log(`📚 Created course: ${course.title} [${course.stage}/${course.grade}]`);
    }

    // Create materials
    let totalVideos = 0;
    let totalPdfs = 0;

    for (const course of createdCourses) {
      const mats = materialsMap[course.title];
      if (!mats) continue;

      const materialIds = [];
      let order = 1;

      for (const video of mats.videos) {
        const material = await Material.create({
          ...video,
          type: 'video',
          course: course._id,
          uploadedBy: teacher._id,
          order: order++,
          isPublished: true,
          fileName: `${video.title}.mp4`,
          mimeType: 'video/mp4',
        });
        materialIds.push(material._id);
        totalVideos++;
      }

      for (const pdf of mats.pdfs) {
        const material = await Material.create({
          ...pdf,
          type: 'pdf',
          course: course._id,
          uploadedBy: teacher._id,
          order: order++,
          isPublished: true,
          fileName: `${pdf.title}.pdf`,
          mimeType: 'application/pdf',
        });
        materialIds.push(material._id);
        totalPdfs++;
      }

      await Course.findByIdAndUpdate(course._id, { materials: materialIds });
      console.log(`  📎 ${mats.videos.length} videos + ${mats.pdfs.length} PDFs → "${course.title}"`);
    }

    // Create exams
    let totalExams = 0;
    for (const course of createdCourses) {
      const exams = examsMap[course.title];
      if (!exams) continue;

      for (const examData of exams) {
        await Exam.create({
          ...examData,
          course: course._id,
          teacher: teacher._id,
          isActive: true,
          showResults: true,
        });
        totalExams++;
        console.log(`  📝 Exam: "${examData.title}" → "${course.title}"`);
      }
    }

    // Update teacher & student
    await User.findByIdAndUpdate(teacher._id, {
      teachingCourses: createdCourses.map(c => c._id),
    });
    await User.findByIdAndUpdate(student._id, {
      enrolledCourses: createdCourses.map(c => c._id),
    });

    console.log('\n══════════════════════════════════════');
    console.log('✅ Seed completed successfully!');
    console.log('══════════════════════════════════════');
    console.log('📧 Login:');
    console.log('  Admin:   admin@test.com   / admin123');
    console.log('  Teacher: teacher@test.com / teacher123');
    console.log('  Student: student@test.com / student123');
    console.log(`📚 Courses: ${createdCourses.length}`);
    console.log(`🎥 Videos:  ${totalVideos}`);
    console.log(`📄 PDFs:    ${totalPdfs}`);
    console.log(`📝 Exams:   ${totalExams}`);
    console.log('══════════════════════════════════════');
    console.log('\nCourses by stage:');
    console.log('  🎒 ابتدائي: ' + createdCourses.filter(c => c.stage === 'primary').map(c => c.title).join(', '));
    console.log('  📖 اعدادي:  ' + createdCourses.filter(c => c.stage === 'preparatory').map(c => c.title).join(', '));
    console.log('  🎓 ثانوي:   ' + createdCourses.filter(c => c.stage === 'secondary').map(c => c.title).join(', '));

  } catch (error) {
    console.error('❌ Seed failed:', error);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

seed();

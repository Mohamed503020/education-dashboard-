/**
 * Seed script for education platform
 * Run: node server/seed.js
 * 
 * Creates:
 * - 1 admin, 1 teacher, 1 student account
 * - 8 courses assigned to the teacher
 * - Videos and PDFs for each course
 */

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const MONGODB_URI = 'mongodb://localhost:27017/education_platform';

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
  status: { type: String, enum: ['draft', 'published', 'archived'], default: 'draft' },
  price: { type: Number, default: 0 },
  isFree: { type: Boolean, default: true },
  tags: [String],
  enrolledStudents: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
  materials: [{ type: mongoose.Types.ObjectId, ref: 'Material' }],
  liveStreams: [{ type: mongoose.Types.ObjectId, ref: 'LiveStream' }],
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

const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);
const Material = mongoose.model('Material', MaterialSchema);

// ── Data ───────────────────────────────────────
const users = [
  {
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@test.com',
    password: 'admin123',
    role: 'admin',
  },
  {
    firstName: 'Teacher',
    lastName: 'Test',
    email: 'teacher@test.com',
    password: 'teacher123',
    role: 'teacher',
    department: 'Computer Science',
    specialization: 'Web Development',
  },
  {
    firstName: 'Student',
    lastName: 'Test',
    email: 'student@test.com',
    password: 'student123',
    role: 'student',
  },
];

const coursesData = [
  {
    title: 'Advanced Web Development',
    description: 'Master modern web development with HTML5, CSS3, JavaScript ES2024, React, Angular, and Node.js. Build real-world projects and deploy to the cloud.',
    shortDescription: 'Master modern web technologies',
    category: 'Technology',
    level: 'advanced',
    status: 'published',
    price: 0,
    isFree: true,
    tags: ['html', 'css', 'javascript', 'react', 'angular', 'nodejs'],
  },
  {
    title: 'Machine Learning Fundamentals',
    description: 'Learn the foundations of machine learning including supervised learning, unsupervised learning, neural networks, and deep learning with Python and TensorFlow.',
    shortDescription: 'Introduction to ML and AI',
    category: 'Technology',
    level: 'intermediate',
    status: 'published',
    price: 29.99,
    isFree: false,
    tags: ['python', 'machine-learning', 'tensorflow', 'ai'],
  },
  {
    title: 'Data Science with Python',
    description: 'Explore data analysis, visualization, and statistical modeling using Python, Pandas, NumPy, Matplotlib, and Jupyter notebooks.',
    shortDescription: 'Data analysis and visualization',
    category: 'Technology',
    level: 'intermediate',
    status: 'published',
    price: 0,
    isFree: true,
    tags: ['python', 'data-science', 'pandas', 'numpy'],
  },
  {
    title: 'Digital Marketing Mastery',
    description: 'Learn SEO, social media marketing, email campaigns, content marketing, and PPC advertising. Hands-on projects with real campaigns.',
    shortDescription: 'Complete digital marketing guide',
    category: 'Business',
    level: 'beginner',
    status: 'published',
    price: 19.99,
    isFree: false,
    tags: ['marketing', 'seo', 'social-media', 'advertising'],
  },
  {
    title: 'UI/UX Design Principles',
    description: 'Master user interface and experience design. Learn Figma, Adobe XD, wireframing, prototyping, user research, and design thinking methodologies.',
    shortDescription: 'Design beautiful user experiences',
    category: 'Design',
    level: 'beginner',
    status: 'published',
    price: 0,
    isFree: true,
    tags: ['design', 'figma', 'ux', 'ui', 'prototyping'],
  },
  {
    title: 'Blockchain Development',
    description: 'Build decentralized applications with Solidity, Ethereum, smart contracts, Web3.js, and IPFS. Creating real-world DApps from scratch.',
    shortDescription: 'Build decentralized apps',
    category: 'Technology',
    level: 'advanced',
    status: 'published',
    price: 49.99,
    isFree: false,
    tags: ['blockchain', 'ethereum', 'solidity', 'web3'],
  },
  {
    title: 'Financial Analysis & Investing',
    description: 'Learn financial statement analysis, valuation techniques, portfolio management, risk assessment, and investment strategies for modern markets.',
    shortDescription: 'Master financial analysis',
    category: 'Business',
    level: 'intermediate',
    status: 'published',
    price: 0,
    isFree: true,
    tags: ['finance', 'investing', 'analysis', 'portfolio'],
  },
  {
    title: 'Creative Writing Workshop',
    description: 'Develop your creative writing skills across fiction, poetry, screenwriting, and journalism. Workshops, peer review, and professional feedback.',
    shortDescription: 'Unleash your creativity',
    category: 'Arts',
    level: 'beginner',
    status: 'published',
    price: 0,
    isFree: true,
    tags: ['writing', 'fiction', 'poetry', 'creative'],
  },
];

// ── Materials Data (per course) ─────────────────
const materialsPerCourse = {
  'Advanced Web Development': {
    videos: [
      { title: 'HTML5 Semantic Elements & Accessibility', description: 'Learn how to structure web pages using semantic HTML5 elements like <article>, <section>, <nav>, and <aside>. Covers WAI-ARIA roles for accessibility compliance.', fileUrl: 'https://storage.example.com/courses/webdev/01-html5-semantics.mp4', fileName: '01-html5-semantics.mp4', fileSize: 524288000, mimeType: 'video/mp4', duration: 2820, thumbnail: 'https://storage.example.com/courses/webdev/thumb-01.jpg' },
      { title: 'CSS3 Grid & Flexbox Layout Systems', description: 'Deep dive into CSS Grid and Flexbox for building responsive layouts. Covers grid-template-areas, auto-fit, minmax(), gap, and flex-grow/shrink/basis.', fileUrl: 'https://storage.example.com/courses/webdev/02-css-grid-flexbox.mp4', fileName: '02-css-grid-flexbox.mp4', fileSize: 618200000, mimeType: 'video/mp4', duration: 3480, thumbnail: 'https://storage.example.com/courses/webdev/thumb-02.jpg' },
      { title: 'JavaScript ES2024 New Features', description: 'Explore the latest ECMAScript 2024 features including Array.fromAsync(), Object.groupBy(), Promise.withResolvers(), and the pipeline operator proposal.', fileUrl: 'https://storage.example.com/courses/webdev/03-es2024-features.mp4', fileName: '03-es2024-features.mp4', fileSize: 412500000, mimeType: 'video/mp4', duration: 2460, thumbnail: 'https://storage.example.com/courses/webdev/thumb-03.jpg' },
      { title: 'React 18 Hooks & Concurrent Rendering', description: 'Master React 18 hooks including useTransition, useDeferredValue, and Suspense boundaries. Build performant UIs with concurrent rendering patterns.', fileUrl: 'https://storage.example.com/courses/webdev/04-react-18-hooks.mp4', fileName: '04-react-18-hooks.mp4', fileSize: 780300000, mimeType: 'video/mp4', duration: 4200, thumbnail: 'https://storage.example.com/courses/webdev/thumb-04.jpg' },
      { title: 'Angular Signals & Standalone Components', description: 'Build modern Angular applications with Signals for reactive state management and standalone components without NgModules.', fileUrl: 'https://storage.example.com/courses/webdev/05-angular-signals.mp4', fileName: '05-angular-signals.mp4', fileSize: 695000000, mimeType: 'video/mp4', duration: 3900, thumbnail: 'https://storage.example.com/courses/webdev/thumb-05.jpg' },
      { title: 'Node.js REST API with Express & MongoDB', description: 'Build a production-ready REST API using Express.js with MongoDB, JWT authentication, input validation with Joi, and rate limiting.', fileUrl: 'https://storage.example.com/courses/webdev/06-nodejs-api.mp4', fileName: '06-nodejs-api.mp4', fileSize: 892000000, mimeType: 'video/mp4', duration: 5100, thumbnail: 'https://storage.example.com/courses/webdev/thumb-06.jpg' },
    ],
    pdfs: [
      { title: 'HTML5 & CSS3 Quick Reference Guide', description: 'A comprehensive cheat sheet covering all HTML5 elements, CSS selectors, properties, media queries, and responsive design patterns.', fileUrl: 'https://storage.example.com/courses/webdev/html-css-reference.pdf', fileName: 'html-css-reference.pdf', fileSize: 2450000, mimeType: 'application/pdf' },
      { title: 'JavaScript ES6+ Complete Handbook', description: 'Detailed reference for ES6 through ES2024 features including destructuring, modules, async/await, generators, proxies, and decorators.', fileUrl: 'https://storage.example.com/courses/webdev/js-es6-handbook.pdf', fileName: 'js-es6-handbook.pdf', fileSize: 4820000, mimeType: 'application/pdf' },
      { title: 'Web Performance Optimization Checklist', description: 'Step-by-step checklist for optimizing Core Web Vitals, lazy loading, code splitting, image optimization, and caching strategies.', fileUrl: 'https://storage.example.com/courses/webdev/web-perf-checklist.pdf', fileName: 'web-perf-checklist.pdf', fileSize: 1200000, mimeType: 'application/pdf' },
    ],
  },
  'Machine Learning Fundamentals': {
    videos: [
      { title: 'Introduction to Supervised Learning', description: 'Understand the basics of supervised learning: training data, label prediction, model evaluation, and the bias-variance tradeoff. Covers linear regression and logistic regression.', fileUrl: 'https://storage.example.com/courses/ml/01-supervised-learning.mp4', fileName: '01-supervised-learning.mp4', fileSize: 620000000, mimeType: 'video/mp4', duration: 3300, thumbnail: 'https://storage.example.com/courses/ml/thumb-01.jpg' },
      { title: 'Decision Trees & Random Forests', description: 'Learn how decision trees split data using Gini impurity and information gain. Build ensemble models with Random Forests and understand bagging vs boosting.', fileUrl: 'https://storage.example.com/courses/ml/02-decision-trees.mp4', fileName: '02-decision-trees.mp4', fileSize: 540000000, mimeType: 'video/mp4', duration: 2940, thumbnail: 'https://storage.example.com/courses/ml/thumb-02.jpg' },
      { title: 'Neural Networks from Scratch', description: 'Build a neural network from scratch in Python. Covers forward propagation, backpropagation, activation functions (ReLU, sigmoid, softmax), and gradient descent.', fileUrl: 'https://storage.example.com/courses/ml/03-neural-networks.mp4', fileName: '03-neural-networks.mp4', fileSize: 880000000, mimeType: 'video/mp4', duration: 4800, thumbnail: 'https://storage.example.com/courses/ml/thumb-03.jpg' },
      { title: 'Convolutional Neural Networks for Image Classification', description: 'Understand convolution layers, pooling, stride, padding, and transfer learning with pre-trained models like ResNet and VGG. Build an image classifier with TensorFlow.', fileUrl: 'https://storage.example.com/courses/ml/04-cnn-images.mp4', fileName: '04-cnn-images.mp4', fileSize: 950000000, mimeType: 'video/mp4', duration: 5400, thumbnail: 'https://storage.example.com/courses/ml/thumb-04.jpg' },
      { title: 'Model Evaluation & Hyperparameter Tuning', description: 'Learn cross-validation, confusion matrices, ROC curves, precision-recall tradeoffs. Use GridSearchCV and Optuna for hyperparameter optimization.', fileUrl: 'https://storage.example.com/courses/ml/05-model-evaluation.mp4', fileName: '05-model-evaluation.mp4', fileSize: 480000000, mimeType: 'video/mp4', duration: 2700, thumbnail: 'https://storage.example.com/courses/ml/thumb-05.jpg' },
    ],
    pdfs: [
      { title: 'Machine Learning Algorithms Cheat Sheet', description: 'Visual guide comparing ML algorithms: when to use each, complexity, pros/cons, and scikit-learn implementation examples.', fileUrl: 'https://storage.example.com/courses/ml/ml-algorithms-cheatsheet.pdf', fileName: 'ml-algorithms-cheatsheet.pdf', fileSize: 3100000, mimeType: 'application/pdf' },
      { title: 'Mathematics for Machine Learning', description: 'Essential linear algebra, calculus, and probability theory needed for ML. Covers matrix operations, partial derivatives, Bayes theorem, and distributions.', fileUrl: 'https://storage.example.com/courses/ml/math-for-ml.pdf', fileName: 'math-for-ml.pdf', fileSize: 5600000, mimeType: 'application/pdf' },
      { title: 'TensorFlow & Keras API Reference', description: 'Practical guide to building models with TensorFlow 2 and Keras. Covers Sequential, Functional API, custom layers, callbacks, and model deployment.', fileUrl: 'https://storage.example.com/courses/ml/tensorflow-keras-guide.pdf', fileName: 'tensorflow-keras-guide.pdf', fileSize: 4200000, mimeType: 'application/pdf' },
    ],
  },
  'Data Science with Python': {
    videos: [
      { title: 'Python for Data Analysis – Pandas Deep Dive', description: 'Master Pandas DataFrames: indexing, groupby, merging, pivoting, time series analysis, and handling missing data with real-world datasets.', fileUrl: 'https://storage.example.com/courses/datascience/01-pandas-deep-dive.mp4', fileName: '01-pandas-deep-dive.mp4', fileSize: 720000000, mimeType: 'video/mp4', duration: 3960, thumbnail: 'https://storage.example.com/courses/datascience/thumb-01.jpg' },
      { title: 'Data Visualization with Matplotlib & Seaborn', description: 'Create publication-quality visualizations: scatter plots, heatmaps, violin plots, pair plots, and custom themes. Best practices for data storytelling.', fileUrl: 'https://storage.example.com/courses/datascience/02-visualization.mp4', fileName: '02-visualization.mp4', fileSize: 560000000, mimeType: 'video/mp4', duration: 3120, thumbnail: 'https://storage.example.com/courses/datascience/thumb-02.jpg' },
      { title: 'Statistical Hypothesis Testing in Python', description: 'Perform t-tests, chi-squared tests, ANOVA, and A/B testing with SciPy. Understand p-values, confidence intervals, and effect sizes.', fileUrl: 'https://storage.example.com/courses/datascience/03-hypothesis-testing.mp4', fileName: '03-hypothesis-testing.mp4', fileSize: 490000000, mimeType: 'video/mp4', duration: 2700, thumbnail: 'https://storage.example.com/courses/datascience/thumb-03.jpg' },
      { title: 'Exploratory Data Analysis on Real Datasets', description: 'Walk through complete EDA on Kaggle datasets: data cleaning, feature engineering, outlier detection, and correlation analysis.', fileUrl: 'https://storage.example.com/courses/datascience/04-eda-practice.mp4', fileName: '04-eda-practice.mp4', fileSize: 825000000, mimeType: 'video/mp4', duration: 4500, thumbnail: 'https://storage.example.com/courses/datascience/thumb-04.jpg' },
      { title: 'Interactive Dashboards with Plotly & Dash', description: 'Build interactive web dashboards using Plotly Express and Dash framework. Deploy data apps with callbacks, dropdowns, and live chart updates.', fileUrl: 'https://storage.example.com/courses/datascience/05-plotly-dash.mp4', fileName: '05-plotly-dash.mp4', fileSize: 670000000, mimeType: 'video/mp4', duration: 3660, thumbnail: 'https://storage.example.com/courses/datascience/thumb-05.jpg' },
    ],
    pdfs: [
      { title: 'Pandas & NumPy Quick Reference', description: 'Complete reference card for Pandas DataFrame operations, NumPy array manipulation, broadcasting rules, and common data transformation patterns.', fileUrl: 'https://storage.example.com/courses/datascience/pandas-numpy-ref.pdf', fileName: 'pandas-numpy-ref.pdf', fileSize: 2800000, mimeType: 'application/pdf' },
      { title: 'Statistics for Data Scientists', description: 'Core statistical concepts: descriptive statistics, probability distributions, central limit theorem, regression analysis, and Bayesian inference.', fileUrl: 'https://storage.example.com/courses/datascience/statistics-guide.pdf', fileName: 'statistics-guide.pdf', fileSize: 4500000, mimeType: 'application/pdf' },
    ],
  },
  'Digital Marketing Mastery': {
    videos: [
      { title: 'SEO Fundamentals – On-Page & Technical SEO', description: 'Learn keyword research with Ahrefs and SEMrush, meta tag optimization, schema markup, site speed optimization, and Core Web Vitals for ranking.', fileUrl: 'https://storage.example.com/courses/marketing/01-seo-fundamentals.mp4', fileName: '01-seo-fundamentals.mp4', fileSize: 580000000, mimeType: 'video/mp4', duration: 3180, thumbnail: 'https://storage.example.com/courses/marketing/thumb-01.jpg' },
      { title: 'Google Ads – Search & Display Campaigns', description: 'Set up Google Ads campaigns from scratch: keyword bidding strategies, ad copy writing, quality score optimization, and conversion tracking.', fileUrl: 'https://storage.example.com/courses/marketing/02-google-ads.mp4', fileName: '02-google-ads.mp4', fileSize: 720000000, mimeType: 'video/mp4', duration: 3900, thumbnail: 'https://storage.example.com/courses/marketing/thumb-02.jpg' },
      { title: 'Social Media Marketing Strategy 2024', description: 'Build a social media strategy across Instagram, TikTok, LinkedIn, and X (Twitter). Content calendars, engagement tactics, and analytics interpretation.', fileUrl: 'https://storage.example.com/courses/marketing/03-social-media.mp4', fileName: '03-social-media.mp4', fileSize: 650000000, mimeType: 'video/mp4', duration: 3600, thumbnail: 'https://storage.example.com/courses/marketing/thumb-03.jpg' },
      { title: 'Email Marketing & Marketing Automation', description: 'Design high-converting email campaigns with Mailchimp and HubSpot. Drip sequences, A/B testing subject lines, segmentation, and deliverability best practices.', fileUrl: 'https://storage.example.com/courses/marketing/04-email-marketing.mp4', fileName: '04-email-marketing.mp4', fileSize: 510000000, mimeType: 'video/mp4', duration: 2820, thumbnail: 'https://storage.example.com/courses/marketing/thumb-04.jpg' },
    ],
    pdfs: [
      { title: 'SEO Audit Checklist 2024', description: '50-point SEO audit checklist covering technical SEO, content quality, link building, mobile optimization, and Core Web Vitals.', fileUrl: 'https://storage.example.com/courses/marketing/seo-audit-checklist.pdf', fileName: 'seo-audit-checklist.pdf', fileSize: 1800000, mimeType: 'application/pdf' },
      { title: 'Content Marketing Playbook', description: 'Step-by-step guide for content strategy: editorial calendars, content pillars, distribution channels, repurposing workflows, and ROI measurement.', fileUrl: 'https://storage.example.com/courses/marketing/content-marketing-playbook.pdf', fileName: 'content-marketing-playbook.pdf', fileSize: 3400000, mimeType: 'application/pdf' },
      { title: 'Google Analytics 4 Setup Guide', description: 'Complete GA4 configuration: event tracking, custom dimensions, conversion setup, audience building, and reporting dashboards.', fileUrl: 'https://storage.example.com/courses/marketing/ga4-setup-guide.pdf', fileName: 'ga4-setup-guide.pdf', fileSize: 2100000, mimeType: 'application/pdf' },
    ],
  },
  'UI/UX Design Principles': {
    videos: [
      { title: 'Design Thinking Process & User Research', description: 'Learn the 5-stage design thinking framework: empathize, define, ideate, prototype, and test. Conduct user interviews, surveys, and persona creation.', fileUrl: 'https://storage.example.com/courses/design/01-design-thinking.mp4', fileName: '01-design-thinking.mp4', fileSize: 550000000, mimeType: 'video/mp4', duration: 3000, thumbnail: 'https://storage.example.com/courses/design/thumb-01.jpg' },
      { title: 'Wireframing & Prototyping in Figma', description: 'Create low-fidelity wireframes and interactive prototypes in Figma. Components, auto-layout, constraints, and design system foundations.', fileUrl: 'https://storage.example.com/courses/design/02-figma-prototyping.mp4', fileName: '02-figma-prototyping.mp4', fileSize: 840000000, mimeType: 'video/mp4', duration: 4560, thumbnail: 'https://storage.example.com/courses/design/thumb-02.jpg' },
      { title: 'Color Theory & Typography for Digital Products', description: 'Master color psychology, contrast ratios (WCAG), type scales, font pairing, and hierarchy. Build accessible and visually appealing interfaces.', fileUrl: 'https://storage.example.com/courses/design/03-color-typography.mp4', fileName: '03-color-typography.mp4', fileSize: 470000000, mimeType: 'video/mp4', duration: 2580, thumbnail: 'https://storage.example.com/courses/design/thumb-03.jpg' },
      { title: 'Usability Testing & Heuristic Evaluation', description: 'Plan and conduct usability tests, analyze results with affinity diagrams, and apply Nielsen\'s 10 heuristics for interface evaluation.', fileUrl: 'https://storage.example.com/courses/design/04-usability-testing.mp4', fileName: '04-usability-testing.mp4', fileSize: 600000000, mimeType: 'video/mp4', duration: 3300, thumbnail: 'https://storage.example.com/courses/design/thumb-04.jpg' },
      { title: 'Design Systems & Component Libraries', description: 'Build scalable design systems with tokens, atomic design methodology, Figma component variants, and handoff documentation for developers.', fileUrl: 'https://storage.example.com/courses/design/05-design-systems.mp4', fileName: '05-design-systems.mp4', fileSize: 730000000, mimeType: 'video/mp4', duration: 4020, thumbnail: 'https://storage.example.com/courses/design/thumb-05.jpg' },
    ],
    pdfs: [
      { title: 'UI Design Patterns Encyclopedia', description: 'Catalog of 40+ common UI design patterns: navigation, data entry, feedback, onboarding, and mobile-specific patterns with examples.', fileUrl: 'https://storage.example.com/courses/design/ui-patterns.pdf', fileName: 'ui-patterns.pdf', fileSize: 6200000, mimeType: 'application/pdf' },
      { title: 'Accessibility (WCAG 2.2) Compliance Guide', description: 'Complete WCAG 2.2 AA compliance reference: perceivable, operable, understandable, and robust criteria with implementation examples.', fileUrl: 'https://storage.example.com/courses/design/wcag-guide.pdf', fileName: 'wcag-guide.pdf', fileSize: 3800000, mimeType: 'application/pdf' },
    ],
  },
  'Blockchain Development': {
    videos: [
      { title: 'Blockchain Architecture & Consensus Mechanisms', description: 'Understand how blockchains work: distributed ledgers, Merkle trees, proof-of-work vs proof-of-stake, and Byzantine fault tolerance.', fileUrl: 'https://storage.example.com/courses/blockchain/01-architecture.mp4', fileName: '01-architecture.mp4', fileSize: 610000000, mimeType: 'video/mp4', duration: 3360, thumbnail: 'https://storage.example.com/courses/blockchain/thumb-01.jpg' },
      { title: 'Solidity Smart Contracts – Beginner to Advanced', description: 'Write, compile, and deploy Solidity smart contracts. Covers data types, mappings, modifiers, inheritance, events, and gas optimization.', fileUrl: 'https://storage.example.com/courses/blockchain/02-solidity.mp4', fileName: '02-solidity.mp4', fileSize: 920000000, mimeType: 'video/mp4', duration: 5100, thumbnail: 'https://storage.example.com/courses/blockchain/thumb-02.jpg' },
      { title: 'Building DApps with Ethers.js & Hardhat', description: 'Develop full-stack decentralized applications: Hardhat development environment, contract testing, React frontend integration with Ethers.js v6.', fileUrl: 'https://storage.example.com/courses/blockchain/03-dapps.mp4', fileName: '03-dapps.mp4', fileSize: 850000000, mimeType: 'video/mp4', duration: 4680, thumbnail: 'https://storage.example.com/courses/blockchain/thumb-03.jpg' },
      { title: 'ERC-20 & ERC-721 Token Standards', description: 'Implement fungible (ERC-20) and non-fungible (ERC-721) tokens using OpenZeppelin. Minting, transferring, and marketplace integration.', fileUrl: 'https://storage.example.com/courses/blockchain/04-token-standards.mp4', fileName: '04-token-standards.mp4', fileSize: 680000000, mimeType: 'video/mp4', duration: 3720, thumbnail: 'https://storage.example.com/courses/blockchain/thumb-04.jpg' },
    ],
    pdfs: [
      { title: 'Solidity Language Reference v0.8', description: 'Complete Solidity syntax reference: types, visibility, error handling, assembly, storage layout, and ABI encoding/decoding.', fileUrl: 'https://storage.example.com/courses/blockchain/solidity-reference.pdf', fileName: 'solidity-reference.pdf', fileSize: 4100000, mimeType: 'application/pdf' },
      { title: 'Smart Contract Security Audit Checklist', description: 'Security review checklist covering reentrancy, overflow, access control, front-running, oracle manipulation, and common vulnerability patterns.', fileUrl: 'https://storage.example.com/courses/blockchain/security-checklist.pdf', fileName: 'security-checklist.pdf', fileSize: 2900000, mimeType: 'application/pdf' },
    ],
  },
  'Financial Analysis & Investing': {
    videos: [
      { title: 'Reading Financial Statements', description: 'Analyze income statements, balance sheets, and cash flow statements. Key ratios: P/E, debt-to-equity, ROE, current ratio, and free cash flow yield.', fileUrl: 'https://storage.example.com/courses/finance/01-financial-statements.mp4', fileName: '01-financial-statements.mp4', fileSize: 580000000, mimeType: 'video/mp4', duration: 3180, thumbnail: 'https://storage.example.com/courses/finance/thumb-01.jpg' },
      { title: 'Discounted Cash Flow (DCF) Valuation', description: 'Build DCF models in Excel: revenue forecasting, WACC calculation, terminal value, sensitivity analysis, and comparable company analysis.', fileUrl: 'https://storage.example.com/courses/finance/02-dcf-valuation.mp4', fileName: '02-dcf-valuation.mp4', fileSize: 740000000, mimeType: 'video/mp4', duration: 4080, thumbnail: 'https://storage.example.com/courses/finance/thumb-02.jpg' },
      { title: 'Portfolio Theory & Asset Allocation', description: 'Modern portfolio theory, efficient frontier, CAPM, Sharpe ratio, diversification strategies, and rebalancing techniques for long-term investors.', fileUrl: 'https://storage.example.com/courses/finance/03-portfolio-theory.mp4', fileName: '03-portfolio-theory.mp4', fileSize: 520000000, mimeType: 'video/mp4', duration: 2880, thumbnail: 'https://storage.example.com/courses/finance/thumb-03.jpg' },
      { title: 'Technical Analysis & Chart Patterns', description: 'Identify support/resistance levels, moving averages (SMA, EMA), MACD, RSI, candlestick patterns, and volume analysis for equity trading.', fileUrl: 'https://storage.example.com/courses/finance/04-technical-analysis.mp4', fileName: '04-technical-analysis.mp4', fileSize: 610000000, mimeType: 'video/mp4', duration: 3360, thumbnail: 'https://storage.example.com/courses/finance/thumb-04.jpg' },
      { title: 'Risk Management & Options Basics', description: 'Understand options pricing (Black-Scholes), hedging strategies, risk metrics (VaR, beta), and position sizing for portfolio risk management.', fileUrl: 'https://storage.example.com/courses/finance/05-risk-options.mp4', fileName: '05-risk-options.mp4', fileSize: 690000000, mimeType: 'video/mp4', duration: 3780, thumbnail: 'https://storage.example.com/courses/finance/thumb-05.jpg' },
    ],
    pdfs: [
      { title: 'Financial Ratios Cheat Sheet', description: 'All essential financial ratios organized by category: profitability, liquidity, leverage, efficiency, and valuation with formulas and benchmarks.', fileUrl: 'https://storage.example.com/courses/finance/financial-ratios.pdf', fileName: 'financial-ratios.pdf', fileSize: 1500000, mimeType: 'application/pdf' },
      { title: 'DCF Valuation Template & Guide', description: 'Ready-to-use DCF model template with step-by-step instructions, assumption guidelines, and example valuation of a public company.', fileUrl: 'https://storage.example.com/courses/finance/dcf-template.pdf', fileName: 'dcf-template.pdf', fileSize: 3200000, mimeType: 'application/pdf' },
      { title: 'Investment Portfolio Allocation Strategies', description: 'Guide to portfolio construction: age-based allocation, risk tolerance assessment, asset class correlation, and tax-efficient investing.', fileUrl: 'https://storage.example.com/courses/finance/portfolio-strategies.pdf', fileName: 'portfolio-strategies.pdf', fileSize: 2700000, mimeType: 'application/pdf' },
    ],
  },
  'Creative Writing Workshop': {
    videos: [
      { title: 'Story Structure & Narrative Arcs', description: 'Master the three-act structure, the hero\'s journey, and non-linear storytelling. Analyze story structure in published novels and screenplays.', fileUrl: 'https://storage.example.com/courses/writing/01-story-structure.mp4', fileName: '01-story-structure.mp4', fileSize: 480000000, mimeType: 'video/mp4', duration: 2640, thumbnail: 'https://storage.example.com/courses/writing/thumb-01.jpg' },
      { title: 'Character Development & Dialogue', description: 'Create memorable characters with backstories, motivations, and flaws. Write natural dialogue that reveals character and advances the plot.', fileUrl: 'https://storage.example.com/courses/writing/02-character-dialogue.mp4', fileName: '02-character-dialogue.mp4', fileSize: 530000000, mimeType: 'video/mp4', duration: 2940, thumbnail: 'https://storage.example.com/courses/writing/thumb-02.jpg' },
      { title: 'Show Don\'t Tell – Descriptive Writing Techniques', description: 'Use sensory details, metaphors, and action beats to create vivid scenes. Exercises for strengthening descriptive prose and eliminating telling.', fileUrl: 'https://storage.example.com/courses/writing/03-show-dont-tell.mp4', fileName: '03-show-dont-tell.mp4', fileSize: 410000000, mimeType: 'video/mp4', duration: 2280, thumbnail: 'https://storage.example.com/courses/writing/thumb-03.jpg' },
      { title: 'Poetry Forms & Free Verse', description: 'Explore sonnets, haiku, villanelles, and free verse. Rhythm, meter, imagery, and line breaks. Workshop your poems with structured feedback.', fileUrl: 'https://storage.example.com/courses/writing/04-poetry.mp4', fileName: '04-poetry.mp4', fileSize: 390000000, mimeType: 'video/mp4', duration: 2160, thumbnail: 'https://storage.example.com/courses/writing/thumb-04.jpg' },
      { title: 'Editing, Revision & Getting Published', description: 'Self-editing techniques, beta reading, query letters, literary agent submissions, and self-publishing on Amazon KDP and IngramSpark.', fileUrl: 'https://storage.example.com/courses/writing/05-editing-publishing.mp4', fileName: '05-editing-publishing.mp4', fileSize: 560000000, mimeType: 'video/mp4', duration: 3060, thumbnail: 'https://storage.example.com/courses/writing/thumb-05.jpg' },
    ],
    pdfs: [
      { title: 'Writing Prompts Collection – 200 Prompts', description: '200 creative writing prompts organized by genre: literary fiction, sci-fi, fantasy, romance, mystery, and flash fiction.', fileUrl: 'https://storage.example.com/courses/writing/writing-prompts.pdf', fileName: 'writing-prompts.pdf', fileSize: 1800000, mimeType: 'application/pdf' },
      { title: 'Grammar & Style Guide for Fiction Writers', description: 'Grammar rules that matter for fiction: punctuating dialogue, comma usage, tense consistency, point of view, and common mistakes to avoid.', fileUrl: 'https://storage.example.com/courses/writing/grammar-style-guide.pdf', fileName: 'grammar-style-guide.pdf', fileSize: 2600000, mimeType: 'application/pdf' },
      { title: 'Query Letter & Synopsis Templates', description: 'Templates and examples of successful query letters and synopses for literary agents. Format guidelines for fiction and non-fiction submissions.', fileUrl: 'https://storage.example.com/courses/writing/query-templates.pdf', fileName: 'query-templates.pdf', fileSize: 980000, mimeType: 'application/pdf' },
    ],
  },
};

// ── Seed Function ──────────────────────────────
async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Course.deleteMany({});
    await Material.deleteMany({});
    console.log('Cleared existing data');

    // Create users with hashed passwords
    const createdUsers = [];
    for (const userData of users) {
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      const user = await User.create({ ...userData, password: hashedPassword });
      createdUsers.push(user);
      console.log(`Created ${user.role}: ${user.email}`);
    }

    const teacher = createdUsers.find(u => u.role === 'teacher');
    const student = createdUsers.find(u => u.role === 'student');

    // Create courses assigned to teacher
    const createdCourses = [];
    for (const courseData of coursesData) {
      const course = await Course.create({
        ...courseData,
        teacher: teacher._id,
        enrolledStudents: [student._id],
      });
      createdCourses.push(course);
      console.log(`Created course: ${course.title}`);
    }

    // Create materials for each course
    let totalVideos = 0;
    let totalPdfs = 0;

    for (const course of createdCourses) {
      const courseMaterials = materialsPerCourse[course.title];
      if (!courseMaterials) continue;

      const materialIds = [];
      let order = 1;

      // Create video materials
      for (const video of courseMaterials.videos) {
        const material = await Material.create({
          ...video,
          type: 'video',
          course: course._id,
          uploadedBy: teacher._id,
          order: order++,
          isPublished: true,
        });
        materialIds.push(material._id);
        totalVideos++;
      }

      // Create PDF materials
      for (const pdf of courseMaterials.pdfs) {
        const material = await Material.create({
          ...pdf,
          type: 'pdf',
          course: course._id,
          uploadedBy: teacher._id,
          order: order++,
          isPublished: true,
        });
        materialIds.push(material._id);
        totalPdfs++;
      }

      // Link materials to course
      await Course.findByIdAndUpdate(course._id, { materials: materialIds });
      console.log(`  -> Added ${courseMaterials.videos.length} videos, ${courseMaterials.pdfs.length} PDFs to "${course.title}"`);
    }

    // Update teacher's teachingCourses
    await User.findByIdAndUpdate(teacher._id, {
      teachingCourses: createdCourses.map(c => c._id),
    });

    // Update student's enrolledCourses
    await User.findByIdAndUpdate(student._id, {
      enrolledCourses: createdCourses.map(c => c._id),
    });

    console.log('\nSeed completed successfully!');
    console.log('-----------------------------------');
    console.log('Login credentials:');
    console.log('  Admin:   admin@test.com   / admin123');
    console.log('  Teacher: teacher@test.com / teacher123');
    console.log('  Student: student@test.com / student123');
    console.log(`  Courses: ${createdCourses.length}`);
    console.log(`  Videos:  ${totalVideos}`);
    console.log(`  PDFs:    ${totalPdfs}`);
    console.log('-----------------------------------');

  } catch (error) {
    console.error('Seed failed:', error);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

seed();

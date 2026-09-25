# Karhebti Backend

Backend API for **Karhebti**, an automotive platform that helps users manage their vehicles, maintenance records, documents, garages, reservations, marketplace listings, conversations, and notifications.

The service is built with NestJS and TypeScript. It exposes a REST API documented with Swagger, persists application data in MongoDB through Mongoose, serves uploaded files from the local `uploads/` directory, and provides a Socket.IO namespace for real-time chat.

> **Repository status:** the current `master` tree contains the application source and seed script, but does not include a `package.json`, lockfile, `tsconfig.json`, Dockerfile, or CI workflow. The commands below describe the intended NestJS workflow and should be aligned with the project’s deployment configuration when those files are added.

## Features

- **Authentication and account security**
  - Password-based signup and login with JWT access tokens.
  - Two-step signup using a six-digit email OTP.
  - OTP login, password reset, password change, and email verification.
  - OTP hashing with Argon2, password hashing with bcrypt, expiry windows, and failed-attempt limits.
  - Role-aware access through JWT, role, admin, and email-verification guards.
- **Vehicle management**
  - CRUD operations for cars owned by the authenticated user.
  - Admin access to all vehicles.
  - Car image upload, validation, processing, metadata, and replacement.
- **Maintenance and vehicle history**
  - Maintenance records, parts, and replacement history associated with vehicles.
  - AI-style maintenance recommendations based on vehicle age.
- **Documents and reminders**
  - Upload images and PDF documents such as insurance, registration, and technical inspection records.
  - Scheduled checks for expiring documents and push notifications for documents approaching expiration.
- **Garage operations**
  - Garage, service, repair-bay, and reservation management.
  - Automatic address geocoding through OpenStreetMap/Nominatim when coordinates are not supplied.
  - Automatic creation, addition, and removal of repair bays when garage capacity changes.
- **Marketplace**
  - List cars for sale, remove listings, and retrieve cars available for swipe-based discovery.
  - Buyer/seller conversations and reservations.
- **Communication and notifications**
  - REST conversation APIs plus Socket.IO chat at the `/chat` namespace.
  - Typing indicators, online/offline events, and conversation rooms.
  - Firebase Cloud Messaging notification delivery with persisted notification records.
  - Email delivery through SMTP and optional Twilio configuration.
- **AI and location-oriented functionality**
  - Road-issue reporting and nearby issue aggregation.
  - Danger-zone queries, garage recommendations, and car-image validation hooks.
  - Translation module and user-location module.

## Technology stack

- **Runtime/language:** Node.js with TypeScript (the repository is 99.2% TypeScript and 0.8% JavaScript).
- **Framework:** NestJS with Express.
- **Database:** MongoDB via Mongoose.
- **API documentation:** `@nestjs/swagger`, available at `/api` after startup.
- **Authentication:** `@nestjs/jwt`, Passport/JWT strategy, bcrypt, and Argon2.
- **Real-time transport:** Socket.IO through `@nestjs/websockets`.
- **Integrations:** Firebase Admin SDK/FCM, Nodemailer SMTP, Twilio, OpenStreetMap address search, and multipart uploads through Multer.
- **Validation and platform services:** NestJS `ValidationPipe`, throttling, event emitter, scheduling, and static-file serving.

## Project structure

```text
.
├── src/
│   ├── main.ts                         # Bootstrap, CORS, validation, uploads, Swagger, HTTP listener
│   ├── app.module.ts                   # Global configuration, MongoDB, throttling, and module wiring
│   ├── auth/                           # Signup, login, OTP, email verification, password flows, JWT strategy
│   ├── users/                          # User CRUD, roles, device tokens, and user schema
│   ├── cars/                           # Vehicle CRUD, ownership checks, images, and marketplace listing
│   ├── maintenances/                   # Vehicle maintenance records
│   ├── parts/                          # Parts catalog and vehicle parts
│   ├── replacement-history/            # Replacement history for parts and components
│   ├── documents/                      # Document CRUD, uploads, OCR, and expiration schedulers
│   ├── garages/                        # Garage CRUD, address lookup, and garage discovery
│   ├── services/                       # Services offered by garages
│   ├── repair-bays/                    # Garage repair-bay capacity and availability
│   ├── reservation/                    # Garage reservation lifecycle
│   ├── breakdowns/                     # Vehicle breakdown reporting and management
│   ├── reclamations/                   # Claims/complaints management
│   ├── ai/                             # Road issues, recommendations, and image validation
│   ├── translation/                    # Translation endpoint and translation configuration
│   ├── user-location/                  # User location updates and schema
│   ├── swipes/                         # Marketplace swipe and response flows
│   ├── conversations/                  # Persistent buyer/seller conversations and messages
│   ├── chat/                           # Socket.IO gateway for real-time conversations
│   ├── notifications/                  # Notification persistence, FCM, read state, and events
│   ├── firebase/                       # Firebase Admin initialization and Firebase helpers
│   └── common/
│       ├── config/                     # Firebase, Multer, and Twilio configuration
│       ├── decorators/                 # Current-user and role decorators
│       ├── guards/                     # JWT, admin, role, and email-verification guards
│       └── services/                   # Email and upload services
├── scripts/
│   └── seed-garages.js                 # Inserts sample garages into MongoDB
├── uploads/
│   └── .gitkeep                        # Runtime storage for uploaded files
└── .vscode/                            # Editor settings
```

## Request and data flow

`src/main.ts` creates the NestJS Express application, serves `uploads/` under `/uploads/`, enables CORS, applies a global whitelist/transforming `ValidationPipe`, and mounts Swagger at `/api`. `src/app.module.ts` loads `.env`, connects to MongoDB using `MONGODB_URI`, applies a 100-request-per-minute throttler, enables event emission, and imports the domain modules.

Most domain modules follow the same NestJS pattern: a controller receives and documents HTTP requests, DTOs validate input, a service applies business rules, and a Mongoose schema models MongoDB documents. Authenticated modules use `JwtAuthGuard` and ownership checks; administrative operations additionally use role guards. Notifications and chat communicate through `EventEmitterModule`: persisted messages and notifications can be broadcast to Socket.IO clients, while Firebase can deliver push notifications to device tokens.

## Prerequisites

- Node.js compatible with the NestJS dependency set used by the project.
- npm, pnpm, or yarn.
- MongoDB, locally or through a hosted MongoDB deployment.
- SMTP credentials if email-based OTP and verification delivery is required.
- Firebase Admin credentials if push notifications are required.
- Optional Twilio credentials for SMS functionality.

## Configuration

Create a `.env` file in the repository root. The following variables are referenced by the source code:

```dotenv
# Application
PORT=3000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/karhebti

# Email / OTP delivery
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=your-smtp-user@example.com
SMTP_PASS=your-smtp-password
SMTP_FROM="Karhebti Support" <noreply@karhebti.com>

# Firebase Admin SDK (either the key path/base64 flow or the individual fields)
FIREBASE_KEY_PATH=./firebase-service-account.json
FIREBASE_KEY=base64-encoded-service-account-json
FIREBASE_TYPE=service_account
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY_ID=your-private-key-id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\\n...\\n-----END PRIVATE KEY-----\\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk@example.iam.gserviceaccount.com
FIREBASE_CLIENT_ID=your-client-id
FIREBASE_AUTH_URI=https://accounts.google.com/o/oauth2/auth
FIREBASE_TOKEN_URI=https://oauth2.googleapis.com/token
FIREBASE_AUTH_PROVIDER_CERT_URL=https://www.googleapis.com/oauth2/v1/certs
FIREBASE_CLIENT_CERT_URL=https://www.googleapis.com/robot/v1/metadata/x509/...
FIREBASE_UNIVERSE_DOMAIN=googleapis.com

# Optional Twilio
TWILIO_ACCOUNT_SID=AC...
TWILIO_AUTH_TOKEN=...
TWILIO_PHONE_NUMBER=+
```

Do not commit SMTP passwords, Firebase service-account JSON, private keys, JWT secrets, or other credentials. The current source reads several integration settings directly from `process.env`; add the project’s JWT configuration variables when wiring deployment secrets because JWT signing is used by `AuthService` and `JwtStrategy`.

## Installation and local development

Because the current repository snapshot does not include a package manifest, first restore or add the project’s dependency manifest. A standard NestJS setup then looks like this:

```bash
# Clone the repository
git clone https://github.com/karhebti-app/karhebti-backend.git
cd karhebti-backend

# Install dependencies once package.json is present
npm install

# Start in watch mode
npm run start:dev
```

Typical NestJS scripts are:

```bash
npm run build          # Compile TypeScript to dist/
npm run start          # Run the compiled application
npm run start:dev      # Watch mode
npm run start:prod     # Run dist/main.js
npm run test           # Unit tests
npm run test:watch     # Watch unit tests
npm run test:e2e       # End-to-end tests, when configured
```

When the server starts on the default port, open:

- API: <http://localhost:3000>
- Swagger UI: <http://localhost:3000/api>
- Uploaded assets: <http://localhost:3000/uploads/...>
- Chat WebSocket namespace: `ws://localhost:3000/chat`

## Seed sample garages

`scripts/seed-garages.js` uses the MongoDB driver and inserts five sample garages. It defaults to `mongodb://localhost:27017/karhebti` when `MONGODB_URI` is not set.

```bash
MONGODB_URI="mongodb://localhost:27017/karhebti" node scripts/seed-garages.js
```

The script inserts records without clearing the collection. Review the collection before running it repeatedly.

## API overview

Swagger is the authoritative, generated endpoint reference. The main route groups exposed by the controllers include:

| Area | Base routes / examples | Purpose |
| --- | --- | --- |
| Authentication | `/auth/signup`, `/auth/signup/verify`, `/auth/login`, `/auth/forgot-password`, `/auth/reset-password`, `/auth/otp/*`, `/auth/email/*` | Account creation, login, OTP, and verification |
| Users | `/users` | User profiles, roles, and device tokens |
| Cars | `/cars`, `/cars/:id/image`, `/cars/marketplace/available` | Vehicle CRUD, images, and marketplace |
| Maintenance | `/maintenances` | Maintenance schedules and records |
| Parts | `/parts` | Vehicle parts |
| Replacement history | `/replacement-history` | Part replacement history |
| Documents | `/documents`, `/documents/check-my-expiring-documents` | Documents, uploads, and expiration checks |
| Garages | `/garages`, `/garages/:id` | Garage CRUD and repair-bay provisioning |
| Garage services | `/services` | Services offered by garages |
| Repair bays | `/repair-bays` | Capacity and repair-bay availability |
| Reservations | `/reservation` | Garage appointment reservations |
| Breakdowns | `/breakdowns` | Breakdown reports |
| Reclamations | `/reclamations` | Claims and complaints |
| AI | Module routes under `/ai` | Road issues and maintenance/garage recommendations |
| Marketplace | `/swipes`, `/conversations` | Swipe decisions and buyer/seller messaging |
| Notifications | `/notifications` | Push notification records, unread counts, and read state |
| Translation and location | `/translation`, `/user-location` | Translation and user location support |

Protected REST routes expect a bearer token:

```http
Authorization: Bearer <jwt-access-token>
```

## Uploads

- Car images are accepted by `POST /cars/:id/image`; the controller limits files to 5 MB and accepts JPEG, PNG, or WebP images before passing them to the image-validation service.
- Documents use multipart fields named `image` and `fichier`. `src/common/config/multer.config.ts` stores them under `uploads/documents/`, accepts JPG, JPEG, PNG, GIF, and PDF files, and enforces a 5 MB limit.
- `src/main.ts` exposes the `uploads/` directory as static content under `/uploads/`.

For production, use durable object storage or a persistent volume rather than relying on the local filesystem.

## Authentication notes

The signup flow is intentionally split:

1. `POST /auth/signup` stores a pending signup and sends or returns a six-digit OTP depending on email configuration.
2. `POST /auth/signup/verify` validates the OTP and creates the user account.
3. The response contains a JWT for immediate authenticated use.

Password-reset, OTP-login, and email-verification codes are hashed before persistence and have expiry/attempt limits. Email delivery is optional in development; when SMTP is disabled, the service logs/generated codes and includes them in responses. Never enable that fallback in a production environment.

## Real-time chat

The Socket.IO gateway uses the `/chat` namespace. Clients provide a JWT during the handshake using either `auth.token` or an `Authorization: Bearer ...` header.

Supported events include:

- `join_conversation`
- `leave_conversation`
- `send_message`
- `typing`
- `new_message` (server event)
- `user_online` / `user_offline` (server events)
- `notification` (server event)

Before joining a conversation, the gateway checks that the authenticated user is the buyer or seller attached to that conversation.

## Scheduled work and notifications

The documents module contains scheduled expiration checks. The scheduler checks documents approaching expiration and sends notifications to users with device tokens. Notification delivery can be persisted in MongoDB, emitted over WebSockets, and sent through Firebase Cloud Messaging.

The documents controller also exposes admin/testing and user-preview endpoints for manually running or inspecting expiration checks. Keep those endpoints protected and review the current role guard configuration before deploying publicly.

## Security and deployment checklist

- Configure a strong, externally managed JWT secret and never use development fallbacks in production.
- Restrict `app.enableCors()` from its current allow-all development behavior to known frontend origins.
- Restrict the Socket.IO gateway CORS policy, currently configured with `origin: '*'`.
- Keep SMTP, Firebase, Twilio, and MongoDB credentials in a secret manager.
- Disable returning/logging OTP values outside development.
- Put uploaded files on persistent, access-controlled storage and validate content server-side.
- Add request logging, health checks, structured error reporting, and production rate limits.
- Review admin-protected routes: the current garage controller exposes CRUD operations and should be protected according to the deployment’s authorization policy.
- Add or restore `package.json`, lockfile, TypeScript configuration, build configuration, and automated tests before production deployment.

## Testing

The repository includes unit-test files for at least the breakdowns module and document-expiration scheduling. Once the project manifest and test configuration are available, use:

```bash
npm test
npm run test:watch
npm run test:e2e
```

For integration tests, provide an isolated MongoDB database and mock external services such as SMTP, Firebase, Twilio, OpenStreetMap, and AI image validation.

## Contributing

1. Create a feature branch from `master`.
2. Keep changes scoped to the relevant NestJS module.
3. Add or update DTO validation, service tests, and Swagger decorators for new endpoints.
4. Do not commit `.env` files, credentials, generated uploads, or Firebase keys.
5. Run formatting, compilation, and tests before opening a pull request.

## License

No license file is currently present in the repository. Contact the Karhebti project maintainers before redistributing or using the code outside the project.

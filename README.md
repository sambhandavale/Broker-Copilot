# Broker Copilot

An intelligent AI-powered insurance brokerage platform that automates policy renewals, client management, email communications, and meeting scheduling.

## Overview

Broker Copilot simplifies the policy renewal process for insurance brokers by:
- **Unified Dashboard**: View all clients, policies, and upcoming renewals in one place
- **AI-Powered Prioritization**: Auto-score and rank renewals by urgency and value
- **Smart Actions**: Send personalized renewal emails, schedule meetings, and generate renewal briefs
- **Outlook Integration**: Sync emails, calendars, and meetings seamlessly
- **Real-time Tracking**: Monitor client responses and renewal progress automatically
- **Continuous Learning**: AI learns from patterns to improve recommendations

## Architecture

### Tech Stack

**Frontend**
- Next.js 14 (TypeScript)
- React 18+
- Tailwind CSS
- Radix UI Components
- Framer Motion (animations)
- Lucide React (icons)

**Backend**
- Node.js with TypeScript
- Next.js API Routes
- NextAuth for authentication (Microsoft OAuth)

**AI & ML**
- Python (CrewAI agents)
- LLM integration for policy analysis and email drafting

**Database**
- MongoDB (via Mongoose ORM)

**External Integrations**
- Microsoft Graph API (Outlook, Calendar)
- Email APIs (Gmail, Outlook)
- Insurance portals/APIs

### Folder Structure

```
Broker-Copilot/
├── web/                          # Next.js frontend + backend APIs
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.tsx           # Homepage
│   │   │   ├── auth/              # Authentication pages
│   │   │   ├── dashboard/         # Dashboard pages
│   │   │   ├── api/               # API routes
│   │   │   │   ├── auth/          # NextAuth setup
│   │   │   │   ├── outlook/       # Outlook/Calendar integration
│   │   │   │   ├── dashboard/     # Dashboard data APIs
│   │   │   │   ├── pipeline/      # Renewal pipeline
│   │   │   │   └── users/         # User management
│   │   │   ├── connectorwiz/      # Microsoft connector wizard
│   │   │   ├── playground/        # AI testing playground
│   │   │   └── settings/          # User settings
│   │   ├── components/
│   │   │   ├── shared/            # Navbar, Footer, Logo
│   │   │   └── ui/                # Reusable UI components (Button, Card, Features, etc.)
│   │   ├── lib/                   # Utilities, database, config, models
│   │   ├── providers/             # Auth provider
│   │   └── types/                 # TypeScript types
│   ├── package.json
│   └── tsconfig.json
├── ai_engine/                     # Python AI agents (CrewAI)
│   ├── src/
│   │   ├── broker_copilot/
│   │   │   ├── api.py             # FastAPI or Flask interface
│   │   │   ├── crew.py            # CrewAI crew setup
│   │   │   ├── main.py            # Entry point
│   │   │   ├── models.py          # Pydantic models
│   │   │   ├── config/
│   │   │   │   ├── agents.yaml    # Agent configurations
│   │   │   │   └── tasks.yaml     # Task configurations
│   │   │   └── tools/             # Custom tools for agents
│   │   └── data/
│   │       ├── client_data.json
│   │       └── mock_emails.json
│   ├── requirements.txt
│   └── pyproject.toml
└── README.md

```

## Key Features

### 1. **Login & Dashboard Overview**
- Clean, organized view of all clients and policies
- Upcoming renewals with priority scores
- Quick tags: "High Premium", "Expiry in 5 days", "No Response yet"

### 2. **Client-Level View**
- 360° client details (name, contact, company, relationship duration)
- Policy summary (active, expired, renewal dates)
- Past interactions (emails, meetings, notes)
- Priority insights with "Why?" explanations

### 3. **Suggested Actions**
- **Send Renewal Email**: Personalized templates with client & policy data
- **Schedule Meeting**: Auto-propose times from broker's calendar
- **Review Brief**: One-page renewal summary with recommendations

### 4. **Renewal Briefs**
- Current premium and coverage details
- Recommended changes (e.g., "Add flood coverage", "Increase by 5%")
- Justification for recommendations
- Attachable to emails or sharable in calls

### 5. **Tracking & Progress**
- Auto-track client responses and email replies
- Update renewal status ("Awaiting response", "In discussion", "Renewed")
- Real-time dashboard refresh with progress indicators

### 6. **Continuous Learning**
- AI learns which clients renew quickly
- Best-performing email templates identified
- Insurer comparison to find better deals
- Personalized renewal strategies and upsell opportunities

## AI Agents

The platform uses CrewAI agents for intelligent automation:

1. **Data Aggregator Agent**: Syncs client data from CRM, emails, and calendars
2. **Email Agent**: Reads emails, drafts replies, logs communication
3. **Calendar Agent**: Analyzes schedule, suggests meetings, adds reminders
4. **Renewal Scoring Agent**: Calculates priority scores with explanations
5. **Brief Generation Agent**: Creates one-page renewal briefs

## Getting Started

### Prerequisites
- Node.js 18+
- Python 3.10+
- MongoDB
- Microsoft Azure AD application (for OAuth)

### Installation

#### Frontend (Next.js)

```bash
cd web
pnpm install
```

#### Backend API Setup

Create `.env.local` in `web/`:
```
NEXTAUTH_SECRET=your_secret_key
NEXTAUTH_URL=http://localhost:3000
MICROSOFT_CLIENT_ID=your_microsoft_client_id
MICROSOFT_CLIENT_SECRET=your_microsoft_client_secret
DATABASE_URL=postgresql://user:password@localhost/broker_copilot
```

#### AI Engine (Python)

```bash
cd ai_engine
pip install -r requirements.txt
```

### Running the Application

#### Development

```bash
# Start Next.js dev server
cd web
pnpm dev
# Opens http://localhost:3000
```

#### Production Build

```bash
cd web
pnpm build
pnpm start
```

## Usage

### 1. Register & Connect Microsoft
- Sign up at `/auth/register`
- Connect your Outlook account via `/connectorwiz`

### 2. Upload Client Data
- Go to `/dashboard`
- Import clients and policies (via CSV, API, or CRM sync)

### 3. View Dashboard
- See upcoming renewals prioritized by score
- Click clients for detailed 360° view

### 4. Take Actions
- **Send Email**: Preview personalized templates, modify tone, send directly
- **Schedule Meeting**: Pick times from your calendar, invite client
- **Review Brief**: Read AI-generated renewal recommendation

### 5. Track Progress
- Dashboard auto-updates with client responses
- View renewal status and completion rate
- Export reports for team reviews

## API Routes

### Agents
- `POST /analysis` - Data Aggregator Agent and Renewal Scoring Agent workflow 
- `POST /generate_detail` - Brief Generation Agent and Communication Agents (Email and Calender)

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/[...nextauth]` - NextAuth handlers
- `GET /api/auth/microsoft/connect` - Connect Microsoft
- `GET /api/auth/microsoft/callback` - Microsoft OAuth callback

### Dashboard
- `GET /api/dashboard/renewals` - Get renewals
- `POST /api/dashboard/renewals/[id]` - Update renewal status

### Outlook Integration
- `GET /api/outlook/emails` - Fetch emails
- `POST /api/outlook/emails/send` - Send email
- `GET /api/outlook/calendar/available` - Get available time slots
- `POST /api/outlook/calendar/create-event` - Create meeting

### Pipeline
- `POST /api/pipeline/start` - Start renewal pipeline

### Users
- `GET /api/users/me` - Current user profile
- `GET /api/users/all` - List all users/clients
- `GET /api/users/[id]` - Get user details
- `PUT /api/users/[id]` - Update user
- `GET /api/users/settings` - User settings
- `PUT /api/users/settings` - Update settings

---

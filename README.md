# 🎮 Jagrik

> A multipurpose gameplay application with real-time video communication and multiplayer features

[![TypeScript](https://img.shields.io/badge/TypeScript-4.9.5-blue.svg)](https://www.typescriptlang.org/)
[![Angular](https://img.shields.io/badge/Angular-9.1.6-red.svg)](https://angular.io/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-green.svg)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-brightgreen.svg)](https://www.mongodb.com/)
[![Docker](https://img.shields.io/badge/Docker-Compose-2496ED.svg)](https://www.docker.com/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

## 📋 Overview

Jagrik is a full-stack multiplayer gameplay application built with modern web technologies. It features real-time video/audio communication powered by OpenTok, secure authentication, and a containerized deployment architecture using Docker and NGINX.

## ✨ Features

- 🎮 **Multiplayer Gameplay** - Real-time multiplayer game functionality
- 📹 **Video Communication** - Integrated video/audio calls via OpenTok
- 🔐 **Secure Authentication** - JWT-based authentication with Passport.js
- 📧 **Email Notifications** - SendGrid integration for transactional emails
- 🐳 **Containerized Deployment** - Docker and Docker Compose support
- 🔄 **Reverse Proxy** - NGINX configuration for production
- 📊 **ER Diagrams** - Well-documented database schema
- ⚡ **PM2 Process Management** - Robust process management for production

## 🛠️ Tech Stack

### Backend (TypeScript/Node.js)

| Technology | Version | Purpose |
|------------|---------|---------|
| **TypeScript** | 4.9.5 | Type-safe JavaScript |
| **Express.js** | 4.17.1 | Web framework |
| **MongoDB** | - | NoSQL database |
| **Mongoose** | 5.8.7 | MongoDB ODM |
| **JWT** | 8.5.1 | Authentication tokens |
| **Passport** | 0.4.1 | Authentication middleware |
| **OpenTok** | 2.10.0 | Video/audio communication |
| **SendGrid** | 7.1.1 | Email service |
| **Multer** | 1.4.2 | File upload handling |
| **Morgan** | 1.9.1 | HTTP request logging |
| **Compression** | 1.7.4 | Response compression |
| **express-validator** | 6.5.0 | Input validation |

### Frontend (Angular)

| Technology | Version | Purpose |
|------------|---------|---------|
| **Angular** | 9.1.6 | Frontend framework |
| **TypeScript** | - | Programming language |
| **SCSS** | - | Styling |
| **Karma** | - | Unit testing |
| **Protractor** | - | E2E testing |

### DevOps & Infrastructure

| Technology | Purpose |
|------------|---------|
| **Docker** | Containerization |
| **Docker Compose** | Multi-container orchestration |
| **NGINX** | Reverse proxy & load balancing |
| **PM2** | Process management |

## 📁 Project Structure

```
jagrik/
├── 📂 client/                      # Angular frontend application
│   ├── 📂 e2e/                    # End-to-end tests
│   ├── 📂 modules/                # Feature modules
│   ├── 📂 src/                    # Angular source code
│   │   ├── 📂 app/               # Application components
│   │   ├── 📂 assets/            # Static assets
│   │   └── 📂 environments/      # Environment configs
│   ├── Dockerfile                  # Production Docker config
│   ├── Dockerfile.dev              # Development Docker config
│   ├── angular.json
│   └── package.json
│
├── 📂 server/                      # TypeScript backend
│   ├── 📂 api/
│   │   ├── 📂 controllers/       # Request handlers
│   │   ├── 📂 models/            # Mongoose schemas
│   │   ├── 📂 routes/            # API route definitions
│   │   ├── 📂 services/          # Business logic
│   │   ├── 📂 utils/data/        # Utility data
│   │   ├── 📂 views/             # Email templates (EJS)
│   │   └── app.ts                 # Express app configuration
│   ├── 📂 configs/                # Configuration files
│   ├── Dockerfile                  # Server Docker config
│   ├── db.ts                       # Database connection
│   ├── server.ts                   # Entry point
│   ├── tsconfig.json
│   └── package.json
│
├── 📂 nginx/                       # NGINX configuration
│   └── default.conf
│
├── 📄 ER Diagram - Jagrik.pdf     # Database ER diagram (PDF)
├── 📄 Entity Relationship Diagram.png  # Database ER diagram (Image)
├── 📄 docker-compose.yml           # Docker Compose config
├── 📄 install-dev.sh               # Development installation script
├── 📄 start-dev.sh                 # Start development servers
├── 📄 stop-dev.sh                  # Stop development servers
└── 📄 README.md
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (with npm or yarn)
- **MongoDB** installed locally or MongoDB Atlas
- **Docker** and **Docker Compose** (optional, for containerized deployment)
- **PM2** for process management

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/shubhamcommits/jagrik.git
   cd jagrik
   ```

2. **Run the installation script**
   ```bash
   ./install-dev.sh
   ```

   This will install dependencies for both client and server.

### Running the Application

#### Development Mode

1. **Start MongoDB**
   ```bash
   mongod
   # OR with custom data path:
   mongod --dbpath /path/to/your/data/db
   ```

2. **Start development servers**
   ```bash
   ./start-dev.sh
   ```

3. **View logs**
   ```bash
   pm2 logs
   ```

4. **Access the application**
   - **API Server:** `http://localhost:3000`
   - **Client:** `http://localhost:4200`

#### Stopping Development Servers

```bash
./stop-dev.sh
```

#### Production Mode (Docker)

```bash
docker-compose up -d
```

## 📡 API Architecture

The backend follows a layered architecture:

```
Routes → Controllers → Services → Models → Database
```

| Layer | Purpose |
|-------|---------|
| **Routes** | Define API endpoints and middleware |
| **Controllers** | Handle HTTP requests/responses |
| **Services** | Contain business logic |
| **Models** | Define MongoDB schemas |
| **Views** | EJS templates for emails |

## 🐳 Docker Configuration

### Docker Compose Services

| Service | Port | Description |
|---------|------|-------------|
| **client** | 4200 | Angular frontend |
| **server** | 3000 | Node.js API |
| **nginx** | 80 | Reverse proxy |
| **mongodb** | 27017 | Database |

### Build Commands

```bash
# Build and start all services
docker-compose up --build -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down
```

## 📊 Database Schema

The project includes ER diagrams for database design:
- `ER Diagram - Jagrik.pdf` - Detailed PDF documentation
- `Entity Relationship Diagram.png` - Visual schema representation

## 🧪 Testing

### Backend Tests
```bash
cd server
npm test
```

### Frontend Unit Tests
```bash
cd client
ng test
```

### Frontend E2E Tests
```bash
cd client
ng e2e
```

## 📊 Language Distribution

| Language | Percentage |
|----------|------------|
| HTML | 41.4% |
| TypeScript | 40.6% |
| SCSS | 17.0% |
| Other | 1.0% |

## 🔧 Development Scripts

| Script | Description |
|--------|-------------|
| `./install-dev.sh` | Install all dependencies |
| `./start-dev.sh` | Start API and client servers with PM2 |
| `./stop-dev.sh` | Stop all development servers |

## 🌳 Git Workflow

### Branch Naming Convention

```
type_CapitalizedName
```

**Examples:**
- `bugfix_EditPostContent`
- `feature_UserAuthentication`

### Workflow Steps

1. **Create a new branch**
   ```bash
   git checkout -b feature_NewFeature
   ```

2. **Push to remote**
   ```bash
   git push -u origin feature_NewFeature
   ```

3. **Before starting work (daily)**
   ```bash
   git checkout feature_NewFeature
   git pull
   ```

4. **After finishing work**
   ```bash
   git checkout master
   git pull
   git checkout feature_NewFeature
   git rebase master
   ```

5. **Open a Pull Request** on GitHub

## 👥 Contributors

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/shubhamcommits">
        <img src="https://github.com/shubhamcommits.png" width="100px;" alt="Shubham Singh"/>
        <br />
        <sub><b>Shubham Singh</b></sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/krrishdholakia">
        <img src="https://github.com/krrishdholakia.png" width="100px;" alt="Krish Dholakia"/>
        <br />
        <sub><b>Krish Dholakia</b></sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/vgsunrise">
        <img src="https://github.com/vgsunrise.png" width="100px;" alt="Vinay Gupta"/>
        <br />
        <sub><b>Vinay Gupta</b></sub>
      </a>
    </td>
  </tr>
</table>

## 🤝 Contributing

1. **Never work on `master` branch!**
2. Create a new branch for each feature/bugfix
3. Follow the naming convention: `type_CapitalizedName`
4. Rebase before opening a Pull Request
5. Open a PR and notify the team

For larger changes, please open an issue first to discuss what you would like to change.

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

<p align="center">
  Built with ❤️ by the Jagrik Team
</p>


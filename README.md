# AutoPortfolio Builder

A full-stack web application that automates the creation of developer portfolios with GitHub deployment.

## Features

- **Multi-step Form**: Collect comprehensive portfolio data including personal info, skills, projects, experience, and education
- **5 Unique Templates**: Terminal, Glassmorphism, Sidebar, Gradient, and Minimalist designs
- **Template Gallery**: Preview all templates before selection
- **GitHub Integration**: Automatic repository creation, file deployment, and GitHub Pages enablement
- **Self-contained Output**: Generated portfolios work independently without requiring the builder

## Tech Stack

- **Frontend**: React.js with Tailwind CSS
- **Backend**: Node.js with Express
- **Database**: MongoDB
- **API**: GitHub REST API with Octokit

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- GitHub Personal Access Token (with `repo` scope)

### Installation

1. Clone the repository:
```bash
cd student\ portfolio\ builder
```

2. Install server dependencies:
```bash
npm install
```

3. Install client dependencies:
```bash
cd client
npm install
cd ..
```

4. Create `.env` file:
```bash
cp .env.example .env
```

5. Update `.env` with your MongoDB URI

### Running the Application

Start both server and client:
```bash
npm run dev
```

Or run separately:
```bash
# Terminal 1 - Server
npm run server

# Terminal 2 - Client
npm run client
```

Access the app at `http://localhost:3000`

## Generating a GitHub Token

1. Go to GitHub Settings > Developer settings > Personal access tokens
2. Click "Generate new token (classic)"
3. Select the `repo` scope
4. Generate and copy the token

## Project Structure

```
├── server/
│   ├── index.js           # Express server entry
│   ├── models/
│   │   └── Portfolio.js   # MongoDB schema
│   ├── routes/
│   │   ├── portfolio.js   # Portfolio CRUD API
│   │   └── github.js      # GitHub deployment API
│   └── templates/
│       └── allTemplates.js # 5 portfolio template generators
├── client/
│   ├── src/
│   │   ├── App.js         # Main app component
│   │   └── components/
│   │       ├── PortfolioForm.js
│   │       ├── TemplateGallery.js
│   │       ├── DeploymentPanel.js
│   │       └── SuccessScreen.js
│   └── package.json
├── package.json
└── README.md
```

## API Endpoints

### Portfolio API
- `POST /api/portfolio` - Create portfolio
- `GET /api/portfolio/:id` - Get portfolio
- `PUT /api/portfolio/:id` - Update portfolio
- `DELETE /api/portfolio/:id` - Delete portfolio

### GitHub API
- `POST /api/github/deploy` - Deploy portfolio to GitHub
- `POST /api/github/verify-token` - Verify GitHub token

## License

MIT

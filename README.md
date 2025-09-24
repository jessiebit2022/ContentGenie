# AI Content Generation Platform

**Author:** Jessie Borras  
**Website:** jessiedev.xyz

## Description

A full-stack application that uses large language models (LLM) like OpenAI's GPT or Google's Gemini to generate articles, blog posts, or marketing copy based on user prompts.

## Tech Stack

- **Frontend:** Next.js with React
- **Backend:** Node.js with Express API wrapper for LLM
- **Database:** PostgreSQL for user data and content history
- **AI Integration:** OpenAI GPT / Google Gemini APIs

## Features

- User authentication and profiles
- Content generation with customizable prompts
- Content history and management
- Multiple content types (articles, blog posts, marketing copy)
- Export functionality

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL
- OpenAI API key or Google Gemini API key

### Installation

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables (see `.env.example`)
4. Run database migrations: `npm run db:migrate`
5. Start development server: `npm run dev`

## Project Structure

```
├── frontend/          # Next.js frontend application
├── backend/           # Node.js API server
├── database/          # PostgreSQL schema and migrations
└── shared/            # Shared types and utilities
```

## License

MIT License# ContentGenie

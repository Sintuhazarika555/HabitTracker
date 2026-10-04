# Habit Tracker REST API

A lightweight, production-structured REST API built with Node.js, Express, and MySQL for tracking habits and daily completions.

## Features
- **CRUD Operations**: Create, read, and delete habits.
- **Relational Data**: Foreign key relationship mapping daily logs to habits with cascade deletion.
- **Date Check-ins**: Toggle completion status for any specific date (`YYYY-MM-DD`).
- **Connection Pooling**: Optimized MySQL queries using `mysql2/promise`.

## Tech Stack
- **Runtime**: Node.js (ES Modules)
- **Framework**: Express.js
- **Database**: MySQL

## API Endpoints

| Method | Endpoint | Description | Request Body |
| :--- | :--- | :--- | :--- |
| `GET` | `/health` | Server health check | None |
| `GET` | `/api/v1/habits` | Fetch all habits | None |
| `POST` | `/api/v1/habits` | Create a new habit | `{"title": "Read 20 mins", "frequency": "daily"}` |
| `PATCH` | `/api/v1/habits/:id/toggle` | Toggle date completion | `{"date": "2026-10-04"}` |
| `DELETE` | `/api/v1/habits/:id` | Delete a habit | None |

## Getting Started

1. Clone repository:
   ```bash
   git clone 
   cd habit-tracker-api
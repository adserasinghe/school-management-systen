# Lumen School Management System

Lumen is a responsive Next.js frontend for the school management system defined
in [`docs/ERD.md`](./docs/ERD.md) and [`prisma/schema.prisma`](./prisma/schema.prisma).

## Run the frontend

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The root route opens the
dashboard; the demo login screen is available at `/login`.

Useful commands:

```bash
npm run typecheck
npm run build
npm run start
```

## Frontend routes

| Route | Purpose |
| --- | --- |
| `/login` | Demo sign-in experience |
| `/dashboard` | School overview, attendance trends, grade distribution, and activity |
| `/students` | Searchable student directory with class/status filters |
| `/classes` | Class cards and subject assignment views |
| `/attendance` | Class/date selection and bulk attendance entry |
| `/marks` | Exam/class/subject selection and spreadsheet-style marks entry |
| `/reports` | Report generation, class ranking, and published reports |
| `/settings` | School profile and configurable grading scale |
| `/help` | Support entry points |

The current pages use typed demo data from `lib/mock-data.ts`. They are ready
to connect to the Prisma-backed route handlers in the next implementation
phase; the login button and write actions intentionally do not persist data
yet.


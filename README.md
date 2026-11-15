# go_arch

A Next.js application repository with Prisma integration and supporting scripts.

> **Important note about the name:**  
> Despite the repository name `go_arch`, this project is **not** a Go architecture template or Go boilerplate. The current codebase is a **Next.js web application**. If you are looking for a Go project scaffold, this repository is not the right fit.

---

## Overview

`go_arch` is a web application built on **Next.js**. The repository includes a standard Next.js project structure, a `prisma` directory for database schema and migrations, a `scripts` directory for utility tasks, and a `src` directory for application code.

The original README was the default `create-next-app` template, so the product-specific purpose and feature set are not yet fully documented. This README describes the repository structure, setup process, and common development workflows based on what is currently present in the codebase.

---

## Tech Stack

| Area | Technology |
| --- | --- |
| Framework | Next.js |
| UI | React |
| Database / ORM | Prisma |
| Runtime | Node.js |
| Package manager | npm |
| Deployment | Vercel (recommended for Next.js) |

> The exact language configuration (JavaScript or TypeScript) and additional libraries should be confirmed in `package.json` and the source files.

---

## Repository Structure

```text
go_arch/
├── prisma/          # Prisma schema, migrations, and database configuration
├── public/          # Static assets
├── scripts/         # Utility and automation scripts
├── src/             # Application source code
├── package.json     # Project dependencies and npm scripts
└── README.md

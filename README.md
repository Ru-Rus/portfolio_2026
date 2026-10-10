# Rusell Marquillero Portfolio

A developer portfolio built with React, TypeScript, Vite, and Tailwind CSS. It includes project case studies, an interactive system design playground, skills, course records, and contact links.

## Pages

- Home and About
- Projects and project details at /projects/:slug
- System Design Playground
- Skills and Courses & certificates
- Contact

## Local development

Requires Node.js 22 and npm.

1. Install dependencies with npm ci.
2. Start the development server with npm run dev.
3. Run checks with npm run lint and npm run build.
4. Preview the production build with npm run preview.

## Content and assets

Project details, skill context, and course records are maintained in src/data. Certificate images and the resume are in public. Verify project details, resume contents, dates, and client disclosure approval before publishing.

## Deployment

This is a browser-rendered single-page application. Configure the production host to serve index.html for application routes so direct visits and refreshes work on nested paths. No production host or canonical domain is configured. Add absolute production URLs to public/sitemap.xml and public/robots.txt after selecting the domain.
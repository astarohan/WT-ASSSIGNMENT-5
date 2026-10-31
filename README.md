# Assignment 5 — Student Information Portal using ExpressJS

**Student:** Rohan Reshi  
**PRN:** 202401040034  
**Batch:** WT1  
**Date:** 31 October 2026

## Requirements
- Node.js 18 or later
- npm
- Internet access on first install to download packages

## Install and run
1. Extract the ZIP and open the project folder in VS Code.
2. Open the integrated terminal in the project root.
3. Run `npm install`.
4. Run `npm start`.
5. Open `http://localhost:3000`.

## Route table
| Method | Path | Purpose |
|---|---|---|
| GET | `/` | Redirect to `/students` |
| GET | `/students` | List students |
| GET | `/students/new` | Show registration form |
| POST | `/students` | Validate and create a student |
| GET | `/students/:id` | Show a student using a route parameter |
| GET | `/students/:id/json` | Return one student as JSON |
| GET | `/admin/audit` | Demonstrate custom role middleware |

For `/admin/audit`, send header `x-demo-role: faculty` in Postman. Without it, the custom middleware returns HTTP 401. This is a teaching demonstration, not real authentication.

## Server-side validation
`express-validator` validates name length, email format, 12-digit PRN, mobile number format and course selection. The controller also rejects duplicate PRN and email values. Invalid form submissions render the form again with HTTP 422 and explanatory messages.

## Middleware demonstrated
- Built-in: `express.urlencoded`, `express.json`, `express.static`
- Third-party: `morgan` request logging and `express-validator`
- Custom: request-context middleware and demonstration staff-role middleware
- Error handler: centralized Express error-handling middleware

## Views and static files
EJS templates are stored in `views/`. CSS and browser JavaScript are stored in `public/`.

## Deployment
Push this folder to GitHub. In Render, create a new Web Service connected to the repository. Use `npm install` as the build command and `npm start` as the start command. The application reads `process.env.PORT` and binds to `0.0.0.0`. Test the real deployed URL before adding it to Moodle. Do not submit a placeholder URL.

## Data and limitations
This practical uses an in-memory array. New records are lost when the server restarts. There is no database or production authentication provider. The role header is only for demonstrating custom middleware.

## Screenshots
The report and `screenshots/` folder contain illustrative previews. Replace these with screenshots captured from your own running application if your instructor requires genuine runtime evidence.

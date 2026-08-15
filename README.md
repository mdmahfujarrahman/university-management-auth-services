# University Management API

A REST API for a university's academic records: students, faculty, admins,
semesters, faculties, and departments. Built with Node.js, Express, TypeScript,
and MongoDB.

The point of this project was structure. Every module owns its own route,
validation, controller, service, model, and types, so HTTP concerns stay in the
controller and the actual rules live in the service. Adding a new resource means
adding a folder, not editing five shared files.

## Request flow

```
Request
   |
   v
Route            express router, one per module
   |
   v
Validation       zod schema, checked before the handler runs
   |
   v
Controller       reads the request, shapes the response
   |
   v
Service          business rules, the only layer that knows the domain
   |
   v
Model            mongoose schema and queries
```

Anything thrown along the way lands in a single global error handler, which
turns Zod errors, Mongoose validation errors, cast errors, and custom
`ApiError`s into one consistent response shape.

## Stack

| | |
|---|---|
| Runtime | Node.js 16+ |
| Framework | Express |
| Language | TypeScript |
| Database | MongoDB via Mongoose |
| Validation | Zod |
| Passwords | bcrypt |
| Logging | Winston with daily-rotate files |
| Quality | ESLint, Prettier, Husky pre-commit hook |

## Running it locally

```bash
git clone https://github.com/mdmahfujarrahman/university-management-auth-services.git
cd university-management-auth-services
yarn install

cp .env.example .env      # required: the server exits without DATABASE_URI
yarn dev
```

No MongoDB handy? One container is enough:

```bash
docker run -d --name uni-mongo -p 27017:27017 mongo:7
```

Other scripts: `yarn build` compiles to `dist/`, `yarn start` runs the compiled
output, `yarn lint:check` and `yarn prettier:check` cover formatting.

## Environment

| Variable | Purpose |
|---|---|
| `NODE_ENV` | `development` prints errors with a stack; `production` hides it |
| `PORT` | Port the server listens on |
| `DATABASE_URI` | MongoDB connection string. Required |
| `DEFAULT_STUDENT_PASSWORD` | Initial password for student accounts |

## Endpoints

All routes are under `/api/v1`.

**Users** — account creation, which also creates the matching profile and
generates the ID for that role.

| Method | Path |
|---|---|
| POST | `/users/create-student` |
| POST | `/users/create-faculty` |
| POST | `/users/create-admin` |

**Students, faculties, admins** — same shape for each of
`/students`, `/faculties`, `/admins`:

| Method | Path |
|---|---|
| GET | `/` list, with pagination, sorting, and search |
| GET | `/:id` |
| PATCH | `/:id` |
| DELETE | `/:id` |

**Academic semesters** — `/academic-semesters`. Creation is
`POST /create-semester`; the rest matches the pattern above. Title and code have
to agree (`Autumn` is `01`, `Summer` is `02`, `Fall` is `03`), and a semester
cannot repeat within the same year.

**Academic faculties** — `/academic-faculties`, created with `POST /`.

**Academic departments** — `/academic-department`, created with `POST /`, and
list responses populate the academic faculty.

**Management departments** — `/management-departments`, created with
`POST /create-management`.

## Responses

Success:

```json
{
  "statusCode": 200,
  "success": true,
  "message": "Academic Semester retrived successfully !",
  "meta": { "page": 1, "limit": 10, "total": 0 },
  "data": []
}
```

Failure, here from a Zod schema rejecting the body:

```json
{
  "success": false,
  "message": "Validation Error",
  "errorMessages": [
    {
      "path": "title",
      "message": "Invalid enum value. Expected 'Autumn' | 'Summer' | 'Fall', received 'Nonsense'"
    }
  ]
}
```

`stack` is added to error responses outside production.

List endpoints accept `page`, `limit`, `sortBy`, `sortOrder`, and
`searchTerm`, and return the paging details under `meta`.

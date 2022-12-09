# PMG
## Hosted on Heroku 
[pmg](https://throvetest.herokuapp.com)

## Tools
- **Nestjs**
- **Postgresql** - SQL DB
- **Jest** Test framework
- **Docker** Container
## Endpoints
- Auth [/users]
  1. Create User [/][GET]
  2. Get one user [/][GET]
  3. Get all users [/:id?queries][GET]
  4. Edit user [/][PUT]
  5. Delete user [/][DELETE]
## TASKS
- [x] HTTP Basic Authentication (RFC2617)
- [x] Add user
- [x] Get one user
- [x] Get users with condtions and filters
- [x] Edit user
- [x] Delete user
## Links
- [Home](https://)
- [Api v1 Base URl](https:///api/v1)

## Installation instructions
- Download the code from github (Main branch)
- npm ci to install dependencies
- npm run start:dev to  start application

## Environment Variables
- HTTP_BASIC_USER
- HTTP_BASIC_PASS
- DATABASE_TYPE
- DATABASE_HOST
- DATABASE_PORT
- DATABASE_USER
- DATABASE_PASSWORD
- DATABASE_NAME
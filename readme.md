# Backend with Express + MongoDB + RESTfull API + SOLID
*show.md.lib.back*

## Intro
- 

## Install
```bash
npm i
```

## Run
- dev
    ```bash
    npm run dev
    ```
- prod
    ```bash
    npm run start
    ```

## API endpoints
'/' - main page
'/api/users':
    'get': *json* get all users
    'post': *jspn* add new user
'/api/users/:id':
    'get': *json* get one user by id
    'put': *jspn* edit new user by id
    'delete': *jspn* delete user by id
# User Management API in Laravel

This repository contains an implementation of a user management API developed as part of a technical test. The primary goal of this project is to showcase advanced skills in backend development using Laravel, with a focus on code quality through a 100% test coverage and an emphasis on maintainability.

## Key Features

- **100% Test Coverage**: Every critical component of the application has undergone rigorous testing to ensure complete code coverage. Automated tests aim to validate all API functionalities, ensuring robustness and reliability.


- **Emphasis on Maintainability**: The code architecture has been designed with a focus on long-term maintainability. The code follows Laravel best practices, such as proper separation of concerns and efficient use of services and dependency injection.


- **Conventional Commits**: The use of Conventional Commits ensures that all commits follow a standardized format, enhancing readability and traceability in the version control history. This practice contributes to a well-organized and comprehensible commit log.


- **Laravel Best Practices**: The implementation follows Laravel best practices, utilizing Json Resources for streamlined data transformation and Pest PHP for expressive and readable testing.


- **Nginx Reverse Proxy and Docker**: The API is deployed using Docker containers, providing a consistent and portable environment. Nginx is utilized as a reverse proxy to efficiently handle incoming requests and distribute them to the appropriate Docker containers, ensuring optimal performance and scalability.

## Note on Frontend

Due to personal circumstances, a complete frontend implementation was not feasible within the scope of this technical test. The developer chose to prioritize the quick delivery of the backend, emphasizing solid knowledge in Laravel and the ability to create robust and highly testable APIs.

The focus on the backend does not diminish the importance of the frontend but reflects the priorities given the specific circumstances of this test. The backend code, however, is ready to be integrated into a frontend application when needed.
## How to run

### Step 1: Clone the repository
```bash
> git clone https://github.com/iamgabrieloliveira/users-manager-api.git

> cd users-manager-api
```

### Step 2: Configure your environment variables
```bash
> cp .env.example .env
```

### Step 3: Build and Run with Docker Compose
```bash
> docker compose up --build
```

## Setup your database

### Step 1: Enter in your docker container
```bash
> docker exec -it app /bin/sh
```

### Step 2: Run the migrations with seeders
```bash
> php artisan migrate --seed
```


## Run Tests

### Step 1: Enter in your docker container
```bash
> docker exec -it app /bin/sh
```

### Step 2: Run with coverage
```bash
> php artisan test --coverage
```

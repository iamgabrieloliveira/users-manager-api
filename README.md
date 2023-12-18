## How to run

### Step 1: Clone the repository
```bash
git clone https://github.com/iamgabrieloliveira/CFP-Energy-Users-Manager.git

cd CFP-Energy-Users-Manager
```

### Step 2: Configure your environment variables
```bash
cp .env.example .env
```

### Step 3: Build and Run with Docker Compose
```bash
docker compose up --build
```

## Setup your database

### Step 1: Enter in your docker container
```bash
docker exec -it app /bin/sh
```

### Step 2: Run the migrations with seeders
```bash
php artisan migrate --seed
```


## Run Tests

### Step 1: Enter in your docker container
```bash
docker exec -it app /bin/sh
```

### Step 2: Run with coverage
```bash
php artisan test --coverage --min=90
```

# Base de datos

## Requisitos
- PostgreSQL 14+ (o compatible)
- Extensión `citext` (para email)

# 🗄️ PostgreSQL — Configuración `.env` y migraciones (Windows CMD y macOS)

## 1) Windows (CMD) — crear DB, migrar y seed
```bat
:: Ver versión de psql (opcional)
psql --version

:: 1) Crear base de datos (si no existe)
set PGPASSWORD=**CLAVE DE POSTGRES**
psql -h localhost -U postgres -p 5432 -c "CREATE DATABASE marketplace;"

:: 2) Aplicar migraciones
psql -h localhost -U postgres -p 5432 -d marketplace -f "%cd%/db/migrations/001_init.sql"

:: 3) Cargar datos de ejemplo (seeds)
psql -h localhost -U postgres -p 5432 -d marketplace -f "%cd%/db/migrations/002_seed.sql"

:: 4) Cargar datos para tests
psql -h localhost -U postgres -p 5432 -d marketplace -f "%cd%/db/migrations/003_seed_test.sql"

:: 5) Verificar tablas creadas
psql -h localhost -U postgres -p 5432 -d marketplace -c "\dt"
```

## 2) macOS (Terminal) — crear DB, migrar y seed
```bash
# 1) Crear base de datos (si no existe)
export PGPASSWORD=1234
psql -h localhost -U postgres -p 5432 -c "CREATE DATABASE marketplace;"

# 2) Aplicar migraciones
psql -h localhost -U postgres -p 5432 -d marketplace -f "$(pwd)/db/migrations/001_init.sql"

# 3) Cargar datos de ejemplo (seeds)
psql -h localhost -U postgres -p 5432 -d marketplace -f "$(pwd)/db/migrations/002_seed.sql"

# 4) Cargar datos para tests
psql -h localhost -U postgres -p 5432 -d marketplace -f "$(pwd)/db/migrations/003_seed_test.sql"

# 5) Verificar tablas creadas
psql -h localhost -U postgres -p 5432 -d marketplace -c "\dt"
```

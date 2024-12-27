
# Impulse Probation Task

This project is a NestJS application that demonstrates fetching and storing advertising campaign data from a Probation API, then exposing endpoints for data retrieval and aggregation. It also includes an hourly cron job to automatically fetch fresh data and handle pagination.

---

## Features

1. **NestJS** + **TypeORM** + **PostgreSQL** (configurable via environment variables).
2. **Migrations** to create and manage the `campaign_reports` table.
3. **Cron job** (runs every hour) to fetch data from the Probation API for the current day.
4. **Endpoints**:
   - **Fetch data (manual trigger)**: Allows fetching data in a custom date range.
   - **Aggregations**: Returns aggregated counts of events by `ad_id` and date (with pagination).
5. **Docker Compose**: Provides a quick setup for both the application and the database.

---

## Getting Started

### **1. Clone the repository:**
```bash
git clone https://github.com/Zak-Roz/impulse.git
cd impulse
```

### **2. Create environment variables file (.env):**
```bash
cp .env.example .env
```
Modify values in `.env` if needed (e.g., database credentials).

---

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)
- [Docker](https://www.docker.com/) (if you plan to use Docker for the setup)

## Docker Compose

A sample `docker-compose.yml` is included. To launch the app in Docker:

1. **Build & run**:
   ```bash
   sudo docker-compose up
   ```
2. The NestJS app should be available at [http://localhost:3000](http://localhost:3000).

---

## Endpoints

### 1. Fetch Data (Manual Trigger)

- **Method**: `POST`
- **URL**: `/campaign-reports/fetch`
- **Body** (JSON):
  ```json
    {
        "from_date": "2024-12-27 00:00:00",
        "to_date": "2024-12-27 23:59:59"
    }
  ```
- **Description**: Triggers data fetching from the Probation API in the specified date range, storing the records in `campaign_reports`.

### 2. Aggregated Data

- **Method**: `GET`
- **URL**: `/campaign-reports/aggregate`
- **Query Parameters**:
  - `from_date` (e.g. `2024-12-27 00:00:00`)
  - `to_date` (e.g. `2024-12-27 23:59:59`)
  - `event_name` (e.g. `install` or `purchase`)
  - `take` (number of records per page) (e.g. 100)
  - `page` (page number, default = 1)
- **Description**: Returns JSON data with aggregated counts of the specified `event_name` grouped by `ad_id` and `date`, including pagination info.

---

## License
This project is licensed under the MIT License.

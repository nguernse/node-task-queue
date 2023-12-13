# About

A Node Task Queue setup with Docker.

This does the following:

- An Node/Express API to accept requests that will submit a job to the queue
- A Worker service to process the submitted jobs from the queue using [BullMQ](https://docs.bullmq.io/)
- A Redis instance to store the queued jobs

# Prerequisite

```bash
cd api
npm install
```

```bash
cd workers
npm install
```

# Running the Demo Locally

```bash
docker compose --profile app up --build
```

You can take a look at `docker-compose.yml`. This will spin up three services:

- `api` - This API takes requests on `/job` and submits a job.
- `redis_queue` - This redis cache will store the jobs to be processed.
- `queue_workers` - This is the workers that will process the jobs in the queue.

You can shutdown two ways:

- `docker compose --profile app down`
- `docker compose --profile app down -v`

Without `-v` the Redis Queue data will persist. If you want to start with a clean slate clear the docker volumes or shutdown with `-v` param.

> ℹ️ Since these services are using containers, they connect with each other using the service name in `docker-compose.yml` and not `localhost`

# Make a HTTP Request to the API

```bash
curl --request GET 'http://localhost:9999/health'
```

## Submit a Job

```bash
curl --request POST 'http://localhost:9999/job' \
  --header 'Content-Type: application/json' \
  --data '{ "type": "add", "data": { "x": 1, "y": 2 } }'
```

## Get Job

```bash
curl --request GET 'http://localhost:9999/job/<job_id>' \
  --header 'Content-Type: application/json'
```

## Check Job Status

```bash
curl --request GET 'http://localhost:9999/job/<job_id>/status' \
  --header 'Content-Type: application/json'
```

## Check Job Counts

```bash
curl --request GET 'http://localhost:9999/jobs/counts'
```

## Check Active Jobs

```bash
curl --request GET 'http://localhost:9999/jobs/active'
```

# Viewing Redis Queue

If you would like to view the jobs being added to the Queue, you can use [Redis Insights](). You can connect with:

- host: 127.0.0.1
- port: 6379

# Resources

- [Docker](https://www.docker.com/)
- [Node](https://nodejs.org/en)
- [Express](https://expressjs.com/)
- [BullMQ](https://docs.bullmq.io/)
- [TypeScript](https://www.typescriptlang.org/)
- [Redis](https://redis.io/docs/about/about-stack/)

# About

A Node Task Queue setup with Docker.

This does the following:

- A Node/Express API to accept requests that will submit a task to the queue
- A Worker service to process the submitted tasks from the queue using [BullMQ](https://docs.bullmq.io/)
- A Redis instance to store the queued tasks

# Goal

[Task Queues](<https://en.wikipedia.org/wiki/Scheduling_(computing)#task_queue>) is a topic I wanted to understand better. So I wanted to create a little project to experiment with this and further understand what is going on.

For NodeJS, I couldn't find many working examples. Most of the guides I encountered would discuss the concept of implementing a Task Queue, or show code snippets of how to initialize a Queue-Worker service with something like [BullMQ](https://docs.bullmq.io/), but didn't go much beyond that.

So I wanted to create this project to [learn by building](https://en.wikipedia.org/wiki/Experiential_learning). This is obviously not production ready, but a starting point for learning.

Some follow-up ideas to experiment further:

- Schedule jobs to send emails and notifications
- Schedule jobs to scrape web content
- Monitor third-party datasets and schedule jobs to process the updated data
- Schedule jobs to process images. I'm thinking I could automate uploading photos from my camera that could trigger jobs to edit, resize, etc. for the web.

# Prerequisite

```bash
cd api
npm install
```

```bash
cd workers
npm install
```

# Running the Project Locally

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

# Make an HTTP Request to the API

```bash
curl --request GET 'http://localhost:9999/health'
```

## Submit a Job

```bash
curl --request POST 'http://localhost:9999/job' \
  --header 'Content-Type: application/json' \
  --data '{ "name": "add", "data": { "x": 1, "y": 2 } }'
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
- https://www.fullstackpython.com/task-queues.html
- [What is a Message Queue](https://www.youtube.com/watch?v=oUJbuFMyBDk)

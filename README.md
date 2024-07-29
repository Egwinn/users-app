# Application Using NestJS, PostgreSQL, and LocalStack (SNS, SQS)

This application is a microservice-based project built with NestJS and PostgreSQL, leveraging LocalStack for AWS services like SNS and SQS for local development and testing.

## Getting Started

Follow these steps to set up and run the application locally.

### Prerequisites

1. **Docker and Docker Compose**  
   Ensure you have Docker and Docker Compose installed on your machine. You can download and install them from [Docker's official website](https://www.docker.com/get-started).

### Setup

1. **Environment Configuration**

   Navigate to the `infrastructure/env` folder and create the necessary `.env` files. You can use the provided example files as a reference:

   - `localstack.env`
   - `notif-service.env`
   - `postgres.env`
   - `users-service.env`

   These files will configure the environment variables required for each component of the application.

2. **Line Break Configuration**

   In the `infrastructure` folder, ensure that the line break type in `init-localstack.sh` is set to LF (Unix style). This is crucial for compatibility with Unix-based systems. You can change this setting in your code editor or by using tools like `dos2unix`.

3. **Starting the Application**

   Open a terminal in the `infrastructure` folder and run the following command to start the services:

   ```bash
   docker compose up -d
   ```

   This command will build and start the necessary containers, including PostgreSQL, the NestJS application, and LocalStack.

### Usage

Once the setup is complete and the application is running, you can access the services using the provided test credentials:

    Email: testUser@gmail.com
    Password: qwe123@

These credentials can be used to log in and interact with the application.

### Key Technologies

- **NestJS:** A progressive Node.js framework for building efficient, reliable, and scalable server-side applications.
- **PostgreSQL:** An advanced open-source relational database.
- **LocalStack:** A fully functional local AWS cloud stack that allows you to develop and test AWS services locally.

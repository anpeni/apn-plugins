# Oracle Backend Plugin

This backend plugin dynamically exposes Oracle database tables based on requests from the frontend endpoint. The tables to be exposed are configured in the `app-config.yaml` file.

## Features

- Dynamically exposes Oracle database tables.
- Responds to table requests from the frontend endpoint.

## Installation and Configuration

1. Make sure the plugin is installed and properly configured.
2. Configure the Oracle database connection in the `app-config.yaml` file. Here's an example:

```yaml
oracle:
  user: 'oracle-user' # Replace with your Oracle user
  password: 'user-password' # Replace with your Oracle password
  server: 'localhost' # Replace with your Oracle server address
  port: 1521 # Replace with your Oracle server port
  database: 'freepdb1' # Replace with your Oracle database name
  connectString: 'localhost:1521/freepdb1' # Replace with your Oracle connect string
```

3. The frontend can now request tables from the backend by specifying the table name in the endpoint.

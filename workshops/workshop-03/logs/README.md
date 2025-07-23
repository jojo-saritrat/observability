# Alloy Setup for Logs

This repository helps you set up Grafanet and run a Grafana Alloy container to handle your configurations and data.

## Prerequisites

Before starting, ensure that you have Docker installed on your machine. If Docker is not installed, you can download it from [here](https://www.docker.com/get-started).

## Setup and Run Grafanet

### 1. Create Grafanet Network (if not already created)

Before starting the Grafana Alloy container, you need to create the Grafanet network if it doesn't already exist. You can create it by running the following command:

```bash
docker network create grafanet
```

This command will create a Docker network called `grafanet` that will be used by the Grafana Alloy container.

### 2. Run the Docker Command

Once the Grafanet network is created, run the following command to start the Grafana Alloy container:

```bash
docker run --network grafanet --privileged --rm -p 12345:12345 -v $(pwd)/config.alloy:/etc/alloy/config.alloy -v $(pwd)/data:/tmp/logs grafana/alloy:latest run --server.http.listen-addr=0.0.0.0:12345 --storage.path=/var/lib/alloy/data --stability.level=experimental  /etc/alloy/config.alloy
```

#### Explanation:
- `--network grafanet`: Connects the container to the `grafanet` network.
- `--privileged`: Grants the container additional privileges.
- `--rm`: Removes the container once it's stopped.
- `-p 12345:12345`: Exposes port `12345` for HTTP access.
- `-v $(pwd)/config.alloy:/etc/alloy/config.alloy`: Mounts the `config.alloy` file from the current directory to the container's `/etc/alloy/config.alloy`.
- `-v $(pwd)/data:/tmp/logs`: Mounts the `data` directory from the current directory to the container's `/tmp/logs` directory.
- `grafana/alloy:latest`: The Docker image to use.
- `run --server.http.listen-addr=0.0.0.0:12345`: Runs the container and listens on port `12345`.
- `--storage.path=/var/lib/alloy/data`: Defines the storage path for the data.
- `--stability.level=experimental`: Sets the stability level to experimental.
- `/etc/alloy/config.alloy`: Specifies the configuration file to use for Alloy.

### 3. Edit Files in the `/data` Folder

After the container is up and running, you can edit files in the `/data` folder on your local machine. These files are mounted into the container at `/tmp/logs`, so any changes made in the `/data` folder will be reflected inside the container.

This allows you to test and experiment with configuration changes or other data in real-time.
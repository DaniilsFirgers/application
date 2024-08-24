import os
import docker
from docker.errors import APIError, DockerException
from dotenv import load_dotenv

load_dotenv()

DOCKER_USERNAME = os.getenv('DOCKER_HUB_USERNAME')
DOCKER_PASSWORD = os.getenv('DOCKER_HUB_PASSWORD')
IMAGE_NAME = "test-repository"
TAG = "development"

print(f"DOCKER_USERNAME: {DOCKER_USERNAME}")
print(f"DOCKER_PASSWORD: {DOCKER_PASSWORD}")
print(f"IMAGE_NAME: {IMAGE_NAME}")
print(f"TAG: {TAG}")


def main():
    if not DOCKER_USERNAME or not DOCKER_PASSWORD:
        print("Error: Docker credentials are not set in the environment variables.")
        return

    try:
        # Initialize Docker client with increased timeout
        client = docker.DockerClient(
            base_url='unix://var/run/docker.sock')

        # Build the Docker image
        print("Building the Docker image...")
        image, logs = client.images.build(
            path=".", tag=f"{DOCKER_USERNAME}/{IMAGE_NAME}:{TAG}")

        # Print build logs
        for log in logs:
            if 'stream' in log:
                print(log['stream'].strip())

        # Log in to Docker Hub
        print("Logging in to Docker Hub...")
        client.login(username=DOCKER_USERNAME, password=DOCKER_PASSWORD)

        # Push the Docker image
        print(
            f"Pushing the Docker image {DOCKER_USERNAME}/{IMAGE_NAME}:{TAG} to Docker Hub...")
        push_logs = client.images.push(
            f"{DOCKER_USERNAME}/{IMAGE_NAME}", tag=TAG, stream=True)

        # Print push logs
        for line in push_logs:
            print(line.strip())

        print(
            f"Docker image {DOCKER_USERNAME}/{IMAGE_NAME}:{TAG} has been pushed to Docker Hub.")

    except APIError as e:
        print(f"An API error occurred: {e}")
    except DockerException as e:
        print(f"A Docker-related error occurred: {e}")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


if __name__ == "__main__":
    main()

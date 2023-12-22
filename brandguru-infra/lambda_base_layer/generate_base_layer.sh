# Generate the base layer for the lambda function

# Remove the container first (if it exists)
docker rm layer-container

# Build the base layer
docker build -t base-layer .

# Rename it to the layer container
docker run --name layer-container base-layer

# Copy the generated zip artifact, so our CDK can use it
docker cp layer-container:layer.zip . && echo "Create the layer.zip with the updated base layer!"
#!/bin/bash
set -euo pipefail
echo "LocalStack resources starting to create."

# Create an SNS topic
if awslocal --endpoint-url=http://localhost:4566 sns create-topic --name my-topic; then
    echo "SNS topic created successfully."
else
    echo "Error creating SNS topic."
    exit 1
fi

# Create an SQS queue
if awslocal --endpoint-url=http://localhost:4566 sqs create-queue --queue-name my-queue; then
    echo "SQS queue created successfully."
else
    echo "Error creating SQS queue."
    exit 1
fi


if aws --endpoint-url=http://localhost:4566 sns subscribe \
  --topic-arn arn:aws:sns:eu-central-1:000000000000:my-topic \
  --protocol sqs \
  --notification-endpoint arn:aws:sqs:eu-central-1:000000000000:my-queue \
  --attributes RawMessageDelivery=true
  
then
    echo "S3 bucket notification configuration updated successfully."
else
    echo "Error updating S3 bucket notification configuration."
    exit 1
fi

# Print a message indicating that the resources have been created
echo "LocalStack resources created successfully."
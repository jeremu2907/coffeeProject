import { S3Client, CreateBucketCommand, PutObjectCommand } from '@aws-sdk/client-s3';

// Create an S3 client
// You must copy the endpoint from your B2 bucket details
// and set the region to match.
const s3 = new S3Client({
    endpoint: process.env.S3_ENDPOINT,
    region: 'us-east-005'
});

export default s3;

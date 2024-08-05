import { S3 } from '@aws-sdk/client-s3'

/**
 * Digital Ocean Spaces Connection
 */

const spacesEndpoint = "https://nyc3.digitaloceanspaces.com"
const bucket = "passionfruit-reviews-sheets-staging"
const region = "us-east-1"

export const s3 = new S3({
  endpoint: spacesEndpoint,
  region: region,
  credentials: {
    accessKeyId: "DO00Y6MRBCPPGPEJJ4M4",
    secretAccessKey: "jY6MFtW3iKlLXfAx2EWlVAqou8tx44NPr668SX5qeZI",
  }
})

export const config = {
  digitalOceanSpaces: `https://${bucket}.${spacesEndpoint}/`,
  bucketName: bucket
}
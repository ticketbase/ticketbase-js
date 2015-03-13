## Updating with a new version

Ensure that the ticketbase-js widget is published in GitHub (tagged properly, eg, `v0.1.0`), then do:

    make v0.1.0

## Deploying

Once the new version is in, deploy it:

    make deploy

This will sync to S3/CloudFront and invalidate old files.

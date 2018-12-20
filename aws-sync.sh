#!/bin/bash
aws s3 sync ./s3-content s3://iexview.neelparikh.net/ --acl public-read

#!/bin/bash
aws s3 sync ./s3-content s3://net.neelparikh.iexview/ --acl public-read

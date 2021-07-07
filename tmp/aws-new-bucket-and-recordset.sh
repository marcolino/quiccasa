#!/usr/bin/env bash
#
# Create a new AWS S3 website bucket and a new route 53 record set pointing to it

# create a new AWS S3 bucket
region="${1:-eu-west-1}"
hosted_zone_id="${2:-Z01773871GDWEBESZZ419}"
domain="${3:-sistemisolari.com}"
target="${4:-test}"
record="${5:-s3-website-eu-west-1.amazonaws.com}"
bucket="${target}.${domain}"
resource_record_set_json="/tmp/resource-record-set-$$.json"

aws s3api create-bucket \
            --bucket "$bucket" \
            --region "$region" \
            --create-bucket-configuration LocationConstraint="$region"

# tell AWS this should be website
aws s3 website s3://"$bucket" --index-document index.html --error-document error.html

# # create a new AWS route 53 record set
# cat > "$resource_record_set_json" << EOF
# {
#      "Comment": "Creating Alias resource record sets in Route 53",
#      "Changes": [{
#                 "Action": "CREATE",
#                 "ResourceRecordSet": {
#                             "Name": "$bucket",
#                             "Type": "A",
#                             "AliasTarget":{
#                                     "HostedZoneId": "$hosted_zone_id",
#                                     "DNSName": "$record",
#                                     "EvaluateTargetHealth": false
#                               }}
#                           }]
# }
# EOF

# aws route53 change-resource-record-sets --hosted-zone-id "$hosted_zone_id" --change-batch file://"$resource_record_set_json"
# rm "$resource_record_set_json"
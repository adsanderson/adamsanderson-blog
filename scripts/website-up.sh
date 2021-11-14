#!/bin/bash

site="https://www.adamsanderson.co.uk"

echo "Checking website $site"

status=`curl --silent --head $site | head -1 | cut -f 2 -d' '`

if [ "$status" != "200" ]
then
    echo "status was other than '200': was '$status'"
    exit 1
fi
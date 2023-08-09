#!/bin/bash

source ./.env.development

echo "Load schema from" $REACT_APP_GRAPHQL_API_ENDPOINT

npx get-graphql-schema $REACT_APP_GRAPHQL_API_ENDPOINT > fuel-core-schema.graphql
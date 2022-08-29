echo "Pushing desmo-dapp:$1, using $2 as docker username."
docker tag desmo-dapp $2/desmo-dapp:$1
docker push $2/desmo-dapp:$1
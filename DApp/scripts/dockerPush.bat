echo "Using %1 as docker username."
docker tag desmo-dapp %1/desmo-dapp:1.0.0
docker push %1/desmo-dapp:1.0.0
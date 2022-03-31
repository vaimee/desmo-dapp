# Overview

Typescript service based on *iexec-sdk* in order to comunicate with the in-chain side and *node-wot* to the off-chain comunication.

[iexec-sdk](https://github.com/iExecBlockchainComputing/iexec-sdk)

[node-wot](https://github.com/eclipse/thingweb.node-wot)

[Algorithm explanation](algorithm.md)

# Command

```
npm install -g ts-node typescript '@types/node'
```

Run test

```
npm test
```

# IexecSimpleApp

[Official guide](https://docs.iex.ec/for-developers/your-first-app)

# Steps

1.  scripts\build.bat
2.  scripts\runLocally.bat
3.  scripts\dockerPush.bat <docker-usernamed>
4.  copy chacksum from docker to iexec.json
5.  scripts\onChainDeploy.bat
6.  scripts\runOnChain.bat
7.  scripts\getResults.bat <task-id>
8.  iexec app publish --chain viviani
9.  iexec orderbook app 0x8661128290105EcD736E703aE7E95B23dda24271
10. iexec app run --args "41.90 12.49" --watch --chain viviani
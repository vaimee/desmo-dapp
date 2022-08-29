![DESMO-LD](https://github.com/vaimee/desmo/blob/8a741e1542162dd4517a90a2ab37f42a58a8fd7f/imgs/desmo-logo.png)

# Overview

Typescript service based on *iexec-sdk* in order to comunicate with the in-chain side and *node-wot* to the off-chain comunication.

[iexec-sdk](https://github.com/iExecBlockchainComputing/iexec-sdk)

[node-wot](https://github.com/eclipse/thingweb.node-wot)

[Algorithm explanation](docs/algorithm.md)

[Encoding explanation](docs/encoding.md)

[UML](docs/uml.md)

[Iexec Official guide](https://docs.iex.ec/for-developers/your-first-app)

# Typescript DApp code
The DApp can be executed in your local machine as a usual Typescript application.
Install the necessary dependencies on your local machine:

```npm install -g ts-node typescript '@types/node' ts-jest```

The test unit of the DApp has some section that will fail if the other services that it uses are not up and running.
Services used by the DApp:
- WAM for TDs and sensors WAM
- Zion or LinkSmart as a Directory (TDD)

You can run tests 1, 2, 3, 4, and 5 without these services.
Tests 6, 7, and 8 require them up and running. 
Test 7 require internet connection too.
(your firewall can block some connections and ruin your tests)

Run tests manually (insede the [DApp tests folder](./tests/))

1. Consensus for number ```npx jest jest_cons_number.test.ts```
2. Consensus for string ```npx jest jest_cons_str.test.ts```
3. Consensus for boolean ```npx jest jest_cons_bool.test.ts```
4. Encoding ```npx jest jest_encoding.test.ts```
5. Query parser ```npx jest jest_parser.test.ts```
6. Directory collector and soruces ```npx jest jest_general.test.ts```
7. Wot ```npx jest jest_wot.test.ts```
8. RealExample use-case ```npx jest jest_usecase.test.ts```

Run All test units with Jest (WARNING: WAM and Zion need to be up, LinkSmart will not be used in that case)

Prepare WAM and Zion

1. Donwload and run a Zion instance. You can [donwload the Zion repo here](https://github.com/vaimee/zion), and then run  `docker-compose up`.
2. Build and run WAM. Go to the [WAM folder](../example-tds/) and run `npm install`, `npm run build`, and `npm start`.
3. Regiter the WAM TDs on Zion.
    1. Register an account on your local Zion by POST at `http://localhost:3000/auth/register` with json body: 
        ```{
            "email":"email@email.com",
            "password":"1234"
        }```
    2. copy the the `accessToken` like that: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsImlhdCI6MTY1OTk3MTcyMCwiZXhwIjoxNjU5OTcyNjIwfQ.PJBwXU5ARyO4-HLvA-aRBgXiTfgl9xvQ95PpQnBpvX4`.
    3. Go to the [Directory manager folder](../directory/directoryManager/) and run `node setup.js --zion <<accessToken>>` replacing the `accessToken` with your.
4. Go to the [DApp tests folder](./tests/) and run ```npx jest``` (or ```npm run test```)




## DESMO-iExec Manual
```ad-note 
For this step are needed: 
 - Docker hub account 
 - Wallet address with rights provided by the Iexec team 
 - The iExec SDK installed on your local machine 
 - An application
```
​
### Setting your wallet
 The first step is to set up your wallet in the Iexec local environment. For this run the following command: 
​
```bash
iexec wallet import <pivate_key>
```
​
Where ```<pivate_key>``` is the key provided by the owner of the wallet. This wallet is necessary to work with the viviavi chain (iExec testnet sidechain). Once configured you can start to work with iExec. 
​
You can verify if your wallet was successfully configured with the command: 
```bash
 iexec wallet show --chain viviani  
```
 
 For more information on how to set up your wallet with iexec cli please use this [link](https://github.com/iExecBlockchainComputing/iexec-sdk/blob/master/CLI.md#wallet)
​
​
### Deploying the DApp
The DAPP in DESMO-LD project will be used by the Iexec worker pool, it needs to be dockerized, published on docker-hub, and finally registered on iexec.

```bash
npm run clean
```
Build the TS code
```bash
npm run build
```
Now you can run the DApp locally with a test query.
```bash
npm start
```
If you want to change the argument passed to the DApp, you can edit the `package.json` file.
The first argument is the RequestID (used in the DApp to get the list of Directory from the chain). The second one is the query that the DApp needs to resolve, the query is a stringify json with some replacements: you must use `__!_` instead of the double quotes `"` and `--#-` instead of the single quote `'`.

Build the docker image
```bash
npm run docker_build
```

Publish the DApp on docker-hub.
```bash
docker tag desmo-dapp <your_docker_username>/desmo-dapp:<version>
docker push <your_docker_username>/desmo-dapp:<version>
```
(you can use the script `./scripts/dockerPush.sh` to do that with: `./dockerPush.sh <version> <your_docker_username>`)

You can check if the image work, running it locally
```bash
npm run docker_run
```

Copy the checksum of the docker image in the file `iexec.json` under `app.checksumm`.
Check the `app.multiaddr` and `app.owner`  of the same file.

Register the DApp on IExec.
```bash
npm run onchain_deploy
```

Make sure to use Viviani which is the free chain.
​```bash
iexec app show --chain viviani
iexec account show --chain viviani
```

Tun the Dapp on a workerpool
```bash
npm run onchain_run
```

If you want that others can run your application you must create an app order. For this run the following command: 
​
```bash
iexec order init --app
```
​
With this command a new field called ```order``` will be created on the ```iexec.json``` file. Now you need to publish your order by running the command: 
​
```bash
iexec order sign --app  && iexec order publish --app
```
​
After this command you can check if your order was successfully created with the command: 
​
```bash
iexec orderbook app <app_address>
```
​
```ad-warning
Without an app order clients will not be able to buy your application
```
​
For more information on how to set up your application to work with the IExec platform please use this [link](https://github.com/iExecBlockchainComputing/iexec-sdk/blob/master/CLI.md#app)
​
### Running your application
​
Once your application is deployed you can run the application with the command: 
​
```bash
iexec app run --watch --chain viviani --trust 0 --callback <callback_address> --args <your_arguments>
```
​
Where ```--watch``` is a command to follow the status of the application,  ```--trust``` you can configure the consensus algorithm from iExec (for more information follow this [link](https://docs.iex.ec/key-concepts/proof-of-contribution)), ```--callback``` you can configure what is the smart contract that will receive the app result, ```--args``` you can set arguments for your application.  
​
You can also follow the application process of the application with the [iExec explorer application](https://explorer.iex.ec/viviani).

#### Running your application locally

You can also run your application locally with the command:
```bash
npm start -- 0x000000000000000000000000000000000000000000000000000000000000000b "{__!_prefixList__!_:[{__!_abbreviation__!_:__!_desmo__!_,__!_completeURI__!_:__!_https://desmo.vaimee.it/__!_},{__!_abbreviation__!_:__!_qudt__!_,__!_completeURI__!_:__!_http://qudt.org/schema/qudt/__!_},{__!_abbreviation__!_:__!_xsd__!_,__!_completeURI__!_:__!_http://www.w3.org/2001/XMLSchema/__!_},{__!_abbreviation__!_:__!_monas__!_,__!_completeURI__!_:__!_https://pod.dasibreaker.vaimee.it/monas/__!_}],__!_property__!_:{__!_identifier__!_:__!_value__!_,__!_unit__!_:__!_qudt:DEG_C__!_,__!_datatype__!_:1},__!_staticFilter__!_:__!_$[?(@[--#-type--#-]==--#-Sensor--#-)]__!_}"
```


### Decode the callback-data
 After an DApp run, you will retrieve the callback-data, if you are running the DApp on the workerpool, you should find the result on the [Iexec explorer](https://explorer.iex.ec/viviani)

 then go to the folder [support](./support/) amd run `ts-node support.ts` (if need run `npm install -g ts-node` before).


[Return to the main readme](/README.md)
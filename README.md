![DESMO-LD](https://github.com/vaimee/desmo/blob/8a741e1542162dd4517a90a2ab37f42a58a8fd7f/imgs/desmo-logo.png)

# DESMO-LD Oracle DApp

**Overview** 

Desmo-LD will leverage on iExec distributed cloud computing features to deploy its
off-chain Oracle components. The Oracle DApp is an IExec decentralized application
written in node-js (Typescript) which acts as the backend of Desmo-LD iExecDOracle. In
particular, it is in charge of parsing and translating the on-chain oracle requests,
collecting the results from the selected TDDs, reaching a consensus on the Web
Thing response, and returning the response. Thanks to iExec secure environment
facilities, enabled Web Things can be operated within a secure enclave where
credentials can be shared without any risk of information leaking.


**System Architecture**

![Architecture](docs/imgs/schema.jpg)

![FlowChart](docs/imgs/FlowChart.jpg)

[FlowChart link](https://miro.com/app/board/uXjVODIdhHI=/?invite_link_id=916009864260)



**Contents**
1. [WAM for TDs example management](example-tds/README.md)
2. [Linksmart Directory for Directories example](directory/README.md)
3. [DApp](DApp/README.md)
    1. [Consensus algorithm for TDs result](DApp/docs/algorithm.md)
    2. [Econding result](DApp/docs/encoding.md)
    3. [UML](docs/uml.md)



# LOCAL TEST

**SETUP**

1. WAM
    1. `cd ./example-tds`
    2. `npm install`
    3. `npm run build`
    4. `npm start`
2. `cd ..`
3. Directory
    1. `cd ./directory` 
    2. Download and install GO [go.dev](https://go.dev/dl/)
    3. `./downloadRepo.sh`
    5. `cd ./directoryManager` 
    6. `npm install` 
    7. `npm start` 
4. `cd ../../`
5. DApp
    1. `cd ./DApp` 
    2. `npm install -g ts-node typescript '@types/node'`

**RUN TEST**

1. WAM
    1. `cd ./example-tds`
    4. `npm start`
2. `cd ..`
3. Directory
    1. `cd ./directory`
    4. `./buildAndRunMultiple.sh`
    7. `./setupMultiple.sh` 
4. `cd ../../`
5. DApp
    1. `cd ./DApp` 
    2. `ts-node tests/runTests.ts usecase`

**Zion as Directory**

Zion is an Directory implementation, you can find the [Zion repository here](https://github.com/vaimee/zion)

The final demo of DESMO-LD project will use Zion Directories, to use an isntace of that with docker:
1. download the repository [here](https://github.com/vaimee/zion)
2. `docker-compose up`

To test the DApp with Zion as Direcotry: 
1. WAM
    1. `cd ./example-tds`
    4. `npm start`
2. `cd ..`
3. Directory
    1. if Zion is not up yet, go in the Zion repository folder and then `docker-compose up`
5. DApp
    1. `cd ./DApp`
    2. `ts-node tests/runTests.ts zion`


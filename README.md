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
2. [Linksmart Directory for Directories example](linksmart-directory/README.md)
3. [DApp](DApp/README.md)
    1. [Consensus algorithm for TDs result](DApp/docs/algorithm.md)
    2. [Econding result](DApp/docs/encoding.md)
    3. [UML](docs/uml.md)


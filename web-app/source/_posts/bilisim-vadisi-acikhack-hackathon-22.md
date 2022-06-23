---
title: bilisim vadisi - acikhack hackathon '22
date: 2022-05-11 16:43:45
tags:
---

# introduction

as of 2022, may, it was decided to join [bilisim vadisi acikhack's blockchain, metaverse, nft hackathon](https://www.acikhack.com/) as a team. here is personal experience i have gained throughout it.

before moving on, you can find the target of the competition and the details below, which were supposed to be achieved:
the hackathon was divided into two:
   - free category
     |place|reward|
     |:---:|:---:|
     |>1st|100k try|
     |2nd|75k try|
     |3rd|50k try|
   - for the students of [ecole 42](https://www.42istanbul.com.tr/about-42/)
     - had a special listing while the top 1 being around 17.5k try



p.s you can learn more about the hackathon by [clicking here](https://www.acikhack.com/)

### target

a 3 days of hackathon with the last day presentation and prize distribution. the last day presentation includes a live demo as well. as there are 41 teams chosen out of hundreds, there were the first top 3 teams to get the next step of which the
first 3 get rewarded.

the award table is as following:

|place|reward|
|:---:|:---:|
|>1st|100k try|
|2nd|75k try|
|3rd|50k try|

# used tech

1. [solidity](https://docs.soliditylang.org/en/v0.8.13/) (smart contracts)
   the language used to code smart contracts in brief. there are also some other alternatives, however, solidity is the
   ethereum foundation supported and the most popular one.

feel free to check the contract [source codes here](https://github.com/medipolchain/supply-chain/blob/main/contracts/).

2. [react.js](https://reactjs.org/) (frontend framework)
   react has been designed from the start for gradual adoption, and you can use as little or as much react as you need. whether you want to get a taste of react, add some interactivity to a simple html page, or start a complex react-powered app, the links in this section will help you get started.

feel free to check the unity [source codes here](https://github.com/medipolchain/supply-chain/tree/main/client).

3. [web3](https://web3js.readthedocs.io/en/v1.7.3/) (libraries)
   there are multiple ways to interact with the blockchain, such as using a web3 library. while web3.js is the most known and used one for the web, as #2 web3.py was used to develop the iot integration with blockchain.

4. [next.js](https://nextjs.org/) / [express.js](https://expressjs.com/) backend and api
   in order to complete the full communication and stack, for the api and backend, there were used fastapi and
   express.js.

feel free to check the api/backend [source codes here](https://github.com/medipolchain/supply-chain/tree/main/backend).

5. [brownie](https://eth-brownie.readthedocs.io/en/stable/) / [truffle](https://trufflesuite.com/truffle/)
   , [ganache](https://trufflesuite.com/ganache/) (test/deploy)
   while developing the smart contracts, it is as crucial to test them before deploying, however, during the whole
   hackathon, brownie and ganache were used to test the smart contracts. they are the most known, developed, and
   advanced tools to test smart contracts. learn more about them below:
    - [brownie](https://eth-brownie.readthedocs.io/en/stable/)
    - [ganache](https://trufflesuite.com/docs/ganache/)
    - [truffle](https://trufflesuite.com/docs/truffle/)

# problems

1. limited time
   as there were only 2 nights for the whole hackathon to complete, we only managed to sleep 4-6 hours on average. there were a ton of bugs and integration issues that we had to fix.

2. library deficiency in iot => blockchain integration
   pretty much, i can say there is no library in existence for the iot. a custom library is needed to integrate the iot with the blockchain, which is what the team is currently working on.

the purpose of this project was to integrate the blockchain with the iot and resolve the cold supply chain problem while removing the authority, centralization and the need for a central database, which completely open to be modified and changed by anyone at any time.

# finally

as a result of 2 tiring nights, a ton of effort, 2 presentations including the demo, we have managed to be the 1st winner team out of 41 teams and earn 100k try.

you can find the speech i had on the [linkedin post](https://www.linkedin.com/feed/update/urn:li:activity:6931665956339355648/):
https://www.linkedin.com/feed/update/urn:li:activity:6931665956339355648/

feel free to check the final product [source code on github](https://github.com/medipolchain/supply-chain):
https://github.com/medipolchain/supply-chain
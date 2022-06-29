---
title: Bilisim Vadisi - Acikhack Hackathon '22
date: 2022-05-11 16:43:45
tags:
---

# Introduction

As of 2022, may, it was decided to join [Bilisim Vadisi Acikhack's Blockchain, Metaverse, NFT Hackathon](https://www.acikhack.com/) as a team. Here is personal experience I have gained throughout it.

Before moving on, you can find the target of the competition and the details below, which were supposed to be achieved:
The hackathon was divided into two:
   - Free category:
     |Place|Reward|
     |:---:|:---:|
     |>1st|100K TRY|
     |2nd|75K TRY|
     |3rd|50K TRY|
   - For the students of [Ecole 42](https://www.42istanbul.com.tr/about-42/)
     - had a special listing while the top 1 being around 17.5k try



p.s you can learn more about the hackathon by [clicking here](https://www.acikhack.com/)

### Target

A 3 days of hackathon with the last day presentation and prize distribution. The last day presentation includes a live demo as well. As there are 41 teams chosen out of hundreds, there were the first top 3 teams to get the next step of which the
first 3 get rewarded.

The award table is as following:

|Place|Reward|
|:---:|:---:|
|>1st|100K try|
|2nd|75K TRY|
|3rd|50K TRY|

# Used Tech

1. [Solidity](https://docs.soliditylang.org/en/v0.8.13/) (smart contracts)
   The language used to code smart contracts in brief. There are also some other alternatives, however, solidity is the Ethereum Foundation supported and the most popular one.

Feel free to check the contract [source codes here](https://github.com/medipolchain/supply-chain/blob/main/contracts/).

2. [React.js](https://reactjs.org/) (frontend framework)
   React has been designed from the start for gradual adoption, and you can use as little or as much react as you need. Whether you want to get a taste of react, add some interactivity to a simple html page, or start a complex react-powered app, the links in this section will help you get started.

Feel free to check the unity [source codes here](https://github.com/medipolchain/supply-chain/tree/main/client).

3. [web3](https://web3js.readthedocs.io/en/v1.7.3/) (libraries)
   There are multiple ways to interact with the blockchain, such as using a web3 library. While web3.js is the most known and used one for the web, as #2 web3.py was used to develop the iot integration with blockchain.

4. [Next.js](https://nextjs.org/) / [Express.js](https://expressjs.com/) backend and API
   In order to complete the full communication and stack, for the api and backend, there were used FastAPI and Express.js.

Feel free to check the api/backend [source codes here](https://github.com/medipolchain/supply-chain/tree/main/backend).

5. [Brownie](https://eth-brownie.readthedocs.io/en/stable/) / [Truffle](https://trufflesuite.com/truffle/)
   , [Ganache](https://trufflesuite.com/ganache/) (test/deploy)
   While developing the smart contracts, it is as crucial to test them before deploying, however, during the whole hackathon, Brownie and Ganache were used to test the smart contracts. They are the most known, developed, and advanced tools to test smart contracts. Learn more about them below:
    - [Brownie](https://eth-brownie.readthedocs.io/en/stable/)
    - [Ganache](https://trufflesuite.com/docs/ganache/)
    - [Truffle](https://trufflesuite.com/docs/truffle/)

# Problems

1. Limited time
   As there were only 2 nights for the whole hackathon to complete, we only managed to sleep 4-6 hours on average. There were a ton of bugs and integration issues that we had to fix.

2. Library deficiency in IoT => Blockchain integration
   Pretty much, I can say there is no library in existence for the IoT. A custom library is needed to integrate the iot with the blockchain, which is what the team is currently working on.

The purpose of this project was to integrate the blockchain with the IoT and resolve the cold supply chain problem while removing the authority, centralization and the need for a central database, which completely open to be modified and changed by anyone at any time.

# Finally

As a result of 2 tiring nights, a ton of effort, 2 presentations including the demo, we have managed to be the 1st winner team out of 41 teams and earn 100K TRY.

You can find the speech I had on the [Linkedin Post](https://www.linkedin.com/feed/update/urn:li:activity:6931665956339355648/):
https://www.linkedin.com/feed/update/urn:li:activity:6931665956339355648/

Feel free to check the final product [source code on Github](https://github.com/medipolchain/supply-chain):
https://github.com/medipolchain/supply-chain
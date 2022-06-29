---
title: Avalanche - Istanbul Hackathon '21
date: 2022-05-07 23:17:11
tags: hackathon
---

# Introduction

As of 2021, December, it was decided to join [Avalanche Istanbul Hackathon](https://www.avalanchehacks.com/) blockchain competition as a team. Here is personal experience I have gained throughout it.

Before moving on, you can find the target of the competition and the details below, which were supposed to be achieved:

1. NFTs are required to use
2. Fully decentralized gamification
3. Custom game designs
4. Custom game mechanics

p.s you can learn more about the hackathon by [clicking here](https://www.avalanchehacks.com/)

### Target

A 3 days of hackathon with the last day presentation and prize distribution. The last day presentation is divided into two. As there are 21 teams chosen out of hundreds, there were the first top 5 teams to get the next step of which the first 3 get rewarded.

The award table is as following:

|Place|Reward|
|:---:|:---:|
|1st|25K USD|
|> 2nd|15K USD|
|3rd|10K USd|

# Used Tech

1. [Solidity](https://docs.soliditylang.org/en/v0.8.13/) (smart contracts)
   The language used to code smart contracts in brief. there are also some other alternatives, however, solidity is the Ethereum Foundation supported and the most popular one.

Feel free to check the contract [source codes here](https://github.com/medipolchain/mbc-avalanche-hackathon-2021/tree/main/contracts).

2. [Unity](https://unity.com/) (game engine)
   There were also some other alternatives, such as browser gaming using a front-end library, such as React, however, Unity was more flexible considering it has support for the web as well. Code once, share and deploy on all of the possible platforms including the web within one click.

Feel free to check the Unity [source codes here](https://github.com/medipolchain/mbc-avalanche-hackathon-2021/tree/main/unity).

3. [Web3](https://web3js.readthedocs.io/en/v1.7.3/) / [Nethereum](https://nethereum.com/) (libraries)
   There are multiple ways to interact with the blockchain, such as using a Web3 library, or using a native Nethereum library. while Web3.js is the most known and used one for the web, as #2 Unity was used to develop the game, Netherum, which is a .net Web3 library, was also used.

4. [FastAPI](https://fastapi.tiangolo.com/) / [Express.js](https://expressjs.com/) backend and API
   in order to complete the full communication and stack, for the api and backend, there were used FastAPI and Express.js.

Feel free to check the API/backend [source codes here](https://github.com/medipolchain/mbc-avalanche-hackathon-2021/tree/main/backend).

5. [Brownie](https://eth-brownie.readthedocs.io/en/stable/) / [Truffle](https://trufflesuite.com/truffle/), [Ganache](https://trufflesuite.com/ganache/) (test/deploy) while developing the smart contracts, it is as crucial to test them before deploying, however, during the whole hackathon, Brownie and Ganache were used to test the smart contracts. they are the most known, developed, and advanced tools to test smart contracts. Learn more about them below:
    - [brownie](https://eth-brownie.readthedocs.io/en/stable/)
    - [ganache](https://trufflesuite.com/docs/ganache/)
    - [truffle](https://trufflesuite.com/docs/truffle/)

# Problems

1. Limited time
   As there were only 2 nights for the whole hackathon to complete, we only managed to sleep 6 hours in total. There were a ton of bugs and integration issues that we had to fix.

2. Experience deficiency with the tech stack
   While attending a hackathon for the first time f2f, it took some time to get adapted to it. There were some issues with the tech stack, such as the lack of knowledge of Solidity, and the lack of knowledge of the game engine.

3. Web3 / Unity integrations (authentication / [Metamask](https://metamask.io/))
   While it is insanely an easy thing to do, it was too hard, the reason we had never have any experience before is because we were not familiar with the Web3 library.

# Finally

As a result of 2 tiring nights, a ton of effort, 2 presentations including the gaming, we have managed to be the 2nd team out of 21 teams and earn $15K. The reason we could not make it to the first place was because the team who got it was working on their game for months. Their game was pretty much ready including their contracts, and they literally told the attendees before the hackathon has started that they were here to get the first place prize and just get out. Kind of sad to see that happen, but happens :)

You can find the speech I had on the [Linkedin Post](https://www.linkedin.com/feed/update/urn:li:activity:6874025912325746689/):
https://www.linkedin.com/feed/update/urn:li:activity:6874025912325746689/

Feel free to check the final product [source code on Github](https://github.com/medipolchain/mbc-avalanche-hackathon-2021):
https://github.com/medipolchain/mbc-avalanche-hackathon-2021
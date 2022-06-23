---
title: avalanche - istanbul hackathon '21
date: 2022-05-07 23:17:11
tags:
---

# introduction

as of 2021, december, it was decided to join [avalanche istanbul hackathon](https://www.avalanchehacks.com/) blockchain
competition as a team. here is personal experience i have gained throughout it.

before moving on, you can find the target of the competition and the details below, which were supposed to be achieved:

1. nft's are required to use
2. fully decentralized gamification
3. custom game designs
4. custom game mechanics

p.s you can learn more about the hackathon by [clicking here](https://www.avalanchehacks.com/)

### target

a 3 days of hackathon with the last day presentation and prize distribution. the last day presentation is divided into
two. as there are 21 teams chosen out of hundreds, there were the first top 5 teams to get the next step of which the
first 3 get rewarded.

the award table is as following:

|place|reward|
|:---:|:---:|
|1st|25k usd|
|> 2nd|15k usd|
|3rd|10k usd|

# used tech

1. [solidity](https://docs.soliditylang.org/en/v0.8.13/) (smart contracts)
   the language used to code smart contracts in brief. there are also some other alternatives, however, solidity is the
   ethereum foundation supported and the most popular one.

feel free to check the
contract [source codes here](https://github.com/medipolchain/mbc-avalanche-hackathon-2021/tree/main/contracts).

2. [unity](https://unity.com/) (game engine)
   there were also some other alternatives, such as browser gaming using a front-end library, such as react, however,
   unity was more flexible considering it has support for the web as well. code once, share and deploy on all of the
   possible platforms including the web within one click.

feel free to check the
unity [source codes here](https://github.com/medipolchain/mbc-avalanche-hackathon-2021/tree/main/unity).

3. [web3](https://web3js.readthedocs.io/en/v1.7.3/) / [nethereum](https://nethereum.com/) (libraries)
   there are multiple ways to interact with the blockchain, such as using a web3 library, or using a native nethereum
   library. while web3.js is the most known and used one for the web, as #2 unity was used to develop the game,
   netherum, which is a .net web3 library, was also used.

4. [fastapi](https://fastapi.tiangolo.com/) / [express.js](https://expressjs.com/) backend and api
   in order to complete the full communication and stack, for the api and backend, there were used fastapi and
   express.js.

feel free to check the
api/backend [source codes here](https://github.com/medipolchain/mbc-avalanche-hackathon-2021/tree/main/backend).

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
   as there were only 2 nights for the whole hackathon to complete, we only managed to sleep 6 hours in total. there
   were a ton of bugs and integration issues that we had to fix.

2. experience deficiency with the tech stack
   while attending a hackathon for the first time f2f, it took some time to get adapted to it. there were some issues
   with the tech stack, such as the lack of knowledge of solidity, and the lack of knowledge of the game engine.

3. web3 / unity integrations (authentication / [metamask](https://metamask.io/))
   while it is insanely an easy thing to do, it was too hard, the reason we had never have any experience before is
   because we were not familiar with the web3 library.

# finally

as a result of 2 tiring nights, a ton of effort, 2 presentations including the gaming, we have managed to be the 2nd
team out of 21 teams and earn $15k. the reason we could not make it to the first place was because the team who got it
was working on their game for months. their game was pretty much ready including their contracts, and they literally
told the attendees before the hackathon has started that they were here to get the first place prize and just get out.
kind of sad to see that happen, but happens :)

you can find the speech i had on
the [linkedin post](https://www.linkedin.com/feed/update/urn:li:activity:6874025912325746689/):
https://www.linkedin.com/feed/update/urn:li:activity:6874025912325746689/

feel free to check the final
product [source code on github](https://github.com/medipolchain/mbc-avalanche-hackathon-2021):
https://github.com/medipolchain/mbc-avalanche-hackathon-2021
---
title: Teknofest - Fighting UAVs '21 
date: 2021-09-12 17:17:49 
tags:
---

# Introduction

As of 2021, it was decided to join [teknofest fighting uav](https://teknofest.org/en/yarisma-detaylar-10.html) rotary wing competition as a team. Here is personal experience I have gained throughout it.

Before moving on, you can find the target of the competition and the details below, which were supposed to be achieved:
1) Custom-built drone from scratch with all the hardware included
2) Custom-trained computer vision model to process images 
3) Ground station setup
4) Custom-coded gui for the competition to show each data shared by the telemetry
5) All the possible safety checks
6) Judge server and local ground station integration and flawless communication for the data and video transmission and exchange

p.s All of the [specifications](https://www.teknofest.org/upload/diger/Fighter%20UAV%20%20Specifications%20EN01.pdf) can be found by [clicking here](https://www.teknofest.org/upload/diger/Fighter%20UAV%20%20Specifications%20EN01.pdf)

### Target:
By successfully passing all the requirements mentioned above, you are granted access to join the actual competition, which consists of 7 identically ruled parts. There was no team recorded, which could successfully pass all the failsafe checks and also actually detect and follow an opponent yet.


The award table is as following:

|Place|Fixed Wing|Rotary Wing|
|:---:|:---:|:---:|
|1st|250K TRY|50k TRY|
|2nd|150K TRY|40k TRY|
|3rd|100K TRY|30k TRY|


# Used Tech
1) ##### Computer vision

    As it requests in the challenge, you are supposed to detect an opponent (any) and after the first detection you have to trigger the tracker, which is supposed to track and follow that opponent for the next 10 seconds straight. If this task is completed successfully, then you are earning 600 points alongside guaranteeing yourself to be in the top 3 teams. In order to solve this challenge, [YOLO v4](https://arxiv.org/abs/2004.10934) was used. While training a custom model on dozens of thousands of drone data, the model finally achieve to predict in a very high accuracy and exactness. in the meanwhile, for the tracker [CSRT](https://www.scitepress.org/Papers/2020/91838/91838.pdf) was used.

2) ##### Hardware

   For the hardware on the other hand, there are a lot of requirements, some of which are processing the frames, streaming the processed images to the ground station, getting the data of the drone each second and also live-streaming it to the ground station as well, keeping the connection of the device and the flight controller at the same time. in order to handle all the mentioned requirements, [Jetson Xavier NX](https://www.nvidia.com/en-us/autonomous-machines/embedded-systems/jetson-xavier-nx/) was decided to be embedded to the system. Nvidia® Jetson is the world's leading platform for ai at the edge. Its high-performance, low-power computing for deep learning and computer vision makes it the ideal platform for compute-intensive projects.
   
   While having dozens of options for the flight controllers, [Pixhawk Cube 2 Black](https://ardupilot.org/copter/docs/common-thecube-overview.html) was the personal choice due the experience and the reliability that it gives to the user, us in this case. The cube autopilot is a further evolution of the pixhawk autopilot. It is designed for commercial systems and manufacturers who wish to fully integrate an autopilot into their system.
   
   For the rest, basically the motors, esc's and the others over average quality products were in order to minimize the number of the further potential issues regarding hardware.

# Problems
While all the tests being successfully accomplished both on virtual simulations and also F2F before the actual competition started, all the checks were also done accordingly and correctly. However, most of the problems are faced during the competition itself as almost most of them were unexpected.

Hardware:
1) Low quality camera
2) Video transmission
3) Telemetry | receiver
4) 433mhz specific
5) Hardware specific | esc or motors

Software:
1) C++ GUI image processing and streaming | ffmpeg

# Solutions to the problems
1) While at first having really hq fpv camera, which was [Caddx Tarsier](https://www.multirotorguide.com/news/caddx-tarsier-4k-hd-fpv-camera/), due to the first failure in the drone and ground station connection, unfortunately, the biggest damage a drone's fall over 10m's was the loss of the camera completely. While without the camera you can not attend the competition at all, a new camera was in need to be acquired and embedded to the system asap. Multiple previously purchased and owned action cameras were attempted to be used, however, due to the incompatibilities in the system, none of them were really supporting the webcam mode, which left us only 1 option: "the cheapest and for no reason brought years of old webcam".

2) Starting with, a module named as [TS832 & RC832](https://www.banggood.com/Eachine-TS832-Boscam-5_8G-48CH-600mW-7_4-16V-Wireless-Transmitter-W-or-RC832-5_8G-48CH-Wireless-AV-Receiver-for-RC-Drone-p-1079941.html?utm_source=googleshopping&utm_medium=cpc_organic&gmcCountry=GB&utm_content=minha&utm_campaign=minha-gb-en-pc&currency=GBP&cur_warehouse=CN&createTmp=1&utm_source=googleshopping&utm_medium=cpc_bgs&utm_content=sxxx&utm_campaign=sxxx-ssc-gb-euw-all-0113&ad_id=491180619117&gclid=CjwKCAjwndCKBhAkEiwAgSDKQXDZvVTEgixl8iFjvbo8LHha1reGPDfTktTZaydelp6a0ms2xANeXRoCBgEQAvD_BwE) set was used in order to transmit the frames captured over the drone to the ground station, but the quality and the stability was at the lowest in the area due to the frequencies being crashed from the multiple opponents' sources. To resolve this problem, [Rocket m5](https://www.ui.com/airmax/rocketm/) alongside its [Power Beam](https://www.ui.com/airmax/powerbeam/) were purchased. While integration and setup processes were extremely easy, it was also very underrated transmission system imo. As almost having no latency, with the power of the beam, extending the distance of the transmission was as easy as pie.

3) As it was also mentioned by the staffs of the competition that 915mhz transmitter and receiver were banned in usage in the challenge, it left the option of using 433mhz only. But, considering that all the other dozens of competitors are also using the same 433mhz transmitter, you were supposed to get used to the disconnections several times on top. TV channels streaming right next you, multiple Dji drones flying also around you to record content to publish really did crush all of the plans. It was exceedingly hard to connect to our own device and control it. Luckily, usage of 915mhz transmitter were condoned by the staffs later on, so everybody including us were forced to switch to it, which is still completely illegal to use.

4) Lastly, after fixing all of the problems described above, while thinking the device was completely ready to rumble, regrettably, it was not. In the first try to fly the drone fully autonomously in the center of the competition area, 2 of the motors on the same line/side did not move at all while the rest 2 working at the highest speed to take off the drone, with a very high force overturned the drone to the ground and 2 of the propeller were damaged so hard, they were in need to be replaced, however, as the spare propellers were stuck at the customs, we had to resign from the competition. Still the reason of such a catastrophe is undiscovered, and as a team it is still being analyzed through the saved logs.

# Finally
That is pretty much our journey in [Teknofest 2021](https://www.teknofest.org/), which was full of unfortunates. while gaining a ton of experience though, I strongly believe placing first is going to be feasible in the next year.
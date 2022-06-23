---
title: mein kampf - linux
date: 2021-09-03 14:51:46
tags: arch, linux, installation
---

# my fight throughout the `arch` installation

- i will try to explain the issues and problems i have faced while installing arch, so you can avoid them

- firsly, i am guessing your device is pretty much new and the hardware you are using is also overkill. mine is average, you can check them by [clicking here](https://gist.github.com/woosal1337/e0959956b706ef45b748d4e23c3cd868)

- ### well, let the fight begin!

# 1 - iso

- installation process. yep, pretty much the most frustrating part, right? :)) while there are various guides, video tutorials, and such blogs, unfortunately, most of them are outdated as `arch` is being updated quite often making the whole process of installation for the beginners harder every day

- after following a yt [installation guide](https://www.youtube.com/watch?v=a00wbjy2vns) by [LearnLinuxTV](https://www.youtube.com/watch?v=a00wbjy2vns) recommended by [@furkanonder](https://github.com/furkanonder), i have managed to install arch linux successfully. but, wait, was that really that easy? :)))

- followed by a successfully booting up, all of my wifi settings, which i have configured throughout the installation process was gone. unfortunately, did not really also have any ethernet cable to resolve the issue at least temporarily either, which triggered me to find a better and more optimal solution as it is not going to be my last time of arch installation.

"All men can see the tactics whereby I conquer, but
what none can see is the strategy out of which victory
is evolved." - Sun Tzu

- while surfing, i have come up with such an amazing, perfect, and insane version, called as [`archlabs`](https://archlabslinux.com/). this literally made my day. whole `arch` installation with terminal based gui installation? YESSIR!

"So in war, the way is to avoid what is strong and to
strike at what is weak." - Sun Tzu

- the installation of official `arch linux` line-by-line is the `strong` part in this war, which i had to avoid, so i have targeted the `weak`, `archlabs` installation: burned the `.iso` directly to my usb, and installed the system by watching the [video here](https://www.youtube.com/watch?v=pAXGTjKkp4o)

# 2 - boot

- there even was no need to install any `desktop environment` as i have selected `gnome-desktop` while installating `arch` through `archlabs`

- internet connection is stable as well as the desktop environment, both ready to rumble

"Victorious warriors win first and then go to war, 
while defeated warriors go to war first and then seek to win" - Sun Tzu

- making sure the system is updated and secure, so no one can vuln me. the general and required installations, such as `yay` and etc. are also done here

# 3 - nvidia (the boss)

- screen brightness being stuck at 0, no existing software to help you to change it at all, no shortcut commands working...

- no, NO! there supposed to be a way!

"To know your Enemy, you must become your Enemy." - Sun Tzu

- exactly. thinking the way `arch` would think. maybe rebuilding the kernel with custom commands? no. could not even make its way to lighting...

- i needed to penetrate its shield and gain the full access to change the brightness, but how? maybe changing `nvidia` back to `intel graphics`? no. i can not run of the fight that easily. as long as i think i know i will win it! 

- wait, changing the `nvidia` drivers? yes! this should be it. but, which version, how, where?

"Opportunities multiply as they are seized." - Sun Tzu

- download and install your current kernel version regarding `linux-headers`:
  1. `sudo pacman -S linux-headers` # (this will install the latest kernel version according linux-headers)
  2. head over to [https://archive.archlinux.org/packages/l/](https://archive.archlinux.org/packages/l/) and download the corresponding `linux-headers` manually and install it manually by typing `sudo pacman -U linux-header-x.x.x.tar.xz`

- generate the grub file (if you are using `lts` version additionally)
  - `grub-mkconfig -o /boot/grub/grub.cfg`

- before moving further, there is a need for blacklisting `nouveau` driver, which is done as following:
  1. head over to `/etc/modprobe.d/`
  2. open `blacklist.conf` with any editor
  3. add the following lines to the end of `blacklist.conf`
     ```
     blacklist nouveau
     options nouveau modeset=0
     ```

- here it is. besides `470-x` versions of `nvidia`, i had it working on `460-x`, but, but which one exactly? one mistake can destroy my whole plan.

- time to prepare the environment to test each of them.

"Let your plans be dark and impenetrable as night, and when you move, fall like a thunderbolt." - Sun Tzu

- a page regarding all the previous versions of `nvidia` drivers was leaked, time to use it. [click here](https://www.nvidia.com/Download/Find.aspx) to get there!

- this is the way! followings are done in order to complete the setup of attack:
    - `sudo pacman -S linux-headers`

- almost, there! will upgrade the `nvidia` driver version just a step upper, here we are:
    - `sudo ./NVIDIA-Linux-x86_64-460.91.03.run --kernel-source-path=/lib/modules/5.13.13-arch1-1/build`
    - `sudo ./NVIDIA-Linux-x86_64-460.91.03.run --kernel-source-path=/lib/modules/5.13.0-28-generic/build`
    - `sudo reboot`

# victory
    
- not an easy fight at all, hours of effort and research, planning, but as Sun said:

"If you know the enemy and know yourself, you need not to fear the result of a hundred battles."

note: this solution does not work for the linux kernel version 14.x.x and later (check it with `uname -r`).

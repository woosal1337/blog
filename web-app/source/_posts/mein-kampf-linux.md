---
title: Mein Kampf - Arch Linux
date: 2021-09-03 14:51:46
tags: arch, linux, installation
---

# My fight throughout the `arch` installation

- I will try to explain the issues and problems I have faced while installing Arch, so you can avoid them.

- Firstly, I am guessing your device is pretty much new and the hardware you are using is also overkill. mine is average, you can check them by [clicking here](https://gist.github.com/woosal1337/e0959956b706ef45b748d4e23c3cd868).

- ### Well, let the fight begin!

# 1 - .iso

- Installation process. Yep, pretty much the most frustrating part, right? :)) While there are various guides, video tutorials, and such blogs, unfortunately, most of them are outdated as `arch` is being updated quite often making the whole process of installation for the beginners harder every day.

- After following a YouTube [installation guide](https://www.youtube.com/watch?v=a00wbjy2vns) by [LearnLinuxTV](https://www.youtube.com/watch?v=a00wbjy2vns) recommended by [@furkanonder](https://github.com/furkanonder), I have managed to install Arch linux successfully. But, wait, was that really that easy? :)))

- Followed by a successfully booting up, all of my wifi settings, which A have configured throughout the installation process was gone. Unfortunately, did not really also have any ethernet cable to resolve the issue at least temporarily either, which triggered me to find a better and more optimal solution as it is not going to be my last time of arch installation.

"All men can see the tactics whereby I conquer, but
what none can see is the strategy out of which victory
is evolved." - Sun Tzu

- While surfing, I have come up with such an amazing, perfect, and insane version, called as [`Archlabs`](https://archlabslinux.com/). This literally made my day. Whole `arch` installation with terminal based gui installation? YESSIR!

"So in war, the way is to avoid what is strong and to
strike at what is weak." - Sun Tzu

- The installation of official `arch linux` line-by-line is the `strong` part in this war, which I had to avoid, so I have targeted the `weak`, `archlabs` installation: burned the `.iso` directly to my usb, and installed the system by watching the [video here](https://www.youtube.com/watch?v=pAXGTjKkp4o).

# 2 - Boot

- There even was no need to install any `desktop environment` as I have selected `gnome-desktop` while installing `arch` through `archlabs`.

- Internet connection is stable as well as the desktop environment, both ready to rumble.

"Victorious warriors win first and then go to war, 
while defeated warriors go to war first and then seek to win" - Sun Tzu

- Making sure the system is updated and secure, so no one can vuln me. The general and required installations, such as `yay` and etc. are also done here.

# 3 - Nvidia (the boss)

- Screen brightness being stuck at 0, no existing software to help you to change it at all, no shortcut commands working...

"To know your Enemy, you must become your Enemy." - Sun Tzu

- Exactly. thinking the way `arch` would think. Maybe rebuilding the kernel with custom commands? No. Could not even make its way to lighting...

- Maybe changing `nvidia` back to `intel graphics`? No. I can not run of the fight that easily. As long as I think I know I will win it! 

- Wait, changing the `nvidia` drivers? Yes! This should be it. But, which version, how, where?

"Opportunities multiply as they are seized." - Sun Tzu

- Download and install your current kernel version regarding `linux-headers`:
  1. `sudo pacman -S linux-headers` # (this will install the latest kernel version according linux-headers)
  2. Head over to [https://archive.archlinux.org/packages/l/](https://archive.archlinux.org/packages/l/) and download the corresponding `linux-headers` manually and install it manually by typing `sudo pacman -U linux-header-x.x.x.tar.xz`

- Generate the grub file (if you are using `lts` version additionally)
  - `grub-mkconfig -o /boot/grub/grub.cfg`

- Before moving further, there is a need for blacklisting `nouveau` driver, which is done as following:
  1. Head over to `/etc/modprobe.d/`
  2. Open `blacklist.conf` with any editor
  3. Add the following lines to the end of `blacklist.conf`
     ```
     blacklist nouveau
     options nouveau modeset=0
     ```

- Here it is. Besides `470-x` versions of `nvidia`, I had it working on `460-x`, but, but which one exactly? One mistake can destroy my whole plan.

- Time to prepare the environment to test each of them.

"Let your plans be dark and impenetrable as night, and when you move, fall like a thunderbolt." - Sun Tzu

- A page regarding all the previous versions of `nvidia` drivers was leaked, time to use it. [Click here](https://www.nvidia.com/Download/Find.aspx) to get there!

- This is the way! Followings are done in order to complete the setup of attack:
    - `sudo pacman -S linux-headers`

- Almost, there! will upgrade the `nvidia` driver version just a step upper, here we are:
    - `sudo ./NVIDIA-Linux-x86_64-460.91.03.run --kernel-source-path=/lib/modules/5.13.13-arch1-1/build`
    - `sudo ./NVIDIA-Linux-x86_64-460.91.03.run --kernel-source-path=/lib/modules/5.13.0-28-generic/build`
    - `sudo reboot`

# Victory
    
- Not an easy fight at all, hours of effort and research, planning, but as Sun said:

"If you know the enemy and know yourself, you need not to fear the result of a hundred battles."

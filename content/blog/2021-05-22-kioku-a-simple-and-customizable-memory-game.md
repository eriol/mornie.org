+++
date = 2021-05-22 23:51:04+02:00
title = "kioku: a simple and customizable memory game"
[taxonomies]
tags = ["memory", "game", "kivy"]
+++

Unfortunately one of the parents of a friend of mine was diagnosed with
Alzheimer. The good news is that it's still at the first stage so keeping the
brain active will help a lot.

The classic memory game with covered cards can be useful, but I thought that
it could be more pleasant with cards showing something close to affections,
for example photos or drawings of what you care about.

## Welcome kioku

**kioku** (記憶) — it means memory in Japanese — it's a memory game where you
can create your own levels released under the GPL3 license.
I had to make it run also on Android so I used Python with the
[kivy framework](https://kivy.org/) to support both Linux and Android.

Here a screenshot of the game screen on Linux playing a custom level made with
photo of cats[^1]:
![The game screen of kioku on Linux playing a level with cats](https://noa.mornie.org/eriol/kioku/raw/branch/main/extra/screenshot_game_linux.png)

## Code

The code is at [https://noa.mornie.org/eriol/kioku](https://noa.mornie.org/eriol/kioku)
and the README cover already topics like [build and install](https://noa.mornie.org/eriol/kioku#installation),
[level creation](https://noa.mornie.org/eriol/kioku#create-a-new-level) and
[level load](https://noa.mornie.org/eriol/kioku#load-a-level), so I'm not
repeating them here.


[^1]: The used photos are released under Creative Commons licenses, see the details
     [here](https://noa.mornie.org/eriol/kioku#gallery).

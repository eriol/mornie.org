+++
date = 2023-05-21 00:23:40+02:00
title = "A monthly calendar to fight procrastination"
[taxonomies]
tags = ["latex"]
+++

After reading [Taxonomy of procrastination](https://dynomight.net/procrastination/)
by [dynomight](https://dynomight.net/about/) I wanted to try the calendar
technique described in [Let’s consider the standard tricks](https://dynomight.net/procrastination/#lets-consider-the-standard-tricks)
part:

> Put a big calendar on the wall. On days you do the thing, draw a smiley face. On days you fail, write “FAIL”.

I already have a calendar in the room I use most, but it hangs on the wall
opposite my desk and since it's small I barely see it. _Too easy to ignore._

I wanted something really simple to print and I started searching... but I was
not able to find anything that suited my needs.

## LaTeX to the rescue

I decided to write something myself with the following requirements:

1. minimal;
2. must be very easy to generate the calendar for a specific month;
3. fast to build.

(The last point because, well, I'm trying to reduce procrastination!)

With the requirements in mind, LaTeX was my default choice. The code is really
simple and is here: [https://noa.mornie.org/eriol/monthly-calendar](https://noa.mornie.org/eriol/monthly-calendar).

You just need to add a `data.txt` file in the root of the repository with the
desired title and the combination year-month and compile the document.

For example with the following `data.txt`:
```
That nasty thing I want make in May 2023

2023-05
```
you will get:

![Screenshot of the generated calendar using the data file above: title is
on top, days are surrounded by black squares.](https://noa.mornie.org/eriol/monthly-calendar/media/branch/main/screenshot.png)

## But I procrastinated to fight procrastination

Yes... and it's fine for me because the calendar method is working and I'm happy
with the results.

---
date: 2013-11-06T19:55:04+01:00
title: How to load an image from memory in Kivy
tags:
- image
- kivy
- python
---

Sometime you may have the need to load an image already in memory instead of
use one of the several ways [Kivy](http://kivy.org/) provides to load images.

{{< figure src="/media/blog/kivy_memory_image.png" alt="kivy memory image" >}}

I had this need for a project of mine so I came up with the following code (I
was inspired by [this thread](https://groups.google.com/forum/#!topic/kivy-users/l-3FJ2mA3qI)).

```python
#!/usr/bin/env python
# encoding: utf-8

# kivy_memory_image.py
# How to load an image from memory in Kivy
# http://mornie.org/blog/2013/11/06/how-load-image-memory-kivy/

# Copyright (c) 2013, Daniele Tricoli 
# All rights reserved.
#
# License: BSD-3

import StringIO

from matplotlib.backends.backend_agg import FigureCanvasAgg
from matplotlib.figure import Figure
import numpy as np

from kivy.app import App
from kivy.core.image.img_pygame import ImageLoaderPygame
from kivy.properties import ObjectProperty
from kivy.uix.image import Image


def cardioid(start, stop, step):
    """A rotated cardioid."""
    theta = np.arange(start, stop, step)
    r = 1 - np.sin(theta)
    return theta, r


def polar_plot(theta, r, rmax):
    """Draw a polat plot.

    :returns: matplotlib.Figure
    """
    fig = Figure(facecolor='white')
    ax = fig.add_subplot(111, polar=True, frameon=False)
    ax.grid(False)
    ax.set_xticklabels([])
    ax.set_yticklabels([])
    ax.plot(theta, r, color='g', linewidth=2)
    ax.set_rmax(rmax)
    return fig


def fig2png(fig):
    """Convert a matplotlib.Figure to PNG image.

    :returns: PNG image bytes
    """
    data = StringIO.StringIO()
    canvas = FigureCanvasAgg(fig)
    canvas.print_png(data)
    return data.getvalue()


class MemoryImage(Image):
    """Display an image already loaded in memory."""
    memory_data = ObjectProperty(None)

    def __init__(self, memory_data, **kwargs):
        super(MemoryImage, self).__init__(**kwargs)

        self.memory_data = memory_data

    def on_memory_data(self, *args):
        """Load image from memory."""
        data = StringIO.StringIO(self.memory_data)
        with self.canvas:
            self.texture = ImageLoaderPygame(data).texture


class TestApp(App):

    def build(self):
        return MemoryImage(self.options['image'])

if __name__ == '__main__':

    theta, r = cardioid(0, 8.0, 0.01)
    image = fig2png(polar_plot(theta, r, 2.5))
    TestApp(image=image).run()
```

`cardioid`, `polar_plot` and `fig2png` are simply support functions to simulate
an image already loaded in memory. My actual use case is different: I have
images as BLOB inside a SQLite database (just like I described
[years ago](/blog/2007/01/10/storing-binary-data-in-sqlite/)). The real work is
done by `MemoryImage`'s `on_memory_data` method, taking advantage of Kivy
automatic property binding.

You can download the whole example from here:
[kivy_memory_image.py](http://hg.mornie.org/misc/raw-file/tip/blog/kivy_memory_image.py).

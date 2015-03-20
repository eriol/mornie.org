---
date: 2007-04-26T00:34:12+01:00
title: A reminder using GTK shaped window
---

The [GNU/Linux User Group Catania](http://catania.linux.it/) meets the last
thursday of every month. Usually a reminder is sent to mailing list by someone,
but the other day a friend of mine started a «reminder contest».

*I could not miss it! :)*

I wanted something unusual to set the timer, so I decided to use the [Heaviside
step function](https://en.wikipedia.org/wiki/Heaviside_step_function):

```python
def u(t):
    if t < 0: return 0
    else: return 1
```

Obviously not a single unit step! :)

```python
def setTimer(t):
    return u(t) - 0.5 * u(t-TOTAL_HOURS-3) - 0.25 * u(t-TOTAL_HOURS-1)
```

In this manner the reminder is more dynamic: I use the return value to change
the display's frequency.

It's time to write the GUI part!

 > A shaped window is simply a pixmap where the background pixels are
 > transparent.

An image is worth a thousand words.

{{< figure src="/media/blog/preminder.png" alt="preminder 100% screenshot" >}}

Yes, the **pizza** is our window :)

```python
class PReminder:

    def __init__(self):
        self.window = gtk.Window(gtk.WINDOW_POPUP)
        self.window.set_events(
            self.window.get_events() | gtk.gdk.BUTTON_PRESS_MASK)
        self.window.connect("button_press_event", self.hide)

        # [...]
```

Using `gtk.WINDOW_POPUP` makes the window a popup so it will not have a
titlebar. In addiction, the `button_press_event` signal is attached to
`self.hide` callback to hide the reminder:

```python
    def hide(self, *args):
        self.window.hide()
        if self.timerShow:
            gobject.source_remove(self.timerShow)
```

To masks out everything except for the image we have to use
[gtk.gdk.Window.shape_combine_mask](http://www.pygtk.org/docs/pygtk/class-gdkwindow.html#method-gdkwindow--shape-combine-mask):

```python
self.window.shape_combine_mask(self.mask, 0, 0)
```

{{< figure src="/media/blog/preminder2.png" alt="preminder 60% screenshot" >}}

Changing the window itself as the time for the appointment approaches, can be
useful.

```python
    def draw(self):
        w = self.width, self.pangolayout.get_pixel_size()[0]
        offset = (max(w) - min(w)) / 2.

        if self.width < self.pangolayout.get_pixel_size()[0]:
            offset = -offset

        self.mask.draw_rectangle(self.bmgc,
                                True,
                                0, 0,
                                self.pieces * self.pixelpiece,
                                self.height)
        textwidth = self.pangolayout.get_pixel_size()[0]
        self.pixmap.draw_layout(self.bgc,
                                int(offset),
                                int(self.height / 2.),
                                self.pangolayout)
        self.mask.draw_layout(self.wmgc,
                            int(offset),
                            int(self.height / 2.),
                            self.pangolayout)

        self.image = gtk.Image()
        self.image.set_from_pixmap(self.pixmap, self.mask)
        self.image.show()

        self.window.shape_combine_mask(self.mask, 0, 0)
```

We have to change only the mask to obtain the desired effect.

{{< figure src="/media/blog/preminder3.png" alt="preminder 30% screenshot" >}}

Checking for last thursday of every month can be done in few line of code using
[dateutil](http://labix.org/python-dateutil):

```python
    lastThursday = rrule.rrule(rrule.MONTHLY,
                                byweekday=rrule.TH(-1),
                                count=1)[0].date()
```

The complete checking method:

```python
    def check(self):
        today = datetime.today()
        lastThursday = rrule.rrule(rrule.MONTHLY,
                                    byweekday=rrule.TH(-1),
                                    count=1)[0].date()

        if today.date() == lastThursday:
            now = today.time()
            if START_CHECK_HOUR <= now <= FINISH_CHECK_HOUR:
                timerModulator = setTimer(now.hour - START_CHECK_HOUR.hour)
                timer = int(timerModulator * 60 * 60 * 1000)
                self.setText(DIPLAYING_TEXT)
                self.setPiece(now.hour - START_CHECK_HOUR.hour)

                self.show()
                self.timerShow = gobject.timeout_add(AUTO_HIDE_AFTER * 1000,
                                                        self.hide)
        else:
            timer = CHECK_TIMER * 1000

        self.timerID = gobject.timeout_add(timer, self.check)
```

You can download the complete source code here:
[preminder-0.1.zip](/media/blog/preminder-0.1.zip).

---
date: 2015-03-20T21:29:18+01:00
title: Playing with ctypes and libcaca
---

[ctypes](http://docs.python.org/dev/lib/module-ctypes.html) is a foreign
function interface for Python. It allows to call functions in dlls/shared
libraries and access and manipulate C data types in Python: you can use it to
wrap libraries in pure Python. It is included in Python 2.5 standard library.

I want to code a funny example using it, so I will show how to make a snake
game using libcaca.

[libcaca](http://libcaca.zoy.org/) is an ascii art library like 
[AAlib](http://aa-project.sourceforge.net/aalib/), but it has some cool
features:

 * Unicode support;
 * 2048 colours;
 * dithering of colour images;
 * advanced text canvas operations (blitting, rotations).

{{< figure src="/media/blog/snake.py.png" alt="snake.py screenshot" >}}

**Update 2009/10/11:** libcaca API changed so this entry in now obsolete but
snake.py example works: you can read the source to get in touch with the new
API.

First of all we have to load libcaca, I use Linux so I will call `libcaca.so.0`:

```python
import ctypes as C

lcaca = C.cdll.LoadLibrary('libcaca.so.0')
```

Now you can access libcaca's functions from Python. :)

Create canvas and display for our snake is very easy:

```python
cv = lcaca.cucul_create_canvas(CANVAS_WIDTH, CANVAS_HEIGHT)
dp = lcaca.caca_create_display(cv)
lcaca.caca_set_display_title(dp, "snake.py - playing with ctypes and libcaca")
```

To get events from keyboard call [caca_get_event](http://caca.zoy.org/manual/group__caca__event.html#g98e74dedbe1629c0fc9460761696e050):

```python
lcaca.caca_get_event(dp, 0x0001, C.byref(event), 0)
```

Where `event` is a [caca_event](http://libcaca.zoy.org/manual/structcaca__event.html)
structure. We need it because if not null, it will be filled with information
about the event received.

How define `event`? Simply like that:

```python
class MOUSE(C.Structure):
    _fields_ = [('x', C.c_uint),
                ('y', C.c_uint),
                ('button', C.c_uint)]

class RESIZE(C.Structure):
    _fields_ = [('w', C.c_uint),
                ('h', C.c_uint)]

class KEY(C.Structure):
    _fields_ = [('ch', C.c_uint),
                ('utf32', C.c_ulong),
                ('utf8', C.c_char_p * 8)]

class ev(C.Union):
    _fields_ = [('type', C.c_uint),
                ('mouse', MOUSE),
                ('resize', RESIZE),
                ('key', KEY)]

event = ev()
```

Now we can code the snake class:

```python
class Snake(object):

    def __init__(self, center_point, length):

        self.head = center_point
        self.body = []

        for y in xrange(self.head[1] + 1, self.head[1] + length + 1):
            self.body.append((self.head[0], y))

    def move(self, direction):

        phead = tuple(self.head)

        if direction == 'UP':
            self.head[1] -=1
        elif direction == 'DOWN':
            self.head[1] +=1
        elif direction == 'LEFT':
            self.head[0] -=1
        elif direction == 'RIGHT':
            self.head[0] +=1

        self.body = [phead] + self.body[:-1]

    def grow(self):
        self.body += [tuple(self.head)] * 2

    def draw(self):
        global cv
        lcaca.cucul_set_color_ansi(cv, 0x05, 0x00)

        for p in self.body:
            lcaca.cucul_put_char(cv, p[0], p[1], ord('o'))
        lcaca.cucul_set_color_ansi(cv, 0x02, 0x00)
        lcaca.cucul_put_char(cv, self.head[0], self.head[1], ord('@'))
        lcaca.caca_refresh_display(dp)
```

And the target class:

```python
class Target(object):

    def __init__(self):
        self.total = 0

    def random(self, width, height):
        self.x = int(random.uniform(1, width))
        self.y = int(random.uniform(1, height))
        self.value = random.choice(range(1,10))

    def sum(self):
        self.total += self.value

    def draw(self):
        global cv
        lcaca.cucul_set_color_ansi(cv, 0x03, 0x00)
        lcaca.cucul_put_char(cv, self.x, self.y, ord(str(self.value)))
        lcaca.caca_refresh_display(dp)
```

We are ready for the mainloop! ;)

```python
while True:
    while lcaca.caca_get_event(dp, 0x0001, C.byref(event), 0):
        if event.key.utf32 == 113: # 'q' pressed
            sys.exit()
        elif event.key.utf32 == UP:
            d = 'UP'
        elif event.key.utf32 == DOWN:
            d = 'DOWN'
        elif event.key.utf32 == LEFT:
            d = 'LEFT'
        elif event.key.utf32 == RIGHT:
            d = 'RIGHT'

    try:
        s.move(d)
    except NameError:
        pass

    if (tuple(s.head) in s.body[1:] or
        not 0 < s.head[0] < CANVAS_WIDTH - 1 or
        not 0 < s.head[1] < CANVAS_HEIGHT - 1):
        print 'Game Over!'
        print 'Total score:', t.total
        sys.exit()
    elif tuple(s.head) == (t.x, t.y):
        t.sum()
        t.random(CANVAS_WIDTH - 2, CANVAS_HEIGHT - 2)
        s.grow()

    lcaca.cucul_clear_canvas(cv)
    draw_border()
    s.draw()
    t.draw()
    time.sleep(0.1)
```

The complete example is here: [snake.py](http://hg.mornie.org/misc/file/tip/snake.py).

**Update 2007/10/20:** [Sam Hocevar](http://sam.zoy.org/) pointed me about
importance of checking caca_get_event's return value, otherwise from time to
time invalid keys are read. Thank you, Sam!

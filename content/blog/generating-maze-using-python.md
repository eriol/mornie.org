+++
date = 2007-08-02T03:11:49+01:00
title = "Generating Maze using Python"
aliases = [
    "blog/2007/08/02/Generating-Maze-using-Python",
    "blog/2007/08/02/generating-maze-using-python"
]
[taxonomies]
tags = ["python"]
+++

Do you like mazes?

```
eriol@mornie:~$ python maze.py
+--+--+--+--+--+--+--+--+--+--+
|  |           |        |     |
+  +  +  +--+  +  +--+  +  +  +
|  |  |  |     |     |     |  |
+  +  +  +--+--+--+  +--+--+  +
|  |  |     |        |     |  |
+  +  +--+  +  +--+--+  +  +  +
|  |  |  |              |  |  |
+  +  +  +--+--+--+--+--+--+  +
|  |     |     |              |
+  +--+--+  +  +  +--+--+--+  +
|           |     |           |
+--+--+--+--+--+--+--+--+--+--+
```

After reading this [good][mazeworks] article, I decided to wrote some code to
generate perfect maze. :D

The result is here:
[maze.py](https://noa.mornie.org/eriol/misc/src/branch/main/maze.py).

As you can see, [Depth-First Search](https://en.wikipedia.org/wiki/Depth-first_search)
is not a complex algorithm:

```python
def create(self):
    cell_stack = []
    while self.visited_cells < self.total_cells:
        neighbors = self.find_neighbors_with_walls(self.current_cell)
        if neighbors:
            new_cell = random.choice(neighbors)
            self.current_cell.destroy_wall(cell=new_cell)
            cell_stack.append(self.current_cell)
            self.current_cell = new_cell
            self.visited_cells += 1
        else:
            self.current_cell = cell_stack.pop()
```

[mazeworks]: https://web.archive.org/web/20071212193445/http://www.mazeworks.com/mazegen/mazetut/

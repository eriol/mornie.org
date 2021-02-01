+++
date = 2007-01-10T16:06:10+01:00
title = "Storing binary data in SQLite"
aliases = [
    "blog/2007/01/10/Storing-binary-data-in-SQLite",
    "blog/2007/01/10/storing-binary-data-in-sqlite"
]
[taxonomies]
tags = ["python"]
+++

Storing images into a database is not common, usually you store only the file
name, but sometimes it can be useful. Think you must log the position of several
objects on a map. You can store the map and the logs in different files, but if
your users have to share map and logs and they are not geek people, it can be a
serious problem.

Remember that, of course, store files into a database makes the storage space
more expensive. However, if you have to store one or few files it's not a big
problem. :-)

Consider the following database schema:

```sql
CREATE TABLE map (
    name varchar(20) NOT NULL PRIMARY KEY,
    image_file blob NOT NULL
);
    
CREATE TABLE logs (
    -- <your logs schema here>
);
```

Let's start to code:

```python
import Image
import StringIO
from pysqlite2 import dbapi2 as sqlite
```

Storing an image into the database is very simple:

```python
def storeInDatabase(cur, image_name, data):

    cur.execute("INSERT INTO map (name, image_file) values (?, ?)",
                (image_name, sqlite.Binary(data))
    )
    con.commit()
```

N.B. As said by [Fredrik Lundh](http://effbot.org/zone/sqlite-blob.htm), SQLite
<3.0 has a limitation of 1 MB for each row of data, and the database uses NUL
bytes to separate columns in the storage.

Retrieve the previously image stored is simple too:

```python
def retrieveFromDatabase(cur, image):

    cur.execute("SELECT image_file FROM map WHERE name = ?", (image,))
    img = cur.fetchone()[0]
    return StringIO.StringIO(img)
```

I use StringIO.StringIO because `cur.fetchone()[0]` returns a buffer-object and
I want a file-object instead. ;)

You can test with:

```python
if __name__ == '__main__':

    IMAGE = 'Surf.jpg'

    i = open(IMAGE, 'rb')
    idata = i.read()
    i.close()

    con = sqlite.connect('blob.db')
    cur = con.cursor()

    try:
        storeInDatabase(cur, image_name=IMAGE, data=idata)
    except sqlite.IntegrityError:
        print 'You have stored this map already'

    img = retrieveFromDatabase(cur, IMAGE)

    cur.close()

    Image.open(img).show()
```

The whole exampleis here: [blobexample.py](/media/blog/blobexample.py).

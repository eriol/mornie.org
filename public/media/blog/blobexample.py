#!/usr/bin/env python
# blobexample.py

# Storing an image into SQLite
# http://mornie.org/blog/2007/01/10/Storing-binary-data-in-SQLite/
# by Eriol (@mornie.org)

import Image
import StringIO
from pysqlite2 import dbapi2 as sqlite

def storeInDatabase(cur, image_name, data):

    cur.execute("INSERT INTO map (name, image_file) values (?, ?) ",
                (image_name, sqlite.Binary(data))
               )
    con.commit()

def retrieveFromDatabase(cur, image):

    cur.execute("SELECT image_file FROM map WHERE name = ?", (image,))
    img = cur.fetchone()[0]
    print type(img)
    return StringIO.StringIO(img)

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

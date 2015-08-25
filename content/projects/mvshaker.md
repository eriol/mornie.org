---
date: 2015-08-24T01:54:35+02:00
title: mvshaker
project_description: File shaker for the Masses
---


`mvshaker` swaps randomly your files.

<script type="text/javascript" src="https://asciinema.org/a/9gf89grw31j8z8jvymoyfqvhl.js" id="asciicast-9gf89grw31j8z8jvymoyfqvhl" async></script>

It was created to remember Warsaw's Second Law: "Never change anything after
3pm on a Friday."
See http://barry.warsaw.us/software/laws.html for more details.

Directories are silently ignored and files can be excluded using `--exclude`
flag (short version `-e`).

## Installation ##

To build `mvshaker` and install it to `$GOPATH/bin/mvshaker`you need a working
Go compiler:

    % go get eriol.xyz/mvshaker

## Code repository ##

`mvshaker`'s repository is located at https://github.com/eriol/mvshaker.

Feel free to mail me to report bugs or request features or use
https://github.com/eriol/mvshaker/issues.

## Examples ##

    # mvshaker /bin/* --exclude bash

`--exclude` flag has a compact vesion (`-e`) useful when you want exclude
multiple files:

    # mvshaker /bin/* -e bash -e ls

## License ##

`mvshaker` is released under the BSD 3-Clause license. See
[LICENSE](https://github.com/eriol/mvshaker/blob/master/LICENSE).

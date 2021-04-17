+++
date = 2021-04-17 02:18:05+02:00
title = "Use a custom template for rst2html with gitea"
[taxonomies]
tags = ["gitea", "restructuredtext"]
+++

The other day I noticed that on my self hosted instance of
[gitea](https://noa.mornie.org) reStructuredText files was not properly
rendered: `<html>` and '</html>' tags were popping out to the rendered text.

To solve the issue I decided to write a custom template for `rst2html` to get
only the body part:

```
%(body_pre_docinfo)s
%(docinfo)s
%(body)s
```

Then I just updated my gitea's `app.ini` section related to reStructuredText:

```ini
[markup.restructuredtext]
ENABLED         = true
FILE_EXTENSIONS = .rst
RENDER_COMMAND  = "rst2html.py --template=/usr/share/docutils/writers/htmlbody/template.txt"
IS_INPUT_FILE   = false
```

where `/usr/share/docutils/writers/htmlbody/template.txt` is the absolute path
of the custom template showed above.

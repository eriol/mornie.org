---
date: 2012-12-22T16:22:54+01:00
title: How to fix CKEditor 4 default theme in Django admin
tags:
- admin
- ckeditor4
- django
- python
---

[CKEditor](http://ckeditor.com/) 4 default theme, [Moono](http://ckeditor.com/addon/moono),
is very nice and has a good set of features:

 * neutral design that fits all situations;
 * optimized for accessibility, using [WAI-ARIA](https://en.wikipedia.org/wiki/WAI-ARIA)
   standards for contrast;
 * supports the UI color feature;
 * supports High Contrast.

But inside Django admin there is a little layout problem:

{{< figure src="/media/blog/moono-without-fix.png" alt="moono without fix" >}}

To fix this issue you may use the following css snippet:

```css
div>.cke_chrome {
    width: 100%;
    padding: 0!important;
    clear: both;
}
```

The result is this:


{{< figure src="/media/blog/moono-with-fix.png" alt="moono with fix" >}}

+++
date = 2015-04-01T02:24:16+02:00
title = "From Django to Hugo"
aliases = ["blog/2015/04/01/from-django-to-hugo"]
[taxonomies]
tags = ["django", "git", "hugo", "mercurial"]
+++

About eight years ago I [wrote my own blog](@/blog/my-blog-django.md)
(and my website) using [Django](http://www.djangoproject.com/). It was time to
change so I completely rewrote it with [Hugo](http://gohugo.io/), a static
website engine made by [spf13](http://spf13.com).

## Why going static?

I use this site mainly to write about stuff I think interesting and when I have
to write I want to use [Vim](http://www.vim.org/). So while Django is a
wonderful framework, it was not the right choice for this site. In fact, I wrote
less and less...

I know, I could use [Django REST framework](http://www.django-rest-framework.org/)
with a Vim plugin, but a markdown file for each post is easier! :)

You can find the code of the site on [GitHub](https://github.com/eriol/mornie.org)
and [GitLab](https://gitlab.com/eriol/mornie.org).

## Git?

It's clear by now who won the DVCS war, so I started to use git and I will
migrate my repositories soon (I already started the migration). My plan is to
keep my code both on [Bitbucket](https://bitbucket.org/eriol),
[GitHub](https://github.com/eriol) and [GitLab](https://gitlab.com/u/eriol):
since git is distributed, I will use it in the proper way.

## Still a Work In Progress

No, this site is not completed yet, even an about page is missing! I
will add more content on my spare time, so stay tuned! :)

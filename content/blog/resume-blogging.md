+++
date = 2021-02-08 00:39:38+01:00
title = "Resume blogging"
[taxonomies]
tags = ["blogging", "blog-engine", "zola", "hugo", "git"]
+++

Almost [five years ago](@/blog/from-django-to-hugo.md) was the last time I wrote
something here. If I look back I can identify several reasons, but astonishingly
the main cause was about me thinking about the need to write always something
useful.

Then I was lucky to read this inspiring post by Jeremy Friesen:
[Happy 10th Birthday Take on Rules]. I suggest you to read the whole post, but
I want to quote a couple of phrases that impressed me more:

> I don’t keep a schedule, nor publish at peak hours. Instead, I release what I write when I’m done with it.
>
> [...]
>
> So I ripped out the analytics, and chose to write according to my current mood and interests.

As I wrote on the fediverse:

> I never used a proper tool for analytics, but I had the idea that one have
> to write something useful for others, but now, as you
> say, I will just «write according to my current mood and interests».
> *I will always try to write something useful, but it won't be the goal.*

This will be the new commitment, so a sort of no commitment at all.
I was already working on the site itself, but without the words of Jeremy
Friesen and also the words of support of [Alex
Schroeder](https://alexschroeder.ch/) this post would come later.

I want to thanks both of them!

## From Hugo to Zola

If you are wondering why I switched, I'm sorry to disappoint you: no, it's not
a matter of rust vs go. In fact at first, around a week ago, when I moved this
site to a new VM I was still using [hugo](https://gohugo.io/).

Then I wanted to change the style of the site and no, I really dislike the
templating part of hugo. Please read carefully the following words:
*it's me that doesn't like it*. If you enjoy it, I'm happy for you! I still
wanted to use a fast generator so I looked at what rust had to offer.
[Zola](https://www.getzola.org/) seemed the most complete so I tried it and I
was happy with the result. The switch was extremely simple and fast I must
confess.
Zola doesn't have a command to create new content, but I don't miss it.
I simply added the following snippet to my vim configuration:
```
snippet zolan "Create a new zola entry" b
+++
draft = true
date = `date --rfc-3339=seconds`
title = "$1"
[taxonomies]
tags = ["$2"]
+++
$0
endsnippet
```

## Automate all the things

To reduce the friction on my blogging workflow (but also because it was fun to
setup) I'm using a self hosted instance of the CI/CD service called
[drone](https://www.drone.io/). This means that to publish this post, I only
need my editor and git.

But I will talk about it another time.

[Happy 10th Birthday Take on Rules]: https://takeonrules.com/2021/02/02/happy-10th-birthday-take-on-rules/

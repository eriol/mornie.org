---
date: 2026-06-07 18:42:37+02:00
title: "Moving this blog again"
tags: ["blogging", "blog-engine", "zola", "astro", "git"]
---

[I migrated again](/blog/resume-blogging/) to a new stack for this blog. Now
this blog is powered by [Astro](https://astro.build/) used as SSG and, as
before, there is no JavaScript on the client side.

## Why another migration

I have not written much here, as you may have noticed, and something that could
help is the math support. [Discussions about Zola math support](https://zola.discourse.group/t/use-mathematical-formula-with-zola/308)
go back to 2020 and still there is no support for it. Also Zola started using
LLMs in its development process so I felt less attached to it (I know that Astro
uses LLMs too).

KaTeX support in Astro was a matter of adding `rehype-katex` and `remark-math`
to the dependencies... so it won.

And now I can tell you, for example, that in a Petri Net an integer vector
$X >= 0$ of dimension $m$ equal to the number of places is a P-invariant if

$$
X^T C = 0
$$

where $C$ is the matrix of the net.

Maybe you don't care, but this is the stuff I'm looking at right now and it's
easier for me to write about what I'm doing.

## So many changes

Since I wrote so little, a lot has changed in the meantime, for example, I'm not
using Vim anymore I switched to... Neovim!

For snippets I'm using [LuaSnip](https://github.com/L3MON4D3/LuaSnip) and I had
to update my snippet as follows:

```lua
markdown = {
    s({ trig = "astronew", dscr = "Create a new astro entry" }, {
        t({ "---", "draft: true" }),
        t({ "", "date: " }),
        f(date_rfc3339, {}, {}),
        t({ "", 'title: "' }),
        i(1),
        t '"',
        t({ "", 'tags: ["' }),
        i(2),
        t '"]',
        t({ "", "---", "" }),
        i(0),
    }),
},
```

Hopefully I will write more... time will tell.

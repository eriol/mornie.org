+++
date = 2021-04-27 17:09:07+02:00
title = "Gitea with pandoc"
[taxonomies]
tags = ["gitea", "restructuredtext"]
+++

Some days ago I wrote about [using rst2html with gitea](@/blog/2021-04-17-use-a-custom-template-for-rst2html-with-gitea.md).
Unfortunately I noticed that HTML anchors were broken and other nuisances.
A friend of mine (thanks tosky!) told me that they are using
[pandoc](https://pandoc.org/) on the [opendev](https://opendev.org/)'s gitea
instance, so I did the same in my custom docker/podman image:

```dockerfile
FROM alpine:3.13 as builder

ENV PANDOC_VERSION 2.13
ENV PANDOC_TARBALL_SHA256SUM 7404aa88a6eb9fbb99d9803b80170a3a546f51959230cc529c66a2ce6b950d4c

RUN apk --no-cache add tar

WORKDIR /opt

ADD https://github.com/jgm/pandoc/releases/download/${PANDOC_VERSION}/pandoc-${PANDOC_VERSION}-linux-amd64.tar.gz pandoc.tar.gz

RUN sha256sum pandoc.tar.gz | grep -q ${PANDOC_TARBALL_SHA256SUM} && \
    tar xvzf pandoc.tar.gz --strip-components 1

FROM gitea/gitea:1.14.1

COPY --from=builder /opt/bin/pandoc /usr/local/bin/pandoc

EXPOSE 3000
```

My gitea's `app.ini` section related to reStructuredText is now:
```ini
[markup.restructuredtext]
ENABLED         = true
FILE_EXTENSIONS = .rst
RENDER_COMMAND  = "/usr/local/bin/pandoc -f rst"
IS_INPUT_FILE   = false
```


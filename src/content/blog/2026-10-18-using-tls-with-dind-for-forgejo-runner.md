---
date: 2026-10-18 19:29:24+02:00
title: "Using TLS with dind for Forgejo Runner"
tags: [""]
---

Some time ago I deployed a Forgejo runner on a different machine from the one
hosting [my personal forge](https://noa.mornie.org) using the
[Docker-in-Docker](https://github.com/jpetazzo/dind) approach.
I just followed the [official documentation](https://forgejo.org/docs/latest/admin/actions/installation/docker/#docker-compose), nothing more.

Today I had some time to work on the configuration and I switched
Docker-in-Docker to TLS so that only the runner is able to use it:
Docker-in-Docker now accepts a connection only if the client
presents a certificate signed by Docker-in-Docker's own CA.

I changed the docker compose file as follows:

```yaml
services:
  docker-in-docker:
    image: docker:29-dind
    container_name: 'docker_dind'
    privileged: true
    environment:
      DOCKER_TLS_CERTDIR: /certs
      DOCKER_TLS_SAN: DNS:docker-in-docker
    volumes:
      - dind-certs-ca:/certs/ca
      - dind-certs-client:/certs/client
    restart: 'unless-stopped'

  runner:
    image: 'data.forgejo.org/forgejo/runner:13'
    links:
      - docker-in-docker
    depends_on:
      docker-in-docker:
        condition: service_started
    container_name: 'runner'
    environment:
      DOCKER_HOST: tcp://docker-in-docker:2376
      DOCKER_TLS_VERIFY: '1'
      DOCKER_CERT_PATH: /certs/client
    user: 1002:1002
    volumes:
      - ./data:/data
      - dind-certs-client:/certs/client:ro
    restart: 'unless-stopped'

    command: '/bin/sh -c "sleep 5; forgejo-runner daemon --config /data/config.yml"'

volumes:
  dind-certs-ca:
  dind-certs-client:
```

In the future, I want to migrate to [Incus](https://linuxcontainers.org/incus/)
VMs instead of Docker-in-Docker, but for now this setup is fine since I'm the
only user.

+++
draft = true
date = 2022-08-30 06:23:43+02:00
title = "Using headscale for your home networks"
[taxonomies]
tags = ["homelab", "tailscale", "headscale", "vpn"]
+++

[Tailscale](https://tailscale.com/) is a software defined mesh virtual private
network (VPN) on top of [WireGuard](https://www.wireguard.com/).
It's all open source except the control server (and GUI clients for proprietary
OS).

I don't care about GUI clients but the control server manages key distribution
and I don't like to have an external entity with all this power on my machines.

## headscale to the rescue

[headscale](https://github.com/juanfont/headscale) is an open source,
self-hosted implementation of the Tailscale control server.
I deployed it writing and then using
[this ansible role](https://noa.mornie.org/eriol/ansible-collection-kit/src/branch/main/roles/headscale)
with Nginx as [reverse proxy](https://github.com/juanfont/headscale/wiki/nginx-configuration).

I have something like this:

```yaml
- hosts: my-server
  vars:
    headscale_base_domain: headscale.example.org
    headscale_listen_addr: 127.0.0.1:8080
  roles:
    - eriol.kit.headscale
```

If you want install my ansible collection you can follow the instructions
provided [here](https://noa.mornie.org/eriol/ansible-collection-kit#installation).

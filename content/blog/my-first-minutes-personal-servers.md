+++
date = 2021-02-13 16:21:45+01:00
title = "My first minutes on personal servers"
[taxonomies]
tags = ["ansible", "automation", "sysadmin"]
+++

Almost a year ago I decided to migrate to a new VPS provider but I wanted to
reduce the effort required to setup and maintain it.

I started to learn and use ansible and I developed a personal [collection of
roles](https://noa.mornie.org/eriol/ansible-collection-kit). Since ansible 2.10
you don't need to use [Ansible Galaxy](https://galaxy.ansible.com/), you can
just install it from git: this is great because I'm trying to stop using
services that can't be self-hosted and Ansible Galaxy need a Github account to
login.

To install my collection I just add the following stanza into
`requirements.yml`:

```yaml
---
collections:
  - name: https://noa.mornie.org/eriol/ansible-collection-kit
    type: git
    version: 0.2.5
```

and then:

```shell
ansible-galaxy collection install -f -r requirements.yml
```

I use the `-f` to handle the upgrade of the collection since it's easier to
just recall the command from history, but from ansible-base 2.11 [it will not
be required anymore](https://github.com/ansible/ansible/issues/65699).

## Security is hard

A little but **important** digression before continuing. I used the word
**personal** on purpose on the title of this post. It's not to say that on a
personal server/service you can have a lower standard regarding security.
It's to say that security is built around the applications that the system
support and context. For example, on my personal VPS I'm the **only** user.
This is a **huge** assumption and simplify a lot of things like accountability.

Keep in mind this if you want to use my collection.

## How I bootstrap a new server

I have the following playbook `server-bootstrap.yml` with the common part:

```yaml
---
- name: bootstrap operations for a new server
  hosts: "{{ hostlist | default('bootstrapable') }}"
  roles:
    - eriol.kit.common
    - eriol.kit.hostname
    - eriol.kit.admin
    - {role: eriol.kit.nftables, when: not is_docker_used}
    - {role: eriol.kit.iptables, when: is_docker_used}
    - eriol.kit.sshd
    - eriol.kit.fail2ban
```

I keep all the servers in a `bootstrapable` group so I can just execute
`server-bootstrap.yml` playbook, but if I want a specific playbook for a server
I do:

```yaml
---
- name: import the common server part
  vars:
    hostlist: example.org
  import_playbook: server-bootstrap.yml

- name: stuff for example.org
  hosts: example.org
  roles:
    - # YOUR ROLES HERE
```

This way I don't have to write down the common part. All the variables are
inside the inventory split between groups variables and specific hosts
variables to make the playbooks generic.

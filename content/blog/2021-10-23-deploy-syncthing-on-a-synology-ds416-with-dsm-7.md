+++
date = 2021-10-23 01:44:05+02:00
title = "Deploy Syncthing on a Synology DS416 with DSM 7"
[taxonomies]
tags = ["nas"]
+++

After updating my NAS, a Synology DS416, to DSM 7 I decided to deploy
[Syncthing](https://syncthing.net/) on it. Synology supports containers in its
latest NAS but not in DS416 and the suggested way to deploy is to use docker.

There is an alternative fortunately since the NAS uses an 
`ARMv7 Processor rev 4 (v7l)` and Syncthing is written in Go, it's
really easy to cross-compile from source and just copy the binary into the NAS.

If you don't want to compile it you will find binaries here:
[https://syncthing.net/downloads/](https://syncthing.net/downloads/).
Download the ARM binary and you are ready to go.

In the NAS I created a dedicated user for syncthing, copied the binary on a
specific path and, since DSM 7 uses systemd, I added the following unit inside
`/etc/systemd/system`:

```
[Unit]
Description=Syncthing continuous file synchronization
After=network.target

[Service]
User=<the user you created for syncthing>
ExecStart=/path/to/syncthing serve --no-browser --no-restart --logflags=0
Restart=on-failure
RestartSec=1
SuccessExitStatus=3 4
RestartForceExitStatus=3 4

[Install]
WantedBy=multi-user.target
```

Please mind to substitute `<the user you created for syncthing>` with the actual
user you created and `/path/to/syncthing` with the actual path syncthing is in.

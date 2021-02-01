+++
date = "2006-12-28T03:06:00+01:00"
title = "Libero SMTP pain :("
aliases = ["blog/2006/12/28/libero-smtp-pain"]
+++

Since few days the SMTP server of my [ISP](http://internet.libero.it/) has
problems. When I post in several mailing lists I get this message: RCPT address
has non-existant domain. So now I'm using exim4 from my laptop when I get that
error, but I hope to get a VPS soon to solve the problem's root. ;)

**Update:** The SMTP of my provider sends only if it finds a MX record in the 
addressee's domain. I searched a little and I discovered that
[RFC 974](http://www.ietf.org/rfc/rfc974.txt) says:

 > It is possible that the list of MXs in the response to the query will be
 > empty. This is a special case. If the list is empty, mailers should treat
 > it as if it contained one RR, an MX RR with a preference value of 0, and a
 > host name of REMOTE. (I.e., REMOTE is its only MX). In addition, the mailer
 > should do no further processing on the list, but should attempt to deliver
 > the message to REMOTE. The idea here is that if a domain fails to advertise
 > any information about a particular name we will give it the benefit of the
 > doubt and attempt delivery.

So I hope to get, as soon as possible, a VPS to setup and use a SMTP server
that follows the RFC!

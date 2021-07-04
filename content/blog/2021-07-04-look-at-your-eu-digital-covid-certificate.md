+++
date = 2021-07-04 21:36:14+02:00
title = "Look at your EU Digital COVID Certificate"
[taxonomies]
tags = ["covid", "decoder"]
+++

I wanted to look at my EU Digital COVID Certificate[^1] that just arrived the
other day, so after looking at the
[specification](https://github.com/ehn-dcc-development/hcert-spec) I wrote a
simple decoder that ignore the signing part (I was only interested to look at
the data itself) and print the relevant data.

## Code

The code is at [https://noa.mornie.org/eriol/eudccdec](https://noa.mornie.org/eriol/eudccdec)
and is licensed under the GPLv3 license. Since it's written in 
[rust](https://www.rust-lang.org/) you can install `cargo`, and then:

```
cargo install --branch main --git https://noa.mornie.org/eriol/eudccdec
```

## Usage

Using the Italian test data, `curl` and `zbarimg`[^2]:

```
curl -sL https://github.com/eu-digital-green-certificates/dgc-testdata/raw/main/IT/png/1.png | \
  zbarimg --quiet --raw - | eudccdec
```

you will get:

```
Certificate {
    ver: "1.0.0",
    nam: Name {
        fn_: "Di Caprio",
        fnt: "DI<CAPRIO",
        gn: "Marilù Teresa",
        gnt: "MARILU<TERESA",
    },
    dob: "1977-06-16",
    v: [
        VaccineRecord {
            tg: "840539006",
            vp: "1119349007",
            mp: "EU/1/20/1528",
            ma: "ORG-100030215",
            dn: 2,
            sd: 2,
            dt: "2021-04-10",
            co: "IT",
            is: "IT",
            ci: "01ITE7300E1AB2A84C719004F103DCB1F70A#6",
        },
    ],
    r: [],
    t: [],
}
```

To know what the fields mean look at the JSON schema specifications for EU
Digital COVID Certificates available
[here](https://ec.europa.eu/health/sites/default/files/ehealth/docs/covid-certificate_json_specification_en.pdf).

[^1]: They are called also Green Pass.

[^2]: On a Debian based system use `sudo apt install curl zbar-tools` to install
  them.

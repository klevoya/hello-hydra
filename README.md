# hello-hydra

[![N|Solid](https://cldup.com/dTxpPi9lDf.thumb.png)](https://nodesource.com/products/nsolid)

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

Hydra is an EOSIO smart contract testing framework that allows you to quickly get started with testing your smart contract code. Besides Hydra, installing additional software or running your own local blockchain node is not required. 

# New Features!

  - Import a HTML file and watch it magically convert to Markdown

You can also:
  - Import and save files from GitHub, Dropbox, Google Drive and One Drive

### Tech

Hydra uses a number of open source projects to work properly:

* [Jest] - a delightful javascript testing framework maintained by facebook with a focus on simplicity

### Installation

Hydra requires [Node.js](https://nodejs.org/) v10.16.0 to run.

Install the dependencies and devDependencies and sign up or login with your existing Github or Google account

```sh
$ git clone https://github.com/klevoya/hello-hydra.git
$ cd hello-hydra/
$ sudo chmod +x setup.sh
$ sudo bash ./setup.sh
```
After logging into Hydra successfully...
To install Hydra's dependencies run:

```bash
npm install
```
After installing the dependencies, the example eosio.token contract can be tested with [Hydra](docs.klevoya.com/hydra).

To execute the tests in tests/token.test.js run:

```bash
npm test
```

### Development

Want to contribute? Great!

Navigate over to Hydra's repo and make a [pull request.](https://github.com/klevoya/hello-hydra/compare?expand=1)

License
----

MIT

**Free Software by Klevoya**

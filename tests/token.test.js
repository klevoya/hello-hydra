const { loadConfig, Blockchain } = require("@klevoya/hydra");

const config = loadConfig("hydra.yml");

describe("token", () => {
  let blockchain = new Blockchain(config);
  let tester = blockchain.createAccount(`token`);
  let user1 = blockchain.createAccount(`user1`);
  let user2 = blockchain.createAccount(`user2`);

  beforeAll(async () => {
    tester.setContract(blockchain.contractTemplates[`token`]);
    tester.updateAuth(`active`, `owner`, {
      accounts: [
        {
          permission: {
            actor: tester.accountName,
            permission: `eosio.code`,
          },
          weight: 1,
        },
      ],
    });
  });

  it("can create and issue tokens", async () => {
    expect.assertions(2);

    await tester.contract.create({
      issuer: user1.accountName,
      maximum_supply: "1000.0000 EOS",
    });
    expect(tester.getTableRowsScoped(`stat`)[`EOS`]).toEqual([
      {
        issuer: `user1`,
        max_supply: "1000.0000 EOS",
        supply: "0.0000 EOS",
      },
    ]);

    await tester.contract.issue(
      {
        to: user1.accountName,
        quantity: "10.0000 EOS",
        memo: `issuing some tokens for user1`,
      },
      [{ actor: user1.accountName, permission: `active` }]
    );
    expect(tester.getTableRowsScoped(`accounts`)[user1.accountName]).toEqual([
      {
        balance: "10.0000 EOS",
      },
    ]);
  });

  it("can transfer tokens", async () => {
    expect.assertions(1);

    await tester.contract.transfer(
      {
        from: user1.accountName,
        to: user2.accountName,
        quantity: `5.0000 EOS`,
        memo: `sending some EOS your way 💸`,
      },
      [{ actor: user1.accountName, permission: `active` }]
    );

    expect(tester.getTableRowsScoped(`accounts`)).toEqual({
      user1: [{ balance: "5.0000 EOS" }],
      user2: [{ balance: "5.0000 EOS" }],
    });
  });

  it("can load balances from JSON files", async () => {
    expect.assertions(1);
    // need to reset stat and accounts table first
    tester.resetTables();
    await tester.loadFixtures();

    await tester.contract.transfer(
      {
        from: user1.accountName,
        to: user2.accountName,
        quantity: `0.1234 EOS`,
        memo: ``,
      },
      [{ actor: user1.accountName, permission: `active` }]
    );

    expect(tester.getTableRowsScoped(`accounts`)).toEqual({
      user1: [{ balance: "1.0000 EOS" }],
      user2: [{ balance: "0.1234 EOS" }],
    });
  });
});

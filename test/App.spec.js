const App = require("../src/App");

describe("App integration", () => {
  it("should add a new wallet to a user", () => {
    const app = new App("Isaac");
    app.addWallet("Minha Carteira");
    expect(app.user.wallets.length).toBe(1);
    expect(app.user.wallets[0].getBalance()).toBe(0);
  });

  it("should be able to buy", () => {
    const app = new App("Isaac");
    app.addWallet("Minha Carteira");
    const pizza = {
      label: "Pizza",
      value: 38,
      walletName: "Minha Carteira",
    };
    app.buy(pizza);
    expect(app.user.money).toBe(-38);
    expect(app.user.wallets[0].getBalance()).toBe(-38);
    expect(app.user.wallets[0].transactions.length).toBe(1);
    expect(app.user.wallets[0].transactions[0].label).toBe("Pizza");
    expect(app.user.wallets[0].transactions[0].getValue()).toBe(-38);
  });

  it("should be able to receive money", () => {
    const app = new App("Isaac");
    app.addWallet("Minha Carteira");
    const receiveData = {
      label: "Dinheiro da Pizza",
      value: 19,
      walletName: "Minha Carteira",
    };
    app.receive(receiveData);
    expect(app.user.money).toBe(19);
    expect(app.user.wallets[0].getBalance()).toBe(19);
    expect(app.user.wallets[0].transactions.length).toBe(1);
    expect(app.user.wallets[0].transactions[0].label).toBe("Dinheiro da Pizza");
    expect(app.user.wallets[0].transactions[0].getValue()).toBe(19);
  });
});

import { describe, it, beforeEach, afterEach } from "mocha";
import { expect } from "chai";
import * as sinon from "sinon";

import * as figlet from "figlet";
import * as readlineSync from "readline-sync";
import * as colors from "colors";

import { Card } from "../src/classes/Card";
import { Game } from "../src/classes/Game";

describe("Gameクラス", () => {
  let game = new Game();

  describe("renderTitle()メソッド", () => {
    let log: sinon.SinonStub<
      [message?: unknown, ...optionalParams: unknown[]],
      void
    >;
    let question: sinon.SinonStub;

    beforeEach(() => {
      game = new Game();
      log = sinon.stub(console, "log");
      question = sinon.stub(readlineSync, "question");
    });

    afterEach(() => {
      log.restore();
      question.restore();
    });

    it("タイトルを画面を表示する。", async () => {
      try {
        await game.renderTitle();
        expect(
          log.withArgs(
            colors.rainbow(
              figlet.textSync("BLACK JACK", {
                font: "Big Chief",
                horizontalLayout: "default",
                verticalLayout: "default",
              })
            )
          ).calledOnce
        ).equal(true);
        expect(
          question.withArgs(colors.bold("Please Enter to Start")).calledOnce
        ).equal(true);
        expect(log.withArgs("").calledOnce).equal(true);
      } catch (e) {
        throw e;
      }
    });
  });
  describe("inputBet()メソッド", () => {
    let log: sinon.SinonStub<
      [message?: unknown, ...optionalParams: unknown[]],
      void
    >;
    let question: sinon.SinonStub;
    let renderMoney: sinon.SinonStub;

    beforeEach(() => {
      game = new Game();
      log = sinon.stub(console, "log");
      question = sinon.stub(readlineSync, "question");
      renderMoney = sinon.stub(game["player"], "renderMoney");
    });

    afterEach(() => {
      log.restore();
      question.restore();
      renderMoney.restore();
    });

    it("正常系：有効な数字が入力されたとき、その数字を賭け金としてセットする。", async () => {
      question.returns("100");
      await game.inputBet();
      expect(renderMoney.calledOnce).equal(true);
      expect(game["player"].bet).equal(100);
      expect(
        log.withArgs(colors.bold.yellow(`\nYour bet: $100`)).calledOnce
      ).equal(true);
      expect(question.withArgs(colors.bold("(Enter)")).calledOnce).equal(true);
      expect(log.withArgs("").calledOnce).equal(true);
    });
    it("異常系：有効な数字が入力されなかったとき、投げられたエラーのログを表示する。", async () => {
      question.returns("-1");
      await game.inputBet();
      expect(
        log.withArgs("\nPlease input a positive integer.").calledOnce
      ).equal(true);
    });
  });
  describe("dealByAction()メソッド", () => {
    let log: sinon.SinonStub<
      [message?: unknown, ...optionalParams: unknown[]],
      void
    >;
    let question: sinon.SinonStub;
    let selectAction: sinon.SinonStub;
    let hit: sinon.SinonStub;
    let doubleDown: sinon.SinonStub;
    let renderNewCard: sinon.SinonStub;
    let dealerRenderHand: sinon.SinonStub;
    let playerRenderHand: sinon.SinonStub;

    beforeEach(() => {
      game = new Game();
      log = sinon.stub(console, "log");
      question = sinon.stub(readlineSync, "question");
      selectAction = sinon.stub(game["player"], "selectAction");
      hit = sinon.stub(game["player"], "hit");
      doubleDown = sinon.stub(game["player"], "doubleDown");
      renderNewCard = sinon.stub(game["player"], "renderNewCard");
      dealerRenderHand = sinon.stub(game["dealer"], "renderHand");
      playerRenderHand = sinon.stub(game["player"], "renderHand");
    });

    afterEach(() => {
      log.restore();
      question.restore();
      selectAction.restore();
      hit.restore();
      doubleDown.restore();
      renderNewCard.restore();
      dealerRenderHand.restore();
      playerRenderHand.restore();
    });

    it("正常系：アクションに「h」が選択されたとき、プレイヤーはヒットする。", async () => {
      selectAction.returns("h");
      await game.actByPlayer();
      expect(hit.calledOnce).equal(true);
      expect(game["player"].hasHit).equal(true);
      expect(
        question.withArgs(
          colors.bold.green("You hit.") + colors.bold("\n(Enter)")
        ).calledOnce
      ).equal(true);
      expect(log.withArgs("").calledTwice).equal(true);
      expect(renderNewCard.calledOnce).equal(true);
      expect(dealerRenderHand.calledOnce).equal(true);
      expect(playerRenderHand.calledOnce).equal(true);
      expect(question.withArgs(colors.bold("(Enter)")).calledOnce).equal(true);
    });
    it("正常系：アクションに「d」が選択されかつmoneyからbet引いた数字が0のとき、プレイヤーはダブルダウンする。", async () => {
      selectAction.returns("d");
      game["player"].hasHit = false;
      game["player"].money = 1000;
      game["player"].bet = 1000;
      await game.actByPlayer();
      expect(doubleDown.calledOnce).equal(true);
      expect(
        question.withArgs(
          colors.bold.cyan("You doubled down.") + colors.bold("\n(Enter)")
        ).calledOnce
      ).equal(true);
      expect(log.withArgs("").calledTwice).equal(true);
      expect(renderNewCard.calledOnce).equal(true);
      expect(dealerRenderHand.calledOnce).equal(true);
      expect(playerRenderHand.calledOnce).equal(true);
      expect(question.withArgs(colors.bold("(Enter)")).calledOnce).equal(true);
    });
    it("正常系：アクションに「d」が選択されかつmoneyからbet引いた数字が0より大きいとき、プレイヤーはダブルダウンする。", async () => {
      selectAction.returns("d");
      game["player"].hasHit = false;
      game["player"].money = 1000;
      game["player"].bet = 100;
      await game.actByPlayer();
      expect(doubleDown.calledOnce).equal(true);
      expect(
        question.withArgs(
          colors.bold.cyan("You doubled down.") + colors.bold("\n(Enter)")
        ).calledOnce
      ).equal(true);
      expect(log.withArgs("").calledTwice).equal(true);
      expect(renderNewCard.calledOnce).equal(true);
      expect(dealerRenderHand.calledOnce).equal(true);
      expect(playerRenderHand.calledOnce).equal(true);
      expect(question.withArgs(colors.bold("(Enter)")).calledOnce).equal(true);
    });
    it("正常系：アクションに「s」が選択されたとき、プレイヤーはスタンドする。", async () => {
      selectAction.returns("s");
      await game.actByPlayer();
      expect(game["player"].isStanding).equal(true);
      expect(
        question.withArgs(
          colors.bold.yellow("You stand.") + colors.bold("\n(Enter)")
        ).calledOnce
      ).equal(true);
      expect(log.withArgs("").calledTwice).equal(true);
      expect(dealerRenderHand.calledOnce).equal(true);
      expect(playerRenderHand.calledOnce).equal(true);
      expect(question.withArgs(colors.bold("(Enter)")).calledOnce).equal(true);
    });
    it("異常系：アクションに「h」「d」「s」以外が選択されたとき、エラーログを表示する。", async () => {
      selectAction.returns("a");
      await game.actByPlayer();
      expect(
        log.withArgs("\nPlease input Hit[h] or DoubleDown[d] or Stand[s]")
          .calledOnce
      ).equal(true);
    });
    it("異常系：アクションに「d」が選択されかつmoneyからbet引いた数字が0より小さいとき、エラーログを表示する。", async () => {
      selectAction.returns("d");
      game["player"].money = 1000;
      game["player"].bet = 1001;
      await game.actByPlayer();
      expect(
        log.withArgs(
          colors.bold("You can't double down. You don't have enough money.")
        ).calledOnce
      ).equal(true);
    });
  });
  describe("checkResult()メソッド", () => {
    let log: sinon.SinonStub<
      [message?: unknown, ...optionalParams: unknown[]],
      void
    >;

    beforeEach(() => {
      game = new Game();
      log = sinon.stub(console, "log");
    });

    afterEach(() => {
      log.restore();
    });

    it("dealer.isBustedがtrueのとき、playerのmoneyにbetを2倍した値を足す。その後ログを表示する。", () => {
      game["player"].money = 900;
      game["player"].bet = 100;
      game["dealer"].hand = [
        new Card(String.fromCodePoint(0x2660), 10, "10"),
        new Card(String.fromCodePoint(0x2660), 10, "J"),
        new Card(String.fromCodePoint(0x2660), 10, "Q"),
      ];
      game.checkResult();
      expect(game["player"].money).equal(1100);
      expect(log.withArgs(colors.bold.red("Dealer Busted")).calledOnce).equal(
        true
      );
      expect(log.withArgs(colors.bold.red("You Win!!")).calledOnce).equal(true);
      expect(
        log.withArgs(colors.bold.red("You won ") + colors.bold.red(`$100`))
          .calledOnce
      ).equal(true);
    });
    it("player.isBustedがtrueのときは、何もしない。その後ログを表示する。", () => {
      game["player"].money = 900;
      game["player"].bet = 100;
      game["player"].hand = [
        new Card(String.fromCodePoint(0x2660), 10, "10"),
        new Card(String.fromCodePoint(0x2660), 10, "J"),
        new Card(String.fromCodePoint(0x2660), 10, "Q"),
      ];
      game.checkResult();
      expect(game["player"].money).equal(900);
      expect(log.withArgs(colors.bold.blue("You Busted")).calledOnce).equal(
        true
      );
      expect(log.withArgs(colors.bold.blue("You Lose")).calledOnce).equal(true);
      expect(
        log.withArgs(colors.bold.blue("You lost ") + colors.bold.blue(`$100`))
          .calledOnce
      ).equal(true);
    });
    it("dealer.sumが21かつplayer.sumが21のときかつdealer.isBlackjackがtrueかつplayer.isBlackjackがtrueのとき、player.moneyにplayer.betを足す。その後ログを表示する。", () => {
      game["player"].money = 900;
      game["player"].bet = 100;
      game["dealer"].hand = [
        new Card(String.fromCodePoint(0x2660), 1, "A"),
        new Card(String.fromCodePoint(0x2660), 10, "J"),
      ];
      game["player"].hand = [
        new Card(String.fromCodePoint(0x2665), 1, "A"),
        new Card(String.fromCodePoint(0x2665), 10, "J"),
      ];
      game.checkResult();
      expect(game["player"].money).equal(1000);
      expect(log.withArgs(colors.bold("Draw")).calledOnce).equal(true);
    });
    it("dealer.sumが21かつplayer.sumが21のときかつdealer.isBlackjackがfalseかつplayer.isBlackjackがfalseのとき、player.moneyにplayer.betを足す。その後ログを表示する。", () => {
      game["player"].money = 900;
      game["player"].bet = 100;
      game["dealer"].hand = [
        new Card(String.fromCodePoint(0x2660), 1, "A"),
        new Card(String.fromCodePoint(0x2660), 3, "3"),
        new Card(String.fromCodePoint(0x2660), 7, "7"),
      ];
      game["player"].hand = [
        new Card(String.fromCodePoint(0x2665), 1, "A"),
        new Card(String.fromCodePoint(0x2665), 3, "3"),
        new Card(String.fromCodePoint(0x2665), 7, "7"),
      ];
      game.checkResult();
      expect(game["player"].money).equal(1000);
      expect(log.withArgs(colors.bold("Draw")).calledOnce).equal(true);
    });
    it("dealer.sumが21かつplayer.sumが21のときかつdealer.isBlackjackがtrueかつplayer.isBlackjackがfalseのとき、何もしない。その後ログを表示する。", () => {
      game["player"].money = 900;
      game["player"].bet = 100;
      game["dealer"].hand = [
        new Card(String.fromCodePoint(0x2660), 1, "A"),
        new Card(String.fromCodePoint(0x2660), 10, "J"),
      ];
      game["player"].hand = [
        new Card(String.fromCodePoint(0x2665), 1, "A"),
        new Card(String.fromCodePoint(0x2665), 3, "3"),
        new Card(String.fromCodePoint(0x2665), 7, "7"),
      ];
      game.checkResult();
      expect(game["player"].money).equal(900);
      expect(log.withArgs(colors.bold.blue("You Lose")).calledOnce).equal(true);
      expect(
        log.withArgs(colors.bold.blue("You lost ") + colors.bold.blue(`$100`))
          .calledOnce
      ).equal(true);
    });
    it("dealer.sumが21かつplayer.sumが21のときかつdealer.isBlackjackがfalseかつplayer.isBlackjackがtrueのとき、player.moneyにplayer.betを2.5倍して小数点を切り捨てた値を足す。その後ログを表示する。", () => {
      game["player"].money = 900;
      game["player"].bet = 100;
      game["dealer"].hand = [
        new Card(String.fromCodePoint(0x2665), 1, "A"),
        new Card(String.fromCodePoint(0x2665), 3, "3"),
        new Card(String.fromCodePoint(0x2665), 7, "7"),
      ];
      game["player"].hand = [
        new Card(String.fromCodePoint(0x2660), 1, "A"),
        new Card(String.fromCodePoint(0x2660), 10, "J"),
      ];
      game.checkResult();
      expect(game["player"].money).equal(1150);
      expect(
        log.withArgs(colors.rainbow("B L A C K J A C K")).calledOnce
      ).equal(true);
      expect(log.withArgs(colors.bold.red("You Win!!")).calledOnce).equal(true);
      expect(
        log.withArgs(colors.bold.red("You won ") + colors.bold.red(`$150`))
          .calledOnce
      ).equal(true);
    });
    it("上記以外でplayer.isBlackjackがtrueのとき、player.moneyにplayer.betを2.5倍して小数点を切り捨てた値を足す。その後ログを表示する。", () => {
      game["player"].money = 900;
      game["player"].bet = 100;
      game["player"].hand = [
        new Card(String.fromCodePoint(0x2660), 1, "A"),
        new Card(String.fromCodePoint(0x2660), 10, "J"),
      ];
      game.checkResult();
      expect(game["player"].money).equal(1150);
      expect(
        log.withArgs(colors.rainbow("B L A C K J A C K")).calledOnce
      ).equal(true);
      expect(log.withArgs(colors.bold.red("You Win!!")).calledOnce).equal(true);
      expect(
        log.withArgs(colors.bold.red("You won ") + colors.bold.red(`$150`))
          .calledOnce
      ).equal(true);
    });
    it("上記以外でdealer.sumがplayer.sumより大きいとき、何もしない。その後ログを表示する。", () => {
      game["player"].money = 900;
      game["player"].bet = 100;
      game["dealer"].hand = [
        new Card(String.fromCodePoint(0x2660), 1, "A"),
        new Card(String.fromCodePoint(0x2660), 9, "9"),
      ];
      game["player"].hand = [
        new Card(String.fromCodePoint(0x2665), 7, "7"),
        new Card(String.fromCodePoint(0x2665), 10, "J"),
      ];
      game.checkResult();
      expect(game["player"].money).equal(900);
      expect(
        log.withArgs(colors.bold.blue("You lost ") + colors.bold.blue(`$100`))
          .calledOnce
      ).equal(true);
    });
    it("上記以外でdealer.sumがplayer.sumより小さいとき、player.moneyにplayer.betを2倍した値を足す。その後ログを表示する。", () => {
      game["player"].money = 900;
      game["player"].bet = 100;
      game["dealer"].hand = [
        new Card(String.fromCodePoint(0x2665), 7, "7"),
        new Card(String.fromCodePoint(0x2665), 10, "J"),
      ];
      game["player"].hand = [
        new Card(String.fromCodePoint(0x2660), 1, "A"),
        new Card(String.fromCodePoint(0x2660), 9, "9"),
      ];
      game.checkResult();
      expect(game["player"].money).equal(1100);
      expect(log.withArgs(colors.bold.red("You Win!!")).calledOnce).equal(true);
      expect(
        log.withArgs(colors.bold.red("You won ") + colors.bold.red(`$100`))
          .calledOnce
      ).equal(true);
    });
    it("上記以外でdealer.sumがplayer.sumと等しいとき、player.moneyにplayer.betを足す。その後ログを表示する。", () => {
      game["player"].money = 900;
      game["player"].bet = 100;
      game["dealer"].hand = [
        new Card(String.fromCodePoint(0x2665), 1, "A"),
        new Card(String.fromCodePoint(0x2665), 9, "9"),
      ];
      game["player"].hand = [
        new Card(String.fromCodePoint(0x2660), 1, "A"),
        new Card(String.fromCodePoint(0x2660), 9, "9"),
      ];
      game.checkResult();
      expect(game["player"].money).equal(1000);
      expect(log.withArgs(colors.bold("Draw")).calledOnce).equal(true);
    });
  });
  describe("start()メソッド", () => {
    let log: sinon.SinonStub<
      [message?: unknown, ...optionalParams: unknown[]],
      void
    >;
    let renderTitle: sinon.SinonStub;
    let inputBet: sinon.SinonStub;

    beforeEach(() => {
      game = new Game();
      log = sinon.stub(console, "log");
      renderTitle = sinon.stub(game, "renderTitle");
      inputBet = sinon.stub(game, "inputBet").callsFake(async () => {
        game["player"].bet = 100;
        game["player"].money -= 100;
      });
    });

    afterEach(() => {
      log.restore();
      renderTitle.restore();
      inputBet.restore();
    });

    it("ゲームを進行させる。", async () => {
      await game.start();
      expect(renderTitle.calledOnce).equal(true);
    });
    it("ラウンド後にプレイヤーの所持金が0以下になったとき、ゲームを終了する。", async () => {
      await game.start();
      expect(renderTitle.calledOnce).equal(true);
    });
  });
});

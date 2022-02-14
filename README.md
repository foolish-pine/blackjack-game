# ターミナルであそべるTypeScript + Node.js製ブラックジャック
ターミナルであそべるブラックジャックです。
<br>
<br>
## デモ
<img src="https://github.com/foolish-pine/blackjack-game/wiki/images/blackjack.gif" width="500">
<br>

## 動作環境
Node.js v12.18.4で動作確認済み。
<br>
<br>

## ゲームの起動
```node dist/main.js```
<br>
<br>

## ルール
基本的なブラックジャックと同じルールです。
1. まず賭け金を設定します。最初の所持金は$1000です。
2. 手札を確認します。この時点でブラックジャック（手札がエースと10、J、Q、Kのどれか）が成立した場合、ただちにディーラーの手札の確認に移行し、その後6に移行します。ディーラーがブラックジャックでない場合、プレイヤーはブラックジャックでの勝利となります。ディーラーがブラックジャックであった場合、引き分けです。
3. ヒット・ダブルダウン・スタンドからアクションを選択します。ヒットはカードを1枚追加します。ダブルダウンは賭け金を2倍にし、カードを1枚追加します。スタンドは何もしません。ヒットはバスト（手札の数字の合計が21を超えること）しない限り何回でも可能です。ダブルダウンは手札が2枚のときにしか選択できません。
4. プレイヤーがダブルダウンかスタンドを選択した場合、ディーラーの手札の確認に移行します。バストした場合、6に移行します。
5. ディーラーは手札の合計が17かつその中にエースが含まれる場合、または手札の合計が17未満の場合ヒットします。これはディーラーの手札が条件を満たさなくなるまで繰り返されます。
6. 勝敗を判定します。プレイヤーはブラックジャックで勝利すると賭け金の1.5倍が払い戻されます。通常の勝利の場合は賭け金と同額が払い戻されます。負けた場合、賭け金は没収されます。引き分けの場合、賭け金は没収されません。<br>
ディーラーがブラックジャックでプレイヤーが3枚以上の手札で合計21の場合、プレイヤーの負けとなります。
7. プレイヤーは所持金が0になるまで遊ぶことができます。
<br>

## ポイント
- TypeScript + Node.jsで作成したターミナルで遊べるブラックジャックです。
- ~~デザイン考えたりCSS書いたりするのが面倒だったので~~趣向を変えて、ターミナルでコマンドぽちぽち叩いて遊べるゲームにしてみました。
- mocha + chaiのテスト環境を導入し、テストコードを書きました。
- 文字の色やウェイトを変更したり、カードを視覚的に表現したりして見やすくしてみました。
<br>

## 制作者コメント
TypeScriptの練習がてら何かゲームをつくってみよう、と思ってつくりはじめたのですが、進めるうちにTSだけでなく非同期処理やテストなど様々なことを調べながら学ぶことができました。既存のゲームのルールを言語化し、それをコードに落とし込んでいくのはすごく勉強になりますね。
<br>
<br>

## 制作に使用した言語・ツール
TypeScript / Node.js
<br>
<br>

## 制作時間
70時間（テスト書くのにめちゃくちゃ時間かかりました…）
<br>
<br>


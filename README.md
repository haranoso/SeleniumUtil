# SalasForceのテストをSeleniumで実行するためのUtilityが欲しくて作成した。

必要環境
1) Node.js
2) Sfdx Cli
3) Git bash
4) Visual Studio Code


現在以下のWebdriverに対応。  
-  1)chrome  
-  2)firefox  

/lib/Utilityにいくつかメソッドがあります。  
スクロール、スクリーンショット、クリックなど。  

随時追加予定。  
適当なフォルダに移動。
1) `clone {repositry}`  
2) `npm install`  
3) `node sample.js chrome`  
4) `node sample.js firefox`  

Salesforceのテストとして利用する場合。
1)SfdxCliをインストール、設定。
2)force-appのある階層と同じ場所にClone
3)テストコードを記載

以下のような構成を想定
    org
    |--config
    |--force-app
    |  |--main
    |  |  |--default
    |--manifest
★  |--SfTestBySelenium
★  |  |--package.json
★  |  |--lib //ここにライブラリを配置
★  |  |--node_modules //　npm installしたら配置される
★  |  |--src //ここにテストコードなどを配置


このとき、utilityのメソッドを利用して、Sfdxコマンドをコールすることができます。  

`users = u.soql("select Id , Name from Contact order by createdDate desc")
console.log(users[0].id);`  

結果がParse済みのオブジェクトとして取得できるので、画面の入力に使用するもよし、操作の結果があっていることを確認するのに使用するもよし。
      

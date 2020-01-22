# SalasForceのテストをSeleniumで実行するためのUtilityが欲しくて作成した。

現在以下のWebdriverに対応。  

-  1)chrome  
-  2)firefox  

/lib/Utilityにいくつかメソッドがあります。  
スクロール、スクリーンショット、クリックなど。  

随時追加予定。  
適当なフォルダに移動。
0)　Node.jsをインストール
1) `clone {repositry}`  
2) `npm install`  
3) `node ./src/sample.js chrome`  
4) `node ./src/sample.js firefox`  

Salesforceのテストとして利用する場合。
1)SfdxCliをインストール、設定。
2)force-appのある階層と同じ場所にClone
3)テストコードを記載

このとき、utilityのメソッドを利用して、Sfdxコマンドをコールすることができます。  

`users = u.callCommandJson('sfdx force:data:soql:query -q "select Id , Name from Contact order by createdDate desc" -r json').result.records;`  

結果がParse済みのオブジェクトとして取得できるので、画面の入力に使用するもよし、操作の結果があっていることを確認するのに使用するもよし。
      

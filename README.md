# SeleniumでのTestコードを記載するためのUtility

必要環境
1) Node.js
2) Visual Studio Code
3) Git bash(Windowsのみ)

Salesforceのテストする場合はあるといいかも環境  
4) Sfdx Cli

現在以下のWebdriverに対応。  
-  1)chrome  
-  2)firefox  
-  3)safari(PC)※Macが必要。

/lib/testUtil  : スクロール、スクリーンショット、クリックなど。  
/lib/fileUtil  : ファイルの検索、ディレクトリの検索など  
/lib/slackUtil : Slackへのテキスト、画像のポスト  
/lib/imageUtil : 画像の比較。  

随時追加予定。  
適当なフォルダに移動。
1) `clone {repositry}`  
2) `cd SeleniuUtil`
3) `npm install`  
4) `node sample.js chrome`  
5) `node sample.js firefox`  

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
    ★  |--SeleniuUtil  
    ★  |  |--package.json  
    ★  |  |--lib //ライブラリはここ  
    ★  |  |--node_modules //　npm installしたら配置される  
    ★  |  |--hogehoge.js//ここにテストコードなどを配置  
    

上記配置かつ、SFDX Cliインストール済みであれば、テストコード中にTestUtilのメソッドを利用して、SOQLをコールすることができます。    
`users = u.soql("select Id , Name from Contact order by createdDate desc");    
console.log(users[0].id);`    
結果がParse済みのオブジェクトとして取得できます。  


または、以下のようにコマンドを実行することも可能です。    
`ret = u.callCommand('some command');　// コマンド実行結果を取得`    
`ret = u.callCommandJson('some command'); // JSONをパースした結果を取得`  

Slackを利用する場合、事前にSlackへBotアプリの作成が必要です。  
投稿するチャンネルのメンバーにアプリを追加しておく必要もあります。  
実行前に以下の環境変数を登録しておく必要があります。  

SLACK_TOKEN='bot-token'  
SLACK_CHANNEL='channel name'  
SLACK_SECRET_KEY='secret-key'  
SLACK_POST_IMAGE='true'//POSTのONOFF切り替え、IMAGEと書いてあるけどTEXTも抑止します。  

      

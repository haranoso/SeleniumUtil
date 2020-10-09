const { App } = require('@slack/bolt');
var sleep = require('sleep');
const fs = require('fs');

const token = process.env.SLACK_TOKEN;
const channelId=process.env.SLACK_CHANNEL;
const ss = process.env.SLACK_SECRET_KEY;
const postimage = process.env.SLACK_POST_IMAGE;
const posttext = process.env.SLACK_POST_TEXT;

const API_POST_IMAGE_INTERVAL = 3000;
const API_POST_TEXT_INTERVAL = 1000;

var postTextTime = 0;
var postImageTime = 0;

module.exports = class SlackUtil  {
    constructor () {
    }


    async postText( putText ){
        if(posttext==='true'){
            if(postTextTime>0){
                let sleepInterval = Date.now() - postTextTime;
                if( sleepInterval < API_POST_TEXT_INTERVAL ){
                    sleep.msleep(API_POST_TEXT_INTERVAL - sleepInterval);
                }
            }
            const app = new App({
                token: token,
                signingSecret: ss
            });

            await app.client.chat.postMessage({
                token: token,
                channel:channelId,
                text: putText
            }).then((res) => {
                console.log('メッセージを送信しました: ', Date.now() - postTextTime);
                postTextTime = Date.now();
            })
            .catch((error) =>{
                console.log(error);
            });

        }
        else{
            // console.log('not post');
        }
    }



    async postImage( title  ,file){
        if(postimage==='true'){
            if(postImageTime>0){
                let sleepInterval = Date.now() - postImageTime;
                if( sleepInterval < API_POST_IMAGE_INTERVAL ){
                    sleep.msleep(API_POST_IMAGE_INTERVAL - sleepInterval);
                }

            }
            const app = new App({
                token: token,
                signingSecret: ss
            });
            
            await app.client.files.upload({
                token: token,
                channels: channelId,
                title: title,
                filename: file,
                filetype: "auto",
                file: fs.createReadStream(file)
            }).then((res) => {
                console.log('画像をアップロードしました: ', Date.now() - postImageTime);
                postImageTime = Date.now();
            })
            .catch((error) =>{
                console.log(error);
            });
        }
        else{
            // console.log('not post');
        }
    }
}

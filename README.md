# star-chat

## Requirements

* [node](https://nodejs.org/en/)
* [ionic cordova](https://ionicframework.com/docs/intro/installation/)

## Installation

* clone repository
* cd to repository
* run `$ npm install`

## Run project locally

* clone & install [star-chat-server](https://github.com/romyha/star-chat-server)
* modify /star-chat/src/app/constants.ts:
    ```
    export const API_URL= 'http://your ip:3000/api/';
    export const SOCKET_URL = 'http://your ip:3000/';
    ```
* run `$ ionic run android`
# sync API to Firebase (using HTTP endpoint)

## Main goal: 
  build an unstoppable worker that responses user's requirments.

### Completed things:
  1. fetch Eztable's API.
  2. parse data.
  3. working-queue implemented.
  4. worker implemented.
  5. store data into Firebase.
  6. deploy to Heroku.

### TODO list:
  1. auto debugging functionality.



# How to use the codes:

###make sure you have some necessary things installed:

   1. install [node.js](https://nodejs.org/)
   2. install [npm](https://www.npmjs.com/)
   
      (we need it to download packages)
   3. enter the following command in terminal
   
    ```
    npm install
    ```
    it will download all needing packages.
   4. remember login to Firebase in terminal (you need a account first)
   
   **If you just try it on local, you can ignore step 5**
   5. install Heroku toolkit
   
      please follow [Heroku document](https://devcenter.heroku.com/articles/getting-started-with-nodejs#introduction)

###using HTTP endpoints

go to https://sync-data-ez.herokuapp.com

or you can open server in localhost:\<chosen port\>

####Sync
- /api/restaurant/synclots

  ######(sync all restaurants)
- /api/restaurant/sync/:id
- /api/product/synclots

  ######(sync all products)
- /api/product/sync/:id
- /api/premium_product/sync/:id
- /api/restaurant/syncRange/:id_start/:id_end

  ######(sync from id_start to id_end)


####delete
- /api/restaurant/deletelots

  ######(delete all restaurants)
- /api/restaurant/delete/:id
- /api/product/deletelots

  ######(delete all products)
- /api/product/delete/:id
- /api/restaurant/deleteRange/:id_s/:id_e

  ######(delete from id_start to id_end)


####add
- /api/restaurant/add/product/:pid/:rid

  ######(add product which ID equals to pid into restaurant which ID equals to rid)
- /api/restaurant/add/p_product/:ppid/:rid

  ######(add premium product which ID equals to ppid into restaurant which ID equals to rid)
- /api/restaurant/add/p_plan/:planid/:rid

  ######(add premium plan which ID equals to planid into restaurant which ID equals to rid)


####remove
- /api/restaurant/rmv/product/:pid/:rid

  ######(remove product which ID equals to pid into restaurant which ID equals to rid)
- /api/restaurant/rmv/p_product/:ppid/:rid

  ######(remove premium product which ID equals to ppid into restaurant which ID equals to rid)
- /api/restaurant/rmv/p_plan/:planid/:rid

  ######(remove premium plan which ID equals to planid into restaurant which ID equals to rid)


###problem shooting
####queue
- 免費 queue 的 limitation 是 1000000。如果快超過了，請先去 Heroku 的 APP dashboard 把 CloudAMQP 移除，再重裝一次。然後進去 CloudAMQP Console (點一下 Heroku 上的 CloudAMQP 就能進去)，在 CloudAMQP Console 能看到 queue 的 URL，把這個 URL 複製到 config.js 中 CLOUDAMQP_URL 這個欄位
- 如果要查看 queue 的狀況，可以去 RabbitMQ management interface (從 CloudAMQP Console 進去)
你可以看到 queue 現在有多少個 jobs
也可以看到現在連上 queue 的 worker 數量

**注意**

最多只能開 20 個 workers，因為 connection 的上限是 20


####Firebase
如果要改 Firebase 的 URL
也是去 config.js 裡改 FIREBASE_URL 這個欄位


####新增/修改餐廳代號
去 public/json/restaurant.json 修改


####新增/修改 product 代號
去 public/json/product.json 修改


####在本機端啟動 server/worker

(port 預設是 5000)
- 啟動 web server
```
  node index.js
```

開好了就能去 localhost:\<chosen port\> 打 api
- 啟動 worker
```
  node public/js/worker.js
```

開好了就能開始處理 queue 中的 jobs
- 同時啟動 web server/worker
```
  heroku local
```

  (worker 的 port 會自動設成 server 的 port + 100)

  **注意**
  
在本機端如果要開多個 server or worker，要記得改 port，去 config.js 中加上 PORT 這個欄位即可。


####deploy to Heroku
```
  git add --all
```
```
  git commit -m "your message"
```
```
  git push heroku master
```
  
  
  
  

###### This project is built by Express in 2016 by Brian Huang.

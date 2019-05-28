NODEJS Based Home Decor Backend application 

To Run this app follow these steps :
1) Run the mongoDB server in your local instance
2) do " npm install "
3) run using the command "node app.js"
          (or)
   do " npm install nodemon -g " and then "nodemon" to run the server

The REST API's are as follows : 

** USER REGISTRATION API's **                              
[POST] http://localhost:1000/api/user/register

** USER LOGIN/LOGOUT API's **                             
[POST] http://localhost:1000/api/user/login                               
[PUT] http://localhost:1000/api/user/logout/:id

** PRODUCT CRUD WITH SEARCH AND SORT API's **                                  
[GET] http://localhost:1000/api/products/get/all                                   
[GET] http://localhost:1000/api/products/get/?productId=id                 
[DELETE] http://localhost:1000/api/products/delete/:id                              
[PUT] http://localhost:1000/api/products/update                               
[POST] http://localhost:1000/api/products/save                           
[GET] http://localhost:1000/api/products/get/sort/cost/:number                            
[GET] http://localhost:1000/api/products/get/sort/title/:title                                    
[GET] http://localhost:1000/api/get/products/:category                                            
[GET] http://localhost:1000/api/get/products/:search                             

** PRODUCT PURCHASE AND HISOTRY API's **                                     
[POST] http://localhost:1000/api/cart/products/buy                               
[GET] http://localhost:1000/api/cart/product/history/:id                                  

TECHNOLOGIES USED : 

NODE JS, 
MONGO DB, 
EXPRESS

DEPENDENCIES USED :

EXPRESS, 
MONGOOSE, 
PASSPORT, 
PASSPORT-JWT, 
BCRYPTjs, 
JSONWEBTOKEN(JWT), 
FUSE.JS

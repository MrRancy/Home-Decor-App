NODEJS Based Home Decor Backed application 

The REST API's are as follows : 

** USER REGISTRATION API's **                              
[POST] http://localhost:1000/api/user/register

** USER LOGIN/LOGOUT API's **                             
[POST] http://localhost:1000/api/user/login                               
[PUT] http://localhost:1000/api/user/logout/:<Give ID Here>

** PRODUCT CRUD WITH SEARCH AND SORT API's **                                  
[GET] http://localhost:1000/api/products/get/all                                   
[GET] http://localhost:1000/api/products/get/?productId=<Give ID Here>                    
[DELETE] http://localhost:1000/api/products/delete/:id                              
[PUT] http://localhost:1000/api/products/update                               
[POST] http://localhost:1000/api/products/save                           
[GET] http://localhost:1000/api/products/get/sort/cost/:number                            
[GET] http://localhost:1000/api/products/get/sort/title/:title                                    
[GET] http://localhost:1000/api/get/products/:category                                        

** PRODUCT PURCHASE AND HISOTRY API's **                                     
[POST] http://localhost:1000/api/cart/products/buy                               
[GET] http://localhost:1000/api/cart/product/history/:id                                  

TECHNOLOGIES USED : 

NODE JS,
MONGO DB,
EXPRESS,

DEPENDENCIES USED :

EXPRESS,
MONGOOSE,
PASSPORT,
PASSPORT-JWT,
BCRYPTJS,
JSONWEBTOKEN(JWT)

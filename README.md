mongoose-autoREST
=================

Auto generate basic REST APIs for mongoose models:
-----------------

```javascript

//router({modelName}, {path}, {autoRoute}, {expressServer}, {middleWare})

var router = require('./router');

router("User", "users", true, app);
```

#### Creates

```
GET   	/users
GET   	/users/:id
POST  	/users/:id
PUT   	/users/:id
DELETE	/users/:id 
```

#### Mongoose query/options examples
 ```
GET 	/users?query={"firstName": "Bill"}
GET 	/users?query={"firstName": "Bill", "lastName": "Leegard"}
GET 	/users?sort=[["firstName, -1"]]
GET 	/users?fields=["firstName", "lastName"]
GET     /users?sort=[["firstName, -1"]]&skip=5&limit=10
 ```


Use as middleware
-----------------

```
var router = require('./router'),
	userRouter = router("User");
        

app.get('/users', [userRouter.index], function (req, res) {
    var allUsers = req.docs;
});

app.get('/users/:id', [userRouter.show], function (req, res) {
    var user = req.docs;
});
```
Complete example (untested)
-----------------

```
var mongoose = require('mongoose'),
    app = require('express').createServer(),
    router = require('router');

mongoose.model("User", new mongoose.Schema({
    firstName: String,
    lastName: String
}));

router("User", "users", true, app); 

app.listen(3000);
```

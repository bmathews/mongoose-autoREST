mongoose-autoREST
=================

Auto generate REST apis for mongoose models

```javascript

//router({middleWare}, {modelName}, {path}, {autoRoute}, {expressServer})

var router = require('./router');

router([], "User", "userss", true, app);
```

Creates

```
GET   	/users
GET   	/users/:id
POST  	/users/:id
PUT   	/users/:id
DELETE	/users/:id 
```

Mongoose query/options examples
 ```
GET 	/users?query={"firstName": "Bill"}
GET 	/users?query={"firstName": "Bill", "lastName": "Leegard"}
GET 	/users?sort=[["firstName, -1"]]
GET 	/users?fields=["firstName", "lastName"]
 ```
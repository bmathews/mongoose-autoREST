mongoose-autoREST
=================

Auto generate REST apis for mongoose models

```javascript

//router({middleWare}, {model}, {path}, {autoRoute}, {expressServer})

var router = require('./router');

router([], "Sprint", "sprints", true, app);
```

Creates

```
GET   	/sprints
GET   	/sprints/:id
POST  	/sprints/:id
PUT   	/sprints/:id
DELETE	/sprints/:id 
```
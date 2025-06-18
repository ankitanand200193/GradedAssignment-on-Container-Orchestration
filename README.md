# Graded Assignment on Container Orchestration

## Issues in backend

1. .env file was named as config.env
2. index.js .env file path is modified ```require("dotenv").config({ path: ".env" });```
3. PORT is missing in the .env file.

## To know the endpoint of your database:

Tip to Debug in Future

If you're ever unsure about the full route, just:

    Look at ```app.use("/prefix", ...) in index.js```

    Look at ``router.<method>("/path", ...) in your route file```

Put them together:
```app.use("/prefix", ...) + router.post("/path") = POST /prefix/path```



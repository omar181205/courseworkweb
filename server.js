const {app}=require('./index')
const db_access = require('./db.js')
const db = db_access.db;

const port = 5000;

db.serialize(() =>  {

    db.run(db_access.createUserTable , (err) => {
        if(err) console.log('error creating user table', err.message);
    });
});

    
;

app.listen(port,()=>{
    console.log(`server i running on port ${port}`)
});
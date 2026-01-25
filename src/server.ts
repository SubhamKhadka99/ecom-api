// npm init -y
// npx tsc --init

import express, { Request, Response } from "express";
const app = express();
const PORT =8000
//! connect to database


//! root route
app.get("/",(req:Request ,res:Response)=>{
    res.status(200).json({
        message: "server is up and running"
    })
})



// listen
app.listen(PORT , ()=>{
    console.log(`server is running at http://localhost:${PORT}`);
})
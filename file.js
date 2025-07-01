// The fs module in Node.js allows you to interact with the file system. 
// It provides functions for creating, reading, updating, and deleting files, 
// as well as for working with directories and file paths.
// There are two ways to handle files:
// Synchronous (blocking)
// Asynchronous (non-blocking, preferred in most cases)


const fs=require('fs');
// asyncroneous way preferred 
fs.readFile('index.js','utf-8',(err,data)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log("from file",data);
    }
})

// syncroneous way 
const data=fs.readFileSync('index.js','utf-8');
console.log(data);
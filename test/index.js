var archiver = require("../build/index");
var path = require("path");

Promise.resolve()
.then(() =>{
    return archiver.archive({
        src: path.join(__dirname, "files"),
        output: path.join(__dirname, "output/output.zip"),
    });
})
.then(() => {
    console.info("Test success !");
    process.exit(0);
})
.catch((err) => {
    console.error("Test fail !");
    console.error(err);
    process.exit(1);
});
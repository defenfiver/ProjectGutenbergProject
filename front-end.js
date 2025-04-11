const url = 'https://gutendex.com/books?search=';
const bookurl = 'https://gutendex.com/books/'
const readline = require('readline')

//From in class example
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

//From in class example
async function askQuestion(prompt) {
    return new Promise(resolve => {
        rl.question(prompt, answer => {
            resolve(answer);
        })
    });
}

async function cacheControl(book, cache){
    //check if 10 books
    //if 10, add delete oldest
    // add new {book}
    return cache;
}

async function getData(str) {
    const request = await fetch(url + str);
    const json = await request.json();
    for (let i = 0; i < json.count; ++i) {
        console.log(json.results[i].id + ": " +  json.results[i].title);
    }
    const id = await askQuestion("Which id book would you like to read?");
    const newRequest = await fetch(bookurl + id); 
    const requestJson = await newRequest.json();
    parsedurl = requestJson["formats"]["text/plain; charset=us-ascii"]
    console.log(parsedurl);
    const book = await fetch(parsedurl);
    const utf = await book.text();
    return utf
}

async function printBook(book){
    console.log(book);
}

async function mainLoop(){
    const answer = await askQuestion("What is your search query? or enter .recent for your recent books");
    cache = [];
    if (answer == ".recent"){
        console.log(cache);
        const answer = await askQuestion("Which recent book would you like to read?");
        printBook(cache[answer])
    } else{
        book = await getData(answer);
        //cache = await cacheControl(book, cache);
        printBook(book);
    }
}

mainLoop();
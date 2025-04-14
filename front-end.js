// Created by Cullen Simkins, Caleb Taylor, and Sam Uptigrove

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
        });
    });
}

let cache = [];
async function cacheControl(book, cache, title){
    cache = cache
    title = title 
    //check if 10 books if 10, add book and delete oldest
    if (cache.length == 10) {
        cache.shift();
        cache.push({
            key: title,
            value: book
        });
    } 
    // if less than 10 books, add new book
    else {
        cache.push({
            key: title,
            value: book
        });
    }

    return cache;
 }

async function getData(str) {
    const request = await fetch(url + str);
    const json = await request.json();
    let idArray = [];
    for (let i = 0; i < json.count; ++i) {
        try {
            console.log(json.results[i].id + ": " + json.results[i].title);
            idArray.push(json.results[i].id)
        } catch (TypeError) {}
    }

    const id = await askQuestion("Which id book would you like to read?");
    const newRequest = await fetch(bookurl + id); 
    const requestJson = await newRequest.json();
    parsedurl = requestJson["formats"]["text/plain; charset=us-ascii"]
    console.log(parsedurl);
    const title = requestJson.title;

    const book = await fetch(parsedurl);
    console.log(book)
    const utf = await book.text();
    return [utf, title]

}

   

async function printBook(book){
    book = book.split(" ")
    let page_num = 1;
    let page = "";
    console.log("\n\n\n\n\n\n\n\n\nPress enter to get to the next page")
    for (let i = 0; i < book.length; i++) {
        // if 250 words, then new page starts
        if (i % 250 == 0){
            page += '\n\n\n ----------END OF PAGE ' + page_num + '----------\n\n\n';
            page_num += 1;
            console.log(page);
            x = await askQuestion("")
            page = "";
        }
        // This checks to see if it is the first word on the page and adds the word to the variable  
        else if((i-1) % 250 == 0){
            const word = book[i];
            page += word;
        }
        // This adds a space for every word that is not the first on a page
        else {
            const word = " " + book[i];
            page += word
        }
    }
}

async function mainLoop(){
    while (true) {
    // cache = [];
        const answer = await askQuestion("What is your search query? or enter .recent for your recent books");
        if (answer == ".recent"){
            console.log(cache);
            const answer = await askQuestion("What order in the queue (numbers: 0-9) is the book that you want");
            const num = parseInt(answer)
            // printBook(cache[answer])
            printBook(cache[num].value)
            // console.log(cache[num].value)
        } else{
            the_answer = await getData(answer)
            title = the_answer[1];
            book = the_answer[0];
            cache = await cacheControl(book, cache, title);
        }
    }
}

mainLoop();
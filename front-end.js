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
    let idArray = [];
    for (let i = 0; i < json.count; ++i) {
        try {
            console.log(json.results[i].id + ": " + json.results[i].title);
            idArray.push(json.results[i].id)
        } catch (TypeError) {}
    }
    if (idArray.length == 0) {
        console.log("No results found");
        return 0;
    } else {
        while (1 == 1){
            const id = await askQuestion("Which id book would you like to read?\n");
            for (let i = 0; i < idArray.length; ++i) {
                if (idArray[i] == id) {
                    const newRequest = await fetch(bookurl + id);
                    const requestJson = await newRequest.json();
                    try {
                        parsedurl = requestJson["formats"]["text/plain; charset=us-ascii"]
                    } catch (TypeError) {
                        console.log("No valid format was found for that text");
                        return 0;
                    }
                    const book = await fetch(parsedurl);
                    const utf = await book.text();
                    return utf
                }
            }
            console.log("That id is not apart of the results listed")
        }
    }
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
    const answer = await askQuestion("What is your search query? or enter .recent for your recent books\n");
    cache = [];
    if (answer == ".recent"){
        console.log(cache);
        const answer = await askQuestion("Which recent book would you like to read?");
        printBook(cache[answer])
    } else{
        book = await getData(answer);
        //cache = await cacheControl(book, cache);
        if (book == 0) {
            mainLoop();
            return
        } else if (book == 1) {
            return;
        } else {
            printBook(book);
        }
    }
}

mainLoop();
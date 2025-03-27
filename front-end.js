const url = 'https://gutendex.com/books?search=';
const bookurl = 'https://gutendex.com/books/'

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
    return cache
}

async function getData(str) {
    const request = await fetch(url + str);
    const json = await request.json();
    for (let i = 0; i < json.count; ++i) {
        console.log(json.result[i].id + json.results[i].title);
    }
    const id = await askQuestion("Which id book would you like to read?");
    const newRequest = await fetch(bookurl + id); 
    parsedurl = search newRequest for //"text/plain: charset=us-ascii"
    const book = await fetch(parsedurl);
    return book
    
}

async function printBook(book){
    console.log(book)
}

async function mainLoop(){
    const answer = await askQuestion("What is your search query? or enter .recent for your recent books");
    cache = [];
    if (answer == ".recent"){
        console.log(cache);
        const answer = await askQuestion("Which recent book would you like to read?");
        printBook(cache[answer])
    } else{
        book = getData(answer);
        // parse and print book
        cache = await cacheControl(book, cache);
    }
    
}
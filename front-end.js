const url = 'https://gutendex.com/books?search=';
const bookurl = 'https://gutendex.com/books/'

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function askQuestion(prompt) {
    return new Promise(resolve => {
        rl.question(prompt, answer => {
            resolve(answer);
        })
    });
}

async function getData(str) {
    const request = await fetch(url + str);
    const json = await request.json();
    for (let i = 0; i < json.count; ++i) {
        console.log(json.result[i].id + json.results[i].title);
    }
    //have user pick the which id they want
    const newRequest = await fetch(bookurl + 221); //Then add
    // parse for "text/plain: charset=us-ascii"
    return book
    
}

async function mainLoop(){
    const answer = await askQuestion("What is your search query?");
    book = getData(answer);
    // parse and print book
}
const url = 'https://gutendex.com/books?search=';
const bookurl = 'https://gutendex.com/books/'

async function getData(str) {
    const request = await fetch(url + str);
    const json = await request.json();
    for (let i = 0; i < json.count; ++i) {
        console.log(json.result[i].id + json.results[i].title);
    }
    //have user pick the which id they want
    const newRequest = await fetch(bookurl + 221); //Then add
    // parse for "text/plain: charset=us-ascii"
    
}

getData("sherlock");
const API_KEY = "c18d8cd4779840608a096e25cff7cdcc";
const url = "https://newsapi.org/v2/everything?q=";



window.addEventListener('load', () => fetchNews("India"));

async function fetchNews(query){
    searchQuery = query.toLowerCase();
    const response = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const responseString = await response.json();
    bindData(responseString.articles);
}

function bindData(articles){
    const cardsContainer = document.getElementById("cards-container");
    const newsCardsTemplete = document.getElementById('template-news-cards');

    cardsContainer.innerHTML = '';
    if(articles.length === 0) cardsContainer.innerHTML = "<h2>No Results..</h2>"
    articles.forEach(news => {
        if(!news.urlToImage) return;
        const cardClone = newsCardsTemplete.content.cloneNode(true);
        fillDataInCard(cardClone,news);
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone,news){
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");

    newsImg.src = news.urlToImage;
    newsTitle.innerHTML = news.title;
    newsDesc.innerHTML = news.description;

    const date = new Date(news.publishedAt).toLocaleString("en-US",{ timeZone: 'Asia/Jakarta'});
    newsSource.innerHTML = `${news.source.name} • ${date}`;

    cardClone.firstElementChild.addEventListener("click", () =>{
        window.open(news.url, "_blank");
    });
}


const listItems = document.querySelectorAll(".item");

listItems.forEach(function(item){
    item.addEventListener("click",function(){
        const itemId = this.getAttribute('id');
        const searchQuery = this.getAttribute('data-search');

        onNavItemClick({id:itemId, searchQuery:searchQuery});
    });
});

let curSelectedNav = null;
function onNavItemClick(data){
    fetchNews(data.searchQuery);
    const navItem = document.getElementById(data.id);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = navItem;
    curSelectedNav.classList.add("active");
}


const searchText = document.getElementById("search-txt");
const searchButton = document.getElementById("search-btn");

function search(){
    const searchQuery = searchText.value;
    if(!searchQuery) return;
    fetchNews(searchQuery);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = null;
    searchText.value = '';
}

searchButton.addEventListener("click", function(event){
    search();
});

function reload(){
    window.location.reload();
}

searchText.addEventListener("keydown",function(event){
    if(event.keyCode === 13){
        search();
    }
});

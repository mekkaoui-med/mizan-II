import { request } from "./api.js";

const articleContainer = document.getElementById("articles-container");
const searchInput = document.getElementById("search-input");
const statusFilter = document.getElementById("status-filter");
const sortFiltered = document.getElementById("sort-filter")
let articleData = [];

async function getArticles(){
    try{
        articleData = await request("/articles")

        displayArticles(articleData)
        


    }catch(error){
        console.log(error.message)
    }
}

function displayArticles(articles){

    articleContainer.innerHTML = "";

    articles.forEach(article => {
            const articleCarrd = document.createElement("div");
            articleCarrd.className = "card";

            const title = document.createElement("h3")
            title.textContent = article.title;
            title.className = "card-title"

            const description = document.createElement("p")
            description.textContent = article.description;
            description.className = "card-description"

            const price = document.createElement("p")
            price.textContent = ` prix :${article.price} MAD`;
            price.className = "card-price"

            const status = document.createElement("p")

            status.textContent = article.status
            status.className = "card-status"

            const articleStatus = article.status
            switch(articleStatus){
                case "available":
                    status.classList.add("positive")
                    break;
                case "sold":
                    status.classList.add("negative")
                    break;
                case "reserved" :
                    status.classList.add("reserved")
                    break;
                default:
                    status.classList.add("positive")
            }


            articleCarrd.append(title,description,price,status)
            
            articleContainer.appendChild(articleCarrd)

        });
}

function searchArticles(){
    const searchValue = searchInput.value.toLowerCase();
    const selectedStatus = statusFilter.value;
    const selectedSoort  = sortFiltered.value;

    const viltredArticles = articleData.filter((article)=>{
        const matchSearch = article.title.toLowerCase().includes(searchValue);

        const matchStatus = selectedStatus === "all" || article.status === selectedStatus;

        return matchStatus && matchSearch;
    });

    viltredArticles.sort((a,b) =>{
        switch(selectedSoort){
            case "title" :
                return a.title.localCompare(b.title);
            case "price-asc":
                return a.price - b.price;
            case "price-desc" :
                return b.price - a.price;
            case "date":
                return new Date(b.createdAt) - new Date(a.createdAt)
            default:
                return 0;
        }
    })

    displayArticles(viltredArticles)
}



searchInput.addEventListener("input", searchArticles)
statusFilter.addEventListener("change", searchArticles)
sortFiltered.addEventListener("change", searchArticles)


async function getArticlesById(id) {
    const article = await request(`/articles/${id}`)
    console.log(article)
}

// getArticlesById()
getArticles();
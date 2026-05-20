const catalogContainer = document.getElementById("catalogContainer");
const articleContainer = document.getElementById("articleContainer");

function renderAnimals(data) {
  if (!catalogContainer) return;

  catalogContainer.innerHTML = "";

  data.forEach((animal) => {
    catalogContainer.innerHTML += `
    
      <a class="animal-card" href="article.html?id=${animal.id}">
      
        <img src="${animal.image}" alt="${animal.name}">
        
        <div class="animal-info">
        
          <h2>${animal.name}</h2>
          
          <h3>${animal.latin}</h3>
          
          <p>${animal.short}</p>
          
        </div>
        
      </a>
    
    `;
  });
}

renderAnimals(animals);

const buttons = document.querySelectorAll(".filter-btn");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    buttons.forEach((btn) => btn.classList.remove("active"));

    button.classList.add("active");

    const category = button.dataset.category;

    if (category === "all") {
      renderAnimals(animals);
    } else {
      const filtered = animals.filter(
        (animal) => animal.category === category
      );

      renderAnimals(filtered);
    }
  });
});

const searchInput = document.getElementById("searchInput");

if (searchInput) {
  searchInput.addEventListener("input", (e) => {
    const value = e.target.value.toLowerCase();

    const filtered = animals.filter((animal) =>
      animal.name.toLowerCase().includes(value)
    );

    renderAnimals(filtered);
  });
}

function renderArticle() {
  if (!articleContainer) return;

  const params = new URLSearchParams(window.location.search);

  const id = Number(params.get("id"));

  const animal = animals.find((item) => item.id === id);

  if (!animal) {
    articleContainer.innerHTML = "<h1>Статья не найдена</h1>";
    return;
  }

  articleContainer.innerHTML = `
  
    <img class="article-image" src="${animal.image}">
    
    <h1>${animal.name}</h1>
    
    <h2>${animal.latin}</h2>
    
    <p>
      ${animal.description}
    </p>
  
  `;
}

renderArticle();
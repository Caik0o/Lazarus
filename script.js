const catalogContainer = document.getElementById("catalogContainer");
const articleContainer = document.getElementById("articleContainer");
const articlesContainer = document.getElementById("articlesContainer");

/* КАТАЛОГ ЖИВОТНЫХ */

function renderAnimals(data) {

  if (!catalogContainer) return;

  catalogContainer.innerHTML = "";

  data.forEach((animal) => {

    catalogContainer.innerHTML += `

      <a class="animal-card" href="article.html?id=${animal.id}">

        <img src="${animal.image}">

        <div class="animal-info">

          <h2>${animal.name}</h2>

          <h3>${animal.latin}</h3>

          <p>${animal.short}</p>

        </div>

      </a>

    `;
  });
}

if (catalogContainer && typeof animals !== "undefined") {
  renderAnimals(animals);
}

/* ФИЛЬТРЫ */

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

/* ПОИСК */

const searchInput = document.getElementById("searchInput");

if (searchInput && typeof animals !== "undefined") {

  searchInput.addEventListener("input", (e) => {

    const value = e.target.value.toLowerCase();

    const filtered = animals.filter((animal) =>
      animal.name.toLowerCase().includes(value)
    );

    renderAnimals(filtered);
  });
}

/* СТРАНИЦЫ ЖИВОТНЫХ */

function renderAnimalArticle() {

  if (!articleContainer || typeof animals === "undefined") return;

  const params = new URLSearchParams(window.location.search);

  const id = Number(params.get("id"));

  const animal = animals.find((item) => item.id === id);

  if (!animal) return;

  articleContainer.innerHTML = `

    <div class="article-content">

      <img class="article-image" src="${animal.image}">

      <div class="article-text">

        <h1>${animal.name}</h1>

        <h2>${animal.latin}</h2>

        <p>${animal.description}</p>

      </div>

    </div>

  `;
}

renderAnimalArticle();

/* СПИСОК СТАТЕЙ */

function renderArticles() {

  if (!articlesContainer || typeof articles === "undefined") return;

  articles.forEach((article) => {

    articlesContainer.innerHTML += `

      <a href="page.html?id=${article.id}" class="article-preview">

        <img src="${article.image}">

        <div class="article-preview-content">

          <h3>${article.title}</h3>

          <p>${article.short}</p>

        </div>

      </a>

    `;
  });
}

renderArticles();

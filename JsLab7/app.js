const content = document.getElementById("content");
const catalogLink = document.getElementById("catalog-link");

const CATEGORIES_URL = "./data/categories.json";

function showError(message) {
  content.innerHTML = `
    <div class="alert alert-danger" role="alert">
      ${message}
    </div>
  `;
}

async function fetchJson(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Помилка завантаження: ${url}`);
  }
  return response.json();
}

function renderCategoryLinks(categories) {
  const links = categories
    .map(
      function (category) {
        return `<a href="#" data-category="${category.shortname}">${category.name}</a>`;
      }
    )
    .join("");

  content.innerHTML = `
    <h2 class="h4 mb-3">Категорії каталогу</h2>
    <div class="category-link-list">
      ${links}
      <a href="#" id="specials-link" class="text-danger border-danger">Specials</a>
    </div>
    <div id="category-notes" class="text-muted"></div>
  `;

  content.querySelectorAll("[data-category]").forEach(function (link) {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      const shortname = event.currentTarget.dataset.category;
      loadCategory(shortname, categories);
    });
  });

  const specialsLink = document.getElementById("specials-link");
  specialsLink.addEventListener("click", function (event) {
    event.preventDefault();
    const randomIndex = Math.floor(Math.random() * categories.length);
    loadCategory(categories[randomIndex].shortname, categories);
  });
}

function renderItems(categoryName, items) {
  const cards = items
    .map(
      function (item) {
        return `
      <article class="col-12 col-md-6 col-xl-4">
        <div class="card item-card h-100">
          <img src="${item.image}" class="card-img-top item-image" alt="${item.name}" />
          <div class="card-body d-flex flex-column">
            <h3 class="h5 card-title">${item.name}</h3>
            <p class="card-text text-muted">${item.description}</p>
            <p class="card-text fw-semibold mb-0 mt-auto">${item.price}</p>
          </div>
        </div>
      </article>
    `;
      }
    )
    .join("");

  content.innerHTML = `
    <h2 class="h4 mb-3">${categoryName}</h2>
    <div class="row g-3">
      ${cards}
    </div>
    <button id="back-to-categories" class="btn btn-outline-primary mt-4">
      Назад до категорій
    </button>
  `;

  document
    .getElementById("back-to-categories")
    .addEventListener("click", async function () {
      await loadCatalog();
    });
}

async function loadCategory(shortname, categories) {
  try {
    const data = await fetchJson(`./data/${shortname}.json`);
    renderItems(data.categoryName, data.items);

    const currentCategory = categories.find(function (c) {
      return c.shortname === shortname;
    });
    if (currentCategory && currentCategory.notes) {
      const notes = document.createElement("p");
      notes.className = "text-muted mt-2";
      notes.textContent = currentCategory.notes;
      content.prepend(notes);
    }
  } catch (error) {
    showError("Не вдалося завантажити вибрану категорію.");
  }
}

async function loadCatalog() {
  try {
    const categories = await fetchJson(CATEGORIES_URL);
    renderCategoryLinks(categories);
  } catch (error) {
    showError("Не вдалося завантажити каталог категорій.");
  }
}

catalogLink.addEventListener("click", async function (event) {
  event.preventDefault();
  await loadCatalog();
});

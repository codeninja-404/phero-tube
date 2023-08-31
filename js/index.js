const loadData = async () => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/videos/categories`
  );
  const dataNest = await res.json();
  const data = dataNest.data;
  displaytCategory(data);
};
const displaytCategory = (data) => {
  const categoryContainer = document.getElementById("category-container");
  data.forEach((data) => {
    const category = document.createElement("div");
    category.innerHTML = `<button onclick = "displaySong(${data.category_id})"
    class=" text-xs md:text-md font-semibold px-4 py-1 bg-gray-300 rounded-sm hover:bg-red-500 hover:text-white focus:text-white focus:bg-red-500">${data.category}
    </button>`;
    categoryContainer.appendChild(category);
    // loadSong(data.category_id);
  });
};

const displaySong = async (dataId) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${dataId}`
  );
  const dataNest = await res.json();
  const data = dataNest.data;
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";
  data.forEach((data) => {
    const dataCard = document.createElement("div");
    dataCard.innerHTML = `
    <p> hello </p>
    `;
    cardContainer.appendChild(dataCard);
  });
};

loadData();

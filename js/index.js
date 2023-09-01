const loadData = async () => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/videos/categories`
  );
  const dataNest = await res.json();
  const data = dataNest.data;
  displaytCategory(data);
  defaultCategory(data);
};
const defaultCategory = (data) => {
  const defaultId = data[0].category_id;
  displaySong(defaultId);
};
const displaytCategory = (data) => {
  const categoryContainer = document.getElementById("category-container");
  data.forEach((data) => {
    const category = document.createElement("div");
    category.innerHTML = `<button onclick = "displaySong(${data.category_id})"
    class=" text-xs md:text-xl font-semibold px-4 py-1 bg-gray-300 rounded-sm hover:bg-red-500 hover:text-white focus:text-white focus:bg-red-500">${data.category}
    </button>`;
    categoryContainer.appendChild(category);
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
    const secoundsStr = data.others.posted_date;
    const secounds = parseInt(secoundsStr);
    // console.log(secounds);

    const toHrAndMn = (secounds) => {
      const minsTotal = Math.floor(secounds / 60);
      // console.log(minsTotal);
      const hours = Math.floor(minsTotal / 60);
      const mins = Math.floor(minsTotal % 60);
      return { h: hours, m: mins };
    };
    const hoursAndMins = toHrAndMn(secounds);
    const dataCard = document.createElement("div");
    dataCard.innerHTML = `
    <div class="card h-full bg-base-100 ">
            <figure class=" bg-black h-48 overflow-y-hidden overflow-x-auto rounded-xl relative">
              <img
                src=${data.thumbnail}
                alt="Shoes"
                class=" w-full  "
              />
              <p id="time" class="text-xs absolute bottom-2 px-2 py-1 rounded-md bg-black/60 text-white right-4 "><span>${hoursAndMins.h}</span> hrs <span>${hoursAndMins.m}</span> min ago</p>
            </figure>
            <div class="flex items-start pt-5">
              <div class="avatar">
                <div class="w-12 h-12 rounded-full">
                  <img
                    src=${data.authors[0].profile_picture}
                  />
                </div>
              </div>
              <div class="card-body pt-1 ">
                <h2 class="card-title">${data.title}</h2>
                <p>${data.authors[0].profile_name}</p>
                <p>${data.others.views} views</p>
                
              </div>
            </div>
          </div>
    `;

    cardContainer.appendChild(dataCard);
  });
};
displaySong();
loadData();

const loadData = async (isSort) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/videos/categories`
  );
  const dataNest = await res.json();
  const data = dataNest.data;
  displaytCategory(data,isSort);
  defaultCategory(data,isSort);
};
const defaultCategory = (data, isSort) => {
  const defaultId = data[0].category_id;
  displaySong(defaultId, isSort);
};
const displaytCategory = (data, isSort) => {
  const categoryContainer = document.getElementById("category-container");
  categoryContainer.innerHTML = "";
  data.forEach((data) => {
    const category = document.createElement("div");
    category.innerHTML = `<button onclick = "displaySong(${data.category_id} ,${isSort})"
    class=" text-xs md:text-xl font-semibold px-4 py-1 bg-gray-300 rounded-md hover:bg-red-500 hover:text-white focus:text-white focus:bg-red-500">${data.category}
    </button>`;
    categoryContainer.appendChild(category);
  });
};

const displaySong = async (dataId, isSort) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${dataId}`
  );
  const dataNest = await res.json();
  const data = dataNest.data;
  const noData = document.getElementById("no-data");
  const cardContainer = document.getElementById("card-container");
  noData.innerHTML = "";
  cardContainer.innerHTML = "";
  if (dataNest.status === true) {
    if (!isSort) {
      data.forEach((data) => {
        const secoundsStr = data.others.posted_date;
        const secounds = parseInt(secoundsStr);
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
                  <p class=" ${!isNaN(hoursAndMins.h) ? "py-1" : ""} ${
          !isNaN(hoursAndMins.h) ? "px-3" : ""
        } text-xs absolute bottom-2  rounded-[6px] bg-gray-900 text-white right-4 "> ${
          !isNaN(hoursAndMins.h) ? hoursAndMins.h + " hrs" : ""
        } ${!isNaN(hoursAndMins.m) ? hoursAndMins.m + " mins ago " : ""} </p>
                </figure>
                <div class="flex items-start pt-5">
                  <div class="avatar">
                    <div class="w-12 h-12 rounded-full">
                      <img
                        src=${data.authors[0].profile_picture}
                      />
                    </div>
                  </div>
                  <div class="card-body pt-1 flex-1">
                    <h2 class="card-title font-bold">${data.title}</h2>
                    <p class="text-sm text-gray-500 font-semibold">${
                      data.authors[0].profile_name
                    } <span>${
          data.authors[0].verified === ""
            ? '<i class="fa-solid fa-certificate text-blue-500"></i>'
            : ""
        }  ${
          data.authors[0].verified === !!true
            ? '<i class="fa-solid fa-certificate text-blue-500"></i>'
            : ""
        }  </span></p>
                    <p class="text-sm text-gray-500 font-semibold">${
                      data.others.views
                    } views</p>
                    
                  </div>
                </div>
              </div>
        `;
        cardContainer.appendChild(dataCard);
      });
    } else {
      const sorted = data.sort((a, b) => {
        const viewA = parseInt(a.others.views);
        const viewB = parseInt(b.others.views);
        if (viewA < viewB) {
          return 1;
        } else if (viewA > viewB) {
          return -1;
        } else {
          return 0;
        }
      });
      sorted.forEach((data) => {
        const secoundsStr = data.others.posted_date;
        const secounds = parseInt(secoundsStr);
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
                  <p class=" ${!isNaN(hoursAndMins.h) ? "py-1" : ""} ${
          !isNaN(hoursAndMins.h) ? "px-3" : ""
        } text-xs absolute bottom-2  rounded-[6px] bg-gray-900 text-white right-4 "> ${
          !isNaN(hoursAndMins.h) ? hoursAndMins.h + " hrs" : ""
        } ${!isNaN(hoursAndMins.m) ? hoursAndMins.m + " mins ago " : ""} </p>
                </figure>
                <div class="flex items-start pt-5">
                  <div class="avatar">
                    <div class="w-12 h-12 rounded-full">
                      <img
                        src=${data.authors[0].profile_picture}
                      />
                    </div>
                  </div>
                  <div class="card-body pt-1 flex-1">
                    <h2 class="card-title font-bold">${data.title}</h2>
                    <p class="text-sm text-gray-500 font-semibold">${
                      data.authors[0].profile_name
                    } <span>${
          data.authors[0].verified === ""
            ? '<i class="fa-solid fa-certificate text-blue-500"></i>'
            : ""
        }  ${
          data.authors[0].verified === !!true
            ? '<i class="fa-solid fa-certificate text-blue-500"></i>'
            : ""
        }  </span></p>
                    <p class="text-sm text-gray-500 font-semibold">${
                      data.others.views
                    } views</p>
                    
                  </div>
                </div>
              </div>
        `;
        cardContainer.appendChild(dataCard);
      });
    }
  } else {
    const dataCard = document.createElement("div");
    dataCard.innerHTML = `
    <div class="hero  ">
  <div class="hero-content text-center py-32 ">
    <div class="max-w-md">
    <img class="my-6 shadow-2xl border-2 rounded-full w-4/12 mx-auto" src=${"/images/404.jpg"} />
      <h1 class="text-4xl font-bold">Oops!! Sorry, There is no 
      content here</h1>
    </div>
  </div>
</div>

    `;
    noData.appendChild(dataCard);
  }
};
const sortByView = () => {
  let isSort = true;
  loadData(isSort)
};
displaySong();
loadData();

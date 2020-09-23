//json으로 부터 데이터를 받아옴
function loadItems() {
  return fetch("data/data.json")
    .then((response) => response.json())
    .then((json) => json.items);
}

//리스트 업데이트 및 loadItems를 통한 아이템 받기
function displayItems(items) {
  const container = document.querySelector(".items");
  container.innerHTML = items.map((item) => createHtmlString(item)).join("");
}

function onButtonClick(event, items) {
  const dataset = event.target.dataset;
  const key = dataset.key;
  const value = dataset.value;

  if (key == null || value == null) {
    return;
  }
  //updateItems(items, key, value);
  displayItems(items.filter((item) => item[key] === value));
}

/*
function updateItems(items, key, value){
    items.forEach(item => {
        if(item.dataset.[key] === value){
            item.classList.remove('');
        }else{
            item.classList.add('');
        }
    });
} 
*/

function setEventListeners(items) {
  const logo = document.querySelector(".logo");
  const buttons = document.querySelector(".buttons");
  logo.addEventListener("click", () => displayItems(items));
  buttons.addEventListener("click", (event) => onButtonClick(event, items));
}

//html 소스 생성
function createHtmlString(item) {
  return `
        <li class="item">
            <img src="${item.image}" alt="${item.type}" class="item__thumbnail" />
            <span class="item__description">${item.gender}, ${item.size}</span>
        </li>  
    `;
}
//메인 함수
loadItems()
  .then((items) => {
    displayItems(items);
    setEventListeners(items);
  })
  .catch(console.log);

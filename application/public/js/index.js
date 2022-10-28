let count = document.getElementById("postCounter");
fetch('https://jsonplaceholder.typicode.com/albums/2/photos')
  .then((response) => response.json())
  .then((data) => data.forEach(file => {
    //add images and title to div
    let div = document.createElement("div");
    div.classList.add("fadingTile");


    let img = document.createElement("img");
    img.src = file["url"];
    div.appendChild((img));

    let title = document.createElement("p");
    title.innerText = file["title"];
    div.appendChild(title);

    document.getElementById("splash").appendChild(div);
    count.innerText++;
  }))
  .then(() => {
    const tiles = document.querySelectorAll(".fadingTile");
    console.log(tiles);
    tiles.forEach( (tile) => {
      tile.addEventListener('click', (e) => {
        tile.style.opacity = 0;
        count.innerText--;
      });
      tile.addEventListener('transitioned', (e) => {
        tile.remove();
      });
    });
  });

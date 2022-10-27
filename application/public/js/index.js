fetch('https://jsonplaceholder.typicode.com/albums/2/photos')
  .then((response) => response.json())
  .then((data) => data.forEach(file => {
    let img = document.createElement("img");
    img.src = file["url"];
    document.getElementById("splash").appendChild(img);
    let title = document.createElement("p");
    title.innerText = file["title"];
    img.appendChild(title);
  }));

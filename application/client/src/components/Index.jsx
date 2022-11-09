import Header from './Header';
import Footer from './Footer';
import Navbar from './Navbar';
import React from 'react';

class Index extends React.Component {
  render() {
    return (
    <html>
      <head>
        <link rel="stylesheet" type="text/css" href="../css/style.css" />
        <title>Index</title>
        <script defer type="text/javascript" src="../js/index.js"> </script>
      </head>
      <body className="index">
        <Header />
        <Navbar />
        <main id="indexMain" className="indexMain">
          <h1 id="postCounter" className="postCounter">
            0
          </h1>
          <section id="splash" className="splash">
          </section>
        </main>
        <Footer />
      </body>
    </html>
    );
  }

  componentDidMount() {
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
        tiles.forEach( (tile) => {
          tile.addEventListener('click', () => {
            tile.style.opacity = 0;
          });
          tile.addEventListener('transitionend', () => { 
            tile.remove();
            count.innerText--;
          });
        });
      });
  }
}

export default Index;

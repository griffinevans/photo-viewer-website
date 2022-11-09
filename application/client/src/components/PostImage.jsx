class PostImage extends React.Component {
  render() {
    <html>
      <head>
        <link rel="stylesheet" type="text/css" href="../css/style.css" />
        <title>Post Image</title>
      </head>
    
      <body>
        <nav>
          <a href="index.html">Index</a>
          <a href="login.html">Login</a>
          <a href="registration.html">Registration</a>
          <a href="postimage.html">Post Image</a>
          <a href="viewpost.html">View Post</a>
        </nav>
        <section class="card">
          <h1>Upload Image</h1>
          <form class="form-field">
            <label for="title"> Post title </label>
            <input type="text" id="title" name="title" />
            <label> Post description </label>
            <input type="text" name="description" />
            <label for="image"> Choose a picture: </label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/png, image/jpeg, image/webp"
            />
            <div class="checkbox">
              <input type="checkbox" id="tos" name="tos" />
              <label for="tos">
                Acknowledge you have read and understood the
                <a href="">Acceptable Use Policy</a>
              </label>
            </div>
            <button>Upload</button>
          </form>
        </section>
      </body>
    </html>
  }
}

import React from 'react';
import Navbar from '../components/Navbar.jsx';

class ViewPost extends React.Component {
  render() {
    return (
      <body>
        <Navbar />
        <main>
          <section class="card">
            <h2>Justice</h2>
            <p>+1 The lieutenant trusts you.<br />+2 Kim *truly* trusts you.</p>
            <p>March 4th, '51</p>
            <img src="../images/Portrait_kitsuragi.png" />
          </section>
        </main>
      </body>
    );
  }
}

export default ViewPost;

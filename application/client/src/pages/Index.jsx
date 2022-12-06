import React, {useState, useEffect }from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Forbidden } from './Forbidden.jsx';
import { Navbar } from '../components/Navbar';
import { queryLogin } from '../api/protectors.js';
import { toast } from 'react-toastify';
const fuzzysort = require('fuzzysort');

export const Index = () => {

  const [posts, setPosts] = useState([]);
  const [auth, setAuth] = useState(false);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect( () => {
    const runLoginQuery = async () => {
      setAuth(await queryLogin());
    }
    runLoginQuery();

    fetch('/api/posts/getRecentPosts')
      .then( response => response.json())
      .then( res_json => setPosts(res_json))
      .catch( err => console.log(err));

  }, []);

  useEffect( () => {
    console.log(searchTerm);
  }, [searchTerm]);

  const goToPage = (postId) => {
    if(auth) {
      window.location.href=`posts/${postId}`;
    } 
    else {
      toast.error('You must be logged in to view posts');
      toast.clearWaitingQueue();
    }
  }

  const filterPost = (post) => {
    if(!searchTerm) {
      return true;
    }
    //console.log(post);
    const results = fuzzysort.go(searchTerm,[post],{
      threshold: -1000,
      keys: ["title","description","author"]
    });
    return(results.length);
  }

  return (
    <div className="index">
      <Header />
      <Navbar posts={posts} />
      <main id="indexMain" className="indexMain">
        <input type="text" className="searchPosts" placeholder="Search posts" onChange={e => setSearchTerm(e.target.value)}/>
        <section id="splash" className="splash"> 
          {
          posts.filter(post => filterPost(post)).map( (post) => (
            <div onClick={() => goToPage(post["id"])} key={post.id} className="postContainer">
              <div className = "postContents">
                <img src={post["thumbnail"]} />
                <p>{post["title"]}</p>
              </div>
            </div>
          ))
          }
        </section>
      </main>
      <Footer />
    </div>
  );

}


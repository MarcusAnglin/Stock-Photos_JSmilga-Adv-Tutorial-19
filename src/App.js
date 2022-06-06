import React, { useState, useEffect, useRef } from "react";
import { FaSearch } from "react-icons/fa";
import Photo from "./Photo";

// api links
const mainUrl = `https://api.unsplash.com/photos/`;
const searchUrl = `https://api.unsplash.com/search/photos/`;

// api access key from .env file
const clientID = `?client_id=${process.env.REACT_APP_ACCESS_KEY}`;

function App() {
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [newImages, setNewImages] = useState(false);

  const mounted = useRef(false);

  // calls the mainUrl for the api and receives the initial images
  // sets loading based on whether the api call was successful or not.
  const fetchImages = async () => {
    setLoading(true);

    let url;
    const urlPage = `&page=${page}`;
    const urlQuery = `&query=${query}`;

    // checks the form use state variable, if there is a value then url is
    // set to use the search api. If the form state variable is empty then
    // use regualr api
    if (query) {
      url = `${searchUrl}${clientID}${urlPage}${urlQuery}`;
    } else {
      url = `${mainUrl}${clientID}${urlPage}`;
    }

    try {
      const response = await fetch(url);
      const data = await response.json();
      setPhotos((oldData) => {
        if (query && page === 1) {
          return data.results;
        } else if (query) {
          return [...oldData, ...data.results];
        } else {
          return [...oldData, ...data];
        }
      });
      setNewImages(false);
      setLoading(false);
    } catch (error) {
      setNewImages(false);
      setLoading(false);
      console.log(error);
    }
  };

  // This function controls the forum submit. if the controlled input is
  // empty the function does nothing and returns, if there is a value and
  // it’s on the first page then the fetchImages function is called.
  // fetchImages then decides what to do with the form value. after every
  // valid search page is set to 1
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!query) return;
    if (page === 1) {
      fetchImages();
      return;
    }
    setPage(1);
  };

  // useEffect for initial page load, also calls fetchImages function when
  // page number changes
  useEffect(() => {
    fetchImages();
  }, [page]);

  // this useEffect is designed to do nothng on inital load. we need this effect to run after evething has loaded we do this with a useRef variable. the variable is initalized to false then on inital load it is set to true and the control is immediately returned. we only want to run this when newImages is changed.
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    if (!newImages) return;
    if (loading) return;
    setPage((oldPage) => {
      return oldPage + 1;
    });
  }, [newImages]);

  const event = () => {
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 2) {
      setNewImages(true);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", event);
    return () => window.removeEventListener("scroll", event);
  }, []);

  // HTML part of the component.
  return (
    <main>
      <section className="search">
        <form className="search-form">
          <input
            type="text"
            className="form-input"
            placeholder="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <button type="submit" className="submit-btn" onClick={handleSubmit}>
            <FaSearch />
          </button>
        </form>
      </section>
      <section className="photos">
        <div className="photos-center">
          {photos.map((photo) => {
            return <Photo key={photo.id} {...photo} />;
          })}
        </div>
        {loading ? <h2 className="loading">loading...</h2> : null}
      </section>
    </main>
  );
}

export default App;

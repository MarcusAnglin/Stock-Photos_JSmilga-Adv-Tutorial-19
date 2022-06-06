import React, { useState, useEffect } from "react";
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
  const [page, setPage] = useState(0);
  const [query, setQuery] = useState("");

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
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setPage(1);
  };

  // useEffect for initial page load, also calls fetchImages function when
  // page number changes
  useEffect(() => {
    fetchImages();
  }, [page]);

  // useEffect for the continuous scroll feature.
  // takes the height of the browser view and adds that to how much the
  // page has scrolled.
  // these two numbers combined are equal to the scroll height (the total
  // height of the page). when these numbers are equal (or very close)
  // update the page state variable (which triggers a rerender)
  useEffect(() => {
    const event = window.addEventListener("scroll", () => {
      if (
        !loading &&
        window.innerHeight + window.scrollY >= document.body.scrollHeight - 1
      ) {
        setPage((oldPage) => {
          return oldPage + 1;
        });
      }
    });
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

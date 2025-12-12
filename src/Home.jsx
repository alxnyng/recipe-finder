import React, { useState } from "react";
import { IoSearchCircleSharp } from "react-icons/io5";
import { GiChefToque } from "react-icons/gi";


function Home(){
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  const API_KEY = 'cbeaaad78a9f4c09aa17d60143989841';

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  const searchRecipes = async () => {
    if (!query) return;

    setLoading(true);

    try {
      const res = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?query=${query}&number=10&apiKey=${API_KEY}`
      );
      const data = await res.json();
      setRecipes(data.results);
    } catch (err) {
      console.error("Error fetching recipes", err);
    }

    setLoading(false);
  };

  return (
    <>
      <div>
        <div className="header-icon">
          <i> <GiChefToque /> </i>
        </div>
        <div className="header-left">
     <span className="welcome">Welcome!</span>
    <h2 className="greeting">{getGreeting()}</h2>
     <span className="product">A product of Alex Nyanteng</span>
    </div>

          <div className="section">
            <div className="input">
              <i onClick={searchRecipes} style={{ cursor: "pointer" }}>
                <IoSearchCircleSharp />
              </i>

              <input
                type="text"
                placeholder="Which food are you thinking of?"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && searchRecipes()}
              />
            </div>

            <div className="results">
              {loading && (
                <div className="loader-wrapper">
                  <span className="loader"></span>
                  <p>Finding recipes...</p>
                </div>
              )}

              {recipes.map((recipe) => (
                <div key={recipe.id} className="card">
                  <img
                    src={`https://spoonacular.com/recipeImages/${recipe.id}-312x231.jpg`}
                    alt={recipe.title}
                    width={200}
                  />
                  <h3>{recipe.title}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>  
    </>
  );
}

export default Home;
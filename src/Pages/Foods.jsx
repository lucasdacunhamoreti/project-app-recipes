import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import RecipesContext from '../Context/RecipesContext';

import Header from '../Components/Header';
import apiFoods from '../services/dataFoods';
import Footer from '../Components/Footer';
import Category from '../Components/Category';

import './Foods.css';
import './Card.css';

function Foods() {
  const history = useHistory();
  const {
    dataApiFoods,
    setDataApiFoods,
    typeFilter,
  } = useContext(RecipesContext);

  const handleResponse = () => {
    const { idMeal } = dataApiFoods[0];
    history.push(`/foods/${idMeal}`);
  };

  useEffect(() => {
    async function fetch() {
      const returnApiFoods = await apiFoods('name-ingredient', '');
      setDataApiFoods(returnApiFoods.meals);
    }
    fetch();
  }, [setDataApiFoods]);

  const MAX_QUANTITY_RECIPES = 12;
  return (
    <div className="foods">
      <Header />
      <Category />
      {dataApiFoods.length === 1 && typeFilter === 'input' ? handleResponse()
        : dataApiFoods.map((food, index) => (
          (index < MAX_QUANTITY_RECIPES)
        && (
          <div
            className="card"
            key={ index }
            data-testid={ `${index}-recipe-card` }
          >
            <img
              data-testid={ `${index}-card-img` }
              src={ food.strMealThumb }
              alt={ food.strMealThumb }
            />
            <span data-testid={ `${index}-card-name` }>{ food.strMeal }</span>
          </div>)
        ))}
      <Footer />
    </div>
  );
}

export default Foods;

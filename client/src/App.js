import './App.css';
import {Route} from 'react-router-dom'
import LandingPage from './components/LandingPage/LandingPage'
import Home from './components/Home/Home';
import CreateRecipe from './components/CreateRecipe/CreateRecipe';
import RecipeDetail from './components/DetailRecipe/RecipeDetail';
import React from 'react';


function App() {
  return (
    <div className='App'>
      <Route exact path="/" component={LandingPage} />
      <Route path='/home' component={Home} />
      <Route path='/home/:id' component={RecipeDetail} />
      <Route path='/create' component={CreateRecipe} />
    </div>
  );
}

export default App;

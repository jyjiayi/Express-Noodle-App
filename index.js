import express from 'express';
import {read} from './jsonFileStorage.js';

const app = express();

const getRecipeByIndex = (request, response) => {
  console.log('request came in');
  read ('data.json', (err, data) =>{
    const input = request.params.index;
    const recipe = data.recipes[input];
    console.log(recipe);
    if (recipe)
    response.send(recipe);
    else {
      response.status(404).send('Sorry, we cannot find that!');
    }
  })
}

const getRecipeByYield = (request, response) => {
  console.log('request came in');
  read ('data.json', (err, data) =>{
    const yieldReq = request.params.portion;
    const recipeReq = data.recipes.filter((element) => element.yield === 1);
    if (recipeReq)
    response.send(recipeReq);
    else {
      response.status(404).send('Sorry, we cannot find that!');
    }
  })
}

const getRecipeByLabel = (request, response) => {
  console.log('request came in');
  read ('data.json', (err, data) =>{
    const input = request.params.label;
    const tempLabel = input.split('-');
    let labelReq = tempLabel.join(' ');
    console.log(labelReq);
    const recipeReq = data.recipes.filter((element) => element.label.toLowerCase() === labelReq);
    if (recipeReq)
    response.send(recipeReq);
    else {
      response.status(404).send('Sorry, we cannot find that!');
    }
  })
}

app.get('/recipe/:index', getRecipeByIndex);
app.get('/yield/:portion', getRecipeByYield);
app.get('/recipe-label/:label', getRecipeByLabel);

app.listen(3004);
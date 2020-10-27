const express = require("express");
const cors = require("cors");

const { v4: uuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  response.status(200).json(repositories)
});

app.post("/repositories", (request, response) => {
  const {title,url,techs} = request.body; 
  const repository = {id:uuid(), title,url,techs, likes:0}
  repositories.push(repository)
  response.status(200).json(repository)
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const indexRepository = repositories.findIndex(repository => repository.id == id)
  
  if (indexRepository < 0) {
    return response.status(400).json({error: 'not found'})
  }

  repositories[indexRepository] = {...request.body, id:repositories[indexRepository].id, likes: repositories[indexRepository].likes}
  response.status(200).json(repositories[indexRepository])
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const indexRepository = repositories.findIndex(repository => repository.id == id)
  if (indexRepository < 0) {
    return response.status(400).json({error: 'not found'})
  }
  repositories.splice(indexRepository, 1)
  response.status(204).json({message: "success"})
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;
  const indexRepository = repositories.findIndex(repository => repository.id == id)
  if (indexRepository < 0) {
    return response.status(400).json({error: 'not found'})
  }
  const likes =  repositories[indexRepository].likes + 1
  console.log(likes)
  repositories[indexRepository].likes = likes
  repositories[indexRepository] = {...repositories[indexRepository]  }
response.status(200).json({likes});

});

module.exports = app;

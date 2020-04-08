const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

var getRepositories = function(request, response) {
  return response.json(repositories);
};

app.get('/repositories', getRepositories);

app.post("/repositories", (request, response) => {
  const {title,url,techs} = request.body;

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  }

  repositories.push(repository);

  return response.json(repository);

});

app.put("/repositories/:id", (request, response) => {
  const {id} = request.params;
  const {title,url,techs} = request.body;
  
  app.get('/repositories', getRepositories);

  const repoIndex = repositories.findIndex(repository => repository.id === id);

  if(repoIndex < 0) return response.status(400).json({error: 'Repository not found'});

  const numLikes = repositories[repoIndex].likes;


  const repository = {
    id,
    title,
    url,
    techs,
    likes: numLikes
  }

  repositories[repoIndex] = repository;

  return response.json(repository);
});

app.delete("/repositories/:id", (request, response) => {
  const {id} = request.params;

  const repoIndex = repositories.findIndex(repository => repository.id === id);

  if(repoIndex < 0) return response.status(400).json({error: 'Repository not found'});

  repositories.splice(repoIndex, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const {id} = request.params;
  
  app.get('/repositories', getRepositories);

  const repoIndex = repositories.findIndex(repository => repository.id === id);

  if(repoIndex < 0 ) return response.status(400).json({error: 'Repository not found'});

  const objRepo = repositories[repoIndex];
  
  const repository = {
  id: id,
  title: objRepo.title,
  url: objRepo.url,
  techs: objRepo.techs,
  likes: objRepo.likes + 1
  }

  repositories[repoIndex] = repository;

  return response.json(repository);

});

module.exports = app;

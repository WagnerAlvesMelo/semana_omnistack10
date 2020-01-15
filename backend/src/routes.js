const {Router} = require('express');
const axios    = require('axios');
const Dev      = require('./models/Dev');

const routes = Router();

routes.post('/devs', async (request,response) =>{
    const { github_username, techs } = request.body;

    const apiResponse = await axios.get(`http://api.github.com/users/${github_username}`);

    let {name, avatar_url, bio} = apiResponse.data;

    if(!name)
        name = apiResponse.data.login;        
    
    const techsArray = techs.split(',').map(tech => tech.trim());

    const dev = await Dev.create({
        github_username,
        name,
        avatar_url,
        bio,
        techs: techsArray
    })

    return response.json(dev);
});

module.exports = routes;
import mongoose from 'mongoose';
import User from './models/user';
import Pet from './models/pet';
import fetch from 'isomorphic-fetch';


function getData(){

  const modelUrl = "https://gist.githubusercontent.com/isuvorov/55f38b82ce263836dadc0503845db4da/raw/pets.json"
  let model = {};

  fetch(modelUrl)
    .then(async (res) => {
      model = await res.json();
      let users = model.users;

      model.users.forEach(function (user){
        const userTemp = new User(user);
        userTemp.save(function(err) {
          if (err)
            res.send(err);
        });
      });

      model.pets.forEach(function (pet){
        const petTemp = new Pet(pet);
        petTemp.save(function(err) {
          if (err)
            res.send(err);
        });
      });


    })
    .catch(err => console.log('Error:', err));
}


module.exports = getData;
import express from 'express';
import cors from 'cors';
import Promise from 'bluebird';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import User from './models/user';
import Pet from './models/pet';
import getData from './getData';
import _ from 'lodash';

const app = express();
const router = express.Router();

mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/task3B');
/*getData();*/   //uncomment for receive new data



app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


router.use(function(req, res, next) {
  console.log('req.url = ', req.url);
  next(); // make sure we go to the next routes and don't stop here
});


router.get('/', async(req, res) => {
  const users = await User.find({},'-_id -__v');
  const pets = await Pet.find({},'-_id -__v');
  res.json({
    users: users,
    pets: pets
  })

});


async function HelperUtils (pets) {
  let result = [];
  const array =  pets.forEach(function(pet) {
    result.push(pet.userId);
  });
  return _.sortBy(result);
}


router.route('/users')
  .get(async(req, res)=> {

    let query = {};
    if (req.query.havePet)
    {
      let pets = await Pet.find({'type': req.query.havePet},'userId -_id');
      pets = await HelperUtils(pets);
      const users = await User.find({id: {$in: pets}}, '-_id -__v');
      res.json(users);
    }
      const users = await User.find(query,'-_id -__v');
      res.json(users);

  });

router.route('/users/:id')
  .get(async (req, res)=> {
    let idOrUserName = _.parseInt(req.params.id);
    if(!_.isNaN(idOrUserName)){
      const user = await User.findOne({'id':req.params.id},'-_id -__v');
      if (user){
        res.json(user);
      }
      else
        res.status(404).send('Not Found');
    }
    else{
      const user = await User.findOne({'username':req.params.id},'-_id -__v');
      if (user){
        res.json(user);
      }
      else
        res.status(404).send('Not Found');
    }
  });

router.route('/pets/:id')
  .get(async (req, res)=> {
    const pet = await Pet.findOne({'id':req.params.id},'-_id -__v');
    if (pet){
      res.json(pet);
    }
    else
      res.status(404).send('Not Found');
  });

router.route('/pets')
  .get( async(req, res)=> {
      let query = {};
    if (req.query.type){
      query.type = req.query.type
    }
    if (req.query.age_gt){
      if (query.age){
        query.age = {$gt:req.query.age_gt , $lt:req.query.age_lt}
      }
      else{
        query.age = {$gt:req.query.age_gt}
      }
    }
    if (req.query.age_lt){
      if (query.age){
        query.age = {$gt:req.query.age_gt , $lt:req.query.age_lt}
      }
      else{
        query.age = {$lt:req.query.age_lt}
      }
    }
    const pets = await Pet.find(query,'-_id -__v');
    res.json(pets);
  });

async function HelperPopulate(pets){

}

app.get('/pets/populate',async(req, res)=> {
  let pets = await Pet.findOne({'id': 1},'').populate(
    {
      path: 'userId'
    }
  );
  res.json(pets);
});

app.use('/', router);

app.listen(3000, function () {
});
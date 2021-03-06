require('dotenv').config();
const mongoose = require('mongoose');
const { Schema } = mongoose;

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

let personSchema = new Schema({
    name:  { type:String, required: true },
    age: Number,
    favoriteFoods: [String]
});

const Person = mongoose.model('Person', personSchema);

const simo = new Person({
    name: "Simo Nkosi",
    age: 28,
    favoriteFoods: ["Seafood", "vegetables"]
});

const createAndSavePerson = (done) => {
  let routy = new Person({name: "Routy Miles", age: 21, favoriteFoods: ["Doughnuts", "Pizza", "Burgers"]});

  routy.save((error,data) => {
    if(error) {
      console.log(error);
    } else {
      done(null , data);
    }
  });
};

let arrayOfPeople = [
  {name: "Jon Snow", age: 27, favoriteFoods: ["Meat"]},
  {name: "Edhard Stark", age: 45, favoriteFoods: ["Wings"]},
  {name: "Sansa Stark", age: 25, favoriteFoods: ["Grapes"]}
]

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (error, data) => {
    if(error) {
      console.log(error);
    } else {
      done(null , data);
    }
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, (error, data) => {
    if(error) {
      console.log(error);
    } else {
      done(null , data);
    }
  });
};

const findOneByFood = (food, done) => {
    Person.findOne({favoriteFoods: food}, (error, data) => {
    if(error) {
      console.log(error);
    } else {
      done(null , data);
    }
  });
};

const findPersonById = (personId, done) => {
  Person.findById(personId, (error, person) => {
    if(error) {
      console.log(error);
    } else {
      done(null , person);
    }
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  Person.findById(personId, (error, person) => {
    if(error) {
      console.log(error);
    } else {
      Person.update({favoriteFoods: person.favoriteFoods.push(foodToAdd)}, (err, rawResponse) => {
        if(err) {
          console.log(error);
        } else {
          console.log(rawResponse);
        }
      });

      person.save((error, data) => {
        if(error) {
          console.log(error);
        } else {
          done(null , data);
        }
      });
    }
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate(
    {name: personName}, 
    {age: ageToSet}, 
    { new: true }, 
    (error, data) => {
      if(error) {
        console.log(error);
      } else {
        done(null , data);
      }
    }
  );
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (error, data) => {
    if(error) {
      console.log(error);
    } else {
      done(null , data);
    }
  });
  
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  Person.remove({name: nameToRemove}, (error, data) => {
    if(error) {
      console.log(error);
    } else {
      done(null , data);
    }
  });
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  Person.find({favoriteFoods: {$all: foodToSearch}})
    .sort({name: 'asc'})
    .limit(2)
    .select('-age')
    .exec((error, data) => {
      if(error) {
        console.log(error);
      } else {
        done(null , data);
      }
    })
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;

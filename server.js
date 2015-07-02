import express from 'express';
import {mockPeople} from './mockData/people';
import R from 'Ramda';
var app = express();

function filterbySkill(skills){
  let skillsArr = makeArray(skills);

  return R.compose(
    R.reverse,
    R.sortBy((person) => {
      return person.match;
    }),
    R.filter((person) => {
      return person.match !== 0
    }),
    R.map((person) => {
      person.match = R.intersection(person.skills,skillsArr).length;
      return person;
    })
    )(mockPeople)

};

function makeArray(input){
  return Array.isArray(input) ? input: [input];
}

app.get('/api/people', function (req, res) {
  res.send(filterbySkill(req.query.skills));
});


var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});
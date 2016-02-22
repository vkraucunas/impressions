var idCounter = 0;
var Restaurant = function(inputObj) {
    idCounter += 1;
    this.id = idCounter;
    this.name = inputObj.name;
    this.img = inputObj.img;
    this.foodType = inputObj.foodType;
    this.city = inputObj.city;
    this.state = inputObj.state;
    this.rating = inputObj.rating;
    this.descript = inputObj.descript;
}


var rest1 = new Restaurant({
    name: "Phomiliar",
    img: 'http://localhost:3000/images/pho1.jpg',
    foodType: "Vietnamese",
    city: "Austin",
    state: "TX",
    rating: [
                {type:"fullStar"},
                {type:"fullStar"},
                {type:"fullStar"},
                {type:"fullStar"},
                {type:"fullStar"}
            ],
    descript: "Bacon ipsum dolor amet pork loin ham hock short ribs shank cupim turducken tongue, prosciutto ball tip jowl pig capicola. Shoulder corned beef frankfurter, ham t-bone ribeye pork loin hamburger spare ribs brisket beef tail rump bresaola. Shankle jerky hamburger bresaola t-bone alcatra tri-tip turkey shoulder beef bacon tongue pork ham sirloin.",
    descript: "Bacon ipsum dolor amet pork loin ham hock short ribs shank cupim turducken tongue, prosciutto ball tip jowl pig capicola. Shoulder corned beef frankfurter, ham t-bone ribeye pork loin hamburger spare ribs brisket beef tail rump bresaola. Shankle jerky hamburger bresaola t-bone alcatra tri-tip turkey shoulder beef bacon tongue pork ham sirloin."
});
var rest2 = new Restaurant({
    name: "Mucha Muchacha's",
    img: 'http://localhost:3000/images/mexican.jpg',
    foodType: "Mexican",
    city: "Phoenix",
    state: "AZ",
    rating: [
                {type:"fullStar"},
                {type:"fullStar"},
                {type:"fullStar"},
                {type:"fullStar"},
                {type:"emptyStar"}
            ],
    descript: "Bacon ipsum dolor amet pork loin ham hock short ribs shank cupim turducken tongue, prosciutto ball tip jowl pig capicola. Shoulder corned beef frankfurter, ham t-bone ribeye pork loin hamburger spare ribs brisket beef tail rump bresaola. Shankle jerky hamburger bresaola t-bone alcatra tri-tip turkey shoulder beef bacon tongue pork ham sirloin."
});
var rest3 = new Restaurant({
    name: "Green Lantern",
    img: 'http://localhost:3000/images/steak.jpg',
    foodType: "American",
    city: "Decatur",
    state: "NE",
    rating: [
                {type:"fullStar"},
                {type:"emptyStar"},
                {type:"emptyStar"},
                {type:"emptyStar"},
                {type:"emptyStar"}
            ],
    descript: "Bacon ipsum dolor amet pork loin ham hock short ribs shank cupim turducken tongue, prosciutto ball tip jowl pig capicola. Shoulder corned beef frankfurter, ham t-bone ribeye pork loin hamburger spare ribs brisket beef tail rump bresaola. Shankle jerky hamburger bresaola t-bone alcatra tri-tip turkey shoulder beef bacon tongue pork ham sirloin."
});
var rest4 = new Restaurant({
    name: "Dundee's",
    img: 'http://localhost:3000/images/pub.jpg',
    foodType: "Pub",
    city: "Charlotte",
    state: "SC",
    rating: [
                {type:"fullStar"},
                {type:"fullStar"},
                {type:"emptyStar"},
                {type:"emptyStar"},
                {type:"emptyStar"}
            ],
    descript: "Bacon ipsum dolor amet pork loin ham hock short ribs shank cupim turducken tongue, prosciutto ball tip jowl pig capicola. Shoulder corned beef frankfurter, ham t-bone ribeye pork loin hamburger spare ribs brisket beef tail rump bresaola. Shankle jerky hamburger bresaola t-bone alcatra tri-tip turkey shoulder beef bacon tongue pork ham sirloin."
});
var rest5 = new Restaurant({
    name: "Green House",
    img: 'http://localhost:3000/images/salad.jpg',
    foodType: "Vegetarian",
    city: "Portland",
    state: "OR",
    rating: [
                {type:"fullStar"},
                {type:"fullStar"},
                {type:"fullStar"},
                {type:"fullStar"},
                {type:"emptyStar"}
            ],
    descript: "Bacon ipsum dolor amet pork loin ham hock short ribs shank cupim turducken tongue, prosciutto ball tip jowl pig capicola. Shoulder corned beef frankfurter, ham t-bone ribeye pork loin hamburger spare ribs brisket beef tail rump bresaola. Shankle jerky hamburger bresaola t-bone alcatra tri-tip turkey shoulder beef bacon tongue pork ham sirloin."
});
var rest6 = new Restaurant({
    name: "Low Country",
    img: 'http://localhost:3000/images/boil.jpg',
    foodType: "Cajun",
    city: "New Orleans",
    state: "LA",
    rating: [
                {type:"fullStar"},
                {type:"fullStar"},
                {type:"emptyStar"},
                {type:"emptyStar"},
                {type:"emptyStar"}
            ],
    descript: "Bacon ipsum dolor amet pork loin ham hock short ribs shank cupim turducken tongue, prosciutto ball tip jowl pig capicola. Shoulder corned beef frankfurter, ham t-bone ribeye pork loin hamburger spare ribs brisket beef tail rump bresaola. Shankle jerky hamburger bresaola t-bone alcatra tri-tip turkey shoulder beef bacon tongue pork ham sirloin."
});

var restaurants = [ rest1, rest2, rest3, rest4, rest5, rest6 ];

module.exports = {
    Restaurant: Restaurant,
    restaurants: restaurants
};
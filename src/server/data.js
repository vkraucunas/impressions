var idCounter = 0;
var Restaurant = function(inputObj) {
    idCounter += 1;
    this.id = idCounter;
    this.name = inputObj.name;
    this.img = inputObj.img;
    this.foodType = inputObj.foodType;
    this.city = inputObj.city;
    this.state = inputObj.state;
    this.rating = inputObj.rating
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
            ]
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
            ]
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
            ]
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
            ]
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
            ]
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
            ]
});

var restaurants = [ rest1, rest2, rest3, rest4, rest5, rest6 ];

module.exports = {
    Restaurant: Restaurant,
    restaurants: restaurants
};
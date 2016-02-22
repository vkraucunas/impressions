module.exports = {
    Restaurant: Restaurant,
    restaurants: restaurants
};


var Restaurant = function(inputObj) {
    this.name = inputObj.name;
    this.img = inputObj.img;
    this.foodType = inputObj.foodType;
    this.city = inputObj.city;
    this.state = inputObj.state;
    this.rating = inputObj.rating
}


var rest1 = new Restaurant({
    name: "Phomiliar",
    img: 'http://localhost:3000/images/logo.png',
    foodType: "Vietnamese",
    city: "Austin",
    state: "TX",
    rating: 5
});
var rest2 = new Restaurant({
    name: "Mucha Muchacha's",
    img: '',
    foodType: "Mexican",
    city: "Omaha",
    state: "NE",
    rating: 4
});
var rest3 = new Restaurant({
    name: "Green Lantern",
    img: '',
    foodType: "Steakhouse",
    city: "Decatur",
    state: "NE",
    rating: 1
});
var rest4 = new Restaurant({
    name: "Dundee's",
    img: '',
    foodType: "Pub",
    city: "Charlotte",
    state: "SC",
    rating: 2
});
var rest5 = new Restaurant({
    name: "Green House",
    img: '',
    foodType: "Vegetarian",
    city: "Portland",
    state: "OR",
    rating: 4
});
var rest6 = new Restaurant({
    name: "Low Country",
    img: '',
    foodType: "Cajun",
    city: "New Orleans",
    state: "LA",
    rating: 3
});

var restaurants = [ rest1, rest2, rest3, rest4, rest5, rest6 ];
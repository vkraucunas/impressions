var queries = require('./queries');

function restaurantName(newName) {
    var result;
    return queries.allRestaurants().select('name')
    .then(function(names) {
        var existingNames = [];
        for (var i = 0; i < names.length; i++) {
            existingNames.push(names[i].name);
        }

        if (existingNames.indexOf(newName.trim()) != -1) {
            result = 'A restaurant with this name already exists, knucklehead.';
        }
        return result;
    });
}

function user(newID, restaurant_id) {
    var result;
    return queries.allRatings().where('restaurant_id', restaurant_id)
    .then(function(reviews) {
        var existingUsers = [];
        for (var i = 0; i < reviews.length; i++) {
            existingUsers.push(reviews[i].user_id);
        }

        if (existingUsers.indexOf(newID) != -1) {
            result = 'You have already left a review for this restaurant!';
        }
        return result;
    });
}

module.exports = {
    restaurantName: restaurantName,
    user: user
};
var queries = require('./queries');


function restaurantName(newName) {
    console.log('here');
    var result;
    var existingNames;
    return queries.allRestaurants().select('name')
    .then(function(names) {
        var existingNames = [];
        for (var i = 0; i < names.length; i++) {
            existingNames.push(names[i].name);
        }

        if (existingNames.indexOf(newName) != -1) {
            result = 'A restaurant with this name already exists, knucklehead.';
        }
        return result;
    });
}

module.exports = {
    restaurantName: restaurantName
};
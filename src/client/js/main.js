// add scripts

$(document).on('ready', function() {
  console.log('sanity check!');

    var states = [ 'AL: Alabama',
                   'AK: Alaska',
                   'AZ: Arizona',
                   'AR: Arkansas',
                   'CA: California',
                   'CO: Colorado',
                   'CT: Connecticut',
                   'DE: Delaware',
                   'DC: District Of Columbia',
                   'FL: Florida',
                   'GA: Georgia',
                   'HI: Hawaii',
                   'ID: Idaho',
                   'IL: Illinois',
                   'IN: Indiana',
                   'IA: Iowa',
                   'KS: Kansas',
                   'KY: Kentucky',
                   'LA: Louisiana',
                   'ME: Maine',
                   'MD: Maryland',
                   'MA: Massachusetts',
                   'MI: Michigan',
                   'MN: Minnesota',
                   'MS: Mississippi',
                   'MO: Missouri',
                   'MT: Montana',
                   'NE: Nebraska',
                   'NV: Nevada',
                   'NH: New Hampshire',
                   'NJ: New Jersey',
                   'NM: New Mexico',
                   'NY: New York',
                   'NC: North Carolina',
                   'ND: North Dakota',
                   'OH: Ohio',
                   'OK: Oklahoma',
                   'OR: Oregon',
                   'PA: Pennsylvania',
                   'RI: Rhode Island',
                   'SC: South Carolina',
                   'SD: South Dakota',
                   'TN: Tennessee',
                   'TX: Texas',
                   'UT: Utah',
                   'VT: Vermont',
                   'VA: Virginia',
                   'WA: Washington',
                   'WV: West Virginia',
                   'WI: Wisconsin',
                   'WY: Wyoming'];

    for (var i = 0; i < states.length; i++ ) {
        $(".statesDropDown").append('<option>'+states[i]+'</option>');
    }

    var types = [ 'Mexican',
                  'Vietnamese',
                  'Pub',
                  'American',
                  'Cajun',
                  'Fast Food',
                  'Nightlife',
                  'Sandwiches',
                  'Bars',
                  'Pizza',
                  'Food',
                  'Burgers',
                  'Italian',
                  'Chinese',
                  'Breakfast & Brunch',
                  'Chicken Wings',
                  'Cafes',
                  'Asian Fusion',
                  'Sushi Bars',
                  'Barbeque',
                  'Sports Bars',
                  'Japanese',
                  'Vietnamese',
                  'Seafood',
                  'Steakhouses',
                  'Thai',
                  'Gluten-Free',
                  'Vegetarian'];

    types = types.sort();

   for (var i = 0; i < types.length; i++ ) {
        $(".foodTypeDropDown").append('<option>'+types[i]+'</option>');
    }

});

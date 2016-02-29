// add scripts

$(document).on('ready', function() {
  console.log('sanity check!');

    $('.ratingStars').each(function (value) {
        var rating = $(this).attr('data-rating-value');
        for(var i = 0; i < 5; i++) {
            if (i < rating) {
                $(this).append('<span class="glyphicon glyphicon-star"></span>');
            } else {
                $(this).append('<span class="glyphicon glyphicon-star-empty"></span>');
            }
        }
    });
    var string;
    var shortenedString;

    $('.showMoreTextLink').on('click', function() {
      var a =$(this).parent().parent();
      $(a).find('.reviewText').toggle();
    })



    // $('.ellipses').on('click', function() {
    //   $(
    // })

    var states = { AL: 'Alabama',
                   AK: 'Alaska',
                   AZ: 'Arizona',
                   AR: 'Arkansas',
                   CA: 'California',
                   CO: 'Colorado',
                   CT: 'Connecticut',
                   DE: 'Delaware',
                   DC: 'District Of Columbia',
                   FL: 'Florida',
                   GA: 'Georgia',
                   HI: 'Hawaii',
                   ID: 'Idaho',
                   IL: 'Illinois',
                   IN: 'Indiana',
                   IA: 'Iowa',
                   KS: 'Kansas',
                   KY: 'Kentucky',
                   LA: 'Louisiana',
                   ME: 'Maine',
                   MD: 'Maryland',
                   MA: 'Massachusetts',
                   MI: 'Michigan',
                   MN: 'Minnesota',
                   MS: 'Mississippi',
                   MO: 'Missouri',
                   MT: 'Montana',
                   NE: 'Nebraska',
                   NV: 'Nevada',
                   NH: 'New Hampshire',
                   NJ: 'New Jersey',
                   NM: 'New Mexico',
                   NY: 'New York',
                   NC: 'North Carolina',
                   ND: 'North Dakota',
                   OH: 'Ohio',
                   OK: 'Oklahoma',
                   OR: 'Oregon',
                   PA: 'Pennsylvania',
                   RI: 'Rhode Island',
                   SC: 'South Carolina',
                   SD: 'South Dakota',
                   TN: 'Tennessee',
                   TX: 'Texas',
                   UT: 'Utah',
                   VT: 'Vermont',
                   VA: 'Virginia',
                   WA: 'Washington',
                   WV: 'West Virginia',
                   WI: 'Wisconsin',
                   WY: 'Wyoming'};

    for (var i in states) {
        $(".statesDropDown").append('<option value='+i+'>'+states[i]+'</option>');
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

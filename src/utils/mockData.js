const mockYelpData = [
  {
    businesses: [
      {
        id: 'c1ZcPZ7zAq_9uWICSFvdSQ',
        alias: 'the-chilis-espoo',
        name: "The Chili's",
        image_url:
          'https://s3-media1.fl.yelpcdn.com/bphoto/GevRXmqQyGF5XdHn0Z1Nug/o.jpg',
        is_closed: false,
        url: 'https://www.yelp.com/biz/the-chilis-espoo?adjust_creative=-IWsB9J0xMTcH9GoRR03tQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=-IWsB9J0xMTcH9GoRR03tQ',
        review_count: 4,
        categories: [
          {
            alias: 'bars',
            title: 'Bars',
          },
          {
            alias: 'tex-mex',
            title: 'Tex-Mex',
          },
        ],
        rating: 4.5,
        coordinates: {
          latitude: 60.195583879752,
          longitude: 24.765694047397,
        },
        transactions: [],
        price: '€',
        location: {
          address1: 'Mankkaantie 6',
          address2: '',
          address3: '',
          city: 'Espoo',
          zip_code: '02180',
          country: 'FI',
          state: '18',
          display_address: ['Mankkaantie 6', '02180 Espoo', 'Finland'],
        },
        phone: '+35895021966',
        display_phone: '+358 9 5021966',
        distance: 3187.90054048448,
      },
      {
        id: 'GCLHVJgzZ8g8tghbmvam7Q',
        alias: 'laguna-espoo-2',
        name: 'Laguna',
        image_url:
          'https://s3-media4.fl.yelpcdn.com/bphoto/cTPzhfhKm_Sxn1dNEfsb4w/o.jpg',
        is_closed: false,
        url: 'https://www.yelp.com/biz/laguna-espoo-2?adjust_creative=-IWsB9J0xMTcH9GoRR03tQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=-IWsB9J0xMTcH9GoRR03tQ',
        review_count: 2,
        categories: [
          {
            alias: 'venues',
            title: 'Venues & Event Spaces',
          },
          {
            alias: 'scandinavian',
            title: 'Scandinavian',
          },
          {
            alias: 'divebars',
            title: 'Dive Bars',
          },
        ],
        rating: 4.0,
        coordinates: {
          latitude: 60.2256813,
          longitude: 24.7279205,
        },
        transactions: [],
        price: '€€',
        location: {
          address1: 'Kuusiniemi 7',
          address2: null,
          address3: null,
          city: 'Espoo',
          zip_code: '02710',
          country: 'FI',
          state: '18',
          display_address: ['Kuusiniemi 7', '02710 Espoo', 'Finland'],
        },
        phone: '+358105488170',
        display_phone: '+358 10 5488170',
        distance: 1686.7415148619812,
      },
      {
        id: 'Vpq-1ExC2ev_udHFTnkfgA',
        alias: 'löyly-helsinki',
        name: 'Löyly',
        image_url:
          'https://s3-media3.fl.yelpcdn.com/bphoto/uFCifI0XO6r9dn_LTwfAag/o.jpg',
        is_closed: false,
        url: 'https://www.yelp.com/biz/l%C3%B6yly-helsinki?adjust_creative=-IWsB9J0xMTcH9GoRR03tQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=-IWsB9J0xMTcH9GoRR03tQ',
        review_count: 45,
        categories: [
          {
            alias: 'scandinavian',
            title: 'Scandinavian',
          },
          {
            alias: 'localflavor',
            title: 'Local Flavor',
          },
          {
            alias: 'saunas',
            title: 'Saunas',
          },
        ],
        rating: 4.0,
        coordinates: {
          latitude: 60.1518407742113,
          longitude: 24.9304517713644,
        },
        transactions: [],
        price: '€€€',
        location: {
          address1: 'Hernesaarenranta 4',
          address2: 'Ärtholmsstranden 4',
          address3: '',
          city: 'Helsinki',
          zip_code: '00150',
          country: 'FI',
          state: '18',
          display_address: [
            'Hernesaarenranta 4',
            'Ärtholmsstranden 4',
            '00150 Helsinki',
            'Finland',
          ],
        },
        phone: '+358961286550',
        display_phone: '+358 9 61286550',
        distance: 12442.110542721159,
      },
      {
        id: 'XRXCUKm_bxtXn5hzHxnqNQ',
        alias: 'pizza-makers-espoo',
        name: 'Pizza Makers',
        image_url:
          'https://s3-media1.fl.yelpcdn.com/bphoto/X2dY_E43_Nluk_iMnX8vbA/o.jpg',
        is_closed: false,
        url: 'https://www.yelp.com/biz/pizza-makers-espoo?adjust_creative=-IWsB9J0xMTcH9GoRR03tQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=-IWsB9J0xMTcH9GoRR03tQ',
        review_count: 3,
        categories: [
          {
            alias: 'kebab',
            title: 'Kebab',
          },
          {
            alias: 'pizza',
            title: 'Pizza',
          },
        ],
        rating: 4.5,
        coordinates: {
          latitude: 60.2120399,
          longitude: 24.7697468,
        },
        transactions: [],
        location: {
          address1: 'Lansantie 23',
          address2: null,
          address3: null,
          city: 'Espoo',
          zip_code: '02630',
          country: 'FI',
          state: '18',
          display_address: ['Lansantie 23', '02630 Espoo', 'Finland'],
        },
        phone: '+3589522022',
        display_phone: '+358 9 522022',
        distance: 1448.3232829007284,
      },
      {
        id: 'D3EAsngYvnxesUw1ZlWRmA',
        alias: 'x-burger-espoo',
        name: 'X-Burger',
        image_url:
          'https://s3-media4.fl.yelpcdn.com/bphoto/3_kbOMZEuQEHXzCEI41VjA/o.jpg',
        is_closed: false,
        url: 'https://www.yelp.com/biz/x-burger-espoo?adjust_creative=-IWsB9J0xMTcH9GoRR03tQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=-IWsB9J0xMTcH9GoRR03tQ',
        review_count: 4,
        categories: [
          {
            alias: 'burgers',
            title: 'Burgers',
          },
        ],
        rating: 4.5,
        coordinates: {
          latitude: 60.1836205,
          longitude: 24.8313007,
        },
        transactions: [],
        price: '€',
        location: {
          address1: 'Alvarinaukio 1',
          address2: null,
          address3: null,
          city: 'Espoo',
          zip_code: '02150',
          country: 'FI',
          state: '18',
          display_address: ['Alvarinaukio 1', '02150 Espoo', 'Finland'],
        },
        phone: '+358407368878',
        display_phone: '+358 40 7368878',
        distance: 6035.888805294978,
      },
    ],
    total: 1200,
    region: {
      center: {
        longitude: 24.75848455114475,
        latitude: 60.22402875776225,
      },
    },
  },
];
export default mockYelpData;

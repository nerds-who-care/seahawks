var shoppingCart = [];

var inventory = [
    {
        "category": "Mens",
        "top_level_image": "http://profootballzone.com/wp-content/uploads/2014/03/russell-wilson2.png",
        "products": [
            {
                "name": "sports jersey",
                "price": 12.56,
                "image": "http://profootballzone.com/wp-content/uploads/2014/03/russell-wilson2.png"
            },
            {
                "name": "football helmet",
                "price": 50.5,
                "image": "http://fromanativeson.com/wp-content/uploads/2014/01/Seahawks-helmet.png"
            }
        ]
    },
    {
        "category": "Womens",
        "top_level_image": "http://www.seahawksprostoreonline.com/849-thickbox/Womens_Nike_Seattle_Seahawks_3_Russell_Wilson_Game_Pink_2012_Fem_Fan_Jersey.jpg",
        "products": [
            {
                "name": "sports jersey",
                "price": 12.56,
                "image": "http://www.seahawksprostoreonline.com/849-thickbox/Womens_Nike_Seattle_Seahawks_3_Russell_Wilson_Game_Pink_2012_Fem_Fan_Jersey.jpg"
            },
            {
                "name": "stocking cap",
                "price": 7.99,
                "image": "http://media-cache-ec0.pinimg.com/236x/48/a0/e3/48a0e3e8a0ea0c10d127b36af9413e98.jpg"
            },
            {
                "name": "tank top",
                "price": 20.99,
                "image": "http://www.fanzz.com/mainstreet/get_image.aspx?domain=fanzz.com&image_guid=60ba8149-e5a2-40b0-bfeb-f213c4654c4b&size=1"
            }
        ]
    },
    {
        "category": "Kids",
        "top_level_image": "http://queenbeecoupons.com/wp-content/upload/2013/11/Seattle-Seahawksreplica-Helmet-jersey.jpg",
        "products": [
            {
                "name": "Replica Helmet and Jersey",
                "price": 15.99,
                "image": "http://queenbeecoupons.com/wp-content/upload/2013/11/Seattle-Seahawksreplica-Helmet-jersey.jpg"
            },
                        {
                "name": "Shoes",
                "price": 12.99,
                "image": "http://media-cache-ec0.pinimg.com/736x/1f/90/9a/1f909a101594edd8d0bda9132abbbc37.jpg"
            },
                        {
                "name": "Socks",
                "price": 10.99,
                "image": "http://ecx.images-amazon.com/images/I/41Bf9Uuo7rL._AA160_.jpg"
            }
        ]
    },
    {
        "category": "Jerseys",
        "top_level_image": "http://www.bbestmall.com/pimages/20131231409124952.jpg",
        "products": [
            {
                "name": "Personalized",
                "price": 15.99,
                "image": "http://www.seattleseahawksjerseys.com/wp-content/uploads/2013/08/206088-seattle-seahawks.jpg"
            },
                        {
                "name": "Hyper",
                "price": 12.99,
                "image": "http://www.bbestmall.com/pimages/20131231409124952.jpg"
            },
                        {
                "name": "Girly",
                "price": 10.99,
                "image": "http://www.seahawkssite.com/images/Seahawks/Women-Seattle-Seahawks-Nike-24-Marshawn-Lynch-Elite-Pink-Fem-Fan-Jersey.jpg"
            }
        ]
    },
    {
        "category": "Accessories",
        "top_level_image": "http://www.nflstore.net/wp-content/uploads/2013/11/NFL-Seattle-Seahawks-Thematic-Mascot-Dangle-Hat-0.jpg",
        "products": [
            {
                "name": "Bracelet",
                "price": 15.99,
                "image": "http://www.dickssportinggoods.com/graphics/product_images/pDSP1-16916358dt.jpg"
            },
                        {
                "name": "Sticker",
                "price": 12.99,
                "image": "http://ecx.images-amazon.com/images/I/41UWy1A7D%2BL.jpg"
            },
                        {
                "name": "Dangle Hat",
                "price": 10.99,
                "image": "http://www.nflstore.net/wp-content/uploads/2013/11/NFL-Seattle-Seahawks-Thematic-Mascot-Dangle-Hat-0.jpg"
            }
        ]
    },
    {
        "category": "T-Shirts",
        "top_level_image": "https://img1.etsystatic.com/021/1/7588251/il_340x270.537079209_q43d.jpg",
        "products": [
            {
                "name": "Wings",
                "price": 15.99,
                "image": "https://img1.etsystatic.com/021/1/7588251/il_340x270.537079209_q43d.jpg"
            },
                        {
                "name": "State",
                "price": 12.99,
                "image": "https://img0.etsystatic.com/035/1/7510173/il_340x270.504703004_58xo.jpg"
            },
                        {
                "name": "Painting",
                "price": 10.99,
                "image": "http://theindianeconomist.com/wp-content/uploads/2013/12/HrdRF.jpg"
            }
        ]
    },
    {
        "category": "Sweatshirts",
        "top_level_image": "http://images.footballfanatics.com/FFImage/thumb.aspx?i=/productImages/_1162000/ff_1162850_xl.jpg&w=180",
        "products": [
            {
                "name": "Green",
                "price": 15.99,
                "image": "http://images.footballfanatics.com/FFImage/thumb.aspx?i=/productImages/_1162000/ff_1162850_xl.jpg&w=180"
            },
                        {
                "name": "Classic",
                "price": 12.99,
                "image": "http://www.fanzz.com/mainstreet/get_image.aspx?domain=fanzz.com&image_guid=abcc9ccf-5af3-4a1e-af94-245616c0b881&size=1"
            },
                        {
                "name": "Death",
                "price": 10.99,
                "image": "https://img1.etsystatic.com/018/0/8618290/il_570xN.553247019_i49p.jpg"
            }
        ]
    },
    {
        "category": "Hats",
        "top_level_image": "http://www.clothingtodoor.com/pic/201391318523989423.jpg",
        "products": [
            {
                "name": "Tuff",
                "price": 15.99,
                "image": "http://www.jerseysapparel.com/images/Seahawks/stitched-new-era-9fifty-snapback-seahawks-nike-white-purple-hats.jpg"
            },
                        {
                "name": "Camo",
                "price": 12.99,
                "image": "http://www.clothingtodoor.com/pic/201391318523989423.jpg"
            },
                        {
                "name": "Beanie",
                "price": 10.99,
                "image": "http://lf.hatworld.com/hwl?set=sku%5B20512198%5D,c%5B2%5D,w%5B400%5D,h%5B300%5D&load=url%5Bfile:product%5D"
            }
        ]
    }
]

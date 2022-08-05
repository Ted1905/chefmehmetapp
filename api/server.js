const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const cors = require("cors")
const app = express();
const port = 9000;
const { uuid } = require("uuidv4");

// setup middleware
app.use(bodyParser.json());
app.use(cors());

//
var _dishes = [
    {
        _id: 1,
        name: 'Egg',
        description: 'Boiled or pan',
        category: 'Breakfast',
        calories: '155,1 kcal',
        waiting_time: '15 min',
        price: '€5',
        daytime: 'morning',
        is_active: true,
        image: 'https://img.freepik.com/free-photo/boiled-quail-eggs-halves-green-plate_2829-13994.jpg?w=1800&t=st=1659436043~exp=1659436643~hmac=b49f57e2f37fea0a61c48287cbfe7eb88b49f0c597a1e89776d8dad9ccc5a38f'
    },
    {
        _id: 2,
        name: 'Cornflakes',
        description: 'honey, strawberry, banana, plain',
        category: 'Breakfast',
        calories: '357,1 kcal',
        waiting_time: '5 min',
        price: '€5',
        daytime: 'morning',
        is_active: true,
        image: 'https://img.freepik.com/free-photo/milk-cereal_1339-1976.jpg?w=2000&t=st=1659436544~exp=1659437144~hmac=68d8d3b8b5195ac1233ff2e196027b4dbf5ca85e5e51e741d99445cce8a23d9b'
    },
    {
        _id: 3,
        name: 'Menemen',
        description: 'egg, tomato, onion, green pepper',
        category: 'Breakfast',
        calories: '70,8 kcal',
        waiting_time: '10 min',
        price: '€25',
        daytime: 'morning',
        is_active: true,
        image: 'https://img.freepik.com/premium-photo/menemen-turkish-food-omlette_550617-39632.jpg?w=2000'
    },
    {
        _id: 4,
        name: 'Egg with sausage',
        description: 'sausage, egg',
        category: 'Breakfast',
        calories: '242 kcal',
        waiting_time: '15 min',
        price: '€20',
        daytime: 'morning',
        is_active: true,
        image: 'https://img.freepik.com/free-photo/top-view-sausage-with-eggs-along-with-tea-bread-loafs-restaurant-table-food-meal-breakfast_140725-28332.jpg?w=900&t=st=1659436594~exp=1659437194~hmac=078e699505ee9e1b1c5faad654ba13bac56701a888d303cfc46b177ca10322ec'
    },
    {
        _id: 5,
        name: 'Fried potatoes',
        description: 'fresh potatoes',
        category: 'Breakfast',
        calories: '311,9 kcal',
        waiting_time: '20 min',
        price: '€15',
        daytime: 'morning',
        is_active: true,
        image: 'https://img.freepik.com/free-photo/crispy-french-fries-with-ketchup-mayonnaise_1150-26588.jpg?w=2000&t=st=1659436623~exp=1659437223~hmac=0ccf397d91c4e7faada6042ccc24f21f3e65505ac2f175013cbff0c0a2a835a6'
    },
    {
        _id: 6,
        name: 'Fried sausage',
        description: 'fresh sausage',
        category: 'Breakfast',
        calories: '196 kcal',
        waiting_time: '15 min',
        price: '€10',
        daytime: 'morning',
        is_active: true,
        image: 'https://img.freepik.com/free-photo/mixed-fried-sausages-with-ketchup-mustard_140725-44222.jpg?w=1800&t=st=1659436628~exp=1659437228~hmac=49c1e73d9f07e508f7049c3056d92d7325d60588ea8965c234af0f4d4f6c400c'
    },
    {
        _id: 7,
        name: 'Spring roll',
        description: 'fresh dough, cheese',
        category: 'Breakfast',
        calories: '360 kcal',
        waiting_time: '25 min',
        price: '€10',
        daytime: 'morning',
        is_active: true,
        image: 'https://img.freepik.com/free-photo/spring-rolls-with-cheese-dark-background_1150-45277.jpg?w=2000&t=st=1659436634~exp=1659437234~hmac=38d30e1be15bacd3cd0e003c4b9b13db295d31f1ed0f53a60dd053545a70d269'
    },
    {
        _id: 8,
        name: 'Pancakes',
        description: 'chocolate, fruity, buttery',
        category: 'Dessert',
        calories: '227,1 kcal',
        waiting_time: '20 min',
        price: '€10',
        daytime: 'morning',
        is_active: true,
        image: 'https://img.freepik.com/free-photo/front-view-sweet-pancakes-tower-arrangement_23-2148654085.jpg?w=1800&t=st=1659436638~exp=1659437238~hmac=9bb83600d9e000193d5afb16b546ebd23cef87583d8b8b5cd9f5756400b097f1'
    },
    {
        _id: 9,
        name: 'Coffee',
        description: 'Freshly ground coffee and its varieties',
        category: 'Beverage',
        calories: '0,5 kcal',
        waiting_time: '2 min',
        price: '€2',
        daytime: 'morning',
        is_active: true,
        image: 'https://img.freepik.com/free-photo/side-view-white-cup-black-coffe-coffee-beans-coffee-cream-moving-cup_633478-1767.jpg?w=2000&t=st=1659436642~exp=1659437242~hmac=973726d439124a5854734ff15d866ded6049fed98dfc01c03305c7cf6368a854'
    },
    {
        _id: 10,
        name: 'Tea',
        description: 'Turkish tea, herbal teas',
        category: 'Beverage',
        calories: '1 kcal',
        waiting_time: '2 min',
        price: '€2',
        daytime: 'always',
        is_active: true,
        image: 'https://img.freepik.com/free-photo/person-pouring-tea-armudy-jam-lemon-side-view_141793-3234.jpg?w=2000&t=st=1659436646~exp=1659437246~hmac=9ffdfe84d5e93fd58b513060b43b70a200a842d9e71a5706a1916fe657bef321'
    },
    {
        _id: 11,
        name: 'Orange juice',
        description: 'freshly squeezed orange',
        category: 'Beverage',
        calories: '44,9 kcal',
        waiting_time: '2 min',
        price: '€2',
        daytime: 'always',
        is_active: true,
        image: 'https://img.freepik.com/free-photo/fresh-orange-juice-glass-dark-background_1150-45560.jpg?w=2000&t=st=1659436650~exp=1659437250~hmac=137c85ebbc8fe1e46925c86ffb860da68d6d89dde7ae185e63fc566324f1c1c6'
    },
    {
        _id: 12,
        name: 'Water',
        description: 'sparkle, still',
        category: 'Beverage',
        calories: '0 kcal',
        waiting_time: '2 min',
        price: '€1',
        daytime: 'always',
        is_active: true,
        image: 'https://img.freepik.com/free-photo/glass-water-macro-shot_53876-65290.jpg?w=2000&t=st=1659436655~exp=1659437255~hmac=00aa9a709b4ca2b882c8f6a1ccb42faacf04e6159ee71a02183f2d7cefd4038a'
    },
    {
        _id: 13,
        name: 'Beef Wellington tart',
        description: 'mushrooms, fresh thyme, French shallots',
        category: 'Starter',
        calories: '134 kcal',
        waiting_time: '30 min',
        price: '€15',
        daytime: 'lunch',
        is_active: true,
        image: 'https://img.freepik.com/premium-photo/homemade-beef-wellington-puff-pie-with-tenderloin-meat-cutting-board-dark-wooden-background-top-view_89816-30536.jpg?w=900'
    },
    {
        _id: 15,
        name: 'Bacon rings',
        description: 'bacon, onion',
        category: 'Starter',
        calories: '264,5 kcal',
        waiting_time: '35 min',
        price: '€10',
        daytime: 'lunch',
        is_active: true,
        image: 'https://www.kingsford.com/wp-content/uploads/2015/05/Bacon-Wrapped-Onion-Ring-G24x7.jpg'
    },
    {
        _id: 16,
        name: 'Chicken skewer',
        description: 'marinated lemon chicken with thyme',
        category: 'Starter',
        calories: '150 kcal',
        waiting_time: '30 min',
        price: '€10',
        daytime: 'lunch',
        is_active: true,
        image: 'https://img.freepik.com/free-photo/chicken-skewers-with-slices-sweet-peppers-dill-tasty-food-weekend-meal_2829-7043.jpg?w=2000&t=st=1659617665~exp=1659618265~hmac=ee5b8f12afff1fe57669686068e8c2b2c98311cfaa87eaa11cfded952c1b0496'
    },
    {
        _id: 17,
        name: 'Lamb skewers',
        description: 'lamb meat marinated in shirt fat',
        category: 'Starter',
        calories: '314 kcal',
        waiting_time: '25 min',
        price: '€15',
        daytime: 'lunch',
        is_active: true,
        image: 'https://img.freepik.com/free-photo/top-view-lule-kebab-with-tomato-onion-ayran_176474-3399.jpg?w=1380&t=st=1659617668~exp=1659618268~hmac=3a056dc127f42052bc751f2bcde89758d78f55c2133f68204f56e1fe7a880107'
    },
    {
        _id: 18,
        name: 'Butter chicken vol-au-vents',
        description: 'butter chicken, onion, Careme puff pastry',
        category: 'Starter',
        calories: '219 kcal',
        waiting_time: '40 min',
        price: '€10',
        daytime: 'lunch',
        is_active: true,
        image: 'https://img.freepik.com/free-photo/delicious-pastry-with-chicken_1203-1616.jpg?w=2000&t=st=1659617672~exp=1659618272~hmac=7338c776e9748dbaa77ba8f8a1e99b55ac7914b405566b138f2035517f94cd36'
    },
    {
        _id: 19,
        name: 'lamb kebab',
        description: 'lamb, béchamel sauce',
        category: 'Main Course',
        calories: '300 kcal',
        waiting_time: '40 min',
        price: '€20',
        daytime: 'lunch',
        is_active: true,
        image: 'https://img.freepik.com/free-photo/turkish-arabic-traditional-ramadan-mix-kebab-plate-kebab-adana-chicken-lamb-beef-lavash-bread-with-sauce-top-view_2829-6172.jpg?w=2000&t=st=1659617677~exp=1659618277~hmac=81c9dbac5d50e21a9d5296ed1fa6a550e98f2fdfacca568dc42bd69cc6e3a677'
    },
    {
        _id: 20,
        name: 'Cedar-Plank Salmon',
        description: 'salmon, lemon, fresh vegetables',
        category: 'Main Course',
        calories: '225 kcal',
        waiting_time: '40 min',
        price: '€25',
        daytime: 'lunch',
        is_active: true,
        image: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/cedar-plank-salmon1-1650489217.jpg'
    },
    {
        _id: 21,
        name: 'chicken siron',
        description: 'phyllo, chicken breast, yogurt, spices, butter',
        category: 'Main Course',
        calories: '390 kcal',
        waiting_time: '50 min',
        price: '€20',
        daytime: 'lunch',
        is_active: true,
        image: 'https://expatguideturkey.com/wp-content/uploads/2021/12/siron2.webp'
    },
    {
        _id: 22,
        name: 'Baked Chicken',
        description: 'chicken, rice pilaf, french fries',
        category: 'Main Course',
        calories: '355 kcal',
        waiting_time: '45 min',
        price: '€25',
        daytime: 'lunch',
        is_active: true,
        image: 'https://img.freepik.com/free-photo/christmas-table-served-with-turkey-decorated-with-bright-tinsel-candles_2829-18829.jpg?w=2000&t=st=1659617694~exp=1659618294~hmac=2b2cf0f45e154d2cca6dd13f3f73fa5ecd9a62e212c380ea36372a5bd72df2b1'
    },
    {
        _id: 23,
        name: 'Rice pudding',
        description: 'rice, milk, sugar',
        category: 'Dessert',
        calories: '111,1 kcal',
        waiting_time: '20 min',
        price: '€5',
        daytime: 'lunch',
        is_active: true,
        image: 'https://img.freepik.com/free-photo/milk-dessert-table_140725-4088.jpg?w=1480&t=st=1659617699~exp=1659618299~hmac=620e418426f0d166ebfe6d1585c3714d56d0dd7c024ad22b2e88985d612d18b7'
    },
    {
        _id: 24,
        name: 'Tiramisu',
        description: 'biscuits, milk, coffee liqueur',
        category: 'Dessert',
        calories: '246 kcal',
        waiting_time: '50 min',
        price: '€5',
        daytime: 'lunch',
        is_active: true,
        image: 'https://img.freepik.com/free-photo/concept-tasty-dessert-with-tiramisu-cake-close-up_185193-77854.jpg?w=2000&t=st=1659618131~exp=1659618731~hmac=32ed534af80980186ef37cbfbefb7e125badf49dbe91b449ab542a78519d04ca'
    },
    {
        _id: 25,
        name: 'Profiteroles',
        description: 'milk, cream, chocolate,',
        category: 'Dessert',
        calories: '930 kcal',
        waiting_time: '30 min',
        price: '€5',
        daytime: 'lunch',
        is_active: true,
        image: 'https://img.freepik.com/free-photo/chocolate-profiteroles-with-cocoa-top_114579-2549.jpg?w=1800&t=st=1659618141~exp=1659618741~hmac=d6a8cef968cd2c3545a1b3b1a5b8fc099d595f18bb8ff4a504c09574d6fee0ca'
    },
    {
        _id: 26,
        name: 'Souffle',
        description: 'soft cake and chocolate',
        category: 'Dessert',
        calories: '224 kcal',
        waiting_time: '25 min',
        price: '€5',
        daytime: 'lunch',
        is_active: true,
        image: 'https://www.seriouseats.com/thmb/kxG8jWM8pX7JNA3-YGfbkN8LkpE=/1500x844/smart/filters:no_upscale()/__opt__aboutcom__coeus__resources__content_migration__serious_eats__seriouseats.com__2020__10__20201003-chocolate-souffle-test2-vicky-wasik-12-e9823310c94c43498695f5c380be52cb.jpg'
    },
    {
        _id: 27,
        name: 'Cake',
        description: 'chocolate, fruity varieties',
        category: 'Dessert',
        calories: '251,9 kcal',
        waiting_time: '10 min',
        price: '€5',
        daytime: 'lunch',
        is_active: true,
        image: 'https://img.freepik.com/free-photo/delicious-sweet-cake-with-strawberries-baiser-plate_181624-29179.jpg?w=2000&t=st=1659618156~exp=1659618756~hmac=8ceb5d1a5b238d6bbbd29e2010ab719f356646d2d54d94ce5d61353b738550f0'
    },
    {
        _id: 28,
        name: 'Carbonated beverage',
        description: 'Cola-Sprite-Fanta-Soda',
        category: 'Beverage',
        calories: '40,9 kcal',
        waiting_time: '5 min',
        price: '€5',
        daytime: 'always',
        is_active: true,
        image: 'https://img.freepik.com/free-photo/colorful-soda-drinks-macro-shot_53876-32239.jpg?w=2000&t=st=1659618161~exp=1659618761~hmac=a83636b0039d83de3e8199f62318277d49265b5bd562af27a77499b06185ba5e'
    },
    {
        _id: 29,
        name: 'Tomato Soup',
        description: 'fresh tomato, butter, spices',
        category: 'Starter',
        calories: '100 kcal',
        waiting_time: '30 min',
        price: '€15',
        daytime: 'dinner',
        is_active: true,
        image: 'https://img.freepik.com/free-photo/warm-tomato-soup-serve-bowl_1150-42625.jpg?w=2000&t=st=1659618840~exp=1659619440~hmac=c250241fd89a06ab58c7de9f0160b27ceb5db2addfef6aea03a752301748f111'
    },
    {
        _id: 30,
        name: 'Vegan Soup',
        description: 'potato, carrot, pea, roasted peppers, cream',
        category: 'Starter',
        calories: '96 kcal',
        waiting_time: '30 min',
        price: '€20',
        daytime: 'dinner',
        is_active: true,
        image: 'https://img.freepik.com/free-photo/red-lentil-soup-dark-surface-healthy-eating-concept-vegan-food_2829-6071.jpg?w=2000&t=st=1659618843~exp=1659619443~hmac=fe86cf9369866a95ddb686a0daca91a7903c9a8673b54911bc9bd1019883c6d3'
    },
    {
        _id: 31,
        name: 'Roasted Breast of Turkey or Baked Ham',
        description: 'Turkey, Mashed Potatoes & Gravy, Vegetables',
        category: 'Main Course',
        calories: '345 kcal',
        waiting_time: '45 min',
        price: '€40',
        daytime: 'dinner',
        is_active: true,
        image: 'https://thumbs.dreamstime.com/b/roasted-christmas-ham-turkey-dark-rustic-background-sliced-festival-food-133187406.jpg'
    },
    {
        _id: 32,
        name: 'Breast of Chicken Parmigiana',
        description: 'Seasoned, boneless breast, cheeses and vegetables',
        category: 'Main Course',
        calories: '636 kcal',
        waiting_time: '40 min',
        price: '€30',
        daytime: 'dinner',
        is_active: true,
        image: 'https://img.freepik.com/premium-photo/baked-chicken-fillet-with-rice-pasta-spinach-beans-black-stone-plate-dietary-food-top-view-free-space-text_187166-23414.jpg?w=2000'
    },
    {
        _id: 33,
        name: 'Fresh Baked Salmon',
        description: 'special Salmon, Wild Rice Pilaf and Vegetables',
        category: 'Main Course',
        calories: '215 kcal',
        waiting_time: '50 min',
        price: '€35',
        daytime: 'dinner',
        is_active: true,
        image: 'https://img.freepik.com/free-photo/roasted-fish-served-with-lemons-pomegranate-with-cheese-plate_140725-10628.jpg?w=1800&t=st=1659618852~exp=1659619452~hmac=c118bbcf77a2b930eb9cd53d6006e232395fa70a2c0541d8d58543f404056211'
    },
    {
        _id: 34,
        name: 'Habanero BBQ Shrimp',
        description: 'special sauce, spices, green lemon, fresh shrimp',
        category: 'Main Course',
        calories: '431 kcal',
        waiting_time: '45 min',
        price: '€30',
        daytime: 'dinner',
        is_active: true,
        image: 'https://img.freepik.com/free-photo/chinese-dish-griddle-shrimpdry-pot-shrimp_1205-10496.jpg?w=2000&t=st=1659618856~exp=1659619456~hmac=b24a8478ae520eb224680cd8f9327c6970d8de91a6a92c7647fa72743f824318'
    },
    {
        _id: 35,
        name: 'Baklava',
        description: 'thin phyllo, peanuts, sugar, sherbet',
        category: 'Dessert',
        calories: '2057 kcal',
        waiting_time: '35 min',
        price: '€15',
        daytime: 'dinner',
        is_active: true,
        image: 'https://img.freepik.com/free-photo/top-view-assorted-turkish-baklava-with-cup-tea-turkish-delight-wooden-plank_176474-3287.jpg?w=1380&t=st=1659618860~exp=1659619460~hmac=123b20615ef9d37fb597317156e7458b0e4fd0441474d4843f2cbdd78ac8f6c0'
    },
    {
        _id: 36,
        name: 'Magnolia Dessert',
        description: 'milk, granulated sugar, cream, starch',
        category: 'Dessert',
        calories: '387 kcal',
        waiting_time: '45 min',
        price: '€15',
        daytime: 'dinner',
        is_active: true,
        image: 'https://img.freepik.com/free-photo/yogurt-with-chia-seed-berries-glasses_144627-22748.jpg?w=2000&t=st=1659618863~exp=1659619463~hmac=638304383399c30f3880304c086297c523d54a0a3bee9673d0c84af44e9a98ef'
    },
    {
        _id: 37,
        name: 'Pumpkin pie',
        description: 'pumpkin puree, cream, sugar',
        category: 'Dessert',
        calories: '557 kcal',
        waiting_time: '55 min',
        price: '€15',
        daytime: 'dinner',
        is_active: true,
        image: 'https://img.freepik.com/free-photo/top-view-fresh-homemade-pie-with-fragrant-tea-grey-wall_114579-64647.jpg?w=2000&t=st=1659618867~exp=1659619467~hmac=9f04886e7be5419518531f9bf9953a622b8d22e5e8f324cd5a53e1a2671ac89a'
    },
    {
        _id: 38,
        name: 'creme brulee',
        description: 'krema, vanilya, şeker',
        category: 'Dessert',
        calories: '215 kcal',
        waiting_time: '25 min',
        price: '€5',
        daytime: 'dinner',
        is_active: true,
        image: 'https://img.freepik.com/free-photo/creme-brulee-garnished-with-berries_141793-2230.jpg?w=2000&t=st=1659618871~exp=1659619471~hmac=141c4fbd4f0140a759bed5ec47bf508acfe7d098eebcfee15578d8b66a4104e7'
    },
    {
        _id: 39,
        name: 'Vine',
        description: 'Red - White',
        category: 'Beverage',
        calories: '82,9 kcal',
        waiting_time: '5 min',
        price: '€10',
        daytime: 'dinner',
        is_active: true,
        image: 'https://img.freepik.com/free-photo/front-view-wine-glasses-fresh-grapes-walnuts-yellow-cheese-wood-board-overturned-bottle-dark-background_140725-144998.jpg?w=2000&t=st=1659618875~exp=1659619475~hmac=6a49a7352612487ffe033e8122db99cba185a107255ed286c2cfe13bee92992b'
    },
];

// get dishes
router.get('/api/dishes', (req, res) => {

    let reversed = _dishes.map((item, idx) => _dishes[_dishes.length - 1 - idx])

    res.json({
        status: "OK",
        data: reversed
    });
});


// clear dishes
router.get('/api/dishes/clear', (req, res) => {
    _dishes = [];

    res.json({
        status: "OK"
    });
});

// get dish by id
router.get('/api/dishes/:_id', (req, res) => {
    const dish = _dishes.find(x => x._id == req.params._id);

    res.json({
        status: "OK",
        data: dish ? dish : null
    });
});

// insert/update dish
router.put('/api/dishes', (req, res) => {
    if (req.body == null) {
        res.json({
            status: "Failed",
            message: "No content provided"
        });
    }
    else {
        let dish = req.body,
            status = "OK";

        if (!dish._id) {
            //
            dish._id = uuid();
            dish._Created = new Date();
            dish._Changed = null;

            //
            _dishes.push(dish);
        }
        else {
            //
            const dishIndex = _dishes.findIndex(x => x._id === dish._id);

            //
            if (dishIndex >= 0) {
                //
                dish._Changed = new Date();

                //
                _dishes[dishIndex] = dish;
            }
            else {
                //
                status = `dish not found for _id ${dish._id}`;
            }
        }

        res.json({
            status: status,
            data: dish
        });
    }
});

// delete dish
router.delete('/api/dishes/:_id', (req, res) => {
    let dishIndex = _dishes.findIndex(x => x._id == req.params._id);

    if (dishIndex !== -1) {
        _dishes.splice(dishIndex, 1);
    }

    res.json({
        status: "OK",
        message: dishIndex !== -1 ? "Dish deleted" : "Dish not found"
    });
});


//
app.use(router);

//
app.listen(port, () => {
    console.log(`api is ready on http://localhost:${port}`)
});
/* struct that holds synonyms of common colors */
let synonyms = [];

const colors = {
    red: ['cherry', 'strawberry', 'jam', 'merlot', 'garnet', 'crimson', 'ruby', 'scarlet', 'cardinal', 'rose', 'maroon', 'wine', 'brick', 'apple', 'mahogany', 'blood', 'sangria', 'berry', 'currant', 'blush'],
    orange: ['tangerine', 'poppy', 'marigold', 'cider', 'rust', 'ginger', 'tiger', 'fire', 'bronze', 'copper', 'cantaloupe', 'apricot', 'carrot', 'squash', 'tumeric', 'marmalade', 'amber', 'sandstone', 'yam'],
    yellow: ['canary', 'lemonade', 'golden', 'honey', 'daffodil', 'flaxen', 'buttercup', 'lemon', 'mustard', 'corn', 'medallion', 'dandelion', 'bumblebee', 'banana', 'butterscotch', 'dijon', 'honey', 'blonde', 'pineapple'],
    green: ['chartreuse', 'juniper', 'sage', 'lime', 'fern', 'olive', 'emerald', 'periodot', 'pear', 'moss', 'shamrock', 'seafoam', 'pine', 'parakeet', 'mint', 'seaweed', 'pickle', 'pistachio', 'basil', 'crocodile'],
    blue:['slate', 'sky', 'navy', 'blueberry', 'indigo', 'teal', 'cobalt', 'ocean', 'peacock', 'azure', 'cerulean', 'lapis', 'spruce', 'aegean', 'denim', 'admiral', 'sapphire', 'arctic', 'turquoise'],
    purple: ['mauve', 'berry', 'violet', 'burgundy', 'boysenberry', 'lavender', 'plum', 'magenta', 'lilac', 'grape', 'periwinkle', 'sangria', 'eggplant', 'jam', 'iris', 'heather', 'amethyst', 'raisin', 'orchid', 'mulberry', 'wine'],
    pink: ['rose', 'fuchsia', 'punch', 'peony', 'blush', 'watermelon', 'flamingo', 'rouge', 'salmon', 'coral', 'peach', 'rosewood', 'taffy', 'bubblegum', 'crepe']
}

/* struct that holds synonyms / related words of common nouns */
const nouns = {
    bus: ['car', 'limousine', 'bugatti', 'lambourgini', 'porsche', 'ferrari', 'cadillac', 'maserati', 'jaguar', 'rolls-royce', 'mercedes', 'tesla'],
    flower: ['rose', 'peony', 'daisy', 'marigold', 'magnolia', 'begonia', 'lavendar', 'tulip', 'blossoms', 'lillies', 'orchid', 'carnations', 'sunflower', 'daffodil'],
    shoes: ['boots', 'heels', 'sneakers', 'sandals', 'slippers', 'wedges', 'stilettos', 'flats', 'flip-flop', 'oxford', 'loafers', 'derby','brogues', 'moccasin', 'gladiators', 'pumps'],
}

/* creates a new phrase */
function newPhrase(color, noun) {
    const el = document.createElement('div');
    el.innerText = color + ' ' + noun;
    el.className = 'card';
    return el;
}

/* processes the color and noun input to upload all alliterations onto page */
function loadPhrases() {
    const ctr = document.querySelector('.phrase-cont');
    ctr.innerHTML = "";

    const phrase = document.getElementById('phrase-input').value;
    const color = phrase.slice(0, phrase.indexOf(' '));
    const noun = phrase.slice(phrase.indexOf(' ') + 1, phrase.length);


    if(noun in nouns) {
        getAlliterations(colors[color], nouns[noun]);
    } else {
        console.log(noun);
        getSynonyms(noun, 'noun')
        .then(synonyms => {
            console.log(synonyms);
            getAlliterations(colors[color], synonyms);
        });
    }
}

/* given a list of synonymous adjectives and nouns, add all alliteration phrases to the page */
function getAlliterations(adjs, nouns) {
    const ctr = document.querySelector('.phrase-cont');
    for( let i = 0; i < adjs.length; i++) {
        for (let j = 0; j < nouns.length; j++) {
            if (nouns[j][0] === adjs[i][0]) {
                let newphrase = newPhrase(adjs[i], nouns[j]);
                ctr.appendChild(newphrase);
            }
        }
    }
}

/* extracts synonyms of the same */ 
async function getSynonyms(word, type) {
    let synonyms = []
    let res = await fetch(`https://www.dictionaryapi.com/api/v3/references/thesaurus/json/${word}?key=3274543c-8f25-445d-a6ba-559bdc8e31f3`);
    console.log(res);
    let data = await res.json();
    console.log(data);
    for( let i = 0; i < data.length; i++) {
        let syns;
        if(type === data[i]['fl'] && data[i]['meta']['id'] === word) {
            syns = data[i]['meta']['syns'];
        } else {
            continue;
        }
        for( let j = 0; j < syns.length; j++) {
            synonyms = synonyms.concat(syns[j]);
        }
    }
    return synonyms;
}


/*
Welcome to the 60fps project! Your goal is to make Cam's Pizzeria website run
jank-free at 60 frames per second.

There are two major issues in this code that lead to sub-60fps performance. Can
you spot and fix both?


Built into the code, you'll find a few instances of the User Timing API
(window.performance), which will be console.log()ing frame rate data into the
browser console. To learn more about User Timing API, check out:
http://www.html5rocks.com/en/tutorials/webperformance/usertiming/

Creator:
Cameron Pittman, Udacity Course Developer
cameron *at* udacity *dot* com
*/

/*

Yilen Pan
Udacity Front End Nanodegree 2015
Project 4

Abstract: Introduced Array.sample prototype to simplify and refactor all of the
randomize functions.

Made adjectives, nouns, words, into global variables so that functions can call on array
rather than initalize three large arrays when the functions are called.

Pulled out the document.selectors out of all of the loops to minimize number of calls to the dom.

Instead of writing a new style, change the class name of RandomPizza to a different col-md-#.

Original js: 539 lines
Current js: 236 lines

*/

//minified all of the arrays.
var pizzaIngredients={};pizzaIngredients.meats=["Pepperoni","Sausage","Fennel Sausage","Spicy Sausage","Chicken","BBQ Chicken","Chorizo","Chicken Andouille","Salami","Tofu","Bacon","Canadian Bacon","Proscuitto","Italian Sausage","Ground Beef","Anchovies","Turkey","Ham","Venison","Lamb","Duck","Soylent Green","Carne Asada","Soppressata Picante","Coppa","Pancetta","Bresola","Lox","Guanciale","Chili","Beef Jerky","Pastrami","Kielbasa","Scallops","Filet Mignon"],pizzaIngredients.nonMeats=["White Onions","Red Onions","Sauteed Onions","Green Peppers","Red Peppers","Banana Peppers","Ghost Peppers","Habanero Peppers","Jalapeno Peppers","Stuffed Peppers","Spinach","Tomatoes","Pineapple","Pear Slices","Apple Slices","Mushrooms","Arugula","Basil","Fennel","Rosemary","Cilantro","Avocado","Guacamole","Salsa","Swiss Chard","Kale","Sun Dried Tomatoes","Walnuts","Artichoke","Asparagus","Caramelized Onions","Mango","Garlic","Olives","Cauliflower","Polenta","Fried Egg","Zucchini","Hummus"],pizzaIngredients.cheeses=["American Cheese","Swiss Cheese","Goat Cheese","Mozzarella Cheese","Parmesean Cheese","Velveeta Cheese","Gouda Cheese","Muenster Cheese","Applewood Cheese","Asiago Cheese","Bleu Cheese","Boursin Cheese","Brie Cheese","Cheddar Cheese","Chevre Cheese","Havarti Cheese","Jack Cheese","Pepper Jack Cheese","Gruyere Cheese","Limberger Cheese","Manchego Cheese","Marscapone Cheese","Pecorino Cheese","Provolone Cheese","Queso Cheese","Roquefort Cheese","Romano Cheese","Ricotta Cheese","Smoked Gouda"],pizzaIngredients.sauces=["Red Sauce","Marinara","BBQ Sauce","No Sauce","Hot Sauce"],pizzaIngredients.crusts=["White Crust","Whole Wheat Crust","Flatbread Crust","Stuffed Crust"];var dark=["dark","morbid","scary","spooky","gothic","deviant","creepy","sadistic","black","dangerous","dejected","haunted","morose","tragic","shattered","broken","sad","melancholy","somber","dark","gloomy","homicidal","murderous","shady","misty","dusky","ghostly","shadowy","demented","cursed","insane","possessed","grotesque","obsessed"],colors=["blue","green","purple","grey","scarlet","NeonGreen","NeonBlue","NeonPink","HotPink","pink","black","red","maroon","silver","golden","yellow","orange","mustard","plum","violet","cerulean","brown","lavender","violet","magenta","chestnut","rosy","copper","crimson","teal","indigo","navy","azure","periwinkle","brassy","verdigris","veridian","tan","raspberry","beige","sandy","ElectricBlue","white","champagne","coral","cyan"],whimsy=["whimsical","silly","drunken","goofy","funny","weird","strange","odd","playful","clever","boastful","breakdancing","hilarious","conceited","happy","comical","curious","peculiar","quaint","quirky","fancy","wayward","fickle","yawning","sleepy","cockeyed","dizzy","dancing","absurd","laughing","hairy","smiling","perplexed","baffled","cockamamie","vulgar","hoodwinked","brainwashed"],shiny=["sapphire","opal","silver","gold","platinum","ruby","emerald","topaz","diamond","amethyst","turquoise","starlit","moonlit","bronze","metal","jade","amber","garnet","obsidian","onyx","pearl","copper","sunlit","brass","brassy","metallic"],noisy=["untuned","loud","soft","shrieking","melodious","musical","operatic","symphonic","dancing","lyrical","harmonic","orchestral","noisy","dissonant","rhythmic","hissing","singing","crooning","shouting","screaming","wailing","crying","howling","yelling","hollering","caterwauling","bawling","bellowing","roaring","squealing","beeping","knocking","tapping","rapping","humming","scatting","whispered","whispering","rasping","buzzing","whirring","whistling","whistled"],apocalyptic=["nuclear","apocalyptic","desolate","atomic","zombie","collapsed","grim","fallen","collapsed","cannibalistic","radioactive","toxic","poisonous","venomous","disastrous","grimy","dirty","undead","bloodshot","rusty","glowing","decaying","rotten","deadly","plagued","decimated","rotting","putrid","decayed","deserted","acidic"],insulting=["stupid","idiotic","fat","ugly","hideous","grotesque","dull","dumb","lazy","sluggish","brainless","slow","gullible","obtuse","dense","dim","dazed","ridiculous","witless","daft","crazy","vapid","inane","mundane","hollow","vacuous","boring","insipid","tedious","monotonous","weird","bizarre","backward","moronic","ignorant","scatterbrained","forgetful","careless","lethargic","insolent","indolent","loitering","gross","disgusting","bland","horrid","unseemly","revolting","homely","deformed","disfigured","offensive","cowardly","weak","villainous","fearful","monstrous","unattractive","unpleasant","nasty","beastly","snide","horrible","syncophantic","unhelpful","bootlicking"],praise=["beautiful","intelligent","smart","genius","ingenious","gorgeous","pretty","witty","angelic","handsome","graceful","talented","exquisite","enchanting","fascinating","interesting","divine","alluring","ravishing","wonderful","magnificient","marvelous","dazzling","cute","charming","attractive","nifty","delightful","superior","amiable","gentle","heroic","courageous","valiant","brave","noble","daring","fearless","gallant","adventurous","cool","enthusiastic","fierce","awesome","radical","tubular","fearsome","majestic","grand","stunning"],scientific=["scientific","technical","digital","programming","calculating","formulating","cyberpunk","mechanical","technological","innovative","brainy","chemical","quantum","astro","space","theoretical","atomic","electronic","gaseous","investigative","solar","extinct","galactic"],scientific_default=["scientific","technical","digital","programming","calculating","formulating","cyberpunk","mechanical","technological","innovative","brainy","chemical","quantum","astro","space","theoretical","atomic","electronic","gaseous","investigative","solar","extinct","galactic"],animals=["flamingo","hedgehog","owl","elephant","pussycat","alligator","dachsund","poodle","beagle","crocodile","kangaroo","wallaby","woodpecker","eagle","falcon","canary","parrot","parakeet","hamster","gerbil","squirrel","rat","dove","toucan","raccoon","vulture","peacock","goldfish","rook","koala","skunk","goat","rooster","fox","porcupine","llama","grasshopper","gorilla","monkey","seahorse","wombat","wolf","giraffe","badger","lion","mouse","beetle","cricket","nightingale","hawk","trout","squid","octopus","sloth","snail","locust","baboon","lemur","meerkat","oyster","frog","toad","jellyfish","butterfly","caterpillar","tiger","hyena","zebra","snail","pig","weasel","donkey","penguin","crane","buzzard","vulture","rhino","hippopotamus","dolphin","sparrow","beaver","moose","minnow","otter","bat","mongoose","swan","firefly","platypus"],professions=["doctor","lawyer","ninja","writer","samurai","surgeon","clerk","artist","actor","engineer","mechanic","comedian","fireman","nurse","RockStar","musician","carpenter","plumber","cashier","electrician","waiter","president","governor","senator","scientist","programmer","singer","dancer","director","mayor","merchant","detective","investigator","navigator","pilot","priest","cowboy","stagehand","soldier","ambassador","pirate","miner","police"],fantasy=["centaur","wizard","gnome","orc","troll","sword","fairy","pegasus","halfling","elf","changeling","ghost","knight","squire","magician","witch","warlock","unicorn","dragon","wyvern","princess","prince","king","queen","jester","tower","castle","kraken","seamonster","mermaid","psychic","seer","oracle"],music=["violin","flute","bagpipe","guitar","symphony","orchestra","piano","trombone","tuba","opera","drums","harpsichord","harp","harmonica","accordion","tenor","soprano","baritone","cello","viola","piccolo","ukelele","woodwind","saxophone","bugle","trumpet","sousaphone","cornet","stradivarius","marimbas","bells","timpani","bongos","clarinet","recorder","oboe","conductor","singer"],horror=["murderer","chainsaw","knife","sword","murder","devil","killer","psycho","ghost","monster","godzilla","werewolf","vampire","demon","graveyard","zombie","mummy","curse","death","grave","tomb","beast","nightmare","frankenstein","specter","poltergeist","wraith","corpse","scream","massacre","cannibal","skull","bones","undertaker","zombie","creature","mask","psychopath","fiend","satanist","moon","fullMoon"],gross=["slime","bug","roach","fluid","pus","booger","spit","boil","blister","orifice","secretion","mucus","phlegm","centipede","beetle","fart","snot","crevice","flatulence","juice","mold","mildew","germs","discharge","toilet","udder","odor","substance","fluid","moisture","garbage","trash","bug"],everyday=["mirror","knife","fork","spork","spoon","tupperware","minivan","suburb","lamp","desk","stereo","television","TV","book","car","truck","soda","door","video","game","computer","calender","tree","plant","flower","chimney","attic","kitchen","garden","school","wallet","bottle"],jewelry=["earrings","ring","necklace","pendant","choker","brooch","bracelet","cameo","charm","bauble","trinket","jewelry","anklet","bangle","locket","finery","crown","tiara","blingBling","chain","rosary","jewel","gemstone","beads","armband","pin","costume","ornament","treasure"],places=["swamp","graveyard","cemetery","park","building","house","river","ocean","sea","field","forest","woods","neighborhood","city","town","suburb","country","meadow","cliffs","lake","stream","creek","school","college","university","library","bakery","shop","store","theater","garden","canyon","highway","restaurant","cafe","diner","street","road","freeway","alley"],scifi=["robot","alien","raygun","spaceship","UFO","rocket","phaser","astronaut","spaceman","planet","star","galaxy","computer","future","timeMachine","wormHole","timeTraveler","scientist","invention","martian","pluto","jupiter","saturn","mars","quasar","blackHole","warpDrive","laser","orbit","gears","molecule","electron","neutrino","proton","experiment","photon","apparatus","universe","gravity","darkMatter","constellation","circuit","asteroid"],scifi_default=["robot","alien","raygun","spaceship","UFO","rocket","phaser","astronaut","spaceman","planet","star","galaxy","computer","future","timeMachine","wormHole","timeTraveler","scientist","invention","martian","pluto","jupiter","saturn","mars","quasar","blackHole","warpDrive","laser","orbit","gears","molecule","electron","neutrino","proton","experiment","photon","apparatus","universe","gravity","darkMatter","constellation","circuit","asteroid"],adjectives=["dark","color","whimsical","shiny","noise","apocalyptic","insulting","praise","scientific"],nouns=["animals","everyday","fantasy","gross","horror","jewelry","places","scifi"];

//Added string prototype itemizer which turns string into <li> elm
//added array prototype sample which returns random value from array.
//before, every time getAdj/getNoun was called, it also initialized the huge arrays
//and also initialized a random number for each array
//by prototyping sample and making arrays global, theres no need for getAdj/getNoun to be so
//heavy.
function getAdj(e){switch(e){case"dark":return dark.sample();case"color":return colors.sample();case"whimsical":return whimsy.sample();case"shiny":return shiny.sample();case"noisy":return noisy.sample();case"apocalyptic":return apocalyptic.sample();case"insulting":return insulting.sample();case"praise":return praise.sample();case"scientific":return scientific.sample();default:return scientific_default.sample()}}function getNoun(e){switch(e){case"animals":return animals.sample();case"profession":return professions.sample();case"fantasy":return fantasy.sample();case"music":return music.sample();case"horror":return horror.sample();case"gross":return gross.sample();case"everyday":return everyday.sample();case"jewelry":return jewelry.sample();case"places":return places.sample();case"scifi":return scifi.sample();default:return scifi_default.sample()}}
String.prototype.capitalize=function(){return this.charAt(0).toUpperCase()+this.slice(1)};
String.prototype.itemizer=function(){return"<li>"+this+"</li>"};
Array.prototype.sample=function(){var e=this[parseInt(Math.random()*this.length)];return e};

//refactored generate into randomName
function randomName(adj, noun) {
  var adjective = getAdj(adj);
  var noun = getNoun(noun);
  return "The " + adjective.capitalize() + " " + noun.capitalize();
}

//removed the selectRandom functions, added an itemizer prototype because
//prototypes are awesome.
var makeRandomPizza = function() {
  var pizza = "";
  var numberOfMeats = Math.floor((Math.random() * 4));
  var numberOfNonMeats = Math.floor((Math.random() * 3));
  var numberOfCheeses = Math.floor((Math.random() * 2));
  for (var i = 0; i < numberOfMeats; i++) {
    pizza += pizzaIngredients.meats.sample().itemizer();
  }
  for (var j = 0; j < numberOfNonMeats; j++) {
    pizza += pizzaIngredients.nonMeats.sample().itemizer();
  }
  for (var k = 0; k < numberOfCheeses; k++) {
    pizza += pizzaIngredients.cheeses.sample().itemizer();
  }
  pizza += pizzaIngredients.sauces.sample().itemizer() + pizzaIngredients.crusts.sample().itemizer();
  return pizza;
};

//pizzaElementGenerator used to initalize the variables first, then assign values
//this just assigns values right away.
var pizzaElementGenerator = function(i) {
  var pC = document.createElement("div");
  var pIC = document.createElement("div");
  var pI = document.createElement("img");
  var pDC = document.createElement("div");
  var pN = document.createElement("h4");
  var uL = document.createElement("ul");

  pC.className = "randomPizzaContainer col-xs-6 col-md-4"
  pC.id = "pizza" + i;                // gives each pizza element a unique id

  pIC.classList.add("col-md-6");
  pI.src = "images/pizza.png";
  pI.classList.add("img-responsive");
  pIC.appendChild(pI);
  pC.appendChild(pIC);

  pDC.classList.add("col-md-6");
  pN.innerHTML = randomName();
  pDC.appendChild(pN);

  uL.innerHTML = makeRandomPizza();
  pDC.appendChild(uL);
  pC.appendChild(pDC);

  return pC;
};

function changeSliderLabel(size) {
  var pizzaSizeClass = document.querySelector("#pizzaSize");
  switch(size) {
    case "1":
      pizzaSizeClass.innerHTML = "Small";
      return;
    case "2":
      pizzaSizeClass.innerHTML = "Medium";
      return;
    case "3":
      pizzaSizeClass.innerHTML = "Large";
      return;
    default:
      console.log("bug in changeSliderLabel");
  }
}

function sizeSwitcher (size) {
  switch(size) {
    case "1":
        return "col-xs-4 col-md-3";
    case "2":
        return "col-xs-6 col-md-4";
    case "3":
        return "col-md-6";
    default:
      console.log("bug in sizeSwitcher");
  }
}


//instead of writing inline style, just change class name.

function changePizzaSizes(size) {
  var randomPizzaContainerClass = document.querySelectorAll(".randomPizzaContainer");
  for (var i = 0; i < randomPizzaContainerClass.length; i++) {
    randomPizzaContainerClass[i].className = "randomPizzaContainer " + sizeSwitcher(size);
    }
}

//refactored resizePizzas after pulling out internal functions. looks prettier now.

var resizePizzas = function(size) {
  window.performance.mark("mark_start_resize");
  changeSliderLabel(size);
  changePizzaSizes(size);
  window.performance.mark("mark_end_resize");
  window.performance.measure("measure_pizza_resize", "mark_start_resize", "mark_end_resize");
  var timeToResize = window.performance.getEntriesByName("measure_pizza_resize");
  console.log("Time to resize pizzas: " + timeToResize[0].duration + "ms");
};

var pizzasDiv = document.getElementById("randomPizzas");

window.performance.mark("mark_start_generating"); // collect timing data

for (var i = 2; i < 100; i++) {
  pizzasDiv.appendChild(pizzaElementGenerator(i));
}

window.performance.mark("mark_end_generating");
window.performance.measure("measure_pizza_generation", "mark_start_generating", "mark_end_generating");
var timeToGenerate = window.performance.getEntriesByName("measure_pizza_generation");
console.log("Time to generate pizzas on load: " + timeToGenerate[0].duration + "ms");

var frame = 0;

function logAverageFrame(times) {
  var numberOfEntries = times.length;
  var sum = 0;
  for (var i = numberOfEntries - 1; i > numberOfEntries - 11; i--) {
    sum = sum + times[i].duration;
  }
  console.log("Average time to generate last 10 frames: " + sum / 10 + "ms");
}

function updatePositions() {
  frame++;
  window.performance.mark("mark_start_frame");
  var items = document.querySelectorAll('.mover');
  var top = document.body.scrollTop / 1250;           //Pulled scrollTop out of loop to minimize unnecessary math
  for (var i = 0; i < items.length; i++) {
    var phase = Math.sin(top + (i % 5));
    items[i].style.left = items[i].basicLeft + 100 * phase + 'px';
  }

  window.performance.mark("mark_end_frame");
  window.performance.measure("measure_frame_duration", "mark_start_frame", "mark_end_frame");
  if (frame % 10 === 0) {
    var timesToUpdatePosition = window.performance.getEntriesByName("measure_frame_duration");
    logAverageFrame(timesToUpdatePosition);
  }
}

window.addEventListener('scroll', updatePositions);

var movingPizzas = document.querySelector("#movingPizzas1");

document.addEventListener('DOMContentLoaded', function() {
  var cols = 8;
  var s = 256;
  for (var i = 0; i < 200; i++) {
    var elem = document.createElement('img');
    elem.className = 'mover';
    elem.src = "images/pizza.png";
    elem.basicLeft = (i % cols) * s;
    elem.style.top = (Math.floor(i / cols) * s) + 'px';
    movingPizzas.appendChild(elem);
  }
  updatePositions();
});

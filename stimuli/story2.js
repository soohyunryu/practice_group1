
var story2_split = [`A clear and joyous day it was and out on the wide, open sea\n
thousands upon thousands of sparkling water-drops excited\n
by getting to play in the ocean danced all around. One of\n
these was a merry little fellow named Aqua who danced on the\n
silver backs of the fishes as they plunged up and down in the\n
waves, and, no matter how high he sprung, he always came down\n
again into his mother's lap. His mother, you know, was the\n
Ocean, and very beautiful she looked that summer day in her\n
dark blue dress and white ruffles. By and by, the happy\n
water-drop tired of his play, and looking up to the clear sky\n`,
`above him, thought he would like to have a sail on one of the\n
white, marshmallow-like clouds, instead of spending his\n
whole life in the ocean. Of the sky, little Aqua had always\n
been afraid, but he decided to finally face his demons and\n
suggested a solution involving the Sun carrying him up to the\n
sky would be ideal. The Sun understood Aqua’s request came\n
from his heart, so he acquiesced and also took ever so many\n
other drops, so that Aqua might not be lonesome on the way. It\n
was only the sun that knew this, however, for all the other\n
drops had been changed into fine mist or vapor and Aqua could\n`,
`not see them. Do you know what vapor is? If you breathe into\n
the air, when it is cold enough, you will see it coming out of\n
your mouth thick and fast like steam. When the vapor is quite\n
near the earth, we call it "fog." Into vapor the water drops\n
that danced in the ocean had been changed because in their\n
own shape they were too heavy for the sunbeams that the sun\n
let out to carry. Higher and higher they sailed, and though\n
it was grand, Aqua and his friends were like fish out of\n
water, so they grew quite dizzy. They enjoyed looking down on\n
the world below, while the wind scattered them across the\n`,
`four corners of the earth, but after a while it grew nearly\n
time for the Sun to go to bed. He became very red in the face,\n
and began to sink lower and lower, until suddenly he went\n
clear out of sight! Poor little Aqua frightened by the\n
impending cold and darkness wished he could sleep not in the\n
sky, but somewhere closer to earth. Then, Aqua heard the wind\n
blow and conjectured that maybe the wind could take him back\n
down to the ocean. Indeed, the wind took pity on him and\n
fanned him, together with all of his brothers and sisters,\n
into a heavy gray cloud, after which he blew them apart and\n`,
`told them to hurry down, fast and furious to the earth so they\n
could have a fighting chance of reaching the ocean. Down they\n
went, rolling over each other until with a patter and clatter\n
and spatter they touched the ground, and all the people that\n
the raindrops fell on cried, "It’s raining", and took out\n
their umbrellas. Some of the drops that were the most\n
fortunate, including Aqua, fell on a mountainside, and down\n
the rocky cliff they ran. Together they plunged into a\n
mountain brook, which came foaming and dashing along,\n
leaping over rocks and rushing down the hillside, until in\n`,
`the valley below they heard the strangest clattering noise.\n
The little water-drops were then able to make out a flourmill\n
that was standing on the bank. Inside the mill the\n
water-drops saw two great stones, which the big wheel kept\n
whizzing round and round. The stones smoothed by the\n
spinning, were busy grinding the wheat into flour and the\n
corn into golden meal. But what giant do you suppose it was\n
who could turn and swing that tremendous wheel? No giant at\n
all. It was just our tiny little water drops, who sprang on it\n
by hundreds and thousands, and whirled it over and over. It\n`,
`was lucky for the water-drops that the brook where they were\n
swimming next emptied into a beautiful pond where ducks and\n
geese were living peacefully. Aqua liked to play hide and\n
seek in this pond, and it was his brother water drop who he\n
fooled by swimming to a big pool of water and pretending to\n
hide there, but then sneaking under a rock into an obscured\n
little puddle. His brother had blatantly peaked and even\n
followed Aqua as he entered the big pool of water, so when he\n
searched there and could not find him, he was extremely\n
surprised and gave up. Aqua liked this pond where he could\n`,
`play all day, so he stayed a good while, sailing up and down,\n
taking the ducks' backs for ships and the frogs for horses,\n
but after a time he tired of the dull life, and he and his\n
brothers floated under a bridge for a long distance, until\n
they saw another brook tumbling down a hillside. Come, let's\n
join hands! cried Aqua and because the water drops were all\n
together, overcoming the brook was child’s play. It was by\n
the help of Aqua and his brothers that the bewitching river\n
was able to float heavy ships, though not so long ago it was\n
only a little stream. As the river grew wider and he could\n`,
`almost see the ocean, Aqua realized his journey was almost\n
over and he had come full circle. Back in the ocean, he felt\n
right at home. For him, this was the safest, sweetest place\n
in the whole wide world. During the warm summer evenings, if\n
you take a walk on the sea beach, you will hear the gentle\n
rippling swash of the waves and some say that it must be the\n
gurgling voices of Aqua and his brother water drops telling\n
each other about their wonderful journey around the world.`];



var story2_questions = [
  {q: "Who was Aqua's mother?",
    a0: "The ocean",
    a1: "The sky",
    cr: '0'},
  {q: "What did Aqua want to try?",
    a0: "Getting to the bottom of the ocean",
    a1: "Riding on a cloud",
    cr: '1'},
  {q: "How did the Sun react to Aqua’s request?",
   a0: "Supported his request",
   a1: "Declined his request",
   cr: '0'},
  {q: "How did Aqua and his friends feel when they sailed higher into the sky?",
    a0: "Refreshed",
    a1: "Dizzy",
    cr: '1'},
  {q: "Why did the Sun go out of sight?",
    a0: "To see his family",
    a1: "To go to bed",
    cr: '1'},
  {q: "Who took pity on Aqua when he was frightened by the cold and darkness as the Sun set?",
    a0: "The wind",
    a1: "A cloud",
    cr: '0'},
  {q: "Where on the earth did Aqua and his friends fall?",
    a0: "On a mountainside",
    a1: "In a river",
    cr: '0'},
  {q: "Where did the mountain brook empty into?",
    a0: "A river",
    a1: "A pond",
    cr: '1'},
  {q: "How many great stones did the water drops see inside the mill?",
    a0: "Two",
    a1: "Three",
    cr: '0'},
  {q: "Who did Aqua play with in the pond?",
    a0: "His brother",
    a1: "His sister",
    cr: '0'},
  {q: "Where did Aqua hide to fool his brother water drop?",
    a0: "Under a tree",
    a1: "Under a rock",
    cr: '1'},
  {q: "How did Aqua get back into the ocean at the end of the journey?",
    a0: "Via a river",
    a1: "Fell from a cloud in the form of rain",
    cr: '0'}
  ]

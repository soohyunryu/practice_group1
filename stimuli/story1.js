
var story1_split = [`If you were to journey to the North of England, you would come\n
to a valley that is surrounded by moors as high as mountains.\n
It is in this valley where you would find the city of\n
Bradford, where once a thousand spinning-jennies that\n
hummed and clattered spun wool into money for the\n
long-bearded mill owners. That all mill owners were\n
generally busy as beavers and quite pleased with themselves\n
for being so successful and well off was known to the\n
residents of Bradford, and if you were to go into the city to\n
visit the stately City Hall, you would see there the Crest of\n`,
`the City of Bradford, which those same mill-owners created\n
to celebrate their achievements. It shows a sinister\n
looking boar's head sitting on top of a well which seems\n
puzzling at first, but the reason for this symbol is a matter\n
of legend. There was once, legend has it, a fearsome boar,\n
which lived in a wood located just outside the manor of\n
Bradford. A source of great trouble to the local folk the\n
boar was, bringing terror to the peaceful flocks and\n
ravaging the countryside around. Even worse, however, the\n
boar most liked to go to the well that was in the wood and\n`,
`drink its fresh water, so that the people of Bradford had\n
second thoughts about visiting the well. That the people of\n
Bradford bore the brunt of the beast’s ferocity was unfair\n
in the eyes of the people of the region. Eventually, the\n
issue reached the ears of the kindly Lord of the Manor who the\n
people had often asked for help. The Lord saw the severity of\n
the problem the people faced and suggested a contest could\n
solve the problem. He said that whoever could kill the boar\n
and bring as proof its head to the Manor House, would be\n
rewarded with land and fame. It was the people of Bradford\n`,
`and the people who knew them who rejoiced at this\n
proclamation but one question remained: who would kill the\n
boar? By the handsome reward many felt tempted, but the\n
thought of the boar with its deadly tusks and face like\n
thunder soon put an end to their ambitions. However, there\n
was one huntsman, who was still wet behind the ears, who\n
decided the prize was worth a shot in spite of the boar's\n
reputation. The huntsman discovered the boar preferred to\n
come out in the middle of the day. So, he went to the wood by\n
the well with his good bow, to bide his time. Around\n`,
`noontime, the boar, feared by the locals, came out, as slow\n
as a snail, from among the trees, just as the huntsman had\n
predicted. The huntsman leaped from his hiding place and\n
through the heart with his fine arrows shot the boar. Now the\n
problem was no longer to kill the boar. It was to find a way to\n
carry the boar back. The head was too heavy for the little\n
huntsman to carry back to the Manor House, but the huntsman,\n
who was as quick-witted and cunning as ever, asked himself,\n
“What else can I do to prove I killed the boar?” The next\n
instance he opened the boar's mouth and cut out its tongue,\n`,
`taking that as proof for the Lord. He set out for the Manor\n
House as quickly as he could and he had only been gone a few\n
minutes when a second huntsman, not so bold as the first but a\n
little more cunning, came on the scene. Seeing the slain\n
carcass of the boar, the huntsman rejoiced in his good\n
fortune. The second huntsman knew a shortcut to the Manor\n
House was just around the nearby pond, and, being a bigger\n
man than the first, was able to pick up the boar's head and\n
carry it through the wood towards the prize that awaited him.\n
The Lord of the Manor was seated in his hall when the second\n`,
`huntsman burst through the door and began to spin a line. The\n
woes of Bradford are ended! he announced. With my own hand I\n
have slain the boar! And, with that, at the feet of his lord he\n
dropped the boar's enormous head. Then you will be rewarded,\n
as I promised. But first, let me examine the head of this\n
monster, said the Lord of the Manor. To not examine the head\n
in advance had not been very clever on the part of the\n
huntsman. Right away, the Lord noticed the tongue of the boar\n
was missing and exclaimed, "What is this? A boar with no\n
tongue?" He looked at the huntsman, dubiously. How come this\n`,
`creature has no tongue? he demanded. All eyes were on the\n
huntsman. The huntsman questioned by the Lord replied, "I\n
cannot say, my Lord." He was suddenly realizing his tricky\n
situation could end badly for him. Through the door at this\n
moment, the first huntsman burst. The woes of Bradford are\n
ended! he cried. I have slain the boar the people of Bradford\n
dreaded! All eyes turned to the man who now stood in the\n
doorway. The reward is already given, said the Lord of the\n
Manor. The man here has brought to me the boar's head. Then\n
where is its tongue? the first huntsman replied. And, so\n`,
`saying, he drew out the boar's tongue he had put in his\n
hunting pouch and related how he had ambushed the creature in\n
the wood and cut out its tongue as proof of his victory.\n
Listening to the tale, the Lord of the Manor tried to discern\n
which huntsman was telling him the truth and what the two\n
huntsmen were thinking as they waited for him to make a\n
decision. Almost instantly, the Lord saw that the second\n
huntsman had fed him a pack of lies and it was the first\n
huntsman who was the true savior of Bradford. The Lord\n
believed the second huntsman had tried to steal the first\n`,
`huntsman’s prize and so proclaimed the first huntsman the\n
true victor. The Lord wondered for a moment why he always\n
encountered so much chicanery in his everyday\n
interactions. The huntsman who had earned his prize fair and\n
square received as his reward a piece of land just outside\n
the town, known thereafter as Hunt Yard. His fame was indeed\n
assured, but it was not nearly as lasting as that of the\n
fearsome Bradford Boar.`];

var story1_questions = [
  {q: "What is depicted on the Crest of the City of Bradford?",
    a0: "A spinning jenny",
    a1: "Boar's head",
    cr: '1'},
  {q: "What did the boar do at the well?",
    a0: "Dive into the well",
    a1: "Drink water from the well",
    cr: '1'},
  {q: "Who suggested a possible solution for the boar problem?",
   a0: "Lord of the Manor",
   a1: "The people of Bradford",
   cr: '0'},
  {q: "What did people think about the rewards suggested by the Lord of the Manor?",
    a0: "Many people were tempted",
    a1: "No one was tempted",
    cr: '0'},
  {q: "When did the boar usually come out?",
    a0: "In the middle of the day",
    a1: "When the sun goes down",
    cr: '0'},
  {q: "How did the huntsman kill the boar?",
    a0: "Using a bow and arrows",
    a1: "Using a big knife",
    cr: '1'},
  {q: "Where was the shortcut to the Manor House located?",
    a0: "Around the hill",
    a1: "Around the pond",
    cr: '1'},
  {q: "Which huntsman was lying to the Lord of the Manor?",
    a0: "The one who cut out the boar's tongue",
    a1: "The one who carried the boar to the Manor House",
    cr: '1'},
  {q: "Who examined the head of the dead Boar after the boar was killed?",
    a0: "The Lord of the Manor",
    a1: "The huntsman who brought the boar’s head",
    cr: '0'},
  {q: "What did the huntsman who brought the head of the boar do when he was questioned about the Boar’s tongue?",
    a0: "He made up the reason why the tongue is gone",
    a1: "He did not give an answer",
    cr: '1'},
  {q: "What did the huntsman who killed the boar receive as a reward?",
    a0: "A piece of land",
    a1: "An honorable title",
    cr: '0'},
  {q: "How long did the true huntsman’s fame last?",
    a0: "It lasted longer than the fame of the fearsome Boar",
    a1: "It was not as lasting as the fame of the fearsome Boar",
    cr: '1'}
  ]

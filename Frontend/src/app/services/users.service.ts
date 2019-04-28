import { Injectable } from '@angular/core';
import { User } from '../model-classes/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private dataUrl = 'http://localhost:1234/fake_user_data.json';
  USERS:User[] = [
    {
      "run": "37225415-7",
      "name": "Bradley",
      "surname": "Cruz",
      "surname2": "Martinez",
      "email": "ac.risus@turpisIncondimentum.net",
      "password": "YSG25VUC3UO"
    },
    {
      "run": "48479268-2",
      "name": "Ina",
      "surname": "Sloan",
      "surname2": "Beach",
      "email": "eros@velarcu.net",
      "password": "CTG22CZO4YT"
    },
    {
      "run": "11135413-8",
      "name": "Raymond",
      "surname": "Coleman",
      "surname2": "Gutierrez",
      "email": "pellentesque.eget@sedconsequatauctor.co.uk",
      "password": "CMZ91SDS8XK"
    },
    {
      "run": "25095640-1",
      "name": "Theodore",
      "surname": "Guzman",
      "surname2": "Jenkins",
      "email": "elit.pharetra.ut@venenatisvel.co.uk",
      "password": "SJY53LMK0CM"
    },
    {
      "run": "7093305-5",
      "name": "Carla",
      "surname": "Spears",
      "surname2": "Berg",
      "email": "fringilla@necanteblandit.com",
      "password": "IVR01ADT4NS"
    },
    {
      "run": "37809207-8",
      "name": "Melyssa",
      "surname": "Villarreal",
      "surname2": "Hunter",
      "email": "Vivamus@consequatnecmollis.ca",
      "password": "COD43VVO4SA"
    },
    {
      "run": "49064848-8",
      "name": "Kane",
      "surname": "Dunn",
      "surname2": "Wynn",
      "email": "a@risusDonecnibh.net",
      "password": "EIY07FLF5YA"
    },
    {
      "run": "15368795-1",
      "name": "Anastasia",
      "surname": "Wiggins",
      "surname2": "Rutledge",
      "email": "sit.amet.diam@Nulla.org",
      "password": "RGH16MCG5HP"
    },
    {
      "run": "9512928-5",
      "name": "Burton",
      "surname": "Guerra",
      "surname2": "Tillman",
      "email": "nisi.sem.semper@metusVivamuseuismod.ca",
      "password": "WEU37ZBA0SG"
    },
    {
      "run": "16320238-7",
      "name": "Kelsie",
      "surname": "Fernandez",
      "surname2": "Frank",
      "email": "et@aliquameros.net",
      "password": "DUA50FVR9JA"
    },
    {
      "run": "13520004-2",
      "name": "Kermit",
      "surname": "Juarez",
      "surname2": "Silva",
      "email": "tincidunt@eget.ca",
      "password": "RIP83KBR9EC"
    },
    {
      "run": "32184454-5",
      "name": "Jermaine",
      "surname": "Marshall",
      "surname2": "Herman",
      "email": "lacus.Etiam.bibendum@Phasellus.net",
      "password": "QVX68YMC0SI"
    },
    {
      "run": "6023339-K",
      "name": "Travis",
      "surname": "Harmon",
      "surname2": "Molina",
      "email": "eros@Phasellusat.edu",
      "password": "ROW28QSJ5TL"
    },
    {
      "run": "15948431-9",
      "name": "Lawrence",
      "surname": "Weiss",
      "surname2": "Donovan",
      "email": "blandit@nonenim.net",
      "password": "HGP63WNZ5JN"
    },
    {
      "run": "10534655-7",
      "name": "Lane",
      "surname": "Bridges",
      "surname2": "Mcmahon",
      "email": "Mauris.non@sociisnatoquepenatibus.net",
      "password": "VLL79UMO5JT"
    },
    {
      "run": "18531515-0",
      "name": "Madaline",
      "surname": "Beard",
      "surname2": "Reynolds",
      "email": "augue.porttitor@magnisdis.org",
      "password": "CUO75LSS5YT"
    },
    {
      "run": "48422578-8",
      "name": "Hyacinth",
      "surname": "Parrish",
      "surname2": "Banks",
      "email": "lorem.ipsum.sodales@Suspendissetristique.com",
      "password": "GBA51FZZ6FB"
    },
    {
      "run": "41446794-6",
      "name": "Knox",
      "surname": "Mills",
      "surname2": "Bridges",
      "email": "risus.at.fringilla@nullaat.co.uk",
      "password": "PLL08PEZ9NI"
    },
    {
      "run": "15741303-1",
      "name": "Stella",
      "surname": "Sosa",
      "surname2": "Sparks",
      "email": "arcu@commodoatlibero.co.uk",
      "password": "KOW94PPZ9JZ"
    },
    {
      "run": "45959166-4",
      "name": "Brenna",
      "surname": "Dixon",
      "surname2": "Higgins",
      "email": "pede.Nunc.sed@magnaCrasconvallis.edu",
      "password": "QXH39QCW7AR"
    },
    {
      "run": "10605372-3",
      "name": "Teegan",
      "surname": "Sherman",
      "surname2": "Douglas",
      "email": "Integer.vulputate.risus@luctusvulputate.com",
      "password": "LNB30DFS5EQ"
    },
    {
      "run": "25031913-4",
      "name": "Rafael",
      "surname": "Lyons",
      "surname2": "Dunlap",
      "email": "Nam.ac.nulla@nisi.org",
      "password": "JZJ33QBW8YL"
    },
    {
      "run": "25153180-3",
      "name": "Jenette",
      "surname": "Shepard",
      "surname2": "Andrews",
      "email": "et.lacinia@Donecnibhenim.com",
      "password": "EZJ12AML9IJ"
    },
    {
      "run": "44396354-5",
      "name": "Hiram",
      "surname": "Huff",
      "surname2": "Bean",
      "email": "laoreet.posuere@etipsum.net",
      "password": "BLW29MSE0SH"
    },
    {
      "run": "6017517-9",
      "name": "Hamilton",
      "surname": "Crosby",
      "surname2": "Battle",
      "email": "Duis.risus@SuspendissesagittisNullam.org",
      "password": "HNZ68CJW9CJ"
    },
    {
      "run": "42578837-K",
      "name": "Kasper",
      "surname": "Stuart",
      "surname2": "Wynn",
      "email": "Cras@sedest.edu",
      "password": "UWR76GVY7RB"
    },
    {
      "run": "13446971-4",
      "name": "Vincent",
      "surname": "Patton",
      "surname2": "Pearson",
      "email": "purus.sapien.gravida@ornarelectusjusto.co.uk",
      "password": "EAT54JBR7XJ"
    },
    {
      "run": "45116529-1",
      "name": "Ishmael",
      "surname": "Morton",
      "surname2": "Wells",
      "email": "auctor@volutpatnunc.net",
      "password": "KQJ05MGX4KZ"
    },
    {
      "run": "5345651-0",
      "name": "Holmes",
      "surname": "Watson",
      "surname2": "Charles",
      "email": "nonummy.Fusce@ridiculusmusDonec.com",
      "password": "JTW44LDM9BC"
    },
    {
      "run": "47202393-4",
      "name": "Beatrice",
      "surname": "Bell",
      "surname2": "Frye",
      "email": "amet.luctus@nonhendreritid.net",
      "password": "VAK17VEH9GE"
    },
    {
      "run": "26223161-5",
      "name": "Harper",
      "surname": "Durham",
      "surname2": "Mcdaniel",
      "email": "quis.accumsan.convallis@Quisque.ca",
      "password": "XMZ40QSQ1XJ"
    },
    {
      "run": "43134549-8",
      "name": "Britanney",
      "surname": "Tyler",
      "surname2": "Rogers",
      "email": "et.rutrum@non.co.uk",
      "password": "NFN76QGL6HO"
    },
    {
      "run": "31320234-8",
      "name": "Naomi",
      "surname": "Carson",
      "surname2": "Atkins",
      "email": "mauris.id.sapien@turpis.com",
      "password": "ERN65LOA8WV"
    },
    {
      "run": "37611971-8",
      "name": "Abel",
      "surname": "Wheeler",
      "surname2": "Mack",
      "email": "massa.lobortis.ultrices@lectusCumsociis.net",
      "password": "BSN45RSH2QT"
    },
    {
      "run": "5548357-4",
      "name": "Beatrice",
      "surname": "Berg",
      "surname2": "Delgado",
      "email": "facilisis@Nullaeuneque.ca",
      "password": "OXK97UQX0QI"
    },
    {
      "run": "32483155-K",
      "name": "Summer",
      "surname": "Mckenzie",
      "surname2": "Farmer",
      "email": "non.lorem@tellusSuspendissesed.org",
      "password": "WIP51EXE7XQ"
    },
    {
      "run": "24178020-1",
      "name": "Cara",
      "surname": "Warren",
      "surname2": "Cooke",
      "email": "tortor@placerat.net",
      "password": "RPA31ARY9RI"
    },
    {
      "run": "14291899-4",
      "name": "Kendall",
      "surname": "Britt",
      "surname2": "Vance",
      "email": "Aenean.massa@auctorvelit.ca",
      "password": "EZM24TBF9QM"
    },
    {
      "run": "31484728-8",
      "name": "Iona",
      "surname": "Burnett",
      "surname2": "Bray",
      "email": "nisi.a.odio@atpede.edu",
      "password": "NNQ39THG3OD"
    },
    {
      "run": "35850345-4",
      "name": "Anika",
      "surname": "Clemons",
      "surname2": "Roberson",
      "email": "felis.ullamcorper.viverra@risusMorbimetus.co.uk",
      "password": "IQE26CFT9GQ"
    },
    {
      "run": "44098829-6",
      "name": "Cara",
      "surname": "Mercer",
      "surname2": "Mccall",
      "email": "non@lectusante.ca",
      "password": "KVB11ZKO4CJ"
    },
    {
      "run": "45472474-7",
      "name": "Plato",
      "surname": "Garrett",
      "surname2": "Hartman",
      "email": "volutpat.nunc.sit@neque.com",
      "password": "IDZ55KZP6EY"
    },
    {
      "run": "20603685-0",
      "name": "Mechelle",
      "surname": "Case",
      "surname2": "Larsen",
      "email": "malesuada@massaSuspendisse.co.uk",
      "password": "QMP14JDH0ZW"
    },
    {
      "run": "42476300-4",
      "name": "Lucius",
      "surname": "Oneil",
      "surname2": "Willis",
      "email": "nibh@egetodio.org",
      "password": "WSY25SNB3QC"
    },
    {
      "run": "13484702-6",
      "name": "Blake",
      "surname": "Gentry",
      "surname2": "Reilly",
      "email": "Cum.sociis@Proin.org",
      "password": "EAR94SSV2YW"
    },
    {
      "run": "24337738-2",
      "name": "Nichole",
      "surname": "Dean",
      "surname2": "Lowery",
      "email": "lobortis.ultrices@Donecelementum.edu",
      "password": "SJM35QMA4DX"
    },
    {
      "run": "7175599-1",
      "name": "Kibo",
      "surname": "Booker",
      "surname2": "Ashley",
      "email": "quis.diam.luctus@imperdiet.ca",
      "password": "GWX44QYK8LA"
    },
    {
      "run": "46379886-9",
      "name": "Melodie",
      "surname": "Mcpherson",
      "surname2": "Winters",
      "email": "semper.dui.lectus@rhoncus.co.uk",
      "password": "AAK52BJM9OY"
    },
    {
      "run": "12719585-4",
      "name": "Kevyn",
      "surname": "Luna",
      "surname2": "Daniels",
      "email": "libero@nonfeugiatnec.net",
      "password": "YIJ76NBQ4ZW"
    },
    {
      "run": "31570463-4",
      "name": "Jael",
      "surname": "Glover",
      "surname2": "Parrish",
      "email": "eleifend.non@sapien.ca",
      "password": "NMA29LCA9JW"
    },
    {
      "run": "19884264-8",
      "name": "Yuri",
      "surname": "Gentry",
      "surname2": "Hunt",
      "email": "sollicitudin.orci.sem@lectus.co.uk",
      "password": "EIB98CKU8JS"
    },
    {
      "run": "50956716-6",
      "name": "Wendy",
      "surname": "Chambers",
      "surname2": "Padilla",
      "email": "lobortis@dolorNulla.edu",
      "password": "LWR04PFD2OB"
    },
    {
      "run": "38460885-K",
      "name": "Craig",
      "surname": "Carver",
      "surname2": "Oliver",
      "email": "nascetur.ridiculus@utpharetra.edu",
      "password": "HRY83AMI9OK"
    },
    {
      "run": "39402809-6",
      "name": "Brendan",
      "surname": "Goodwin",
      "surname2": "Hammond",
      "email": "amet.consectetuer.adipiscing@actellus.ca",
      "password": "MSZ01IRA6GP"
    },
    {
      "run": "19094567-7",
      "name": "Wendy",
      "surname": "Ewing",
      "surname2": "Sweeney",
      "email": "Integer.tincidunt.aliquam@nasceturridiculus.org",
      "password": "YLL85LUH3QX"
    },
    {
      "run": "12853095-9",
      "name": "Timon",
      "surname": "Mcdaniel",
      "surname2": "Anthony",
      "email": "urna.Vivamus.molestie@Phasellusdapibus.com",
      "password": "PJW78XVA8VZ"
    },
    {
      "run": "29281870-K",
      "name": "Cameran",
      "surname": "Leonard",
      "surname2": "Fisher",
      "email": "Curabitur.consequat@pellentesqueafacilisis.net",
      "password": "PBT79KDE4KK"
    },
    {
      "run": "38427505-2",
      "name": "Fritz",
      "surname": "Hill",
      "surname2": "Haynes",
      "email": "dui.Fusce@Aliquam.net",
      "password": "OVR05KUJ0VU"
    },
    {
      "run": "10935769-3",
      "name": "Caleb",
      "surname": "Golden",
      "surname2": "Thompson",
      "email": "orci.Ut.sagittis@diamat.ca",
      "password": "KKB77UQJ9IY"
    },
    {
      "run": "15166878-K",
      "name": "Doris",
      "surname": "Holman",
      "surname2": "Lloyd",
      "email": "facilisis@Etiamlaoreet.net",
      "password": "LBW55OTU7UO"
    },
    {
      "run": "39296534-3",
      "name": "Orson",
      "surname": "Bright",
      "surname2": "Fitzpatrick",
      "email": "congue.In@eu.edu",
      "password": "GHP27QBO2IB"
    },
    {
      "run": "36936743-9",
      "name": "Jarrod",
      "surname": "Gillespie",
      "surname2": "Palmer",
      "email": "nonummy.Fusce.fermentum@sodalesMauris.co.uk",
      "password": "VPP98SQG6DA"
    },
    {
      "run": "17646782-7",
      "name": "Channing",
      "surname": "Mcmillan",
      "surname2": "Goodwin",
      "email": "a@arcu.org",
      "password": "RPV36BDD8LX"
    },
    {
      "run": "22027909-K",
      "name": "Eliana",
      "surname": "Harmon",
      "surname2": "Wright",
      "email": "eu.elit.Nulla@feugiat.ca",
      "password": "BDR73YWM6VK"
    },
    {
      "run": "19174930-8",
      "name": "Charde",
      "surname": "Wong",
      "surname2": "Moon",
      "email": "scelerisque@egestaslaciniaSed.net",
      "password": "KTS05HNX2FN"
    },
    {
      "run": "36376053-8",
      "name": "Griffith",
      "surname": "Kelly",
      "surname2": "Guzman",
      "email": "hendrerit@mi.com",
      "password": "OMJ20PPV1OR"
    },
    {
      "run": "19665293-0",
      "name": "Mary",
      "surname": "Fox",
      "surname2": "Whitehead",
      "email": "lectus.pede@eu.org",
      "password": "RPA35LVC5CV"
    },
    {
      "run": "41884507-4",
      "name": "Anjolie",
      "surname": "Miranda",
      "surname2": "Lara",
      "email": "vel.turpis@senectuset.ca",
      "password": "PCQ59EIH0FY"
    },
    {
      "run": "8868393-5",
      "name": "Nina",
      "surname": "Hodges",
      "surname2": "Torres",
      "email": "at.pretium@vitaeerat.com",
      "password": "WBY57DZM7QB"
    },
    {
      "run": "43563720-5",
      "name": "Cecilia",
      "surname": "Wells",
      "surname2": "Estes",
      "email": "justo.eu.arcu@semper.ca",
      "password": "MHK79GQY6AL"
    },
    {
      "run": "36974073-3",
      "name": "Ali",
      "surname": "Horne",
      "surname2": "Mcfarland",
      "email": "Integer.in.magna@enimSuspendisse.co.uk",
      "password": "ODQ36JFA5PE"
    },
    {
      "run": "30873541-9",
      "name": "Catherine",
      "surname": "Britt",
      "surname2": "House",
      "email": "enim@Maurismolestie.net",
      "password": "WFO87VGJ7NH"
    },
    {
      "run": "48047212-8",
      "name": "Shellie",
      "surname": "Burris",
      "surname2": "Craig",
      "email": "Fusce.mollis@adipiscingelit.co.uk",
      "password": "YTC14UVX1XM"
    },
    {
      "run": "42715485-8",
      "name": "Reuben",
      "surname": "Perez",
      "surname2": "Winters",
      "email": "egestas.a.scelerisque@vulputateposuere.co.uk",
      "password": "JEI20WOR9NB"
    },
    {
      "run": "47344998-6",
      "name": "Jason",
      "surname": "White",
      "surname2": "Bray",
      "email": "Duis@etmagnisdis.net",
      "password": "UYX01MBF8OQ"
    },
    {
      "run": "12811536-6",
      "name": "Maya",
      "surname": "Ramos",
      "surname2": "Patton",
      "email": "amet@augueeutempor.org",
      "password": "LDN51OSU3FT"
    },
    {
      "run": "24283989-7",
      "name": "Constance",
      "surname": "Brock",
      "surname2": "Frost",
      "email": "mus@blandit.net",
      "password": "JCR94INZ0SK"
    },
    {
      "run": "48157661-K",
      "name": "Sheila",
      "surname": "Cole",
      "surname2": "Morrow",
      "email": "lobortis@orci.net",
      "password": "VLR17RMO0UM"
    },
    {
      "run": "30480443-2",
      "name": "Brianna",
      "surname": "Le",
      "surname2": "Monroe",
      "email": "vulputate@elita.ca",
      "password": "BSN46CAV7ZG"
    },
    {
      "run": "30569901-2",
      "name": "Brady",
      "surname": "Horn",
      "surname2": "Cooper",
      "email": "quam.dignissim.pharetra@enimcondimentum.net",
      "password": "SOF20FEK9RD"
    },
    {
      "run": "19011567-4",
      "name": "Brock",
      "surname": "Clayton",
      "surname2": "Delacruz",
      "email": "Nunc.lectus@gravida.edu",
      "password": "HHB81DKU4RW"
    },
    {
      "run": "7526611-1",
      "name": "Ulla",
      "surname": "Lindsey",
      "surname2": "Guthrie",
      "email": "dictum.mi.ac@dignissimtempor.com",
      "password": "RXG20FMQ5YV"
    },
    {
      "run": "37960443-9",
      "name": "Sheila",
      "surname": "Tyson",
      "surname2": "Gilliam",
      "email": "odio.vel.est@luctus.co.uk",
      "password": "TAR35EPX3HX"
    },
    {
      "run": "17256241-8",
      "name": "Robin",
      "surname": "Gay",
      "surname2": "Cochran",
      "email": "Morbi.metus.Vivamus@lectus.edu",
      "password": "SRB51WLY7MW"
    },
    {
      "run": "9657540-8",
      "name": "Jordan",
      "surname": "Roach",
      "surname2": "Moss",
      "email": "in.consectetuer.ipsum@Aliquam.com",
      "password": "SBZ77DYA7PS"
    },
    {
      "run": "38123820-2",
      "name": "Rafael",
      "surname": "Vega",
      "surname2": "Gentry",
      "email": "eget.metus.In@temporaugue.org",
      "password": "QWV30IRH9EA"
    },
    {
      "run": "49936414-8",
      "name": "Britanni",
      "surname": "Decker",
      "surname2": "Davidson",
      "email": "Nunc.lectus@fringilla.net",
      "password": "KBN10SMU0EO"
    },
    {
      "run": "16061073-5",
      "name": "Kylynn",
      "surname": "Tyson",
      "surname2": "Massey",
      "email": "Integer@inaliquetlobortis.ca",
      "password": "TAY90DND6TM"
    },
    {
      "run": "11526941-0",
      "name": "Dexter",
      "surname": "Sawyer",
      "surname2": "Brown",
      "email": "erat.nonummy.ultricies@magnatellus.com",
      "password": "PJS51EMZ6CH"
    },
    {
      "run": "43656987-4",
      "name": "Serena",
      "surname": "Webster",
      "surname2": "Alford",
      "email": "amet.consectetuer@est.org",
      "password": "ZOZ83HSE7JR"
    },
    {
      "run": "46938566-3",
      "name": "Abdul",
      "surname": "Guy",
      "surname2": "Ferguson",
      "email": "est.congue@Fuscemilorem.edu",
      "password": "CAL93DBY9TB"
    },
    {
      "run": "36073918-K",
      "name": "Germaine",
      "surname": "Barber",
      "surname2": "Ellison",
      "email": "accumsan.interdum.libero@vulputateullamcorpermagna.org",
      "password": "TKA97KAO2XJ"
    },
    {
      "run": "6453791-1",
      "name": "Sandra",
      "surname": "Weaver",
      "surname2": "Bowen",
      "email": "in@necurnasuscipit.ca",
      "password": "RLE05XAU8SW"
    },
    {
      "run": "24624885-0",
      "name": "Rogan",
      "surname": "Cote",
      "surname2": "Golden",
      "email": "sem@arcuNunc.co.uk",
      "password": "IMC31EDW3GO"
    },
    {
      "run": "23654634-9",
      "name": "Nayda",
      "surname": "Huber",
      "surname2": "Larsen",
      "email": "neque@venenatis.com",
      "password": "MFF90TEF8OD"
    },
    {
      "run": "24434868-8",
      "name": "Derek",
      "surname": "Gallegos",
      "surname2": "Garrison",
      "email": "imperdiet.ullamcorper.Duis@Quisque.ca",
      "password": "XVU39SKS6IO"
    },
    {
      "run": "19604849-9",
      "name": "Irene",
      "surname": "Alexander",
      "surname2": "Decker",
      "email": "nascetur.ridiculus@libero.net",
      "password": "CFU14HMC7IW"
    },
    {
      "run": "28913102-7",
      "name": "Hasad",
      "surname": "Raymond",
      "surname2": "Nunez",
      "email": "convallis.est@Quisqueimperdiet.co.uk",
      "password": "SFN75NET5VP"
    },
    {
      "run": "12788227-4",
      "name": "Suki",
      "surname": "Christian",
      "surname2": "Cote",
      "email": "dictum@euismodmauriseu.co.uk",
      "password": "NZJ14GUP1WG"
    },
    {
      "run": "16228388-K",
      "name": "Illiana",
      "surname": "Heath",
      "surname2": "Bowman",
      "email": "consectetuer.rhoncus@aauctor.org",
      "password": "MPQ18GFA4XM"
    }
  ]

  constructor() { }

  getUsers() {
    return this.USERS;
  }


}

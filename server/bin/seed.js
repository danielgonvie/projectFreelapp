require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const Calendar = require("../models/Calendar");
const Portfolio = require("../models/Portfolio");
const Artist = require("../models/Artist");

const bcryptSalt = 10;

mongoose
  .connect(`${process.env.DBURL}`, { useNewUrlParser: true })
  .then(x => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

let artists = [
  {
    email: "photo@gmail.com",
    password: bcrypt.hashSync("photo", bcrypt.genSaltSync(bcryptSalt)),
    name: "Laura Fernández",
    alias: "Cotufa",
    picture: "https://i.pravatar.cc/400?img=48",
    location: {
      city: "Madrid",
      country: "España"
    },
    category: "photo",
    subcategory: "Fotógrafa fija",
    availability: "city",
    contactEmail: "photopublic@gmail.com",
    contactPhone: "666555444",
    social: {
      instagram: "@widephotos_",
      other: "www.cotufa.com"
    },
    calendar: undefined,
    portfolio: undefined
  },
  {
    email: "model@gmail.com",
    password: bcrypt.hashSync("model", bcrypt.genSaltSync(bcryptSalt)),
    name: "Lorena Villaverde",
    alias: "La teacher",
    picture: "https://i.pravatar.cc/400?img=26",
    toggleAlias: "alias",
    location: {
      city: "Madrid",
      country: "España"
    },
    category: "photo",
    subcategory: "Modelo profesional de alto standing",
    availability: "worldwide",
    contactEmail: "modelpublic@gmail.com",
    contactPhone: "666777888",
    social: {
      instagram: "@hot_teacher",
      other: "www.clasesintensas.com"
    },
    calendar: undefined,
    portfolio: undefined
  },
  {
    email: "video@gmail.com",
    password: bcrypt.hashSync("video", bcrypt.genSaltSync(bcryptSalt)),
    name: "Daniel Pérez",
    picture: "https://i.pravatar.cc/400?img=58",
    alias: "No",
    toggleAlias: "name",
    location: {
      city: "Madrid",
      country: "España"
    },
    category: "photo",
    subcategory: "Videógrafo",
    availability: "100",
    contactEmail: "videopublic@gmail.com",
    contactPhone: "668949023",
    social: {
      instagram: "@d.perez",
      other: "www.dperez.es"
    },
    calendar: undefined,
    portfolio: undefined
  },
  {
    email: "tattoo@gmail.com",
    password: bcrypt.hashSync("tattoo", bcrypt.genSaltSync(bcryptSalt)),
    name: "Sito Crack",
    picture: "https://ca.slack-edge.com/T02CQ4EN4-UA8BNSXL7-71c20a86bce9-512",
    alias: "TatuSito",
    toggleAlias: "alias",
    location: {
      city: "Madrid",
      country: "España"
    },
    category: "tattoo",
    subcategory: "Tatuajes realistas",
    availability: "local",
    contactEmail: "tattoopublic@gmail.com",
    contactPhone: "654789321",
    social: {
      instagram: "@sitocrack",
      other: "www.tatusito.es"
    },
    calendar: undefined,
    portfolio: undefined
  },
  {
    email: "musicdj@gmail.com",
    password: bcrypt.hashSync("musicdj", bcrypt.genSaltSync(bcryptSalt)),
    name: "Carlos Díaz",
    picture: "https://i.pravatar.cc/400?img=14",
    alias: "Dos Attack",
    toggleAlias: "both",
    location: {
      city: "Madrid",
      country: "España"
    },
    category: "music",
    subcategory: "DJ techno",
    availability: "worldwide",
    contactEmail: "musicdjpublic@gmail.com",
    contactPhone: "693852147",
    social: {
      instagram: "@dosAttack",
      soundcloud: "Dos Attack",
      other: "www.charlyattack.es"
    },
    calendar: undefined,
    portfolio: undefined
  },
  {
    email: "guitarist@gmail.com",
    password: bcrypt.hashSync("gutarist", bcrypt.genSaltSync(bcryptSalt)),
    name: "Manuél Álvarez",
    alias: "Er Sevillano",
    picture: "https://media.licdn.com/dms/image/C4D03AQERj-g9d54Apg/profile-displayphoto-shrink_200_200/0?e=1582156800&v=beta&t=X_F0Pj-tMhbiNn_J_iYTvzuHh4DCy5I98TVBQhXGXSo",
    toggleAlias: "both",
    location: {
      city: "Sevilla",
      country: "España"
    },
    category: "music",
    subcategory: "Guitarra española",
    availability: "city",
    contactEmail: "guitaristpublic@gmail.com",
    contactPhone: "675984123",
    social: {
      instagram: "@manue_sevilla",
      soundcloud: "Er Sevillano",
      other: "www.ersevillano.es"
    },
    calendar: undefined,
    portfolio: undefined
  },
  {
    email: "designweb@gmail.com",
    password: bcrypt.hashSync("designweb", bcrypt.genSaltSync(bcryptSalt)),
    name: "Fran Mollanjo",
    alias: "No",
    toggleAlias: "name",
    picture: "https://i.pravatar.cc/400?img=13",
    location: {
      city: "Canarias",
      country: "España"
    },
    category: "design",
    subcategory: "Fullstack web designer",
    availability: "worldwide",
    contactEmail: "designwebpublic@gmail.com",
    contactPhone: "682953157",
    social: {
      github: "@fran_pomelo",
      other: "www.franchesco.es"
    },
    calendar: undefined,
    portfolio: undefined
  },
  {
    email: "designlogo@gmail.com",
    password: bcrypt.hashSync("designlogo", bcrypt.genSaltSync(bcryptSalt)),
    name: "Hector Arrieta",
    picture: "https://i.pravatar.cc/400?img=15",
    alias: "Grxxts",
    toggleAlias: "both",
    location: {
      city: "Madrid",
      country: "España"
    },
    category: "design",
    subcategory: "Logos para marcas",
    availability: "worldwide",
    contactEmail: "designlogopublic@gmail.com",
    contactPhone: "679458213",
    social: {
      instagram: "@grxxts_",
      other: "www.brand-logo-machine.es"
    },
    calendar: undefined,
    portfolio: undefined
  }
];

let portfolios = [
  {
    description:
      "Desde que era pequeña le cogía prestada a escondidas la cámara analógica a mi madre y siempre me iba al bosque a sacarle fotos a las plantas. Me apasiona la fotografía y no me imagino la vida sin ella. Fotografía macro <3",
    gallery: {
      imageDesc:
        "Mis mejores capturas",
      images: [
        { original: "https://images.wallpaperscraft.com/image/leaf_dew_drops_146450_1920x1200.jpg" },
        { original: "https://images.wallpaperscraft.com/image/fly_insect_macro_111006_2560x1440.jpg" },
        { original: "https://i.pinimg.com/originals/49/d6/b2/49d6b25dbee51c655c7d7a1ce3af1f3d.jpg"}],
        videoDesc: "Mis hermosos videos",
        videos: [
           "https://www.youtube.com/embed/YJG62Zs9vGE",
           "https://www.youtube.com/embed/J6pbiOe7buY"
        ]
      
    }
  },
  {
    description:
      "Me gusta posar de manera sensual y fantástica. Vivo de mi cara. Si me vas a pegar, mejor pégate a mi y así aprendes a ser divina ;)",
    gallery: {
      imageDesc:
        "Me atrevería a decir que estás son las fotos que mejor me representan",
      images: [
        { original: "https://www.freegreatpicture.com/files/87/16718-widescreen-model-actress.jpg"},
        { original: "https://www.freegreatpicture.com/files/87/17059-widescreen-model-actress.jpg"},
        { original: "https://wallpapersmug.com/download/1920x1200/f9797c/brown-eyes-beautiful-girl-model.jpg"}
      ]
    }
  },
  {
    description: "Grabo todo como si fuese un jodido stalker",
    gallery: {

      videoDesc: "Mis hermosos videos",
        videos: [
           "https://www.youtube.com/embed/gYgT9rDzMhM",
           "https://www.youtube.com/embed/ZWBGQo3hozw",
           "https://www.youtube.com/embed/IoLocQdRKzg"
        ]
    }
  },
  {
    description:
      "Me gusta tatuar por que a la gente le duele y me encanta ver a la gente sufrir :3",
    gallery: {
      imageDesc: "Mis mejores trabajos",
      images: [
        { original: "https://s29588.pcdn.co/wp-content/uploads/sites/2/2017/06/Tattoo-Fail.png"},
        { original: "https://s29588.pcdn.co/wp-content/uploads/sites/2/2017/06/Tattoo-Fail.png"},
        { original: "https://s29588.pcdn.co/wp-content/uploads/sites/2/2017/06/Tattoo-Fail.png"}
      ]
    }
  },
  {
    description: "Que te voy a contar que no sepas 🕶 ",
    gallery: {
      imageDesc: "Yo en mi máximo apogeo",
      images: [
        { original: "https://www.esneca.com/wp-content/uploads/DJ-PROFESIONAL.jpg"},
        { original: "https://wallpapersmug.com/download/2560x1440/d226a9/alan-walker-musician-dj.jpg"},
        { original: "https://wallpapersmug.com/download/1920x1200/1ca559/marshmello-music-dj.jpg"}
      ],
      songDesc: "Mis temasos loketeeeeee",
      songs: [
       'https://soundcloud.com/lyamsterdam/premiere-pional-isaac-in-fsharp-riverette',
       'https://soundcloud.com/les-yeux-orange/lyo-dos-attack',
       'https://soundcloud.com/les-yeux-orange/premiere-tiger-woods-feat-alejandro-paz-como-bailar-riverette'
      ]
    }
  },
  {
    description:
      "La música es un arte, illo. Quien se meta con sevilla se mete conmigo. Vivan los serranetes y la pizza. Soy el mejor guitarrista der Mundo. Buah, increíble!",
    gallery: {
      songs: ['https://soundcloud.com/totisoler/sevilla',
       'https://soundcloud.com/les-yeux-orange/lyo-dos-attack',
       'https://soundcloud.com/les-yeux-orange/lyo-dos-attack'
      ]
    }
  },
  {
    description:
      "Profesional polivalente cualificado y enfocado en el diseño web. Amigo de mis amigos y vecino de mis vecinos.  Visita mi web para ver las páginas que he creado.",
    gallery: {
      imageDesc: "Un par de proyectos",
      images: [
        { original: "https://storage.stfalcon.com/uploads/images/5c4b091080730.png"},
        { original: "https://tracyvanderschyff.files.wordpress.com/2018/05/2018-05-03-21_51_19-how-to-choose-the-right-pictures-for-your-banners.png"},
          
      ]
    }
  },
  {
    description:
      "Mi madre me dijo que no iba a llegar a nada en la vida, así que hice artes y se lo confirmé",
    gallery: {
      imageDesc: "Sé usar un lápiz, mira mis sketches",
      images: [
        { original: "https://www.sensationcreative.com/wp-content/uploads/2017/12/Logo-examples-3.jpg"},
        { original: "https://i.pinimg.com/originals/3f/4c/1f/3f4c1ff3edeb347969a3b9eebe92b554.jpg"},
        { original: "https://i.pinimg.com/originals/3e/6c/fa/3e6cfa15dafc901bea43af58fa9fb275.jpg"}
      ]
    }
  }
];

let calendars = [
  {
    resources: [{ id: "r1", name: "Jobs" }],
    events: [
      {
        id: 0,
        title: "All Day Event very long title",
        allDay: true,
        start: new Date(2020, 0, 0),
        end: new Date(2020, 0, 1)
      },
      {
        id: 1,
        title: "Long Event",
        start: new Date(2020, 0, 7),
        end: new Date(2020, 0, 10)
      },

      {
        id: 2,
        title: "DTS STARTS",
        start: new Date(2020, 0, 19, 0, 0, 0),
        end: new Date(2020, 0, 22, 0, 0, 0)
      },

      {
        id: 3,
        title: "DTS ENDS",
        start: new Date(2020, 0, 5, 0, 0, 0),
        end: new Date(2020, 0, 8, 0, 0, 0)
      },

      {
        id: 4,
        title: "Some Event",
        start: new Date(2020, 0, 25, 0, 0, 0),
        end: new Date(2020, 0, 26, 0, 0, 0)
      },
      {
        id: 5,
        title: "Conference",
        start: new Date(2020, 0, 27),
        end: new Date(2020, 0, 28),
        desc: "Big conference for important people"
      },
      {
        id: 6,
        title: "Meeting",
        start: new Date(2020, 0, 02, 10, 30, 0, 0),
        end: new Date(2020, 0, 02, 11, 30, 0, 0),
        desc: "Pre-meeting meeting, to prepare for the meeting"
      },
      {
        id: 7,
        title: "Lunch",
        start: new Date(2020, 0, 06, 11, 0, 0, 0),
        end: new Date(2020, 0, 06, 13, 0, 0, 0),
        desc: "Power lunch"
      },
      {
        id: 8,
        title: "Meeting",
        start: new Date(2020, 0, 12, 14, 0, 0, 0),
        end: new Date(2020, 0, 12, 15, 0, 0, 0)
      },
      {
        id: 9,
        title: "Happy Hour",
        start: new Date(2020, 0, 12, 17, 0, 0, 0),
        end: new Date(2020, 0, 12, 17, 30, 0, 0),
        desc: "Most important meal of the day"
      },
      {
        id: 10,
        title: "Dinner",
        start: new Date(2020, 0, 12, 20, 0, 0, 0),
        end: new Date(2020, 0, 12, 21, 0, 0, 0)
      },
      {
        id: 11,
        title: "Birthday Party",
        start: new Date(2020, 0, 13, 7, 0, 0),
        end: new Date(2020, 0, 13, 10, 30, 0)
      },
      {
        id: 12,
        title: "Late Night Event",
        start: new Date(2020, 0, 17, 19, 30, 0),
        end: new Date(2020, 0, 18, 2, 0, 0)
      },
      {
        id: 12.5,
        title: "Late Same Night Event",
        start: new Date(2020, 0, 17, 19, 30, 0),
        end: new Date(2020, 0, 17, 23, 30, 0)
      },
      {
        id: 13,
        title: "Multi-day Event",
        start: new Date(2020, 0, 20, 19, 30, 0),
        end: new Date(2020, 0, 22, 2, 0, 0)
      },
      {
        id: 14,
        title: "Today",
        start: new Date(new Date().setHours(new Date().getHours() - 3)),
        end: new Date(new Date().setHours(new Date().getHours() + 3))
      }
    ]
  },
  {
    resources: [{ id: "r1", name: "Jobs" }],
    events: [
      {
        id: 0,
        title: "All Day Event very long title",
        allDay: true,
        start: new Date(2020, 0, 0),
        end: new Date(2020, 0, 1)
      },
      {
        id: 1,
        title: "Long Event",
        start: new Date(2020, 0, 7),
        end: new Date(2020, 0, 10)
      },

      {
        id: 2,
        title: "DTS STARTS",
        start: new Date(2020, 0, 19, 0, 0, 0),
        end: new Date(2020, 0, 22, 0, 0, 0)
      },

      {
        id: 3,
        title: "DTS ENDS",
        start: new Date(2020, 0, 5, 0, 0, 0),
        end: new Date(2020, 0, 8, 0, 0, 0)
      },

      {
        id: 4,
        title: "Some Event",
        start: new Date(2020, 0, 25, 0, 0, 0),
        end: new Date(2020, 0, 26, 0, 0, 0)
      },
      {
        id: 5,
        title: "Conference",
        start: new Date(2020, 0, 27),
        end: new Date(2020, 0, 28),
        desc: "Big conference for important people"
      },
      {
        id: 6,
        title: "Meeting",
        start: new Date(2020, 0, 02, 10, 30, 0, 0),
        end: new Date(2020, 0, 02, 11, 30, 0, 0),
        desc: "Pre-meeting meeting, to prepare for the meeting"
      },
      {
        id: 7,
        title: "Lunch",
        start: new Date(2020, 0, 06, 11, 0, 0, 0),
        end: new Date(2020, 0, 06, 13, 0, 0, 0),
        desc: "Power lunch"
      },
      {
        id: 8,
        title: "Meeting",
        start: new Date(2020, 0, 12, 14, 0, 0, 0),
        end: new Date(2020, 0, 12, 15, 0, 0, 0)
      },
      {
        id: 9,
        title: "Happy Hour",
        start: new Date(2020, 0, 12, 17, 0, 0, 0),
        end: new Date(2020, 0, 12, 17, 30, 0, 0),
        desc: "Most important meal of the day"
      },
      {
        id: 10,
        title: "Dinner",
        start: new Date(2020, 0, 12, 20, 0, 0, 0),
        end: new Date(2020, 0, 12, 21, 0, 0, 0)
      },
      {
        id: 11,
        title: "Birthday Party",
        start: new Date(2020, 0, 13, 7, 0, 0),
        end: new Date(2020, 0, 13, 10, 30, 0)
      },
      {
        id: 12,
        title: "Late Night Event",
        start: new Date(2020, 0, 17, 19, 30, 0),
        end: new Date(2020, 0, 18, 2, 0, 0)
      },
      {
        id: 12.5,
        title: "Late Same Night Event",
        start: new Date(2020, 0, 17, 19, 30, 0),
        end: new Date(2020, 0, 17, 23, 30, 0)
      },
      {
        id: 13,
        title: "Multi-day Event",
        start: new Date(2020, 0, 20, 19, 30, 0),
        end: new Date(2020, 0, 22, 2, 0, 0)
      },
      {
        id: 14,
        title: "Today",
        start: new Date(new Date().setHours(new Date().getHours() - 3)),
        end: new Date(new Date().setHours(new Date().getHours() + 3))
      }
    ]
  },
  {
    resources: [{ id: "r1", name: "Jobs" }],
    events: [
      {
        id: 0,
        title: "All Day Event very long title",
        allDay: true,
        start: new Date(2020, 0, 0),
        end: new Date(2020, 0, 1)
      },
      {
        id: 1,
        title: "Long Event",
        start: new Date(2020, 0, 7),
        end: new Date(2020, 0, 10)
      },

      {
        id: 2,
        title: "DTS STARTS",
        start: new Date(2020, 0, 19, 0, 0, 0),
        end: new Date(2020, 0, 22, 0, 0, 0)
      },

      {
        id: 3,
        title: "DTS ENDS",
        start: new Date(2020, 0, 5, 0, 0, 0),
        end: new Date(2020, 0, 8, 0, 0, 0)
      },

      {
        id: 4,
        title: "Some Event",
        start: new Date(2020, 0, 25, 0, 0, 0),
        end: new Date(2020, 0, 26, 0, 0, 0)
      },
      {
        id: 5,
        title: "Conference",
        start: new Date(2020, 0, 27),
        end: new Date(2020, 0, 28),
        desc: "Big conference for important people"
      },
      {
        id: 6,
        title: "Meeting",
        start: new Date(2020, 0, 02, 10, 30, 0, 0),
        end: new Date(2020, 0, 02, 11, 30, 0, 0),
        desc: "Pre-meeting meeting, to prepare for the meeting"
      },
      {
        id: 7,
        title: "Lunch",
        start: new Date(2020, 0, 06, 11, 0, 0, 0),
        end: new Date(2020, 0, 06, 13, 0, 0, 0),
        desc: "Power lunch"
      },
      {
        id: 8,
        title: "Meeting",
        start: new Date(2020, 0, 12, 14, 0, 0, 0),
        end: new Date(2020, 0, 12, 15, 0, 0, 0)
      },
      {
        id: 9,
        title: "Happy Hour",
        start: new Date(2020, 0, 12, 17, 0, 0, 0),
        end: new Date(2020, 0, 12, 17, 30, 0, 0),
        desc: "Most important meal of the day"
      },
      {
        id: 10,
        title: "Dinner",
        start: new Date(2020, 0, 12, 20, 0, 0, 0),
        end: new Date(2020, 0, 12, 21, 0, 0, 0)
      },
      {
        id: 11,
        title: "Birthday Party",
        start: new Date(2020, 0, 13, 7, 0, 0),
        end: new Date(2020, 0, 13, 10, 30, 0)
      },
      {
        id: 12,
        title: "Late Night Event",
        start: new Date(2020, 0, 17, 19, 30, 0),
        end: new Date(2020, 0, 18, 2, 0, 0)
      },
      {
        id: 12.5,
        title: "Late Same Night Event",
        start: new Date(2020, 0, 17, 19, 30, 0),
        end: new Date(2020, 0, 17, 23, 30, 0)
      },
      {
        id: 13,
        title: "Multi-day Event",
        start: new Date(2020, 0, 20, 19, 30, 0),
        end: new Date(2020, 0, 22, 2, 0, 0)
      },
      {
        id: 14,
        title: "Today",
        start: new Date(new Date().setHours(new Date().getHours() - 3)),
        end: new Date(new Date().setHours(new Date().getHours() + 3))
      }
    ]
  },
  {
    resources: [{ id: "r1", name: "Jobs" }],
    events: [
      {
        id: 0,
        title: "All Day Event very long title",
        allDay: true,
        start: new Date(2020, 0, 0),
        end: new Date(2020, 0, 1)
      },
      {
        id: 1,
        title: "Long Event",
        start: new Date(2020, 0, 7),
        end: new Date(2020, 0, 10)
      },

      {
        id: 2,
        title: "DTS STARTS",
        start: new Date(2020, 0, 19, 0, 0, 0),
        end: new Date(2020, 0, 22, 0, 0, 0)
      },

      {
        id: 3,
        title: "DTS ENDS",
        start: new Date(2020, 0, 5, 0, 0, 0),
        end: new Date(2020, 0, 8, 0, 0, 0)
      },

      {
        id: 4,
        title: "Some Event",
        start: new Date(2020, 0, 25, 0, 0, 0),
        end: new Date(2020, 0, 26, 0, 0, 0)
      },
      {
        id: 5,
        title: "Conference",
        start: new Date(2020, 0, 27),
        end: new Date(2020, 0, 28),
        desc: "Big conference for important people"
      },
      {
        id: 6,
        title: "Meeting",
        start: new Date(2020, 0, 02, 10, 30, 0, 0),
        end: new Date(2020, 0, 02, 11, 30, 0, 0),
        desc: "Pre-meeting meeting, to prepare for the meeting"
      },
      {
        id: 7,
        title: "Lunch",
        start: new Date(2020, 0, 06, 11, 0, 0, 0),
        end: new Date(2020, 0, 06, 13, 0, 0, 0),
        desc: "Power lunch"
      },
      {
        id: 8,
        title: "Meeting",
        start: new Date(2020, 0, 12, 14, 0, 0, 0),
        end: new Date(2020, 0, 12, 15, 0, 0, 0)
      },
      {
        id: 9,
        title: "Happy Hour",
        start: new Date(2020, 0, 12, 17, 0, 0, 0),
        end: new Date(2020, 0, 12, 17, 30, 0, 0),
        desc: "Most important meal of the day"
      },
      {
        id: 10,
        title: "Dinner",
        start: new Date(2020, 0, 12, 20, 0, 0, 0),
        end: new Date(2020, 0, 12, 21, 0, 0, 0)
      },
      {
        id: 11,
        title: "Birthday Party",
        start: new Date(2020, 0, 13, 7, 0, 0),
        end: new Date(2020, 0, 13, 10, 30, 0)
      },
      {
        id: 12,
        title: "Late Night Event",
        start: new Date(2020, 0, 17, 19, 30, 0),
        end: new Date(2020, 0, 18, 2, 0, 0)
      },
      {
        id: 12.5,
        title: "Late Same Night Event",
        start: new Date(2020, 0, 17, 19, 30, 0),
        end: new Date(2020, 0, 17, 23, 30, 0)
      },
      {
        id: 13,
        title: "Multi-day Event",
        start: new Date(2020, 0, 20, 19, 30, 0),
        end: new Date(2020, 0, 22, 2, 0, 0)
      },
      {
        id: 14,
        title: "Today",
        start: new Date(new Date().setHours(new Date().getHours() - 3)),
        end: new Date(new Date().setHours(new Date().getHours() + 3))
      }
    ]
  },
  {
    resources: [{ id: "r1", name: "Jobs" }],
    events: [
      {
        id: 0,
        title: "All Day Event very long title",
        allDay: true,
        start: new Date(2020, 0, 0),
        end: new Date(2020, 0, 1)
      },
      {
        id: 1,
        title: "Long Event",
        start: new Date(2020, 0, 7),
        end: new Date(2020, 0, 10)
      },

      {
        id: 2,
        title: "DTS STARTS",
        start: new Date(2020, 0, 19, 0, 0, 0),
        end: new Date(2020, 0, 22, 0, 0, 0)
      },

      {
        id: 3,
        title: "DTS ENDS",
        start: new Date(2020, 0, 5, 0, 0, 0),
        end: new Date(2020, 0, 8, 0, 0, 0)
      },

      {
        id: 4,
        title: "Some Event",
        start: new Date(2020, 0, 25, 0, 0, 0),
        end: new Date(2020, 0, 26, 0, 0, 0)
      },
      {
        id: 5,
        title: "Conference",
        start: new Date(2020, 0, 27),
        end: new Date(2020, 0, 28),
        desc: "Big conference for important people"
      },
      {
        id: 6,
        title: "Meeting",
        start: new Date(2020, 0, 02, 10, 30, 0, 0),
        end: new Date(2020, 0, 02, 11, 30, 0, 0),
        desc: "Pre-meeting meeting, to prepare for the meeting"
      },
      {
        id: 7,
        title: "Lunch",
        start: new Date(2020, 0, 06, 11, 0, 0, 0),
        end: new Date(2020, 0, 06, 13, 0, 0, 0),
        desc: "Power lunch"
      },
      {
        id: 8,
        title: "Meeting",
        start: new Date(2020, 0, 12, 14, 0, 0, 0),
        end: new Date(2020, 0, 12, 15, 0, 0, 0)
      },
      {
        id: 9,
        title: "Happy Hour",
        start: new Date(2020, 0, 12, 17, 0, 0, 0),
        end: new Date(2020, 0, 12, 17, 30, 0, 0),
        desc: "Most important meal of the day"
      },
      {
        id: 10,
        title: "Dinner",
        start: new Date(2020, 0, 12, 20, 0, 0, 0),
        end: new Date(2020, 0, 12, 21, 0, 0, 0)
      },
      {
        id: 11,
        title: "Birthday Party",
        start: new Date(2020, 0, 13, 7, 0, 0),
        end: new Date(2020, 0, 13, 10, 30, 0)
      },
      {
        id: 12,
        title: "Late Night Event",
        start: new Date(2020, 0, 17, 19, 30, 0),
        end: new Date(2020, 0, 18, 2, 0, 0)
      },
      {
        id: 12.5,
        title: "Late Same Night Event",
        start: new Date(2020, 0, 17, 19, 30, 0),
        end: new Date(2020, 0, 17, 23, 30, 0)
      },
      {
        id: 13,
        title: "Multi-day Event",
        start: new Date(2020, 0, 20, 19, 30, 0),
        end: new Date(2020, 0, 22, 2, 0, 0)
      },
      {
        id: 14,
        title: "Today",
        start: new Date(new Date().setHours(new Date().getHours() - 3)),
        end: new Date(new Date().setHours(new Date().getHours() + 3))
      }
    ]
  },
  {
    resources: [{ id: "r1", name: "Jobs" }],
    events: [
      {
        id: 0,
        title: "All Day Event very long title",
        allDay: true,
        start: new Date(2020, 0, 0),
        end: new Date(2020, 0, 1)
      },
      {
        id: 1,
        title: "Long Event",
        start: new Date(2020, 0, 7),
        end: new Date(2020, 0, 10)
      },

      {
        id: 2,
        title: "DTS STARTS",
        start: new Date(2020, 0, 19, 0, 0, 0),
        end: new Date(2020, 0, 22, 0, 0, 0)
      },

      {
        id: 3,
        title: "DTS ENDS",
        start: new Date(2020, 0, 5, 0, 0, 0),
        end: new Date(2020, 0, 8, 0, 0, 0)
      },

      {
        id: 4,
        title: "Some Event",
        start: new Date(2020, 0, 25, 0, 0, 0),
        end: new Date(2020, 0, 26, 0, 0, 0)
      },
      {
        id: 5,
        title: "Conference",
        start: new Date(2020, 0, 27),
        end: new Date(2020, 0, 28),
        desc: "Big conference for important people"
      },
      {
        id: 6,
        title: "Meeting",
        start: new Date(2020, 0, 02, 10, 30, 0, 0),
        end: new Date(2020, 0, 02, 11, 30, 0, 0),
        desc: "Pre-meeting meeting, to prepare for the meeting"
      },
      {
        id: 7,
        title: "Lunch",
        start: new Date(2020, 0, 06, 11, 0, 0, 0),
        end: new Date(2020, 0, 06, 13, 0, 0, 0),
        desc: "Power lunch"
      },
      {
        id: 8,
        title: "Meeting",
        start: new Date(2020, 0, 12, 14, 0, 0, 0),
        end: new Date(2020, 0, 12, 15, 0, 0, 0)
      },
      {
        id: 9,
        title: "Happy Hour",
        start: new Date(2020, 0, 12, 17, 0, 0, 0),
        end: new Date(2020, 0, 12, 17, 30, 0, 0),
        desc: "Most important meal of the day"
      },
      {
        id: 10,
        title: "Dinner",
        start: new Date(2020, 0, 12, 20, 0, 0, 0),
        end: new Date(2020, 0, 12, 21, 0, 0, 0)
      },
      {
        id: 11,
        title: "Birthday Party",
        start: new Date(2020, 0, 13, 7, 0, 0),
        end: new Date(2020, 0, 13, 10, 30, 0)
      },
      {
        id: 12,
        title: "Late Night Event",
        start: new Date(2020, 0, 17, 19, 30, 0),
        end: new Date(2020, 0, 18, 2, 0, 0)
      },
      {
        id: 12.5,
        title: "Late Same Night Event",
        start: new Date(2020, 0, 17, 19, 30, 0),
        end: new Date(2020, 0, 17, 23, 30, 0)
      },
      {
        id: 13,
        title: "Multi-day Event",
        start: new Date(2020, 0, 20, 19, 30, 0),
        end: new Date(2020, 0, 22, 2, 0, 0)
      },
      {
        id: 14,
        title: "Today",
        start: new Date(new Date().setHours(new Date().getHours() - 3)),
        end: new Date(new Date().setHours(new Date().getHours() + 3))
      }
    ]
  },
  {
    resources: [{ id: "r1", name: "Jobs" }],
    events: [
      {
        id: 0,
        title: "All Day Event very long title",
        allDay: true,
        start: new Date(2020, 0, 0),
        end: new Date(2020, 0, 1)
      },
      {
        id: 1,
        title: "Long Event",
        start: new Date(2020, 0, 7),
        end: new Date(2020, 0, 10)
      },

      {
        id: 2,
        title: "DTS STARTS",
        start: new Date(2020, 0, 19, 0, 0, 0),
        end: new Date(2020, 0, 22, 0, 0, 0)
      },

      {
        id: 3,
        title: "DTS ENDS",
        start: new Date(2020, 0, 5, 0, 0, 0),
        end: new Date(2020, 0, 8, 0, 0, 0)
      },

      {
        id: 4,
        title: "Some Event",
        start: new Date(2020, 0, 25, 0, 0, 0),
        end: new Date(2020, 0, 26, 0, 0, 0)
      },
      {
        id: 5,
        title: "Conference",
        start: new Date(2020, 0, 27),
        end: new Date(2020, 0, 28),
        desc: "Big conference for important people"
      },
      {
        id: 6,
        title: "Meeting",
        start: new Date(2020, 0, 02, 10, 30, 0, 0),
        end: new Date(2020, 0, 02, 11, 30, 0, 0),
        desc: "Pre-meeting meeting, to prepare for the meeting"
      },
      {
        id: 7,
        title: "Lunch",
        start: new Date(2020, 0, 06, 11, 0, 0, 0),
        end: new Date(2020, 0, 06, 13, 0, 0, 0),
        desc: "Power lunch"
      },
      {
        id: 8,
        title: "Meeting",
        start: new Date(2020, 0, 12, 14, 0, 0, 0),
        end: new Date(2020, 0, 12, 15, 0, 0, 0)
      },
      {
        id: 9,
        title: "Happy Hour",
        start: new Date(2020, 0, 12, 17, 0, 0, 0),
        end: new Date(2020, 0, 12, 17, 30, 0, 0),
        desc: "Most important meal of the day"
      },
      {
        id: 10,
        title: "Dinner",
        start: new Date(2020, 0, 12, 20, 0, 0, 0),
        end: new Date(2020, 0, 12, 21, 0, 0, 0)
      },
      {
        id: 11,
        title: "Birthday Party",
        start: new Date(2020, 0, 13, 7, 0, 0),
        end: new Date(2020, 0, 13, 10, 30, 0)
      },
      {
        id: 12,
        title: "Late Night Event",
        start: new Date(2020, 0, 17, 19, 30, 0),
        end: new Date(2020, 0, 18, 2, 0, 0)
      },
      {
        id: 12.5,
        title: "Late Same Night Event",
        start: new Date(2020, 0, 17, 19, 30, 0),
        end: new Date(2020, 0, 17, 23, 30, 0)
      },
      {
        id: 13,
        title: "Multi-day Event",
        start: new Date(2020, 0, 20, 19, 30, 0),
        end: new Date(2020, 0, 22, 2, 0, 0)
      },
      {
        id: 14,
        title: "Today",
        start: new Date(new Date().setHours(new Date().getHours() - 3)),
        end: new Date(new Date().setHours(new Date().getHours() + 3))
      }
    ]
  },
  {
    resources: [{ id: "r1", name: "Jobs" }],
    events: [
      {
        id: 0,
        title: "All Day Event very long title",
        allDay: true,
        start: new Date(2020, 0, 0),
        end: new Date(2020, 0, 1)
      },
      {
        id: 1,
        title: "Long Event",
        start: new Date(2020, 0, 7),
        end: new Date(2020, 0, 10)
      },

      {
        id: 2,
        title: "DTS STARTS",
        start: new Date(2020, 0, 19, 0, 0, 0),
        end: new Date(2020, 0, 22, 0, 0, 0)
      },

      {
        id: 3,
        title: "DTS ENDS",
        start: new Date(2020, 0, 5, 0, 0, 0),
        end: new Date(2020, 0, 8, 0, 0, 0)
      },

      {
        id: 4,
        title: "Some Event",
        start: new Date(2020, 0, 25, 0, 0, 0),
        end: new Date(2020, 0, 26, 0, 0, 0)
      },
      {
        id: 5,
        title: "Conference",
        start: new Date(2020, 0, 27),
        end: new Date(2020, 0, 28),
        desc: "Big conference for important people"
      },
      {
        id: 6,
        title: "Meeting",
        start: new Date(2020, 0, 02, 10, 30, 0, 0),
        end: new Date(2020, 0, 02, 11, 30, 0, 0),
        desc: "Pre-meeting meeting, to prepare for the meeting"
      },
      {
        id: 7,
        title: "Lunch",
        start: new Date(2020, 0, 06, 11, 0, 0, 0),
        end: new Date(2020, 0, 06, 13, 0, 0, 0),
        desc: "Power lunch"
      },
      {
        id: 8,
        title: "Meeting",
        start: new Date(2020, 0, 12, 14, 0, 0, 0),
        end: new Date(2020, 0, 12, 15, 0, 0, 0)
      },
      {
        id: 9,
        title: "Happy Hour",
        start: new Date(2020, 0, 12, 17, 0, 0, 0),
        end: new Date(2020, 0, 12, 17, 30, 0, 0),
        desc: "Most important meal of the day"
      },
      {
        id: 10,
        title: "Dinner",
        start: new Date(2020, 0, 12, 20, 0, 0, 0),
        end: new Date(2020, 0, 12, 21, 0, 0, 0)
      },
      {
        id: 11,
        title: "Birthday Party",
        start: new Date(2020, 0, 13, 7, 0, 0),
        end: new Date(2020, 0, 13, 10, 30, 0)
      },
      {
        id: 12,
        title: "Late Night Event",
        start: new Date(2020, 0, 17, 19, 30, 0),
        end: new Date(2020, 0, 18, 2, 0, 0)
      },
      {
        id: 12.5,
        title: "Late Same Night Event",
        start: new Date(2020, 0, 17, 19, 30, 0),
        end: new Date(2020, 0, 17, 23, 30, 0)
      },
      {
        id: 13,
        title: "Multi-day Event",
        start: new Date(2020, 0, 20, 19, 30, 0),
        end: new Date(2020, 0, 22, 2, 0, 0)
      },
      {
        id: 14,
        title: "Today",
        start: new Date(new Date().setHours(new Date().getHours() - 3)),
        end: new Date(new Date().setHours(new Date().getHours() + 3))
      }
    ]
  }
];

let users = [
  {
    email: "lorena@gmail.com",
    password: bcrypt.hashSync("lorena", bcrypt.genSaltSync(bcryptSalt)),
    name: "Lorena Poza",
    picture: "https://avataaars.io/?avatarStyle=Transparent&topType=LongHairBob&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light",
  },
  {
    email: "carlos@gmail.com",
    password: bcrypt.hashSync("carlos", bcrypt.genSaltSync(bcryptSalt)),
    name: "Carlos Trujillo",
    picture: "https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortRound&accessoriesType=Wayfarers&hairColor=SilverGray&facialHairType=BeardMagestic&facialHairColor=Black&clotheType=BlazerShirt&clotheColor=PastelYellow&graphicType=Diamond&eyeType=EyeRoll&eyebrowType=UpDown&mouthType=Serious&skinColor=Light",
  },
  {
    email: "sito@gmail.com",
    password: bcrypt.hashSync("sito", bcrypt.genSaltSync(bcryptSalt)),
    name: "Sito Sito",
    picture: "https://avataaars.io/?avatarStyle=Transparent&topType=WinterHat4&accessoriesType=Kurt&hatColor=Red&facialHairType=BeardMedium&facialHairColor=Platinum&clotheType=Hoodie&clotheColor=PastelYellow&eyeType=EyeRoll&eyebrowType=AngryNatural&mouthType=Twinkle&skinColor=Light",
  }
];

let createdCalendars = [],
  createdPortfolios = [];

User.deleteMany()
  .then(() => {
    return User.create(users);
  })
  .then(usersCreated => {
    console.log(`${usersCreated.length} users created with the following id:`);
    console.log(usersCreated.map(u => u._id));
  })
  .then(() => {
    return Calendar.deleteMany().then(() => {
      return Calendar.create(calendars);
    });
  })
  .then(calendars => {
    createdCalendars = calendars;
    return Portfolio.deleteMany().then(() => {
      return Portfolio.create(portfolios);
    });
  })
  .then(portfolios => {
    createdPortfolios = portfolios;
    // console.log(createdCalendars);
    // console.log("*".repeat(200));
    // console.log(createdPortfolios);

    artists = artists.map((artist, idx) => {
      artist.portfolio = createdPortfolios[idx]._id;
      artist.calendar = createdCalendars[idx]._id;

      return artist;
    });

    Artist.deleteMany()
      .then(() => {
        return Artist.create(artists);
      })
      .then(artistsCreated => {
        console.log(
          `${artistsCreated.length} artists created with the following id:`
        );
        console.log(artistsCreated.map(u => u._id));
      })
      .then(() => {
        // Close properly the connection to Mongoose
        mongoose.disconnect();
      });
  })
  .catch(err => {
    mongoose.disconnect();
    throw err;
  });

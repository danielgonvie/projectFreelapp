const router = require("express").Router();
const Artist = require("../../models/Artist");
const Calendar = require("../../models/Calendar");
const Portfolio = require("../../models/Portfolio");

router.get("/", (req, res, next) => {
  Artist.find()
    .then(artists => {
      res.status(200).json(artists);
    })
    .catch(error => {
      res.status(500).json({ message: "Something went wrong" });
    });
});

router.get("/:id", (req, res, next) => {
  const { id } = req.params;
  Artist.findById(id)
    .populate("calendar")
    .populate("portfolio")
    .then(artist => {
      res.status(200).json(artist);
    })
    .catch(error => console.log(error));
});

/* router.post('/:calendarId', (req, res, next) => {
  const { calendarId } = req.params;
  const {eventId} = req.body;
  Calendar.findByIdAndUpdate(calendarId,{ $pull: {events: {id: eventId}}}, {new: true})
  .then(calendar => {
    res.status(200).json(calendar)
  })
  .catch(error => console.log(error))
}) */

router.get("/calendar/:id", (req, res, next) => {
  const { id } = req.params;
  Calendar.findById(id)
    .then(calendar => {
      res.status(200).json(calendar);
    })
    .catch(error => console.log(error));
});

router.post("/edit/calendar/:id", (req, res, next) => {
  const { id } = req.params;
  const events = req.body;

  Calendar.findByIdAndUpdate(id, { events: events })
    .then(calendar => {
      console.log("Se ha actualizado correctamente");
      res.status(200).json(calendar);
    })
    .catch(error => console.log(error));
});

router.post("/edit/portfolio/:id", (req, res, next) => {
  const { id } = req.params;
  let { description, gallery } = req.body;

  Portfolio.findByIdAndUpdate({_id: id}, {description: description, gallery: gallery})
    .then(portfolio => {
      console.log("Se ha actualizado correctamente el portfolio");
      res.status(200).json(portfolio);
    })
    .catch(error => console.log(error));
});

router.post("/edit/artist/:id", (req, res, next) => {
  const { id } = req.params;
  let { toggleAlias, name, alias, location, category, subcategory, availability, contactEmail, contactPhone, social} = req.body;

  Artist.findByIdAndUpdate({_id: id}, {toggleAlias: toggleAlias, name: name, alias: alias, location: location, category: category, subcategory: subcategory, availability: availability, contactEmail: contactEmail, contactPhone: contactPhone, social: social})
    .then(artist => {
      console.log("Se ha actualizado correctamente el artist");
      res.status(200).json(artist);
    })
    .catch(error => console.log(error));
});

router.post("/delete/img/:id", (req, res, next) => {
  const { id } = req.params;
  let { i } = req.body;

  Portfolio.findByIdAndUpdate(
    { _id: id },
    {  gallery:{ images: { $pull:{_id: i} } }}
  )
    .then(portfolio => {
      console.log("Se ha actualizado correctamente el portfolio");
      res.status(200).json(portfolio);
    })
    .catch(error => console.log(error));
});

router.get("/portfolio/:id", (req, res, next) => {
  const { id } = req.params;
  Portfolio.findById(id)
    .lean()
    .then(portfolio => {
      res.status(200).json(portfolio);
    })
    .catch(error => console.log(error));
});

module.exports = router;

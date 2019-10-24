const express = require("express")
const passport = require("passport")
const { adminOnly, token} = require("../auth")

var router = express.Router();

router.get("/", (req, res) => {

    res.send([
        {
            id: 1,
            name: "iPhone 11"
        },
        {
            id: 2,
            name: "iPhone 11 Pro"
        },
        {
            id: 3,
            name: "iPhone 11 Plus"
        },


    ])
})


router.get("/:id", token, adminOnly, (req, res) => {
    res.send(req.params.id)
})


module.exports = router;
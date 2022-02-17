const express = require("express")
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");



const homeStartingContent = "Marie Curie, née Maria Sklodowska, was born in Warsaw on November 7, 1867, the daughter of a secondary-school teacher. She received a general education in local schools and some scientific training from her father. She became involved in a students’ revolutionary organization and found it prudent to leave Warsaw, then in the part of Poland dominated by Russia, for Cracow, which at that time was under Austrian rule. "

const aboutContent = "Her early researches, together with her husband, were often performed under difficult conditions, laboratory arrangements were poor and both had to undertake much teaching to earn a livelihood. The discovery of radioactivity by Henri Becquerel in 1896 inspired the Curies in their brilliant researches and analyses which led to the isolation of polonium, named after the country of Marie’s birth, and radium. Mme. Curie developed methods for the separation of radium from radioactive residues in sufficient quantities to allow for its characterization and the careful study of its properties, therapeutic properties in particular."


const contactContnet = "Mme. Curie throughout her life actively promoted the use of radium to alleviate suffering and during World War I, assisted by her daughter, Irene, she personally devoted herself to this remedial work. She retained her enthusiasm for science throughout her life and did much to establish a radioactivity laboratory in her native city – in 1929 President Hoover of the United States presented her with a gift of $ 50,000, donated by American friends of science, to purchase radium for use in the laboratory in Warsaw."



const app = express()



app.set('view engine', 'ejs');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"))

// create global variable
let textposts = [];

// call the root route
app.get("/", function(req, res) {

    // send back from the server to the user who's requesting this page
    res.render("home", {
        kindOflist: homeStartingContent,
        textposts: textposts
    });

})

app.get("/about", function(req, res) {

    // send back from the server to the user who's requesting this page
    res.render("about", { kindOfcurie: aboutContent });

})
app.get("/contact", function(req, res) {

    // send back from the server to the user who's requesting this page
    res.render("contact", { kindOfmary: contactContnet });

})

app.get("/compose", function(req, res) {

    // send back from the server to the user who's requesting this page
    res.render("compose");

})

app.post("/compose", function(req, res) {

        //  const cannot be chagned after they been created.
        const post = {
            title: req.body.postItem,
            content: req.body.postBody
        };

        textposts.push(post);
        res.redirect("/");
    })
    // dynamic URL or dynamic website
app.get('/textposts/:postItem', function(req, res) {

    const requestedTitle = _.lowerCase(req.params.postItem);

    textposts.forEach(function(post) {
        const storedTitle = _.lowerCase(post.title);

        if (storedTitle === requestedTitle) {
            res.render("post", {
                title: post.title,
                content: post.content
            });
        }

    });
})


app.listen(3000, function() {
    console.log("Server started on port 3000");
});
import express from "express";

const app = express();

function isVowel(char:string) {
  if (char.length == 1) {
    var vowels = new Array("a", "e", "i", "o", "u");
    var isVowel = false;

    for (let e in vowels) {
      if (vowels[e] == char) {
        isVowel = true;
      }
    }

    return isVowel;
  }
}

app.get("/", (req, res) => {
  res.json({
    message: "Try a more interesting route...",
  });
});

app.get<{food:string}>("/eat/:food", (req, res) => {
  let pronoun = "a"
  if(isVowel(req.params.food[0])){
    pronoun="an"
  }

  res.json({
    message: `Yum yum - you ate ${pronoun} ${req.params.food}!`,
  });
});



app.get<{exampleRouteParameter:string}>("/echo/:exampleRouteParameter", (req, res) => {
  const echoContent = req.params.exampleRouteParameter;
  res.json({
    echo: echoContent,
    message: `I am echoing back to you: ${echoContent}`,
  });
});

app.get<{exampleRouteParameter:string}>("/shout/:exampleRouteParameter", (req, res) => {
  const echoContent = req.params.exampleRouteParameter;
  res.json({
    shout: echoContent,
    message: `I am shouting back to you: ${echoContent.toUpperCase()}!`,
  });
});

app.get<{numOne:number, numTwo:number}>("/multiply/:numOne/:numTwo", (req, res) => {
  /**
   * Note that `numOne` and `numTwo` are both typed as string.
   * (Hover over with your mouse to see!)
   *
   * Route params are, by default, typed as strings when they
   * are parsed by Express.
   */
  const { numOne, numTwo } = req.params;
  const multiplication = numOne * numTwo;
  res.json({
    original: `${numOne} x ${numTwo}`,
    result: multiplication,
  });
});


app.get<{numOne:number, numTwo:number, numThree: number}>("/add/:numOne/:numTwo/:numThree", (req, res) => {

  const { numOne, numTwo, numThree } = req.params;
  const multiplication = numOne - - numTwo - - numThree;
  res.json({
    original: `${numOne} + ${numTwo} + ${numThree}`,
    result: multiplication,
  });
});

/**
 * `app.get` can take a type argument.
 *
 *  This could be the name of an existing type (e.g. an interface)
 *    or a literal object type that is provided directly, as below.
 */
app.get<{ name: string }>("/happy-birthday/:name", (req, res) => {
  res.json({
    lyrics: [
      "Happy birthday to you",
      "Happy birthday to you",
      /**
       * The type argument stops us from, e.g., the silly typo
       * of `req.params.namw` - try it, and see!
       */
      `Happy birthday dear ${req.params.name}`,
      "Happy birthday to you!",
    ],
  });
});

// using 4000 by convention, but could be changed
const PORT_NUMBER = 4000;

app.listen(PORT_NUMBER, () => {
  console.log(`Server is listening on ${PORT_NUMBER}`);
});

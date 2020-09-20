# Intuit - HackZurich2020
> Bringing a human touch to AI generated art

## Demo
[Try it out here](https://goofy-ptolemy-c97c9b.netlify.app/). Only desktop version is available.
[Visit our website](https://intuit.ocin.ch/) or check out the [promo video](https://www.youtube.com/watch?v=NCY7u-kYrUQ)
for more information.

## Inspiration
The workflows of digital artists are becoming increasingly more complex. On the other hand AI assisted tools and even AIs creating art themselves are emerging. Together with Logitech we are asking the question: What will the future of digital creation look like? And how can we bridge the gap between humans and AI.

## What it does
With Intuit we want to bring back the incredible power of human intuition to the digital creation process.
We do this by removing the complex user interfaces, sliders, inputs and buttons and enabling the humans most powerful crafting tool: the hand.

We use the latest in AI computer vision to detect the nuances of the creators hand positions and movements and use that as input for advanced AI tools which are able to generate music, images and 3D assets.

The feedback is immediate. Rather than to use abstract interfaces, you can simply change your hand posture, the AI changes the output accordingly and you can SEE what feels right.

This is a whole new way for creators to shape their digital art.

## How we built it
- We use standard browser APIs to capture your webcam footage
- Video frames are then fed to the TensorFlow Handpose JS model
- The model returns prediction of each hand joint as 3D coordinates
- We use React as our primary front-end library, which hooks up predictions to the application state
- Then using a mathematical sigmoid function we map received coordinates into abstract values on a scale from 1 to 100
- Normalized data are used as inputs for any kind of AI or digital generators
- We have built a little prototype to control the size and color of a Kawaii Cat (check out the demo)
- We created a Landing Page to show the various use cases of the technology as a product demo for Logitech

Side note: The entire solutio runs in the browser!

## Challenges we ran into
- No one in our team had any experience with AI or ML models
- Finding sophisticated AI which could generate art in real time in the browser proved to be still a major hurdle
- Creating the submission video took sooo much time

## Accomplishments that we are proud of
We are happy that we managed to produce such a well rounded package for the hack with a prototype that shows the potential of the technology, looks cute and is actually functional!

## What we learned
That it's possible to use quite sophisticated AI/ML models without having a background in that field.

## What's next for Intuit
- Create a SDK which gives developers simplified ways to work with hand poses data.
- Make the technology more broadly available for touchless UIs in public areas
- Create a Chrome plugin to connect Intuit to any interactive web experience
- Use specialised Hardware to get faster and more accurate inputs
- Use models on the machine (not the browser) to improve the performance

## Stack
- React
- TypeScript
- TensorFlow
- Continuous deployment with Netlify GitHub hooks

## Special Thanks
To Alexandre DeZotti for the math tutoring ;)

## Starting app locally
```
yarn install && yarn start
```

# Server side rendering

Using A/B testing on the server side is pretty easy and consists mostly in 3 steps:
- Getting the cookies for the user and extract all experiments he is participating in
- Initialize the store with those experiments
- Render the app
- Send back the appropriate cookies for the experiments

React-simple-ab provides helpers for step 1 and 4 to make your life easier. A very simple example of A/B test on the server side would be 

```jsx
import express from 'express';
import cookieParser from 'cookie-parser';
import { createStore } from 'redux'
import { digestCookies, bakeCookies } from 'react-redux-ab'

const app = express()

app.use(cookieParser())

app.get("/", function (req, res) {
  let initalState = {
    // Nom nom
    experiments: digestCookies(req.cookies)
  }
  const store = createStore(myStore, initalState)
  const html = React.renderToString(<Provider store={store}><MyApp /></Provider>);
  
  // We update the initalState because it might have been mutated when the store was created
  initialState = store.getState()

  // Let's serve them while they're hot!
  bakeCookies(initalState, res.cookie)

  res.status(200).send(`<!doctype html>
    <html>
      <body>
        <div id="root">${html}</div>
        
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
        </script>
      </body>
    </html>`)
});

app.listen(8080)
```

Note that even if you use server side rendering you should still use the cookies on the client side, because some experiments might be set only on the client side or appear dynamically on the page later on.
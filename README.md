# delphi-crypto

## Get Started

1. Simply run `yarn` or `npm install` to install the dependencies;
2. Run `yarn dev` or `npm run dev` to start the development server;

You can also run some basic tests with `yarn test`.

## Developer Comments

I admit I focused more on speed than on code quality to save some time, but hopefully it shouldn't be too bad.

I am also not entirely comfortable with the crypto context and this specific GraphQL API yet, that's why I didn't include the `Hourly` interval. I'm also not sure if my queries and data are correct, since I don't know of a way of easily checking it. Check `Hourly` and `Monthly` below for more information.

### Project

I'm using Vite, Vue 3 and Composition API. Pretty much followed these steps, so I would also have Tailwind CSS (even though I barely used it): https://tailwindcss.com/docs/guides/vite

Since I'm using TypeScript I also took advantage of type declaration in my `types.d.ts` file.

### Chart

I originally wanted the chart in a separate component, but I had some trouble making [vue-chartjs](https://vue-chartjs.org/) work with Vue 3 (https://github.com/apertureless/vue-chartjs/issues/699), so I ended up using [vue-chart-3](https://github.com/victorgarciaesgi/vue-chart-3) and it was a bit rushed in the end.

### API

Used [Axios](https://github.com/axios/axios) and abstracted away the API calls.
Added an extremely simple in-memory cache layer to our requests. Also added some basic Jest tests for these methods.

### Hourly

I could probably find the correct information if I iterated through all of the pairs that include our selected token and then summed the respective hourly information, but it seemed too farfetched and I'm sure there's a much better solution, so I skipped it. Would be great to know your recommended solution for this case.

### Monthly

I'm calculating monthly values by using the daily data, but I'm sure there's also a better solution.

### Final Thoughts

Pretty cool and interesting idea for a challenge. Will probably come back to it sometime later to better explore the possibilities.

Thank you for your time!

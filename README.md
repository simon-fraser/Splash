# Splash Page

Here I have created a basic splash/landing page that I can set my browsers home tabs to.

This started out as a learning exercise for re-familiarlising myself with Promises and React, but things... escalated.

Built with React v16.4 and I used Guppy[[^]](https://github.com/joshwcomeau/guppy) to create the project framework; a basic `create-react-app`.

## Feeds

The page gets its data from a couple of third party feeds listed below

- [unsplash.com](https://source.unsplash.com) (Wallpaper image)
- ~~[favqs.com](https://favqs.com/api) (Inspirational quote)~~
- [openweathermap.org](https://openweathermap.org/) (Current weather feed)

### Other Stuff

I am also using browser geolocation to get users current position to pass onto the weather feed.


### Todo

- ~~Custom search tool -> Google~~
- Settings (Could ask for name to personalise the experiance)
- Favourite links
- ~~Quote Feed (limited to 10 requests/per hour)~~

### Updates

1.1	(24/07) Style updated, weather moved to corner location and increased size and prominance of search, removed quote feed; mostly due to performance issues and it returing approx 50% of the time.
## SnJMetals (jnsmetalart.com)

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

For detailed explanation on how things work, consult the [docs for vue-loader](http://vuejs.github.io/vue-loader).


# About this project

This is a website I built for my mother/step-father's business. For their use case, it is likely I could have done this easier with a CMS/Website builder with little drawback, but I really wanted to both give them a gift and hone my skills.

I have little real world experience, so I figured it would help to build an app that was able to handle some real world scenarios.

# Vue.js and Bootstrap-Vue

I have learned all sorts of different frameworks/languages since starting my web development journey, like React, Angular, Rails etc., but none of them come close to Vue. There is something magnificent yet simplistic about how Vue comes together to connect your traditional javascript/html/css skills into a comprehensive framework.

In this project, I switched to bootstrap after seeing bootstrap-vue. A part of me wants to use custom css for everything I do, but bootstrap-vue also has lots of functionality built in. It simply made sense at the time.

# Security

I did do research on security best practices for this app, particularly when working with AWS S3 and Firebase, and I feel I did a good job. Security is usually my top priority before pushing any update to production.

# Vuex and Code Organization

This part of the project is a bit tricky. I got tired of managing everything in App.vue, I am not a huge fan of passing down props, and I really wanted to be able to have state management to pass information all across my app.

This might be the weakest part of my development process. This was due to inexperience almost 100%. I tried to include as much as possible in the store, but I ended up holding a lot out of it as well. Some of it I put in helpers, and others in components. Also, some of it might have made sense just to pass as props.

However, I am consistently working to reorganize my code and improve my process for the future.





[john smilga lesson git]: https://github.com/john-smilga/react-projects/tree/master/19-stock-photos
[john smilga lesson]: https://www.udemy.com/course/react-tutorial-and-projects-course/
[john smilga]: https://www.johnsmilga.com/

# Stock Photos

A React app tutorial by [John Smilga.][john smilga]  
This is a course exclusive tutorial you can purchase [here][john smilga lesson]. The original tutorial repository is available for free [here][john smilga lesson git].

The rest of this readme is about my expectations before and my experience after completing the project. I would suggest using the links above if you're interested in learning about the project from its original creator.

## ::BEFORE.

#### what I expect.

This tutorial creates a gallery page where it pulls images from an api by Unsplash, also rather than import pre-made continuous scroll library John creates one himself.

## ::AFTER
#### what stood out.

This is the first tutorial where I needed to use an api key. The tutorial showed how to use custom environment variables in order to prevent uploading sensitive information to git during development. However environment variables are not a safe place for sensitive information in deployment since they will be embedded into the build of the project.

The way the scroll logic works is not complicated but it’s also not a solution I think I would instantly come up with. This makes me realize I need to broaden the way I think about solving these problems. I often feel like I need to create every aspect of a solution, however many of these tools are already there and just need to be used properly.

If you take the sum of the browser view height and the distance scrolled, this sum is equal to the total length of the website when you have scrolled to the end of the site. As the sum gets close to the total length of the website, use the api to call for the next set of data. All of these individual components are immediately available without any extra work.

```javascript
window.innerHeight
window.scrollY
document.body.scrollHeight
```

Finally using too many useEffect functions can create a messy soup of useEffect that becomes difficult to manage. Specifically where all other useEffect functions now need to be aware of what other useEffect functions are doing so you don't trigger infinite loops

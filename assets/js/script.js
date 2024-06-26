'use strict';


// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}


// open the music section
var jsonSong = []

function musicDetailOpen() {
  const songList = document.querySelectorAll("[data-song-list]");
  for (let i = 0; i < songList.length; i++) {
    songList[i].addEventListener("click", function () {

      // console.log(i)
      // do other things here
      for (let j = 0; j < jsonSong.length; j++) {
        if (i === j) {
          // console.log(jsonSong[j])
          const songTitleContainer = document.getElementById("music-song-title");
          const songUriContainer = document.getElementById("music-song-uri");
          const songLyricsContainer = document.getElementById("music-song-lyrics");
          const audioElement = document.getElementById("audio");


          songTitleContainer.innerHTML = jsonSong[j].title;
          songUriContainer.src = jsonSong[j].uri;
          songLyricsContainer.innerHTML = jsonSong[j].lyrics;
          audioElement.load(); //loads the new uri into the audio player

          for (let i = 0; i < pages.length; i++) {
            if (pages[i].dataset.page === "music-detail") {
              pages[i].classList.add("active");
              window.scrollTo(0, 0);
            } else {
              pages[i].classList.remove("active");
            }
          }

        }
      }
    });
  }
}


// open the blog details section

// the blogs variable is in the blogs.js file
function blogDetailsOpen() {
  const blogList = document.querySelectorAll("[data-blog-item]");
  for (let i = 0; i < blogList.length; i++) {
    // console.log(blogList[i], i)
    blogList[i].addEventListener("click", function () {
      for (let j = 0; j < blogs.length; j++) {
        if (i === j) {
          // console.log(blogs[j])
          const focusedBlog = blogs[j]
          const blogTitleContainer = document.getElementById("blog-title")
          const blogImg = document.getElementById("blog-img")
          const blogText = document.getElementById("blog-text")
          const blogCategory = document.getElementById("blog-category")
          const blogDate = document.getElementById("blog-date")

          blogTitleContainer.innerText = focusedBlog.title
          blogImg.src = focusedBlog.image
          blogImg.alt = focusedBlog.title
          blogText.innerText = focusedBlog.content
          blogCategory.innerText = focusedBlog.category
          blogDate.innerText = focusedBlog.date
          blogDate.datetime = new Date(focusedBlog.date)


          for (let i = 0; i < pages.length; i++) {
            if (pages[i].dataset.page === "blog-detail") {
              pages[i].classList.add("active");
              window.scrollTo(0, 0);
            } else {
              pages[i].classList.remove("active");
            }
          }

        }

      }
    })
  }
}

setTimeout(() => {
  musicDetailOpen()
  blogDetailsOpen()
}, 5000)

document.addEventListener("DOMContentLoaded", function () {
  fetch('./assets/js/songlist.json')
    .then(response => response.json())
    .then(data => {

      jsonSong = data;
    })
    .catch(error => console.error('Error fetching JSON:', error));
});


document.addEventListener("DOMContentLoaded", () => {
  const songListContainer = document.getElementById("song-list");
  const loadngSign = document.getElementById("loading-sign");
  setTimeout(() => {
    if (jsonSong.length !== 0) {
      jsonSong.forEach((song) => {
        loadngSign.remove()
        songListContainer.innerHTML += `
                <div class="album-section" data-song-list>
                  <img src="${song.image}" alt="${song.title}" class="album-cover">
                  <div class="song-info">
                      <h1 class="song-title">${song.title}</h1>
                      <h3 class="song-artist">${song.artist}</h3>
                  </div>
                </div>
        `
      });
    } else {
      loadngSign.innerHTML = `
        <h1 class="loading-sign">No music available</h1>
      `
    }
  }, 3000)
})


const photos = [];


document.addEventListener("DOMContentLoaded", () => {
  fetch('./assets/js/photos.json')
    .then(response => response.json())
    .then(data => {
      photos.push(...data)
    })
    .catch(error => console.error('Error fetching JSON:', error));
})

document.addEventListener("DOMContentLoaded", () => {
  const photoContainer = document.getElementById("gallery");
  const photosLoadingSign = document.getElementById("photos-loading-sign");
  setTimeout(() => {
    if (photos.length !== 0) {
      photos.forEach((photo, i) => {
        photosLoadingSign.remove()
        photoContainer.innerHTML += `
               <div class="col-lg-4 col-md-6 col-sm-12 mb-4">
                    <div class="gallery-item">
                        <img src="${photo.uri}" class="img-fluid" alt="Gallery Image ${i + 1}">
                    </div>
                </div>
        `
      });
    } else {
      photosLoadingSign.innerText = `No photos available`
    }
  }, 3000)
})


const videos = [];

document.addEventListener("DOMContentLoaded", () => {
  fetch('./assets/js/videos.json')
    .then(response => response.json())
    .then(data => {
      videos.push(...data)
      // console.log(videos)
    })
    .catch(error => console.error('Error fetching JSON:', error));
})

document.addEventListener("DOMContentLoaded", () => {
  const videoContainer = document.getElementById("gallery");
  const videosLoadingSign = document.getElementById("photos-loading-sign");
  setTimeout(() => {
    if (videos.length !== 0) {
      videos.forEach((video, i) => {
        videosLoadingSign.remove()
        videoContainer.innerHTML += `
        <div class="col-lg-4 col-md-6 col-sm-12 mb-4">
            <div class="gallery-item">
                <iframe width="100%" height="315" src="${video.uri}" title="YouTube video player" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
        </div>
        `
      })
    } else {
      videosLoadingSign.innerText = `No videos available`
    }
  }, 3000)
})

document.addEventListener("DOMContentLoaded", () => {
  const blogContainer = document.getElementById("blog-list");
  const blogLoadingSign = document.getElementById("blog-loading")
  setTimeout(() => {
    blogLoadingSign.remove()
    if (blogs.length !== 0) {
      blogs.forEach((blog, i) => {
        blogContainer.innerHTML += `
        <li class="blog-post-item" data-blog-item>
              <a href="#">

                <figure class="blog-banner-box">
                  <img src="${blog.image}" alt="${blog.title}" loading="lazy">
                </figure>

                <div class="blog-content">

                  <div class="blog-meta">
                    <p class="blog-category">${blog.category}</p>

                    <span class="dot"></span>

                    <time datetime="${new Date(blog.date)}">${blog.date}</time>
                  </div>

                  <h3 class="h3 blog-item-title">${blog.title}</h3>

                  <p class="blog-text">
                    ${blog.contentPreview}
                  </p>

                </div>

              </a>
            </li>
        `
      })
    } else {
      blogContainer.innerHTML = `<div style="margin:auto;font-weight:600;">No blogs available</div>`;
    }
  }, 3000)
})

  // start navbar
  window.addEventListener("scroll",function(){
    if(document.documentElement.clientWidth > 768){
      let head = document.querySelector("header")
      head.classList.toggle("sticky",window.scrollY > 5)
    }
    document.querySelector("header").style.position = "fixed"
    if(this.scrollY >= 1000){
      document.querySelector(".scroll-top").style.right = "30px"
    }else{
      document.querySelector(".scroll-top").style.right = "-100%"
    }
  })

let menuIcon = document.querySelector(".menu-icon")
    menuIcon.addEventListener("click", function(){
    menuIcon.classList.toggle("active")
    document.querySelector("ul").classList.toggle("active")
  })
// end navbar

  // scroll-top
  document.querySelector(".scroll-top").onclick = function (){
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }
  
// start slider
let sliderImages = Array.from(document.querySelectorAll("#landing .slider"));
let slidesCount = sliderImages.length;
let currentslide = 0


let indicator = document.createElement("ul");
indicator.setAttribute("id","indicator-ul");

let nextButton = document.getElementById("next");
let prevButton = document.getElementById("prev");

nextButton.onclick = nextSlide;
prevButton.onclick = prevSlide;

for(let i = 1; i <= slidesCount; i++){
  let indicatorItems = document.createElement("li");
  indicatorItems.setAttribute("data-index",i);
  indicator.appendChild(indicatorItems);
  document.getElementById("indicators").appendChild(indicator);
}

let indicatorItems = document.querySelectorAll("ul li");
let title = document.querySelectorAll(".slider .title")
for(let i = 0; i < indicatorItems.length;i++){
  indicatorItems[i].onclick = function (){
    currentslide = parseInt(this.getAttribute("data-index"))-1;
    checker();
  }
}
checker()

function nextSlide(){
  if(nextButton.classList.contains("disabled")){
    return false;
  }else{
    currentslide++
    checker()
  }
}
function prevSlide(){
  if(prevButton.classList.contains("disabled")){
    return false;
  }else{
    currentslide--
    checker()
  }
}
function checker(){
  removeAll()
  sliderImages[currentslide].classList.add("active")
  indicator.children[currentslide].classList.add("active")
  if(currentslide === 0){
    prevButton.classList.add("disabled")
  }else{
    prevButton.classList.remove("disabled")
  }
  if(currentslide === slidesCount - 1){
    nextButton.classList.add("disabled")
  }else{
    nextButton.classList.remove("disabled")
  }
  title[currentslide].classList.add("active")
}
function removeAll(){
  sliderImages.forEach(function(img){
    img.classList.remove("active")
  })
  indicatorItems.forEach(function(bullet){
    bullet.classList.remove("active")
  })
  title.forEach(function(title){
    title.classList.remove("active")
  })
}
// end slider

// start stats
  let nums = document.querySelectorAll("#stats h1")
  let section = document.querySelector("#stats")
  let started = false

  window.onscroll = function () {
    if(window.scrollY >= section.offsetTop - 200){
      if(!started){
        nums.forEach(function(num){
          startCount(num)
        })
      }
      started = true
    }
  }

  function startCount(ele){
    let goal = ele.dataset.goal
    let count = setInterval(function (){
      ele.textContent++
      if(ele.textContent === goal){
        clearInterval(count)
      }
    }, 2000 / goal)
  }
// end stats

// start testimonial
let sliderContainer = document.querySelector('.testimonial-slider-container');
let slider = document.querySelectorAll('.testimonial-slide')
let nextBtn = document.querySelector('.nextbtn');
let prevBtn = document.querySelector('.prevbtn');

slider.forEach((ele, sliderIndex) =>{
  let position = 'next'
  if(sliderIndex == 0){
    position = 'active'
  }
  if(sliderIndex === slider.length - 1){
    position = 'last'
  }
  ele.classList.add(position)
  
})
let startSlider = (type) =>{
  let active = document.querySelector('.testimonial-slide.active')
  let next = active.nextElementSibling
  let last = document.querySelector('.testimonial-slide.last')

  if(!next){
    next = sliderContainer.firstElementChild
  }
    active.classList.remove('active')
    next.classList.remove('next')
    last.classList.remove('last')

    if(type === 'prev'){
      active.classList.add('next')
      next = last.previousElementSibling
      last.classList.add('active')
      
      if(!next){
        next = sliderContainer.lastElementChild
      }
      next.classList.remove('next')
      next.classList.add('last')
      return
    }
    active.classList.add('last')
    next.classList.add('active')
    last.classList.add('next')
  
}
nextBtn.addEventListener('click', () =>{
  startSlider()
})
prevBtn.addEventListener('click', () =>{
  startSlider('prev')
})


// start form submit
  let form = document.querySelector('#quote form')
  let submitBtn = document.querySelector('#quote button')
  let errorColor = "linear-gradient(to right, #D31027, #D31027 )"
  let successColor = "linear-gradient(to right, #6ac22b, #96c93d)"

  let toast = (msg, color) => {
    return Toastify({
      text: msg,
      duration: 3000,
      gravity: "bottom",
      style: {
        background: color
      },
      }).showToast();
  }
  let handleSubmit = (e) =>{
    e.preventDefault()
    let formData = new FormData(form)
    let data = {...Object.fromEntries(formData)}
    let fetchData = async() =>{
      try {
        let response = await axios.post('http://localhost:3000/api/v1/frets', data)
        toast(response.data.msg,successColor)
      } catch (error) {
        toast(error.response.data.msg,errorColor)
      }
      
    }
    fetchData()
    
  }
  submitBtn.addEventListener('click',handleSubmit)


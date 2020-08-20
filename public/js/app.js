const axios = window.axios

// Send password
$('#send-reset-pass').on('click', function () {
  const email = $('#email').val()

  $.ajax({
    type: 'POST',
    url: 'http://localhost:4000/forgotPass',
    data: {
      email: email,
    },
    success: function (response) {
      $('#email').val('')
      if (!email || response === 'User Not Found') {
        //
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: response,
        })
      } else {
        Swal.fire({
          icon: 'success',
          title: 'Check Your email to reset password',
          showConfirmButton: true,
        })
      }
    },
  })
})

// Show Password
$('#show_password').on('click', function (e) {
  const password = document.querySelector('#password')

  if (password.type === 'password') {
    $('#password').attr('value', password.value)
    $('#password').attr('type', 'text')
  } else {
    $('#password').attr('value', password.value)
    $('#password').attr('type', 'password')
  }
})

// const Shuffle = window.Shuffle
// const element = document.querySelector('.my-shuffle-container')
// const sizer = element.querySelector('.my-sizer-element')

// const shuffleInstance = new Shuffle(element, {
//   itemSelector: '.picture-item',
//   sizer: sizer, // could also be a selector: '.my-sizer-element'
// })

// const p = document.querySelector('.products .category p')
// p.addEventListener('click', function(){
//   console.log(this)
// })

$('#category').on('click', function () {
  const list = document.querySelector('.list')
  list.classList.toggle('open-list')
})

// const checkbox = document.querySelector('.products .row .category input')
// checkbox.addEventListener('click', function(){
//  checkbox.forEach(val => {
//    console.log(val)
//   if(val.checked){
//     shuffleInstance.filter([checkbox.value])
//     console.log(checkbox.value)
//   }
//  })
// })

const coba = document.querySelector('nav .button-collapse input')
const nav = document.querySelector('nav ul')
coba.addEventListener('click', () => {
  nav.classList.toggle('open')
})

if (window.location.href === 'http://localhost:4000/profile') {
  const inputPicture = document.querySelector('#image-profile')
  const myProfile = document.querySelector('#my-profile')
  const progress = document.querySelector('.inner-progress')

  inputPicture.addEventListener('change', function (e) {
    const reader = new FileReader()
    document.querySelector('.progress').style.opacity = 1

    if (this.files && this.files[0]) {
      reader.onload = (e) => {
        myProfile.src = e.target.result
      }
      reader.onprogress = (e) => {
        const percent = (e.loaded / e.total) * 100 + '%'
        progress.style.width = percent
        document.querySelector('.inner-progress span').innerHTML = percent
      }
      reader.readAsDataURL(this.files[0])
    }
  })
}

const sendBlog = document.querySelector('#save-blog')
sendBlog.addEventListener('click', function () {
  const titleBlog = document.querySelector('#title-blog').value
  const descriptionBlog = document.querySelector('#description-blog').value

  axios
    .post('http://localhost:4000/create', {
      title: titleBlog,
      description: descriptionBlog,
    })
    .then((response) => {
      if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Blog created ',
          text : 'Blog has ben created'
        })
      }
    }).catch(error => console.log(error))
})

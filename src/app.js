import './assets/scss/app.scss';
import $ from 'cash-dom';


export class App {
  initializeApp() {
    let self = this;

    $('.load-username').on('click', function (e) {
      let userName = $('.enter-username').val();

      function alphanumeric(string) {
        let letters = /^[a-zA-Z_0-9-]+$/;
        if (string.match(letters)) {
          console.log('success');
          $('.enter-username').removeClass('is-danger');
          $('.profile').removeClass('is-hidden')
          return true;
        }
        else {
          console.log('wrong name');
          alert('Please input alphanumeric characters only');
          $('.profile').addClass('is-hidden')
          $('.enter-username').addClass('is-danger');
          return false;
        }
      }

      alphanumeric(userName);

      fetch('https://api.github.com/users/' + userName)
        .then((response) => {
          return response.json();
        }).then(function (body) {
          console.log(body)
          self.profile = body;
          self.update_profile();
        })

    })

  }

  update_profile() {
    $('#profile-name').text($('.enter-username').val())
    $('#profile-image').attr('src', this.profile.avatar_url)
    $('#profile-url').attr('href', this.profile.html_url).text(this.profile.login)
    $('#profile-bio').text(this.profile.bio || '(no information)')
  }
}

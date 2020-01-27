import './assets/scss/app.scss';
import $ from 'cash-dom';
import { showTime } from './helpers.js';


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


      function getResponse() {
        fetch('https://api.github.com/users/' + userName)
          .then((response) => {
            return response.json();
          }).then(function (body) {
            console.log(body)
            self.profile = body;
            self.update_profile();
            getHistory();
          })
      }

      function getHistory() {
        fetch("https://api.github.com/users/" + userName + "/events/public")
          .then((response) => {
            return response.json();
          }).then(function (myJSON) {
            console.log(myJSON);
            self.histProfile = myJSON;
          });
      }


      // 3 timeline items

      $('#first-timeline-item').on('click', function (e) {
        $('.first').addClass('is-primary');
        $('.second').removeClass('is-primary');
        $('.third').removeClass('is-primary');
        self.update_history();
      })

      $('#second-timeline-item').on('click', function (e) {
        $('.second').addClass('is-primary');
        $('.first').removeClass('is-primary');
        $('.third').removeClass('is-primary');
        getHistory();
      })

      $('#third-timeline-item').on('click', function (e) {
        $('.third').addClass('is-primary');
        $('.second').removeClass('is-primary');
        $('.first').removeClass('is-primary');
        getHistory();
      })

      alphanumeric(userName);
      getResponse();

    })

  }


  update_history() {
    const toBeSorted = this.histProfile;
    const sorted = toBeSorted.filter(event => {
      if (event.type === 'PullRequestReviewCommentEvent' || event.type === 'PullRequestEvent') {
        return event;
      };
    });
    console.log(sorted);


    // 1st Event

    if (sorted[0] === undefined) {

      $('.heading-one').text('No previous activity detected');
      $('.content-one').addClass('is-hidden');

    } else if (sorted[0].type === 'PullRequestReviewCommentEvent') {

      $('.content-one').removeClass('is-hidden');

      $('.heading-one').text(showTime(this.histProfile[0].created_at)); // Date
      $('.history-avatar-pic-one').attr('src', this.histProfile[0].actor.avatar_url); // img
      $('#timeline-name').attr('href', this.profile.html_url).text(this.profile.login); // name
      $('.payload-action').text(sorted[0].payload.action); // created
      $('.payload-item').attr('href', sorted[0].payload.comment.html_url).text('comment');  // comment
      $('.optional-to-one').removeClass('is-hidden'); // hidden 'to'
      $('.optional-pull-request').attr('href', sorted[0].payload.pull_request.html_url).removeClass('is-hidden');  // hidden pull request
      $('#history-repo').attr('href', 'https://github.com/' + this.histProfile[0].repo.name).text(this.histProfile[0].repo.name); // repo

    } else if (sorted[0].type === 'PullRequestEvent') {

      $('.content-one').removeClass('is-hidden');

      $('.heading-one').text(showTime(sorted[0].created_at));  // Date
      $('.history-avatar-pic-one').attr('src', sorted[0].actor.avatar_url); // img
      $('#timeline-name').attr('href', this.profile.html_url).text(this.profile.login); // name
      $('.payload-action').text(sorted[0].payload.action); // closed / opened
      $('.payload-item').attr('href', sorted[0].payload.pull_request.html_url).text('pull request');  // pull request
      $('.optional-to-one').addClass('is-hidden');  // hidden 'to'
      $('.optional-pull-request').addClass('is-hidden'); // hidden optional pull request
      $('#history-repo').attr('href', 'https://github.com/' + sorted[0].repo.name).text(sorted[0].repo.name);  // repo
    }

  }


  update_profile() {
    $('#profile-name').text($('.enter-username').val())
    $('#profile-image').attr('src', this.profile.avatar_url)
    $('#profile-url').attr('href', this.profile.html_url).text(this.profile.login)
    $('#profile-bio').text(this.profile.bio || '(no information)')
  }
}

import './assets/scss/app.scss';
import $ from 'cash-dom';
import { showTime, wrongName, showContent } from './helpers.js';


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
          return true;
        } else {
          console.log('wrong name');
          return false;
        }
      }


      function getResponse() {
        fetch('https://api.github.com/users/' + userName)
          .then((response) => {
            return response.json();
          }).then(function (body) {
            self.profile = body;
            console.log(body);
            self.update_profile();
            getHistory(0, 1, 2);
          })
      }

      function getHistory(a, b, c) {
        fetch("https://api.github.com/users/" + userName + "/events/public")
          .then((response) => {
            return response.json();
          }).then(function (myJSON) {
            console.log(myJSON);
            self.histProfile = myJSON;

            self.update_history(a, b, c);
            showContent();
          });
      }



      function start(checkedUsername) {
        return new Promise((resolve, reject) => {
          if (checkedUsername === true) {
            getResponse();
          } else {
            reject(wrongName());
          }
        })
      }


      // 3 timeline items

      $('.first').on('click', function (e) {
        $('.first').addClass('is-primary');
        $('.second').removeClass('is-primary');
        $('.third').removeClass('is-primary');
        self.update_history(0, 1, 2);
      })

      $('.second').on('click', function (e) {
        $('.second').addClass('is-primary');
        $('.first').removeClass('is-primary');
        $('.third').removeClass('is-primary');
        self.update_history(3, 4, 5);
      })

      $('.third').on('click', function (e) {
        $('.third').addClass('is-primary');
        $('.second').removeClass('is-primary');
        $('.first').removeClass('is-primary');
        self.update_history(6, 7, 8);
      })

      start(alphanumeric(userName));

    })

  }


  update_history(one, two, three) {
    const toBeSorted = this.histProfile;
    const sorted = toBeSorted.filter(event => {
      if (event.type === 'PullRequestReviewCommentEvent' || event.type === 'PullRequestEvent') {
        return event;
      };
    });
    console.log(sorted);


    // 1st Event

    if (sorted[one] === undefined) {

      $('.heading-one').text('No previous activity detected');
      $('.content-one').addClass('is-hidden');

    } else if (sorted[one].type === 'PullRequestReviewCommentEvent') {

      $('.content-one').removeClass('is-hidden');

      $('.heading-one').text(showTime(this.histProfile[one].created_at)); // Date
      $('.history-avatar-pic-one').attr('src', this.histProfile[one].actor.avatar_url); // img
      $('#timeline-name').attr('href', this.profile.html_url).text(this.profile.login); // name
      $('.payload-action').text(sorted[one].payload.action); // created
      $('.payload-item').attr('href', sorted[one].payload.comment.html_url).text('comment');  // comment
      $('.optional-to-one').removeClass('is-hidden'); // hidden 'to'
      $('.optional-pull-request').attr('href', sorted[one].payload.pull_request.html_url).removeClass('is-hidden');  // hidden pull request
      $('#history-repo').attr('href', 'https://github.com/' + this.histProfile[one].repo.name).text(this.histProfile[one].repo.name); // repo

    } else if (sorted[0].type === 'PullRequestEvent') {

      $('.content-one').removeClass('is-hidden');

      $('.heading-one').text(showTime(sorted[one].created_at));  // Date
      $('.history-avatar-pic-one').attr('src', sorted[one].actor.avatar_url); // img
      $('#timeline-name').attr('href', this.profile.html_url).text(this.profile.login); // name
      $('.payload-action').text(sorted[one].payload.action); // closed / opened
      $('.payload-item').attr('href', sorted[one].payload.pull_request.html_url).text('pull request');  // pull request
      $('.optional-to-one').addClass('is-hidden');  // hidden 'to'
      $('.optional-pull-request').addClass('is-hidden'); // hidden optional pull request
      $('#history-repo').attr('href', 'https://github.com/' + sorted[one].repo.name).text(sorted[one].repo.name);  // repo

    }

    // 2nd Event

    if (sorted[two] === undefined) {

      $('.heading-two').text('No previous activity detected');
      $('.content-two').addClass('is-hidden');

    } else if (sorted[two].type === 'PullRequestReviewCommentEvent') {

      $('.content-two').removeClass('is-hidden');

      $('.heading-two').text(showTime(this.histProfile[two].created_at)); // Date
      $('.history-avatar-pic-two').attr('src', this.histProfile[two].actor.avatar_url); // img
      $('#timeline-name-two').attr('href', this.profile.html_url).text(this.profile.login); // name
      $('.payload-action-two').text(sorted[two].payload.action); // created
      $('.payload-item-two').attr('href', sorted[two].payload.comment.html_url).text('comment');  // comment
      $('.optional-to-two').removeClass('is-hidden'); // hidden 'to'
      $('.optional-pull-request-two').attr('href', sorted[two].payload.pull_request.html_url).removeClass('is-hidden');  // hidden pull request
      $('#history-repo-two').attr('href', 'https://github.com/' + this.histProfile[two].repo.name).text(this.histProfile[two].repo.name);  // repo

    } else if (sorted[two].type === 'PullRequestEvent') {

      $('.content-two').removeClass('is-hidden');

      $('.heading-two').text(showTime(sorted[two].created_at));  // Date
      $('.history-avatar-pic-two').attr('src', sorted[two].actor.avatar_url); // img
      $('#timeline-name-two').attr('href', this.profile.html_url).text(this.profile.login); // name
      $('.payload-action-two').text(sorted[two].payload.action); // closed / opened
      $('.payload-item-two').attr('href', sorted[two].payload.pull_request.html_url).text('pull request');  // pull request
      $('.optional-to-two').addClass('is-hidden');  // hidden 'to'
      $('.optional-pull-request-two').addClass('is-hidden'); // hidden optional pull request
      $('#history-repo-two').attr('href', 'https://github.com/' + sorted[two].repo.name).text(sorted[two].repo.name);  // repo

    }

    // 3rd Event

    if (sorted[three] === undefined) {

      $('.heading-three').text('No previous activity detected');
      $('.content-three').addClass('is-hidden');

    } else if (sorted[three].type === 'PullRequestReviewCommentEvent') {

      $('.content-three').removeClass('is-hidden');

      $('.heading-three').text(showTime(this.histProfile[three].created_at)); // Date
      $('.history-avatar-pic-three').attr('src', this.histProfile[three].actor.avatar_url); // img
      $('#timeline-name-three').attr('href', this.profile.html_url).text(this.profile.login); // name
      $('.payload-action-three').text(sorted[three].payload.action); // created
      $('.payload-item-three').attr('href', sorted[three].payload.comment.html_url).text('comment');  // comment
      $('.optional-to-three').removeClass('is-hidden'); // hidden 'to'
      $('.optional-pull-request-three').attr('href', sorted[three].payload.pull_request.html_url).removeClass('is-hidden');  // hidden pull request
      $('#history-repo-three').attr('href', 'https://github.com/' + this.histProfile[three].repo.name).text(this.histProfile[three].repo.name); //repo

    } else if (sorted[three].type === 'PullRequestEvent') {

      $('.content-three').removeClass('is-hidden');

      $('.heading-three').text(showTime(sorted[three].created_at));  // Date
      $('.history-avatar-pic-three').attr('src', sorted[three].actor.avatar_url); // img
      $('#timeline-name-three').attr('href', this.profile.html_url).text(this.profile.login); // name
      $('.payload-action-three').text(sorted[three].payload.action); // closed / opened
      $('.payload-item-three').attr('href', sorted[three].payload.pull_request.html_url).text('pull request');  // pull request
      $('.optional-to-three').addClass('is-hidden');  // hidden 'to'
      $('.optional-pull-request-three').addClass('is-hidden'); // hidden optional pull request
      $('#history-repo-three').attr('href', 'https://github.com/' + sorted[three].repo.name).text(sorted[three].repo.name);  // repo

    }

  }


  update_profile() {
    $('#profile-name').text($('.enter-username').val())
    $('#profile-image').attr('src', this.profile.avatar_url)
    $('#profile-url').attr('href', this.profile.html_url).text(this.profile.login)
    $('#profile-bio').text(this.profile.bio || '(no information)')
  }
}

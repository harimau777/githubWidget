import {getLocation} from './location.js';
import {getProfile} from './github.js';
import {Profile} from './profile.jsx';

class App extends React.Component {
  constructor() {
    super();

    this.handleRefreshButton.bind(this);
    this.handleRejectButton.bind(this);

    //Get the user's location:
    getLocation((location) => {
      this.setState({location: location});
      this.randomProfile(0);
      this.randomProfile(1);
      this.randomProfile(2);
    });

    //Set the initial state:
    this.state = {
      profiles : ['1', '2', '3']
    };
  }

  randomProfile(profileNum) {
    getProfile(this.state.location, (data) => {
      const profiles = this.state.profiles;
      profiles[profileNum] = data;
      this.setState({profiles: profiles});
    }, () => console.log('Error'));
  }

  handleRefreshButton() {
    this.randomProfile(0);
    this.randomProfile(1);
    this.randomProfile(2);
  }

  handleRejectButton(event) {
    console.log(event.target);
    // this.randomProfile(id)
  }

  render() {
    // {_.map(this.state.profiles, (profile, index) => `<Profile profile=${profile} />`)}
    return (
      <div className="app">
        <h1>Who to follow</h1>
        <span className="refreshButton" onClick={this.handleRefreshButton}>Refresh</span>
        <Profile profile={this.state.profiles[0]} rejectHandler={this.handleRejectButton} index="0" />
        <Profile profile={this.state.profiles[1]} rejectHandler={this.handleRejectButton} index="1" />
        <Profile profile={this.state.profiles[2]} rejectHandler={this.handleRejectButton} index="2" />
        <p>{this.state.location ? this.state.location : 'Unable to determine location'}</p>
      </div>
    );
  }
}

export {App};

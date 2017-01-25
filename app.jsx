class app extends React.Component {
  constructor(props) {
    super(props);
    //Set the initial state:
    this.state = {
      profiles : ___???___
    }
  }

  render() {
    return {
      <div className="app">
        <h1>Who to follow</h1>
        <span className="refreshButton">Refresh</span>
        {_.map(this.state.profiles, (profile) => <Profile ___ />)}
        <p>{this.props.location</p>
      </div>
    };
  }
}


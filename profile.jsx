const Profile = (props) => {
  return (
    <div className="profile">
      <div className="col">
        <img src={props.profile.avatar} className="githubAvatar" />
      </div>
      <div className="col">
        <p>
          <span className="username">{props.profile.name}</span>
          <a href={props.profile.profile}>{props.profile.login}</a>
        </p>
        <button type="button" className="githubButton btn"><img src="resources/github-circle.svg"></img> GitHub Profile</button>
      </div>
      <div className="col rejectButton" onClick={props.rejectHandler}>
        <i className="material-icons" data={props.index}>close</i>
      </div>
    </div>
  );
}

export {Profile};

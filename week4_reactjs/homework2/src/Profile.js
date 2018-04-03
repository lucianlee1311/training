import React from 'react';
import PropTypes from 'prop-types';

class Profile extends React.Component {
  static propTypes = {
    number: PropTypes.number.isRequired,
    onClickProfile: PropTypes.func
  }
  clickProfile = () => {
    this.props.onClickProfile(this.props.number);
  }
  render() {
    return (
      <div>
        <span>hi this is profile {this.props.number}.</span>
        <button onClick={this.clickProfile}>profile click</button>
      </div>
    );
  }
}

export default Profile;
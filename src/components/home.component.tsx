import { Component } from "react";

import UserService from "../services/user.service";
import { Link } from "react-router-dom";

type Props = {};

type State = {
  content: string;
}

export default class Home extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      content: ""
    };
  }

  componentDidMount() {
    UserService.getPublicContent().then(
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response && error.response.data) ||
            error.message ||
            error.toString()
        });
      }
    );
  }

  render() {
    return (
      <div className="container">
        {/* <header className="jumbotron">
          <h3>{this.state.content}</h3>
          dfdfdfdf
        </header> */}

        <header >
          <h1>Welcome to Flip & Win!</h1>
          <p>Are you ready to test your luck?</p>
        </header>
        <main>
          <section id="about">
            <h2>About Flip & Win</h2>
            <p>Flip & Win is the ultimate destination for thrilling coin flip games. With instant rewards and transparent gameplay, you'll experience non-stop excitement every time you play.</p>
          </section>
          <section id="how-to-play">
            <h2>How to Play</h2>
            <ol>
              <li>Place your bet</li>
              <li>Flip the coin</li>
              <li>Win big!</li>
            </ol>
          </section>
          <section id="why-choose-us">
            <h2>Why Choose Flip & Win?</h2>
            <ul>
              <li>Easy and exciting gameplay</li>
              <li>Instant rewards with every flip</li>
              <li>Fair and transparent gaming experience</li>
            </ul>
          </section>
          <section id="start-playing">
            <h2>Start Playing Today!</h2>
            <p>Ready to test your luck? Sign up now and start flipping for your chance to win big prizes!</p>
            <Link to="/register">
              <button className="button">Sign Up Now</button>
            </Link>
                or    
            <Link to="/login">
              <button className="button">Log In</button>
            </Link>
          </section>
        </main>
        <footer>
          <p><p></p>&copy; 2024 OfkGames. All rights reserved.</p>
        </footer>
      </div>
      // </div>
    );
  }
}

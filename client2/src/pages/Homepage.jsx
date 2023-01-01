import '../styles/partials/_homepage.scss';
import WebpackIcon from '../Assets/webpack-icon.png';

const Homepage = () => {
  return (
    <body>
      <img
        className='webpack-icon'
        src={WebpackIcon}
        alt='webpack icon image'
      />
    </body>
  );
};

export default Homepage;

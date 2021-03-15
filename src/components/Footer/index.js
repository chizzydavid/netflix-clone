import React from "react";
import './Footer.css';
import FacebookIcon from '@material-ui/icons/Facebook';
import YoutubeIcon from '@material-ui/icons/YouTube';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';

const Footer = () => {

  return (
    <footer>
      <div className="footer__row">

          <div className="footer_right">

            <div className="social__link">
              <p> <FacebookIcon className="link" /> </p>
              <p> <InstagramIcon className="link" /> </p>
              <p> <TwitterIcon className="link" /> </p>
              <p> <YoutubeIcon className="link" /> </p>
            </div>
            <p className="copyright">
              NETFLIX CLONE INC @2021
            </p> 

          </div>
      </div>

    </footer>
  );
};

export default Footer;

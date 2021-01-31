import React from "react";
import FacebookIcon from '@material-ui/icons/Facebook';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import YouTubeIcon from '@material-ui/icons/YouTube';
import {createPortal} from 'react-dom';

import './Footer.css';

function Footer() {
    return createPortal(<div className='container__footer'>
        <div className='container__footer-legends'>
            <span>Políticas de privacidad</span>
            <span>Términos y condiciones</span>
            <span>Acerca de nosotros</span>
        </div>

        <div className='container__footer-social'>
            <FacebookIcon/>
            <LinkedInIcon/>
            <YouTubeIcon/>
        </div>
    </div>, document.getElementById('footer'));
}

export default Footer;
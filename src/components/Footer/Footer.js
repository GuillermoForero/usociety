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
            <a target={'_blank'} style={{textDecoration: 'none', color: 'white'}} href={'https://es-la.facebook.com/usergioarboleda/'}>
                <FacebookIcon />
            </a>
            <a target={'_blank'} style={{textDecoration: 'none', color: 'white'}} href="https://www.linkedin.com/school/universidad-sergio-arboleda/?originalSubdomain=co">
                <LinkedInIcon />
            </a>
            <a target={'_blank'} style={{textDecoration: 'none', color: 'white'}} href={'https://www.youtube.com/channel/UCAxhLbN7QbkmeVHRnCiF_CQ'}><YouTubeIcon /></a>
        </div>
    </div>, document.getElementById('footer'));
}

export default Footer;
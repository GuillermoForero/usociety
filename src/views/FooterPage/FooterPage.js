import React from "react";
import Footer from "../../components/Footer/Footer";

function FooterPage(props) {
    return <div style={{height: '100%'}}>
        {props.children}
        <Footer/>
    </div>
}

export default FooterPage;
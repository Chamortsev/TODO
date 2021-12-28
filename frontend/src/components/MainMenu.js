import React from 'react';
import {Link} from 'react-router-dom'


var style = {
    backgroundColor: "#F8F8F8",
    borderTop: "1px solid #E7E7E7",
    textAlign: "center",
    padding: "20px",
    left: "0",
    height: "60px",
    width: "100%",
};

const MainMenu = () => {
    return (
        <div style={style}>
            <button type="button" class="btn btn-link" Link><Link to='/'>Users</Link></button>
            <button type="button" class="btn btn-link"><Link to='/projects'>Projects</Link></button>
            <button type="button" class="btn btn-link"><Link to='/todo'>ToDo</Link></button>


        </div>
    );
};

export default MainMenu;
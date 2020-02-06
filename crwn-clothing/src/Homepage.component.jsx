import React from 'react';

import './Homepage.styles.scss';

const HomePage = () => (
    <dic className='homepage'>
        <div className='directory-menu'>
            <div className='menu-item'>
                <div className='comtent'>
                    <h1 className='title'>HATS</h1>
                    <span className='subtitle'>SHOP NOW</span>
                </div>
            </div>
            <div className='menu-item'>
                <div className='comtent'>
                    <h1 className='title'>JACKETS</h1>
                    <span className='subtitle'>SHOP NOW</span>
                </div>
            </div>
            <div className='menu-item'>
                <div className='comtent'>
                    <h1 className='title'>SNEAKERS</h1>
                    <span className='subtitle'>SHOP NOW</span>
                </div>
            </div>
            <div className='menu-item'>
                <div className='comtent'>
                    <h1 className='title'>WOMEN'S</h1>
                    <span className='subtitle'>SHOP NOW</span>
                </div>
            </div>
            <div className='menu-item'>
                <div className='comtent'>
                    <h1 className='title'>MEN'S</h1>
                    <span className='subtitle'>SHOP NOW</span>
                </div>
            </div>            
        </div>
    </dic>
);

export default HomePage;
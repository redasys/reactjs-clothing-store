import React from 'react';

import './collection-preview.styles.scss';
import CollectionItem from '../collection-item/collection-item';


const CollectionPreview = ({ title, items }) => (
    <div className='collection-preview'>
        <h1>{title}</h1>
        <div className='preview'>
            {
                items
                    .filter((item, i) => i < 4)
                    .map(({id, ...otherItemProps}) => ( 
                        <CollectionItem key={id} {...otherItemProps} />
                    ))
            }
        </div>
    </div>
)

export default CollectionPreview;

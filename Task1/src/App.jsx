import React from 'react';
import ReactDom from 'react-dom';
import { Dropdown } from './components/Dropdown';
import { Item } from './components/Item';

ReactDom.render(
    <div>
        <Item />
        <Dropdown />
    </div>,
    document.getElementById('app')
)
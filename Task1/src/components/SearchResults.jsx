import React from 'react';
import { Preview } from './Preview';
import killBill from '../img/kill-bill.jpg';

export const SearchResults = () => (
    <div>
        <Preview img={killBill} title="Убить билла 2" year="2005" genre="Action & Adventure"/>
        <Preview img={killBill} title="Убить билла 2" year="2005" genre="Action & Adventure"/>
        <Preview img={killBill} title="Убить билла 2" year="2005" genre="Action & Adventure"/>
        <Preview img={killBill} title="Убить билла 2" year="2005" genre="Action & Adventure"/>
    </div>
);
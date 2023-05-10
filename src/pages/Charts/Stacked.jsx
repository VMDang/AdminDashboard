import React from 'react';

import { ChartsHeader, Stacked as StackedChart } from '../../components';
import {Helmet, HelmetProvider} from "react-helmet-async";

const Stacked = () => (
    <HelmetProvider>
        <Helmet>
            <title> Charts | Stacked </title>
        </Helmet>

        <div className="m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl">
            <ChartsHeader category="Stacked" title="Revenue Breakdown" />
            <div className="w-full">
                <StackedChart />
            </div>
        </div>
    </HelmetProvider>
);

export default Stacked;
import React from 'react';

import { pieChartData } from '../../data/dummy';
import { ChartsHeader, Pie as PieChart } from '../../components';
import {Helmet, HelmetProvider} from "react-helmet-async";

const Pie = () => (
    <HelmetProvider>
        <Helmet>
            <title> Charts | Pie </title>
        </Helmet>

        <div className="m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl">
            <ChartsHeader category="Pie" title="Project Cost Breakdown" />
            <div className="w-full">
                <PieChart id="chart-pie" data={pieChartData} legendVisiblity height="full" />
            </div>
        </div>
    </HelmetProvider>
);

export default Pie;
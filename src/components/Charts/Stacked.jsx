import React from "react";
import { ChartComponent, SeriesCollectionDirective, SeriesDirective,
    Inject, Legend, Category, StackingColumnSeries, Tooltip
} from "@syncfusion/ej2-react-charts";

import { stackedCustomSeries, stackedPrimaryYAxis, stackedPrimaryXAxis } from "../../data/dummy";
import {useStateContext} from "../../contexts/ContextProvider";

const Stacked = ({ width, height }) => {
    const { currentMode } = useStateContext();

    return (
        <ChartComponent id={"stacked-charts"} width={width} height={height}
                        primaryXAxis={stackedPrimaryXAxis}  primaryYAxis={stackedPrimaryYAxis}
                        chartArea={{border: {width: 0}}} tooltip={{enable: true}}
                        background={ currentMode === 'Dark' ? '#33373E' : '#fff' }
                        LegendSettings={{ background: "white" }} >
            <Inject services={[Legend, Category, StackingColumnSeries, Tooltip]} />
            <SeriesCollectionDirective>
                { stackedCustomSeries.map((item, index) => <SeriesDirective key={index} {...item}/>)}
            </SeriesCollectionDirective>
        </ChartComponent>
    )
}

export default Stacked
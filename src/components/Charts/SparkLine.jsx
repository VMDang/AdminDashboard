import React from "react";
import { SparklineComponent, Inject, SparklineTooltip } from "@syncfusion/ej2-react-charts";
import {SparklineAreaData} from "../../data/dummy";

const SparkLine = ({id, type, height, width, data, color, currentColor}) => {
    return (
        <SparklineComponent id={id} height={height} width={width} lineWidth={1} valueType={"Numeric"} type={type}
                            fill={color} border={{color: currentColor, width: 2}} dataSource={data} xName={"x"} yName={"yval"}
                            tooltipSettings={{
                                visible: true,
                                // eslint-disable-next-line no-template-curly-in-string
                                format: "${x} : data ${yval}",
                                trackLineSettings: {
                                    visible: true
                                }
                            }}>
            <Inject services={[SparklineTooltip]} />
        </SparklineComponent>
    )
}

export default SparkLine
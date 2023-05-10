import React from "react";
import { ChartsHeader, LineChart } from "../../components";
import {Helmet, HelmetProvider} from "react-helmet-async";

const Line = () => {
    return (
        <HelmetProvider>
            <Helmet>
                <title> Charts | Line </title>
            </Helmet>

            <div className={"m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl"}>
                <ChartsHeader category={"Line"} title={"Inflation Rate"} />
                <div className={"w-full"}>
                    <LineChart/>
                </div>
            </div>
        </HelmetProvider>
    )
}

export default Line
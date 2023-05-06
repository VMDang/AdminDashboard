import React from "react";
import {Helmet, HelmetProvider} from "react-helmet-async";
import { ColorPickerComponent } from "@syncfusion/ej2-react-inputs";

import { Header } from "../components";

const ColorPicker = () => {
    const changeColor = (args) => {
        document.getElementById('preview').style.backgroundColor = args.currentValue.hex;
    }
    
    return (
        <HelmetProvider>
            <Helmet>
                <title>Color Picker</title>
            </Helmet>

            <div className={"m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl"}>
                <Header title={"Color Picker"} category={"App"} />
                <div className={"text-center"}>
                    <div id={"preview"}/>
                    <div className={"flex justify-center items-center gap-20 flex-wrap"}>
                        <div>
                            <p className={"text-2xl font-semibold mt-2 mb-4"}>
                                Inline Pallet
                            </p>
                            <ColorPickerComponent id={"inline-pallete"} mode={"Palette"} modeSwitcher={false}
                                                  inline={true} showButtons={false} change={changeColor}/>
                        </div>
                        <div>
                            <p className={"text-2xl font-semibold mt-2 mb-4"}>
                                Inline Pallet
                            </p>
                            <ColorPickerComponent id={"inline-picker"} mode={"Picker"} modeSwitcher={false}
                                                  inline={true} showButtons={false} change={changeColor}/>
                        </div>
                    </div>
                </div>
            </div>
        </HelmetProvider>
    )
}

export default ColorPicker
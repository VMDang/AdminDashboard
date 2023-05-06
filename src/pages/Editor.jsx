import React from "react";
import { HtmlEditor, Image, Inject, Link, QuickToolbar, RichTextEditorComponent, Toolbar } from "@syncfusion/ej2-react-richtexteditor";

import { EditorData } from "../data/dummy";
import { Header } from "../components";
import {Helmet, HelmetProvider} from "react-helmet-async";

const Editor = () => {
    return (
        <HelmetProvider>
            <Helmet>
                <title>Editor</title>
            </Helmet>

            <div className={"m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl"}>
                <Header title={"Editor"} category={"App"} />
                <RichTextEditorComponent>
                    <EditorData />
                    <Inject services={[HtmlEditor, Toolbar, Link, QuickToolbar, Image]}/>
                </RichTextEditorComponent>
            </div>
        </HelmetProvider>
    )
}

export default Editor
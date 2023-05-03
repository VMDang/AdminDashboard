import React from "react";
import {
    GridComponent, ColumnsDirective, ColumnDirective, Page, Selection,
    Inject, Edit, Toolbar, Sort, Filter, Search
} from "@syncfusion/ej2-react-grids";

import { customersData, customersGrid } from "../data/dummy";
import { Header } from "../components";

const Customers = () => {
    return (
        <div className={"m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl"}>
            <Header title={"Customers"} category={"Page"} />
            <GridComponent id={"girdComp"} dataSource={customersData} allowPaging allowSorting
                           toolbar={['Search', 'Add', 'Delete', 'Edit']} width={"auto"}
                            editSettings={{ allowSearching: true, allowAdding: true, allowDeleting: true, allowEditing: true }} >
                <ColumnsDirective>
                    {
                        customersGrid.map((item, index) => (
                            <ColumnDirective key={index} {...item} />
                        ))
                    }
                </ColumnsDirective>
                <Inject services={[ Page, Toolbar, Selection, Edit, Sort, Filter, Search]} />
            </GridComponent>
        </div>
    )
}

export default Customers
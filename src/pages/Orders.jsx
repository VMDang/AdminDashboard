import React from "react";
import {Helmet, HelmetProvider} from "react-helmet-async";
import {
    GridComponent, ColumnsDirective, ColumnDirective, Resize, Sort, ContextMenu,
    Filter, Page, ExcelExport, PdfExport, Edit, Inject, Toolbar, Grid
} from "@syncfusion/ej2-react-grids";

import { ordersData, contextMenuItems, ordersGrid } from "../data/dummy";
import { Header } from "../components";
import {excelexport, pdfexport} from "@syncfusion/ej2";

const Orders = () => {
    let grid;
    const toolbarClick = (args) => {
        if (grid && args.item.id === 'grid_pdfexport'){
            grid.pdfExport({
                fileName: 'orders.pdf',
                exportType: 'CurrentPage',
                theme: {
                    header: {
                        bold: true,
                        fontColor: '#00ff00',
                        fontName: 'Calibri',
                        fontSize: 10
                    },
                    record: {
                        fontColor: '#0000ff',
                        fontName: 'Calibri',
                        fontSize: 8
                    }
                },
                header:{
                    fromTop: 0,
                    height :130,
                    contents:[{
                        type: 'Text',
                        value: 'Orders',
                        position: {x:0, y:50 },
                        style: { textBrushColor: '#000000', fontSize: 14 }
                    }]
                },
                footer:{
                    contents:[{
                        type: 'Text',
                        value: 'Thank you for your Business!',
                        position: {x:0, y:50 },
                        style: { textBrushColor: '#000000', fontSize: 14 }
                    }],
                    fromBottom: 130,
                    height: 130
                }
            });
        }else if (grid && args.item.id === 'grid_excelexport'){
            grid.excelExport({
                fileName: 'orders.xlsx',
                exportType: 'CurrentPage',
                theme: {
                    header: {
                        bold: true,
                        fontColor: '#00ff00',
                        fontName: 'Calibri',
                        fontSize: 10
                    },
                    record: {
                        fontColor: '#0000ff',
                        fontName: 'Calibri',
                        fontSize: 8
                    }
                },
                header:{
                    headerRows: 1,
                    rows: [
                        {
                            cells: [{
                                colSpan: 4,
                                value: 'Orders',
                                style: { fontColor:'#C67878', fontSize: 20, hAlign: "Center", bold: true }
                            }]
                        }
                    ]
                },
                footer: {
                    footerRows: 1,
                    rows:[{
                        cells: [{
                            colSpan: 5,
                            value: 'Thank you for your Business!',
                            style: { hAlign: 'Center', bold: true }
                        }]
                    }]
                }
            });
        }
    }
    
    return (
        <HelmetProvider>
            <Helmet>
                <title> Order </title>
            </Helmet>

            <div className={"m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl"}>
                <Header title={"Orders"} category={"Page"} />
                <GridComponent id={"grid"} dataSource={ordersData} allowPaging allowSorting toolbar={['PdfExport', 'ExcelExport']}
                               allowPdfExport allowExcelExport toolbarClick={toolbarClick} ref={g => grid = g}>
                    <ColumnsDirective>
                        {
                            ordersGrid.map((item, index) => (
                                <ColumnDirective key={index} {...item} />
                            ))
                        }
                    </ColumnsDirective>
                    <Inject services={[Resize, Sort, ContextMenu, Filter, ExcelExport, Edit, PdfExport, Page, Toolbar]} />
                </GridComponent>
            </div>
        </HelmetProvider>
    )
}

export default Orders
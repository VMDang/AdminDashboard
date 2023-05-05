import React from "react";
import {
    ScheduleComponent, ViewsDirective, ViewDirective, Day, Week, Month,
    WorkWeek, Agenda, Inject, Resize, DragAndDrop, MonthAgenda
} from "@syncfusion/ej2-react-schedule";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import { extend } from "@syncfusion/ej2-base";
import { GridComponent } from "@syncfusion/ej2-react-grids";
import { Query, DataManager, Predicate } from "@syncfusion/ej2-data";
import {DatePickerComponent} from "@syncfusion/ej2-react-calendars";

import { scheduleData } from "../data/dummy";
import { Header } from "../components";
import {Helmet, HelmetProvider} from "react-helmet-async";

const Calendar = () => {
    let scheduleObj;
    const data = scheduleData;
    function onEventRendered(args) {
        let categoryColor = args.data.CategoryColor;
        if (!args.element || !categoryColor) {
            return;
        }
        if (scheduleObj.currentView === 'Agenda') {
            args.element.firstChild.style.borderLeftColor = categoryColor;
        }
        else {
            args.element.style.backgroundColor = categoryColor;
        }
    }
    function globalSearch(args) {
        let searchString = args.target.value;
        if (searchString !== '') {
            new DataManager(scheduleObj.getEvents(null, null, true)).executeQuery(new Query().
            search(searchString, ['Subject', 'Location', 'Description'], null, true, true)).then((e) => {
                if (e.result.length > 0) {
                    showSearchEvents('show', e.result);
                }
                else {
                    showSearchEvents('hide');
                }
            });
        }
        else {
            showSearchEvents('hide');
        }
    }
    function searchOnclick() {
        let searchObj = [];
        let startDate;
        let endDate;
        let formElements = [].slice.call(document.querySelectorAll('.event-search .search-field'));
        formElements.forEach((node) => {
            let fieldOperator;
            let predicateCondition;
            let fieldValue;
            let fieldInstance;
            if (node.value && node.value !== '' && !node.classList.contains('e-datepicker')) {
                fieldOperator = 'contains';
                predicateCondition = 'or';
                fieldValue = node.value;
                searchObj.push({
                    field: node.getAttribute('data-name'), operator: fieldOperator, value: fieldValue, predicate: predicateCondition,
                    matchcase: true
                });
            }
            if (node.classList.contains('e-datepicker') && node.ej2_instances[0].value) {
                fieldInstance = node.ej2_instances[0];
                fieldValue = fieldInstance.value;
                if (node.classList.contains('e-start-time')) {
                    fieldOperator = 'greaterthanorequal';
                    predicateCondition = 'and';
                    startDate = new Date(+fieldValue);
                }
                else {
                    fieldOperator = 'lessthanorequal';
                    predicateCondition = 'and';
                    let date = new Date(+fieldInstance.value);
                    fieldValue = new Date(date.setDate(date.getDate() + 1));
                    endDate = fieldValue;
                }
                searchObj.push({
                    field: node.getAttribute('data-name'), operator: fieldOperator, value: fieldValue, predicate: predicateCondition,
                    matchcase: false
                });
            }
        });
        if (searchObj.length > 0) {
            let filterCondition = searchObj[0];
            let predicate = new Predicate(filterCondition.field, filterCondition.operator, filterCondition.value, filterCondition.matchcase);
            for (let i = 1; i < searchObj.length; i++) {
                predicate = predicate.and(searchObj[i].field, searchObj[i].operator, searchObj[i].value, searchObj[i].matchcase);
            }
            let result = new DataManager(scheduleObj.getEvents(startDate, endDate, true)).
            executeLocal(new Query().where(predicate));
            showSearchEvents('show', result);
        }
        else {
            showSearchEvents('hide');
        }
    }
    function clearOnClick() {
        let a =  document.getElementById('schedule').style.display = 'block';

        document.getElementById('form-search').reset();
        showSearchEvents('hide');
    }
    function showSearchEvents(type, data) {
        if (type === 'show') {
            if (document.getElementById('grid').classList.contains('e-grid')) {
                let gridObj = document.querySelector('#grid').ej2_instances[0];
                gridObj.dataSource = data;
                gridObj.dataBind();
            }
            else {
                let gridObj = new GridComponent({
                    dataSource: data,
                    height: 505,
                    width: 'auto',
                    columns: [
                        { field: 'Subject', headerText: 'Subject', width: 120 },
                        { field: 'Location', headerText: 'Location', width: 120 },
                        { field: 'StartTime', headerText: 'StartTime', width: 120, format: { type: 'dateTime', format: 'M/d/y hh:mm a' } },
                        { field: 'EndTime', headerText: 'EndTime', width: 120, format: { type: 'dateTime', format: 'M/d/y hh:mm a' } },
                    ]
                });
                gridObj.appendTo(document.querySelector('#grid'));
                scheduleObj.element.style.display = 'none';
            }
        }
        else {
            let gridObj = document.querySelector('#grid').ej2_instances;
            if (gridObj && gridObj.length > 0 && !gridObj[0].isDestroyed) {
                gridObj[0].destroy();
            }
            scheduleObj.element.style.display = 'block';
        }
    }

    return (
        <HelmetProvider>
            <Helmet>
                <title>Calendar</title>
            </Helmet>

            <div className={"m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl flex flex-row"}>
                <div className={"basis-5/6"}>
                    <Header category={"App"} title={"Calendar"} />
                    <ScheduleComponent id={"schedule"} height={"650px"} eventSettings={{dataSource: scheduleData}}
                                       selectedDate={new Date(2021, 0,10)}
                                       cssClass={'schedule-cell-dimension'} ref={schedule => scheduleObj = schedule}
                                       eventRendered={onEventRendered.bind(this)}>
                        <ViewsDirective >
                            <ViewDirective  option={"Day"} />
                            <ViewDirective  option={"Week"} isSelected={true}/>
                            <ViewDirective  option={"Month"} />
                            <ViewDirective  option={"MonthAgenda"} />
                            <ViewDirective  option={"Agenda"} />
                        </ViewsDirective>
                        <Inject services={[Day, Week, Month, WorkWeek, Agenda, Resize, DragAndDrop, MonthAgenda]}/>
                    </ScheduleComponent>
                    <div id="grid"></div>
                </div>
                <div className={"basis-1/6 md:m-10 pt-20"} style={{marginRight: "0px"}}>
                    <div className='property-section property-customization bg-gray-100 p-4'>
                        <div className="property-panel-section">
                            <p className="property-panel-header header-customization" style={{ width: '100%' }}>Search by all event fields</p>
                            <div className="property-panel-content">
                                <input className="e-input" type="text" placeholder="Enter the Search text" onKeyUp={globalSearch.bind(this)}/>
                            </div>
                            <form className="event-search" id="form-search">
                                <p className="property-panel-header header-customization" style={{ width: '100%' }}>Search by specific event fields</p>
                                <table id="property-specific" style={{ width: '100%' }}>
                                    <tbody>
                                    <tr className="row">
                                        <td className="property-panel-content" colSpan={2}>
                                            <input type="text" className="e-input search-field" id="searchEventName" data-name="Subject" placeholder="Subject"/>
                                        </td>
                                    </tr>
                                    <tr className="row" style={{ height: '45px' }}>
                                        <td className="property-panel-content" colSpan={2}>
                                            <input type="text" className="e-input search-field" id="searchEventLocation" data-name="Location" placeholder="Location"/>
                                        </td>
                                    </tr>
                                    <tr className="row" style={{ height: '45px' }}>
                                        <td className="property-panel-content" colSpan={2}>
                                            <DatePickerComponent className="search-field e-start-time" value={null} data-name="StartTime" showClearButton={false} placeholder="Start Time"></DatePickerComponent>
                                        </td>
                                    </tr>
                                    <tr className="row" style={{ height: '45px' }}>
                                        <td className="property-panel-content" colSpan={2}>
                                            <DatePickerComponent className="search-field e-end-time" value={null} data-name="EndTime" showClearButton={false} placeholder="End Time"></DatePickerComponent>
                                        </td>
                                    </tr>
                                    <tr className="row" style={{ height: '45px' }}>
                                        <td className="e-field button-customization" style={{ width: '50%', padding: '15px' }}>
                                            <ButtonComponent title='Search' type='button' onClick={searchOnclick.bind(this)}>Search</ButtonComponent>
                                        </td>
                                        <td className="e-field button-customization" style={{ width: '50%', padding: '15px' }}>
                                            <ButtonComponent title='Clear' type='button' onClick={clearOnClick.bind(this)}>Clear</ButtonComponent>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </HelmetProvider>
    )
}

export default Calendar
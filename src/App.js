import React, { Component } from 'react';
import PropTypes from 'prop-types';

import HeaderBarComponent from 'd2-ui/lib/app-header/HeaderBar';
import headerBarStore$ from 'd2-ui/lib/app-header/headerBar.store';
import withStateFrom from 'd2-ui/lib/component-helpers/withStateFrom';

import DashboardItemGridCt from './DashboardItemGrid/DashboardItemGrid';
import { tSetDashboards, tSetSelectedDashboardById } from './actions';

import './App.css';
import DashboardTitleCt from './DashboardTitle/DashboardTitle';

const HeaderBar = withStateFrom(headerBarStore$, HeaderBarComponent);

// TODO, add to plugin instead
if (global.reportTablePlugin) {
    global.reportTablePlugin.type = 'REPORT_TABLE';
}

if (global.chartPlugin) {
    global.chartPlugin.type = 'CHART';
}

class App extends Component {
    componentDidMount() {
        const { store } = this.context;
        store.dispatch(tSetDashboards()).then(() => {
            store.dispatch(tSetSelectedDashboardById('xP1jtPjus1c'));
        });
    }
    render() {
        const { store } = this.context;

        //TODO: ControlBar below HeaderBar

        return (
            <div className="app-wrapper">
                <HeaderBar />
                <div className="dashboard-wrapper">
                    <DashboardTitleCt />
                    <DashboardItemGridCt store={store} />
                </div>
            </div>
        );
    }
}

App.contextTypes = {
    d2: PropTypes.object,
    store: PropTypes.object,
};

export default App;

import React, { Component } from 'react';
import { ApiService } from 'services';

class ViewTable extends Component {

    constructor(props) {
        super(props);

        this.state = {
            activities: []
        };
        // Bind
        this.loadActivity = this.loadActivity.bind(this);
        this.loadActivity();
    }

    loadActivity = () => {
        return ApiService.getActivityByName()
            .then(data => {
                console.log(data);
                this.setState({ activities: data });
            })
            .catch(e => {
                console.error(e);
            })

    }



    renderTableData() {
        return this.state.activities.map((activity, index) => {
            const { activityid, username, training_time, distance,
                speed, altitude, heart_rate, calories, incline,
                cadence, temperature } = activity //destructuring

            return (
                <tr key={activityid}>
                    <td>{activityid}</td>
                    <td>{username}</td>
                    <td>{training_time}</td>
                    <td>{distance}</td>
                    <td>{speed}</td>
                    <td>{altitude}</td>
                    <td>{heart_rate}</td>
                    <td>{calories}</td>
                    <td>{incline}</td>
                    <td>{cadence}</td>
                    <td>{temperature}</td>
                </tr>
            )
        })
    }

    render() {
        return (
            <section>
                <h1>MY ACTIVITIES</h1>
                <div class="tbl-header">
                    <table cellpadding="0" cellspacing="0" border="0">
                        <thead>
                            <tr>
                                <th>Activityid</th>
                                <th>Username</th>
                                <th>Time</th>
                                <th>Distance</th>
                                <th>Speed</th>
                                <th>Altitude</th>
                                <th>Heart rate</th>
                                <th>Calories</th>
                                <th>Incline</th>
                                <th>Cadence</th>
                                <th>Temperature</th>
                            </tr>
                        </thead>
                    </table>
                </div>
                <div class="tbl-content">
                    <table cellpadding="0" cellspacing="0" border="0">
                        <tbody>
                            {this.renderTableData()}
                        </tbody>
                    </table>
                </div>
            </section>

        );
    }
}

export default ViewTable;
import React from 'react';
import Clock from 'react-clock';

class App extends React.Component {
    componentDidMount() {
        setInterval(() => this.setState({ date: new Date() }))
    }
    constructor(props) {
        super(props);
        this.state = {
            date: new Date()
        };
    }
    render() {
        const { date } = this.state;
        return (
            <div className="container">
                <Clock value={date} size={300} />
            </div>
        );
    }
}

export default App;

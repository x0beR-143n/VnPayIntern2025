import React, {Component} from "react";

class LifeCycle extends Component {
    state = { data: null, loading: true };
    
    componentWillMount() {
        console.log("Component Will Mount");
    }

    componentDidMount() {
        console.log("Component Mounted ");
        fetch("https://catfact.ninja/fact")
        .then((res) => res.json())
        .then((data) => this.setState({ data, loading: false }))
        .catch(console.error);
    }

    componentWillUnmount() {
        console.log("Component will Unmount");
    }

    render() {
        if (this.state.loading)
            return <p>Loading…</p>;
        else
            return <p style={{ wordBreak: "break-word" }}>{this.state.data.fact}</p>
    }

}

export default LifeCycle;
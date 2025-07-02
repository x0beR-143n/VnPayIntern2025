import React, {Component} from "react";
import FirstChild from './ChildComponent'

class ParentComponent extends Component {
    render() {
        return (
            <>
                <h1>This is father component</h1>
                <FirstChild/>
            </>
        )
    }
}
export default ParentComponent;
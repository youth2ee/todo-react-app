import React from "react";
import { Checkbox, IconButton, InputBase, ListItem, ListItemText,ListItemSecondaryAction } from "@material-ui/core";
import DeleteOutlined from "@material-ui/icons/DeleteOutlined";


class Todo extends React.Component {
// 3-10
    constructor(props) {
        super(props);
        this.state = {item:props.item, readOnly:true};
        this.delete = props.delete;
        this.update = props.update;
    }

// 3-27
    deleteEventHandeler = () => {
        if(window.confirm("삭제하시겠습니까?")) {
            alert("삭제되었습니다.");
            this.delete(this.state.item)   
        }
    
    }

// 3-31
    offReadOnlyMode = () => {
        this.setState({readOnly:false});
    }

// 3-33
    enterKeyEventHandler = (e) => {
        if(e.key === "Enter") {
            this.setState({readOnly:true});
            this.update(this.state.item);
        }
    }

// 3-35
    editEventHandler = (e) => {
        const thisItem = this.state.item;
        thisItem.title = e.target.value;
        this.setState({item:thisItem});
    }

// 3-37
    checkboxEventHandler = (e) => {
        const thisItem = this.state.item;
        thisItem.done = !thisItem.done;
        this.setState({item:thisItem});
        this.update(this.state.item);
    }

// 3-7, 3-10, 3-13
    render() {
        const item = this.state.item;
        return (
            <ListItem>
                <Checkbox checked={item.done} disableRipple onChange={this.checkboxEventHandler}/>
                <ListItemText>
                    <InputBase
                        inputProps={{"aria-label":"naked", readOnly:this.state.readOnly,}}
                        onClick={this.offReadOnlyMode}
                        onKeyPress={this.enterKeyEventHandler}
                        onChange={this.editEventHandler}
                        type="text"
                        id={item.id}
                        name={item.id}
                        value={item.title}
                        multiline={true}
                        fullWidth={true}
                    />
                </ListItemText>

                <ListItemSecondaryAction>
                    <IconButton aria-label="Delete Todo" onClick={this.deleteEventHandeler}>
                        <DeleteOutlined />
                    </IconButton>
                </ListItemSecondaryAction>

            </ListItem>
        );
    }
}

export default Todo;
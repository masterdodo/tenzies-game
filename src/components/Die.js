import React from "react"

export default function Die(props) {
    const styles = {}
    styles.backgroundColor = props.selected ? "#54c472" : "#EEE"

    return (
        <div onClick={props.handleToggle} className="Die" style={styles}>{props.value}</div>
    )
}
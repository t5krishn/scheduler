import React from "react";
import classnames  from "classnames"; 

import "components/DayListItem.scss";



export default function DayListItem(props) {
    const dayListItemClass = classnames("day-list__item", {
        "day-list__item--selected": props.selected,
        "day-list__item--full": props.spots === 0
        });
    return <li 
        className={dayListItemClass}
        onClick={() => props.setDay(props.name)}
        data-testid="day" >
        <h3>{props.name}</h3>
    {(props.spots === 0)? "no spots remaining" : `${props.spots} spot${(props.spots > 1)? 's':''} remaining`}
    </li>;
}
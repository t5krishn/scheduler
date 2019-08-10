import React, { useState } from 'react';
const history= [];

export default function useVisualMode(intial) {
    const [mode, setMode] = useState(intial);
    const [history, setHistory] = useState({ modes: ["FIRST"], index: 0 });

    const transition = (newMode, replace) => {
        const newHistory = { ...history, modes:[...history.modes] };
        if (replace) {
            newHistory.modes.pop();
        }
        
        newHistory.modes.push(newMode);
        newHistory.index = history.modes.length - 1;
        
        // console.log(histy)
        setMode(newMode);
        setHistory(prev => ({ ...prev, modes: newHistory.modes, index: newHistory.index }));
    };

    const back = () => {
        const newHistory = { ...history, modes:[...history.modes] };

        if (newHistory.index > 0) {
            newHistory.index = newHistory.index - 1;
            setMode(newHistory.modes[history.index]);
        }
    };

    return [ mode, transition, back ];
};


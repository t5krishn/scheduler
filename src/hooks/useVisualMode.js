import React, { useState } from 'react';


export default function useVisualMode(intial) {
    const [mode, setMode] = useState(intial);
    const [history, setHistory] = useState({ modes: [mode], index: 0 });

    const transition = (newMode, replace) => {
        const newHistory = { ...history, modes:[...history.modes] };
        if (replace) {
            newHistory.modes.pop();
        }
        
        newHistory.modes.push(newMode);
        newHistory.index = newHistory.modes.length - 1;
        setMode(newMode)
        setHistory(prev => ({ ...prev, modes: newHistory.modes, index: newHistory.index }));
    };

    const back = () => {
        const newHistory = { ...history, modes:[...history.modes] };

        if (newHistory.index > 0) {
            newHistory.modes.pop();
            newHistory.index = newHistory.modes.length - 1;
            setMode(newHistory.modes[newHistory.index]);
            setHistory(prev => ({ ...prev, modes: newHistory.modes, index: newHistory.index }));
        }
    };

    return [ mode, transition, back ];
};


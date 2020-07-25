import React, { useState, useEffect } from 'react';
import {Box} from 'theme-ui';
import typeStyle from './style/type.module.scss';

function Timer(props) {
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        let interval = null;
        if (props.timer) {
            interval = setInterval(() => {
                setSeconds(seconds => seconds + 1);
            }, 1000);
        } else if (seconds !== 0) {
            clearInterval(interval);
            setSeconds(0);
        }
        return () => clearInterval(interval);
    }, [seconds, props.timer]);

    return (
        <Box
            className={typeStyle.box}
            bg={'primary'}
        >
            {seconds}sec
        </Box>
    );
}

export default Timer;
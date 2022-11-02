import isEqual from 'lodash.isequal';

import { Dimensions } from 'react-native';
import { useEffect, useState } from 'react';

export const useDimensions = () => {
    const [dimensions, setDimensions] = useState({
        window: Dimensions.get('window'),
        screen: Dimensions.get('screen'),
    });

    useEffect(() => {
        const subscription = Dimensions.addEventListener('change', dimensions => {
            setDimensions(prevState => {
                if (!isEqual(prevState, dimensions)) {
                    return dimensions;
                }

                return prevState;
            });
        });

        return () => {
            subscription.remove();
        };
    }, []);

    return dimensions;
};

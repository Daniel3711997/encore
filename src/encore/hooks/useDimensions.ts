import isEqual from 'lodash.isequal';
import { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';

export const useDimensions = () => {
    const [dimensions, setDimensions] = useState({
        window: Dimensions.get('window'),
        screen: Dimensions.get('screen'),
    });

    useEffect(() => {
        const subscription = Dimensions.addEventListener('change', newDimensions => {
            setDimensions(prevState => {
                if (!isEqual(prevState, newDimensions)) {
                    return newDimensions;
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

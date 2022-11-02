module.exports = {
    plugins: [
        ['@babel/plugin-transform-react-jsx', { runtime: 'automatic' }],

        [
            'module-resolver',
            {
                alias: {
                    '@app': './src',
                    '@assets': './assets',
                },
                root: ['.'],
                extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
            },
        ],
    ],

    presets: [['module:metro-react-native-babel-preset', { useTransformReactJSXExperimental: true }]],
};
